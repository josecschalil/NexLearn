from rest_framework import viewsets,status
from .models import (
    Course, Subject, Chapter, LectureVideo,
     Exam, Question,UserCourseData,UserExamData,
     ExamQuestion,ChapterQuestion,LectureNote )
from .serializers import (
    CourseSerializer, SubjectSerializer,ChapterSerializer,
    LectureVideoSerializer, ExamSerializer, QuestionSerializer,
    UserCourseDataSerializer,UserExamDataSerializer,ExamQuestionSerializer,ChapterQuestionSerializer,BulkQuestionUploadSerializer,
    LectureNoteSerializer )
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.views import APIView
from django.db.models import Count
import math
import random
from rest_framework.views import APIView
from django.db.models import Count
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
class BulkQuestionUploadView(CreateAPIView):
    serializer_class = BulkQuestionUploadSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        """Populate dropdown choices with available chapters"""
        context = super().get_serializer_context()
        context["chapters"] = Chapter.objects.values("id", "name")  # Pass chapters list

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
        total_questions = int(request.query_params.get('total_questions', 10))

        if not chapter_ids or difficulty is None:
            return Response(
                {"error": "chapter_ids and difficulty are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )


        chapter_question_ids = ChapterQuestion.objects.filter(
            chapter_id__in=chapter_ids
        ).values_list('question_id', flat=True)

        filtered_questions = Question.objects.filter(
            id__in=chapter_question_ids,
            level=difficulty
        )

        num_chapters = len(chapter_ids)
        questions_per_chapter = max(1, total_questions // num_chapters)

        selected_questions = []
        for chapter_id in chapter_ids:
         
            chapter_questions = filtered_questions.filter(
                id__in=ChapterQuestion.objects.filter(chapter_id=chapter_id).values_list('question_id', flat=True)
            )

            
            random_chapter_questions = list(chapter_questions.order_by('?')[:questions_per_chapter])
            selected_questions.extend(random_chapter_questions)

    
        selected_questions = selected_questions[:total_questions]

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
@permission_classes([AllowAny])
def bulk_create_chapters(request):
    if request.method == 'POST':
        serializer = ChapterSerializer(data=request.data, many=True)
        if serializer.is_valid():
          
            chapters = serializer.save()
            return Response(ChapterSerializer(chapters, many=True).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_all_chapters(request):
    chapters = Chapter.objects.all()
    serializer = ChapterSerializer(chapters, many=True)
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
    filterset_fields = ['subject']  
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
    filterset_fields = ['course_id','subject_id','chapter_id','user_id','is_featured']  
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
    @action(detail=False, methods=['get'], url_path='chapter/(?P<chapter_id>[^/.]+)')
    def get_questions_by_chapter(self, request, chapter_id=None):
        questions = Question.objects.filter(chapters__chapter_id=chapter_id)
        if questions.exists():
            serializer = self.get_serializer(questions, many=True)
            return Response(serializer.data, status=200)
        return Response({"detail": "No questions found for this chapter."}, status=404)

    @action(detail=False, methods=['get'], url_path='exam-id/(?P<exam_id>[^/.]+)')
    def get_questions_by_exam_id(self, request, exam_id=None): #fixed this
        questions = Question.objects.filter(exams__exam_id=exam_id)
        if questions.exists():
            serializer = self.get_serializer(questions, many=True)
            return Response(serializer.data, status=200)
        return Response({"detail": "No questions found for this exam."}, status=404)
   
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
        question = self.get_object()  # Retrieve the question instance based on the pk
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
    
    @action(detail=False, methods=['put'], url_path='update')
    def update_exam_data(self, request):
    
        user_id = request.query_params.get('user', None)
        exam_id = request.query_params.get('exam_id', None)

        if not user_id or not exam_id:
            return Response(
                {"detail": "Both 'user' and 'exam_id' must be provided as query parameters."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            instance = UserExamData.objects.get(user=user_id, exam_id=exam_id)
        except UserExamData.DoesNotExist:
            return Response(
                {"detail": "UserExamData with the given user and exam_id does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

        update_data = request.data.copy()

        
        update_data.pop('user', None)
        update_data.pop('exam_id', None)


        serializer = self.get_serializer(instance, data=update_data, partial=True)

        if serializer.is_valid():
         
            serializer.save()
            return Response(serializer.data)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    from .serializers import ExamQuestionSerializer



#new additions

class ExamQuestionViewSet(viewsets.ModelViewSet):
    queryset = ExamQuestion.objects.all()
    serializer_class = ExamQuestionSerializer
    permission_classes = [AllowAny]

class ChapterQuestionViewSet(viewsets.ModelViewSet):
    queryset = ChapterQuestion.objects.all()
    serializer_class = ChapterQuestionSerializer
    permission_classes = [AllowAny]



