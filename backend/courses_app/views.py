from rest_framework import viewsets,status
from .models import (
    Course, Subject, Chapter, LectureVideo,
     Exam, Question,UserCourseData,UserExamData,
     ExamQuestion,ChapterQuestion,LectureNote,Concept,UserWeakConcept )
from .serializers import (
    CourseSerializer, SubjectSerializer,ChapterSerializer,ConceptSerializer,
    LectureVideoSerializer, ExamSerializer, QuestionSerializer,
    UserCourseDataSerializer,UserExamDataSerializer,ExamQuestionSerializer,ChapterQuestionSerializer,BulkQuestionUploadSerializer,UserWeakConceptSerializer,
    LectureNoteSerializer,BulkExamQuestionSerializer )
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.views import APIView
from django.db.models import Count
from django.shortcuts import get_object_or_404
import math
import random
from rest_framework.views import APIView
from django.db.models import Count
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from django.http import JsonResponse
from django.views import View
import razorpay
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
import razorpay
from .models import Order
from django.contrib.auth import get_user_model

class BulkQuestionUploadView(CreateAPIView):
    serializer_class = BulkQuestionUploadSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["chapters"] = Chapter.objects.values("id", "name") 
        context["concept_codes"] = Concept.objects.values("code", "name")

        return context


class ChapterListView(ListAPIView):
    permission_classes = [AllowAny]

    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer


class ChapterQuestionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        chapter_ids = request.query_params.getlist('chapter_ids')
        difficulty = request.query_params.get('difficulty')
        total_questions = request.query_params.get('total_questions')

        if not chapter_ids or difficulty is None:
            return Response(
                {"error": "chapter_ids and difficulty are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Fetch questions grouped by chapter
        chapter_question_map = {
            chapter_id: list(Question.objects.filter(
                id__in=ChapterQuestion.objects.filter(chapter_id=chapter_id).values_list('question_id', flat=True),
                level=difficulty
            ))
            for chapter_id in chapter_ids
        }

        # Flatten list of all available questions
        all_available_questions = [q for qs in chapter_question_map.values() for q in qs]

        # If no total_questions is provided, return all questions
        if total_questions is None:
            selected_questions = all_available_questions
        else:
            total_questions = int(total_questions)
            selected_questions = []
            remaining_questions = total_questions

            # Calculate even distribution
            num_chapters = len([ch for ch, qs in chapter_question_map.items() if qs])  # Count chapters with questions
            base_questions_per_chapter = total_questions // num_chapters if num_chapters > 0 else 0

            # Step 1: Try to evenly distribute questions from each chapter
            for chapter_id, questions in chapter_question_map.items():
                if questions:
                    random.shuffle(questions)  # Shuffle to get random distribution
                    selected = questions[:base_questions_per_chapter]
                    selected_questions.extend(selected)
                    remaining_questions -= len(selected)

            # Step 2: Fill remaining slots with leftover questions
            if remaining_questions > 0:
                remaining_pool = [q for qs in chapter_question_map.values() for q in qs if q not in selected_questions]
                random.shuffle(remaining_pool)
                selected_questions.extend(remaining_pool[:remaining_questions])

        serializer = QuestionSerializer(selected_questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

  
class SubjectViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['course_id']  
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type']

@api_view(['POST'])
@permission_classes([AllowAny,IsAdminUser])
def bulk_create_chapters(request):
    if request.method == 'POST':
        serializer = ChapterSerializer(data=request.data, many=True)
        if serializer.is_valid():
          
            chapters = serializer.save()
            return Response(ChapterSerializer(chapters, many=True).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_chapters(request):
    chapters = Chapter.objects.all()
    serializer = ChapterSerializer(chapters, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class ConceptViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Concept.objects.all()
    serializer_class = ConceptSerializer 
    @action(detail=False, methods=['get'], url_path='chapter/(?P<chapter_id>[^/.]+)')
    def get_concepts_by_chapter(self, request, chapter_id=None):
        chapter = get_object_or_404(Chapter, id=chapter_id)
        concepts = Concept.objects.filter(chapters__id=chapter_id)
        serializer = self.get_serializer(concepts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ChapterViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['subject_id','concepts']  
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type']
    @action(detail=False, methods=['get'], url_path='subject/(?P<subject_id>[^/.]+)')
    def get_chapters_by_course(self, request, subject_id=None):
        chapters = Chapter.objects.filter(subject_id=subject_id)
        if chapters.exists():
            serializer = self.get_serializer(chapters, many=True)
            return Response(serializer.data, status=200)
        return Response({"detail": "No chapters found for this subject."}, status=404)

class LectureVideoViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = LectureVideo.objects.all()
    serializer_class = LectureVideoSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_featured','chapter_id']  
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type']

class LectureNoteViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = LectureNote.objects.all()
    serializer_class = LectureNoteSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_featured','chapter_id']  
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type']

class ExamViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['course_id','subject_id','chapter_id','user_id','is_featured','is_customTest']  
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type']

    @action(detail=False, methods=['get'], url_path='chapter/(?P<chapter_id>[^/.]+)')
    def get_exams_by_chapter(self, request, chapter_id=None):
        try:
 
            exams = Exam.objects.filter(chapter_id=chapter_id)

          
            if exams.exists():
                serializer = self.get_serializer(exams, many=True)
                return Response(serializer.data, status=200)

            return Response({"detail": "No exams found for this chapter."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    # def get_permissions(self):

    #     if self.action in ['list', 'retrieve', 'get_questions_by_chapter', 'get_questions_by_exam_id']:
    #         return [AllowAny()]
    #     return [IsAdminUser()]

    @action(detail=False, methods=['get'], url_path='chapter/(?P<chapter_id>[^/.]+)')
    def get_questions_by_chapter(self, request, chapter_id=None):
        questions = Question.objects.filter(chapters__chapter_id=chapter_id)
        if questions.exists():
            serializer = self.get_serializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No questions found for this chapter."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='exam-id/(?P<exam_id>[^/.]+)')
    def get_questions_by_exam_id(self, request, exam_id=None):
        questions = Question.objects.filter(exams__exam_id=exam_id)
        if questions.exists():
            serializer = self.get_serializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No questions found for this exam."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['put'], url_path='update')
    def update_question(self, request, pk=None):
        question = self.get_object()
        serializer = self.get_serializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], url_path='partial-update')
    def partial_update_question(self, request, pk=None):
        """Partially update a question (Admin Only)"""
        question = self.get_object()
        serializer = self.get_serializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        
class CourseAddViewSet(viewsets.ModelViewSet):
    
    permission_classes = [AllowAny]
    queryset = UserCourseData.objects.all()
    serializer_class = UserCourseDataSerializer

    @action(detail=False, methods=['get'], url_path='(?P<user_id>[^/.]+)')
    def get_courses_by_user(self, request, user_id=None):

        if not user_id:
            return Response(
                {"error": "User ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        purchases = UserCourseData.objects.filter(user_id=user_id).select_related('course')

        course_data = [
            {
                "course_id": purchase.course.id,
                "progress": purchase.progress,
            }
            for purchase in purchases
        ]

        return Response(
            {
                "user_id": user_id,
                "courses": course_data,
            },
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['put'], url_path='(?P<user_id>[^/.]+)/(?P<course_id>[^/.]+)/update-progress')
    def update_course_progress(self, request, user_id=None, course_id=None):
    
        try:
            if not user_id or not course_id:
                return Response(
                    {"error": "Both user_id and course_id are required in the URL."},
                    status=status.HTTP_400_BAD_REQUEST
                )


            user_course_data = UserCourseData.objects.filter(user_id=user_id, course_id=course_id).first()

            if not user_course_data:
                return Response(
                    {"error": "No matching record found for the provided user_id and course_id."},
                    status=status.HTTP_404_NOT_FOUND
                )

         
            serializer = self.get_serializer(user_course_data, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'], url_path='purchase-course')
    def purchase_course(self, request):
       
        user_id = request.data.get('user_id')
        course_id = request.data.get('course_id')

        if not user_id or not course_id:
            return Response(
                {"error": "Both user_id and course_id are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
    
            data = {
                'user': user_id,
                'course': course_id,
                'progress': 0 
            }

            serializer = UserCourseDataSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except IntegrityError:
            return Response(
                {"error": "This course has already been purchased by the user."},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserExamDataViewSet(viewsets.ModelViewSet):
    
    permission_classes = [AllowAny]
    queryset = UserExamData.objects.all()
    serializer_class = UserExamDataSerializer
    @action(detail=False, methods=['get'], url_path='filter')
    def filter_exam_data(self, request):
    
        user_id = request.query_params.get('user', None)
        exam_id = request.query_params.get('exam_id', None)

        queryset = UserExamData.objects.all()

        if user_id:
            queryset = queryset.filter(user=user_id)
        
        if exam_id:
            queryset = queryset.filter(exam_id=exam_id)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    


class ExamQuestionViewSet(viewsets.ModelViewSet):
    queryset = ExamQuestion.objects.all()
    serializer_class = ExamQuestionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        exam_id = self.request.query_params.get("exam") 
        if exam_id:
            return self.queryset.filter(exam_id=exam_id)  
        return self.queryset

    @action(detail=False, methods=["delete"], url_path="(?P<exam_id>[0-9a-fA-F-]+)/(?P<question_id>[0-9a-fA-F-]+)")
    def delete_exam_question(self, request, exam_id=None, question_id=None):
        try:
            exam_question = ExamQuestion.objects.get(exam_id=exam_id, question_id=question_id)
            exam_question.delete()
            return Response({"message": "Question removed from exam"}, status=status.HTTP_204_NO_CONTENT)
        except ExamQuestion.DoesNotExist:
            return Response({"error": "Question not found in exam"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='bulk-upload')
    def bulk_upload(self, request):
        """
        Bulk upload ExamQuestion entries while ensuring duplicates are ignored.
        """
        serializer = BulkExamQuestionSerializer(data=request.data, many=True)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            inserted_count = 0
            duplicates_ignored = 0

            for item in validated_data:
                exam = item["exam"]
                question = item["question"]

                try:
                    ExamQuestion.objects.create(exam=exam, question=question)
                    inserted_count += 1
                except IntegrityError:
                    duplicates_ignored += 1

            return Response({
                "message": "Bulk upload processed",
                "inserted_count": inserted_count,
                "duplicates_ignored": duplicates_ignored
            }, status=status.HTTP_201_CREATED if inserted_count > 0 else status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


class ChapterQuestionViewSet(viewsets.ModelViewSet):
    queryset = ChapterQuestion.objects.all()
    serializer_class = ChapterQuestionSerializer
    permission_classes = [AllowAny]

class CourseChapterFetcher:
    def __init__(self, course_id):
        self.course_id = course_id
    
    def get_chapter_ids(self):   
        subjects = Subject.objects.filter(course_id=self.course_id)
        chapter_ids = Chapter.objects.filter(subject__in=subjects).values_list('id', flat=True)
        
        return list(chapter_ids)

class CourseChaptersView(View):
    def get(self, request, course_id):
        fetcher = CourseChapterFetcher(course_id)
        chapter_ids = fetcher.get_chapter_ids()
        return JsonResponse({'chapter_ids': chapter_ids})


class SubjectChapterFetcher:
    def __init__(self, subject_id):
        self.subject_id = subject_id
    
    def get_chapter_ids(self):   
        return list(Chapter.objects.filter(subject_id=self.subject_id).values_list('id', flat=True))

class SubjectChaptersView(View):
    def get(self, request, subject_id):
        fetcher = SubjectChapterFetcher(subject_id)
        chapter_ids = fetcher.get_chapter_ids()
        return JsonResponse({'chapter_ids': chapter_ids})


def get_questions(request):
    if request.method == "POST":
        data = json.loads(request.body)
        chapter_ids = data.get("chapter_ids", [])
        
        if not chapter_ids:
            return JsonResponse({"questions": []})

        question_ids = ChapterQuestion.objects.filter(chapter_id__in=chapter_ids).values_list("question_id", flat=True)

        return JsonResponse({"questions": list(question_ids)})

    return JsonResponse({"error": "Invalid request"}, status=400)



User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    try:
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        
        user_id = request.data.get("user_id")
        course_id = request.data.get("course_id")
        amount = request.data.get("amount")  # Amount in paise
        
        if not user_id or not course_id or not amount:
            return Response({"error": "Missing required fields"}, status=400)

        # Create order with Razorpay
        order_data = {
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1,  # Auto-capture payment
        }
        order = client.order.create(data=order_data)

        # Store order details in database
        print([field.name for field in User._meta.get_fields()])

        user = User.objects.get(userid=user_id)
        new_order = Order.objects.create(
            user=user,
            course_id=course_id,
            razorpay_order_id=order["id"],
            amount=amount,
            status="PENDING"
        )

        return Response(order)

    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_payment(request):
    try:
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        
        order_id = request.data.get("razorpay_order_id")
        payment_id = request.data.get("razorpay_payment_id")
        signature = request.data.get("razorpay_signature")

        order = Order.objects.filter(razorpay_order_id=order_id).first()
        if not order:
            return Response({"error": "Order not found"}, status=404)

        params_dict = {
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": signature
        }

        # Verify payment signature
        if client.utility.verify_payment_signature(params_dict):
            order.razorpay_payment_id = payment_id
            order.razorpay_signature = signature
            order.status = "SUCCESS"
            order.save()
            return Response({"status": "Payment verified!"})
        else:
            order.status = "FAILED"
            order.save()
            return Response({"error": "Invalid payment signature"}, status=400)

    except Exception as e:
        return Response({"error": str(e)}, status=400)

class FeaturedVideoView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = LectureVideo.objects.filter(is_featured=True)
    serializer_class = LectureVideoSerializer

class FeaturedExamView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Exam.objects.filter(is_featured=True)
    serializer_class = ExamSerializer

class FeaturedNotesView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = LectureNote.objects.filter(is_featured=True)
    serializer_class = LectureNoteSerializer

class FeaturedQuestionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes=[AllowAny]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    @action(detail=False, methods=['get'], url_path='exam-id/(?P<exam_id>[^/.]+)')
    def get_questions_by_exam_id(self, request, exam_id=None):
        questions = Question.objects.filter(exams__exam_id=exam_id)
        if questions.exists():
            serializer = self.get_serializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No questions found for this exam."}, status=status.HTTP_404_NOT_FOUND)
    
from .models import Question, Concept, TestAnalysis
from django.db.models import Prefetch
from rest_framework.response import Response
import json
from collections import defaultdict

@api_view(['POST'])
def generate_test_analysis(request, user_id, test_id):
    try:
        test_data = UserExamData.objects.filter(user_id=user_id, exam_id=test_id).first()
        if not test_data:
            return Response({"error": "Test data not found"}, status=404)
        
        if TestAnalysis.objects.filter(user_id=user_id, exam_id=test_id).exists():
            return Response({"message": "Analysis already generated"}, status=200)

        questions = Question.objects.filter(exams=test_id).prefetch_related('concepts')

        incorrect_concept_ids = defaultdict(int)  # Stores concept_id -> incorrect count
        categorized_questions = []

        for index, question in enumerate(questions):
            is_correct = str(test_data.answers.get(str(index))) == question.correct_answer
            is_answered = str(index) in (test_data.answers or {})
            is_marked_for_review = str(index) in (test_data.marked_for_review or [])

            if not is_correct:
                for concept_id in question.concepts.values_list('id', flat=True):
                    incorrect_concept_ids[concept_id] += 1  

            categorized_questions.append({
                "id": str(question.id),
                "question_text": question.question_text,
                "is_correct": is_correct,
                "is_answered": is_answered,
                "is_marked_for_review": is_marked_for_review,
                "correct_answer_text": getattr(question, f"option_{question.correct_answer.lower()}_text"),
                "correct_answer": question.correct_answer,
                "selected_answer": test_data.answers.get(str(index), "Not Answered"),
                "options": {
                    "A": question.option_a_text,
                    "B": question.option_b_text,
                    "C": question.option_c_text,
                    "D": question.option_d_text,
                },
                "solution_text": question.solution_text,
                "solution_text_hindi": question.solution_text_hindi,
            })

        concept_names = Concept.objects.filter(id__in=incorrect_concept_ids.keys()).values("id", "name")
        incorrect_concept_frequency = {c["name"]: incorrect_concept_ids[c["id"]] for c in concept_names}

        analysis = TestAnalysis.objects.create(
            user_id=user_id,
            exam_id=test_id,
            total_questions=questions.count(),
            answered=len(test_data.answers or {}),
            correct_answers=sum(1 for q in categorized_questions if q["is_correct"]),
            marked_for_review=len(test_data.marked_for_review or []),
            time_remaining=test_data.time_remaining,
            incorrect_concept_frequency=incorrect_concept_frequency,  
            questions_analysis=categorized_questions,
        )
        
        user_weak_concept, created = UserWeakConcept.objects.get_or_create(user_id=user_id, defaults={"concepts": {}})

        for concept_id, weight in incorrect_concept_ids.items():
            concept_key = str(concept_id)
            user_weak_concept.concepts[concept_key] = user_weak_concept.concepts.get(concept_key, 0) + weight

        user_weak_concept.save()

        return Response({
            "message": "Analysis generated successfully",
            "incorrect_concept_frequency": incorrect_concept_frequency,
            "total_questions": questions.count(),
            "answered": len(test_data.answers or {}),
            "correct_answers": sum(1 for q in categorized_questions if q["is_correct"]),
            "questions_analysis": categorized_questions
        }, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def get_test_analysis(request, user_id, test_id):
    try:
        analysis = TestAnalysis.objects.filter(user_id=user_id, exam_id=test_id).first()
        if not analysis:
            return Response({"error": "Analysis not found"}, status=404)

        return Response({
            "total_questions": analysis.total_questions,
            "answered": analysis.answered,
            "correct_answers": analysis.correct_answers,
            "marked_for_review": analysis.marked_for_review,
            "time_remaining": analysis.time_remaining,
            "weak_concepts": analysis.incorrect_concept_frequency   ,
            "questions": analysis.questions_analysis,
        })
        
    except Exception as e:
        return Response({"error": str(e)}, status=500)


class UserWeakConceptViewSet(viewsets.ModelViewSet):
    queryset = UserWeakConcept.objects.all()
    serializer_class = UserWeakConceptSerializer
    permission_classes = [AllowAny]
    

import random
from rest_framework.response import Response
from rest_framework import status

class CuratedQuestionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        chapter_ids = request.query_params.getlist("chapter_ids")
        difficulty = request.query_params.get("difficulty")
        total_questions = request.query_params.get("total_questions")

        if not chapter_ids or difficulty is None:
            return Response(
                {"error": "chapter_ids and difficulty are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        total_questions = int(total_questions) if total_questions else None

        
        user_weak_concepts = UserWeakConcept.objects.filter(user=user).first()
        weak_concepts = user_weak_concepts.concepts if user_weak_concepts else {}

        
        chapter_concept_map = {
            str(chapter.id): set(chapter.concepts.values_list("id", flat=True))
            for chapter in Chapter.objects.filter(id__in=chapter_ids)
        }

        
        relevant_weak_concepts = {
            int(concept_id): weight
            for concept_id, weight in weak_concepts.items()
            if any(int(concept_id) in concepts for concepts in chapter_concept_map.values())
        }

        
        chapter_question_map = {
            chapter_id: list(
                Question.objects.filter(
                    id__in=ChapterQuestion.objects.filter(chapter_id=chapter_id)
                    .values_list("question_id", flat=True),
                    level=difficulty,
                )
            )
            for chapter_id in chapter_ids
        }

        
        if total_questions is None:
            selected_questions = [
                q for qs in chapter_question_map.values() for q in qs
            ]
        else:
            weak_concept_question_count = int(0.4 * total_questions) 
            remaining_question_count = total_questions - weak_concept_question_count

            weak_concept_questions = []
            used_weak_concepts = set() 

            for chapter_id, concepts in chapter_concept_map.items():
                for concept_id in concepts:
                    if concept_id in relevant_weak_concepts:
                        concept_questions = [
                            q
                            for q in chapter_question_map[chapter_id]
                            if concept_id in q.concepts.values_list("id", flat=True)
                        ]
                        weak_concept_questions.extend(concept_questions)
                        if concept_questions:
                            used_weak_concepts.add(concept_id) 

            random.shuffle(weak_concept_questions)
            selected_questions = weak_concept_questions[:weak_concept_question_count]

            
            remaining_questions = [
                q
                for qs in chapter_question_map.values()
                for q in qs
                if q not in selected_questions
            ]

            random.shuffle(remaining_questions)
            selected_questions.extend(remaining_questions[:remaining_question_count])

            
            if user_weak_concepts:
                for concept_id in used_weak_concepts:
                    if user_weak_concepts.concepts.get(str(concept_id), 0) > 0:
                        user_weak_concepts.concepts[str(concept_id)] -= 1

                user_weak_concepts.save()

        serializer = QuestionSerializer(selected_questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
