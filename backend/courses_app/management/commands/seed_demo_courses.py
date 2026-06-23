from decimal import Decimal

from django.core.management.base import BaseCommand

from courses_app.models import Course


DEMO_COURSES = [
    {
        "title": "JEE Rank Sprint 2027",
        "exam_type": "JEE",
        "course_type": "Combined",
        "description": "A structured PCM preparation track with weekly testing, layered revision, and guided problem solving for serious JEE aspirants.",
        "price": Decimal("49999.00"),
        "current_price": Decimal("28999.00"),
        "portions": "Full Physics, Chemistry, and Mathematics coverage with concept-first lectures, PYQ drilling, and mock-test review sessions.",
        "watch_hours": "420",
        "classes": "260",
        "chapters": "96",
        "tests": "52",
        "studymaterials": "140",
        "validity": 540,
        "content_left_1": "Full JEE Main and Advanced aligned roadmap",
        "content_left_2": "Weekly live doubt-clearing and revision rooms",
        "content_left_3": "Mixed-level problem practice from foundation to advanced",
        "content_left_4": "Performance-based test review after each milestone",
        "content_right_1": "Recorded concept videos with crisp chapter sequencing",
        "content_right_2": "Assignment discussion for every major topic",
        "content_right_3": "Chapter notes, formula sheets, and revision capsules",
        "content_right_4": "Full-length mocks with analytics-driven feedback",
    },
    {
        "title": "NEET Precision Batch 2027",
        "exam_type": "NEET",
        "course_type": "Combined",
        "description": "An intensive PCB program for NEET students focused on concept clarity, retention cycles, and high-frequency testing.",
        "price": Decimal("45999.00"),
        "current_price": Decimal("26999.00"),
        "portions": "Biology, Physics, and Chemistry taught with board-to-entrance alignment, recall systems, and targeted practice.",
        "watch_hours": "390",
        "classes": "244",
        "chapters": "102",
        "tests": "60",
        "studymaterials": "155",
        "validity": 540,
        "content_left_1": "Complete NEET syllabus coverage with smart pacing",
        "content_left_2": "NCERT-anchored biology mastery blocks",
        "content_left_3": "Topic tests, cumulative tests, and grand tests",
        "content_left_4": "Exam temperament and revision strategy sessions",
        "content_right_1": "Short, retention-friendly lesson structure",
        "content_right_2": "High-yield question banks with explanations",
        "content_right_3": "Revision planners and printable study sheets",
        "content_right_4": "Detailed analysis after every mock and sectional",
    },
    {
        "title": "JEE Class 11 Foundation Arc",
        "exam_type": "JEE",
        "course_type": "Class 11th",
        "description": "A first-year foundation course that builds strong conceptual habits across PCM while keeping pace manageable and consistent.",
        "price": Decimal("32999.00"),
        "current_price": Decimal("18999.00"),
        "portions": "Class 11 Physics, Chemistry, and Mathematics with foundational drilling, homework review, and chapter mastery checkpoints.",
        "watch_hours": "240",
        "classes": "148",
        "chapters": "48",
        "tests": "26",
        "studymaterials": "78",
        "validity": 365,
        "content_left_1": "Covers all major Class 11 PCM units systematically",
        "content_left_2": "Designed for long-term JEE preparation momentum",
        "content_left_3": "Frequent quizzes to strengthen retention early",
        "content_left_4": "Mentor-guided planning for consistency",
        "content_right_1": "Clear foundational lectures with paced progression",
        "content_right_2": "Homework walkthroughs and concept recap videos",
        "content_right_3": "Chapter sheets and formula revision packs",
        "content_right_4": "Bridge content for Olympiad-style thinking",
    },
    {
        "title": "NEET Class 12 Final Lap",
        "exam_type": "NEET",
        "course_type": "Class 12th",
        "description": "A polished Class 12 batch for NEET students balancing board preparation, entrance depth, and rapid revision cycles.",
        "price": Decimal("34999.00"),
        "current_price": Decimal("20499.00"),
        "portions": "Complete Class 12 PCB syllabus with MCQ practice, NCERT emphasis, and revision-led finishing strategy.",
        "watch_hours": "255",
        "classes": "156",
        "chapters": "54",
        "tests": "32",
        "studymaterials": "84",
        "validity": 365,
        "content_left_1": "Class 12 chapters sequenced for boards plus NEET",
        "content_left_2": "Regular cumulative revision to prevent backlog",
        "content_left_3": "Biology recall modules and chemistry accuracy drills",
        "content_left_4": "Endgame practice for exam readiness",
        "content_right_1": "Tight lesson recordings with focused takeaways",
        "content_right_2": "Printable notes and quick revision capsules",
        "content_right_3": "Topic tests with solution discussions",
        "content_right_4": "Mock exams with error-log guidance",
    },
    {
        "title": "JEE Chapterwise Problem Lab",
        "exam_type": "JEE",
        "course_type": "Chapter-wise",
        "description": "A targeted practice product for students who want chapterwise mastery, selective improvement, and faster doubt resolution.",
        "price": Decimal("14999.00"),
        "current_price": Decimal("8999.00"),
        "portions": "Focused chapterwise practice across PCM with problem sets, concept refreshers, and solution review sessions.",
        "watch_hours": "110",
        "classes": "72",
        "chapters": "68",
        "tests": "40",
        "studymaterials": "62",
        "validity": 240,
        "content_left_1": "Ideal for backlog clearance and precision practice",
        "content_left_2": "Covers high-impact JEE chapters in compact format",
        "content_left_3": "Topic tests with escalating difficulty",
        "content_left_4": "Focused performance tracking on weak zones",
        "content_right_1": "Short concept refresh videos for each chapter",
        "content_right_2": "Worked-out solutions for representative problems",
        "content_right_3": "Downloadable worksheets and formula briefs",
        "content_right_4": "Smart practice flow for revision season",
    },
    {
        "title": "NEET Chapterwise Revision Vault",
        "exam_type": "NEET",
        "course_type": "Chapter-wise",
        "description": "A rapid-access revision catalog for PCB chapters with compact teaching, MCQ drills, and end-of-topic test loops.",
        "price": Decimal("13999.00"),
        "current_price": Decimal("8499.00"),
        "portions": "Chapterwise NEET revision across Biology, Physics, and Chemistry for students needing a sharp recovery and scoring push.",
        "watch_hours": "102",
        "classes": "66",
        "chapters": "70",
        "tests": "44",
        "studymaterials": "68",
        "validity": 240,
        "content_left_1": "Fast chapterwise recaps before tests and mocks",
        "content_left_2": "Strong NCERT alignment for Biology",
        "content_left_3": "Practice sets designed for speed and accuracy",
        "content_left_4": "Great for revision between full-length mock cycles",
        "content_right_1": "Compact lecture library with clear segmentation",
        "content_right_2": "PDF notes and question packs per chapter",
        "content_right_3": "Score-boosting mixed MCQ revision sheets",
        "content_right_4": "Focused error-reduction and memory support",
    },
]


class Command(BaseCommand):
    help = "Seed demo courses for the frontend catalog and backend /api/courses endpoint."

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0

        for course_data in DEMO_COURSES:
            course, created = Course.objects.update_or_create(
                title=course_data["title"],
                defaults=course_data,
            )
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"Created {course.title}"))
            else:
                updated_count += 1
                self.stdout.write(self.style.WARNING(f"Updated {course.title}"))

        self.stdout.write(
            self.style.SUCCESS(
                f"Demo course seed complete. Created: {created_count}, Updated: {updated_count}"
            )
        )
