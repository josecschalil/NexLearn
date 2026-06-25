export const examCatalog = {
  "101": {
    courseTitle: "JEE Advanced 2025 Physics",
    subject: "Physics",
    sections: [
      {
        id: "module-based",
        title: "Module-based examinations",
        description: "Assessments mapped directly to each module of the course.",
        exams: [
          {
            label: "Module 1",
            name: "Kinematics Chapter Test",
            meta: "45 min / 30 questions",
          },
          {
            label: "Module 2",
            name: "Newton's Laws Unit Assessment",
            meta: "60 min / 40 questions",
          },
          {
            label: "Module 3",
            name: "Rotational Mechanics Test",
            meta: "50 min / 35 questions",
          },
        ],
      },
      {
        id: "cumulative",
        title: "Cumulative assessments",
        description: "Exams spanning multiple modules for retention and revision.",
        exams: [
          {
            label: "Modules 1-2",
            name: "Foundations Cumulative Test",
            meta: "90 min / 60 questions",
          },
          {
            label: "Modules 1-3",
            name: "Mechanics Grand Revision Test",
            meta: "120 min / 80 questions",
          },
        ],
      },
    ],
  },
  "102": {
    courseTitle: "NEET Biology Masterclass",
    subject: "Biology",
    sections: [
      {
        id: "unit-wise",
        title: "Unit-wise exams",
        description: "Topic blocks grouped under biology units and course modules.",
        exams: [
          {
            label: "Unit 1",
            name: "Cell Biology Concept Test",
            meta: "40 min / 25 questions",
          },
          {
            label: "Unit 2",
            name: "Human Physiology Assessment",
            meta: "55 min / 40 questions",
          },
        ],
      },
      {
        id: "combined-revision",
        title: "Combined revision tests",
        description: "Mixed assessments covering multiple units for NEET practice.",
        exams: [
          {
            label: "Units 1-2",
            name: "Biology Mixed Revision Exam",
            meta: "85 min / 70 questions",
          },
        ],
      },
    ],
  },
  "103": {
    courseTitle: "JEE Main Chemistry Crash Course",
    subject: "Chemistry",
    sections: [
      {
        id: "module-tests",
        title: "Module tests",
        description: "Short tests after each chemistry module for concept checks.",
        exams: [
          {
            label: "Physical",
            name: "Mole Concept and Stoichiometry Test",
            meta: "35 min / 20 questions",
          },
          {
            label: "Organic",
            name: "Reaction Basics Module Test",
            meta: "45 min / 30 questions",
          },
        ],
      },
      {
        id: "cumulative-papers",
        title: "Cumulative papers",
        description: "Wider assessments joining multiple concepts into one paper.",
        exams: [
          {
            label: "Mixed",
            name: "Crash Course Full-Length Chemistry Test",
            meta: "90 min / 75 questions",
          },
        ],
      },
    ],
  },
};
