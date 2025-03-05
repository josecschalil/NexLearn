from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import create_order,verify_payment
from .views import generate_test_analysis, get_test_analysis
from .views import CourseViewSet, SubjectViewSet, ConceptViewSet,UserWeakConceptViewSet,CuratedQuestionsView,FeaturedQuestionViewSet,ChapterViewSet, LectureVideoViewSet,ExamQuestionViewSet, ChapterQuestionViewSet, ExamViewSet, QuestionViewSet, CourseAddViewSet, bulk_create_chapters,UserExamDataViewSet,ChapterQuestionsView,LectureNoteViewSet,BulkQuestionUploadView,ChapterListView,CourseChaptersView,get_questions,SubjectChaptersView,FeaturedNotesView,FeaturedVideoView,FeaturedExamView

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'concepts', ConceptViewSet)
router.register(r'chapters', ChapterViewSet) #question array displayed from chapterquestions
router.register(r'lecture-videos', LectureVideoViewSet)
router.register(r'lecture-notes', LectureNoteViewSet)
router.register(r'featured-videos', FeaturedVideoView, basename='featured-videos')
router.register(r'featured-notes', FeaturedNotesView, basename='featured-notes')
router.register(r'featured-exams', FeaturedExamView, basename='featured-exams')
router.register(r'exams', ExamViewSet)  #question array displayed from examquestions, also added 3bools and related bool field's id for figuring out what exam is.
router.register(r'questions', QuestionViewSet) #made display array of chapters and exams here linked to examquestions and chapterquestions
router.register(r'userCourses', CourseAddViewSet)
router.register(r'featured-questions', FeaturedQuestionViewSet,basename='featured-questions')
router.register(r'exam-data',UserExamDataViewSet)
router.register(r'examquestions', ExamQuestionViewSet) #its for viewing manymany relation b/w examquestions
router.register(r'chapterquestions', ChapterQuestionViewSet) #its for manymany seeing b/w chapter and questions.
router.register(r"userweakconcepts", UserWeakConceptViewSet, basename="user-weak-concepts")

urlpatterns = [
    # path('chapters/', ChapterListView.as_view(), name='chapter-list'),
    path('upload-questions-chapter/', BulkQuestionUploadView.as_view(), name='upload-questions'),
    path('chapters/bulk/', bulk_create_chapters, name='bulk-create-chapters'),  
    path('chapter-questions/', ChapterQuestionsView.as_view(), name='chapter-questions'),
    path('curated-questions/', CuratedQuestionsView.as_view(), name='chapter-questions') ,#main algorithm.
    path('course/<uuid:course_id>/chapters/', CourseChaptersView.as_view(), name='course_chapters'),
    path('subject/<uuid:subject_id>/chapters/', SubjectChaptersView.as_view(), name='subject_chapters'),
    path("api/get-questions/", get_questions, name="get-questions"),
    path('create-order/', create_order, name='create-order'),
    path('verify-payment/', verify_payment, name='verify-payment'),
    



    path('generate-analysis/<uuid:user_id>/<uuid:test_id>/', generate_test_analysis, name='generate-test-analysis'),
    path('test-analysis/<uuid:user_id>/<uuid:test_id>/', get_test_analysis, name='get-test-analysis'),

]


urlpatterns += router.urls
