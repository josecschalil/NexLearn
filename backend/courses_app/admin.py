from django.contrib import admin
from .models import (
    Course, Subject, Chapter, LectureVideo, LectureNote,
    Exam, Question, UserCourseData, UserExamData,
    ChapterQuestion, ExamQuestion,Concept
)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'course_type', 'price', 'current_price', 'validity')
    search_fields = ('title', 'course_type', 'description')
    list_filter = ('course_type',)
    ordering = ('title',)
    
@admin.register(Concept)
class ConceptAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    search_fields = ('name', 'code')
    list_filter = ('name',)
    ordering = ('name',)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'course')
    search_fields = ('name', 'course__title')
    list_filter = ('type', 'course__title')
    ordering = ('name',)


@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject')
    search_fields = ('name', 'subject__name', 'subject__course__title')
    ordering = ('name',)


@admin.register(LectureVideo)
class LectureVideoAdmin(admin.ModelAdmin):
    list_display = ('video_title', 'chapter')
    search_fields = ('video_title', 'chapter__name', 'chapter__subject__name')


@admin.register(LectureNote)
class LectureNoteAdmin(admin.ModelAdmin):
    list_display = ('chapter',)
    search_fields = ('chapter__name', 'chapter__subject__name')


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('exam_title', 'time', 'diffculty', 'is_fullCourseExam', 'is_fullSubjectExam', 'is_fullChapterExam')
    search_fields = ('exam_title',)
    list_filter = ('diffculty', 'is_fullCourseExam', 'is_fullSubjectExam', 'is_fullChapterExam')
    ordering = ('exam_title',)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'question_text', 'level', 'correct_answer')
    search_fields = ('question_text', 'concept_involved')
    list_filter = ('level',)
    ordering = ('id',)


@admin.register(UserCourseData)
class UserCourseDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'progress')
    search_fields = ('user__username', 'course__title')
    list_filter = ('progress',)


@admin.register(UserExamData)
class UserExamDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'exam_id', 'attempt_number', 'is_submitted')
    search_fields = ('user__username', 'exam_id')
    list_filter = ('is_submitted', 'is_active')


@admin.register(ChapterQuestion)
class ChapterQuestionAdmin(admin.ModelAdmin):
    list_display = ('chapter', 'question')
    search_fields = ('chapter__name', 'question__question_text')


@admin.register(ExamQuestion)
class ExamQuestionAdmin(admin.ModelAdmin):
    list_display = ('exam', 'question')
    search_fields = ('exam__exam_title', 'question__question_text')


from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "razorpay_order_id", "razorpay_payment_id","razorpay_signature", "amount", "status", "created_at")
    search_fields = ("user__username", "course__title", "razorpay_order_id", "razorpay_payment_id")
    list_filter = ("status", "created_at")
    ordering = ("-created_at",)



