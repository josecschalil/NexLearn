from rest_framework import serializers
from .models import ( 
    Course, Subject, Chapter, LectureVideo,
    Exam, Question,UserCourseData,UserExamData,
    ExamQuestion,ChapterQuestion,LectureNote )

import json

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields =['id']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'



class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

class ChapterQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChapterQuestion
        fields = '__all__'

class ExamQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamQuestion
        fields ='__all__'


class ChapterListSerializer(serializers.ListSerializer):
    child = ChapterSerializer()

class LectureVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectureVideo
        fields = '__all__'

class LectureNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectureNote
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'



class UserCourseDataSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    course_details = CourseUserSerializer(source='course', read_only=True)

    class Meta:
        model = UserCourseData
        fields = '__all__'  

class UserExamDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExamData
        fields = '__all__'  



from .models import ExamQuestion

class ExamQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamQuestion
        fields = ['exam', 'question']

    def validate(self, data):
        return data

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields =  '__all__'    # Customize fields as needed

class BulkQuestionUploadSerializer(serializers.Serializer):
    chapter_id = serializers.ChoiceField(choices=[])  # Dropdown for selecting chapter
    questions_json = serializers.CharField(write_only=True)  # JSON text input

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "chapters" in self.context:
            self.fields['chapter_id'].choices = [(c["id"], c["name"]) for c in self.context["chapters"]]

    def validate_questions_json(self, value):
        """Ensure the provided JSON is valid"""
      
        try:
            data = json.loads(value)
            if not isinstance(data, list):
                raise serializers.ValidationError("Invalid format: Questions should be a list.")
            return data
        except json.JSONDecodeError:
            raise serializers.ValidationError("Invalid JSON format.")

    def create(self, validated_data):
        chapter = Chapter.objects.get(id=validated_data['chapter_id'])
        questions_data = validated_data['questions_json']
        
        created_questions = []
        for question_data in questions_data:
            question, created = Question.objects.get_or_create(**question_data)
            created_questions.append(question)

        # Link all created questions to the selected chapter
        ChapterQuestion.objects.bulk_create(
            [ChapterQuestion(chapter=chapter, question=question) for question in created_questions],
            ignore_conflicts=True  # Avoid duplicate entries
        )

        return validated_data
