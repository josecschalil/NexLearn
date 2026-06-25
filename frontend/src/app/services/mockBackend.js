const DEMO_USER = {
  id: "demo-user-1",
  user_id: "demo-user-1",
  name: "Demo Student",
  email: "demo@nexlearn.com",
  phone: "9876543210",
};

const DEMO_COURSES = [
  {
    id: "101",
    title: "JEE Ultimate Rank Booster",
    description:
      "A mechanics-first physics program for JEE aspirants with lectures, guided practice, and revision tests.",
    exam_type: "JEE",
    course_type: "Chapter-wise",
    price: 12999,
    current_price: 6899,
    validity: 365,
    watch_hours: "220 hours",
    classes: "148",
    chapters: "24",
    tests: "18",
    portions:
      "Kinematics, Newton's laws, work and energy, rotational mechanics, gravitation, oscillations, waves, optics, and full revision modules.",
    studymaterials: "36",
    content_left_1: "Build concept clarity with exam-oriented lecture sequences.",
    content_left_2: "Strengthen mechanics through solved illustrations and drills.",
    content_left_3: "Revise major formulas with short recap assets.",
    content_left_4: "Practice chapter-wise tests and cumulative assessments.",
    content_right_1: "Recorded lectures with structured progression.",
    content_right_2: "Downloadable notes and revision sheets.",
    content_right_3: "Tutor support and progress-linked practice.",
    content_right_4: "Mock tests with performance review.",
  },
  {
    id: "102",
    title: "NEET Biology Masterclass",
    description:
      "A focused biology preparation course with unit-wise coverage, diagrams, revision plans, and NEET-style practice.",
    exam_type: "NEET",
    course_type: "Class 12th",
    price: 11999,
    current_price: 6299,
    validity: 300,
    watch_hours: "180 hours",
    classes: "124",
    chapters: "22",
    tests: "16",
    portions:
      "Cell biology, genetics, ecology, human physiology, plant physiology, biotechnology, and rapid revision units.",
    studymaterials: "28",
    content_left_1: "Memorable concept explanations for NCERT-heavy topics.",
    content_left_2: "Diagram-focused sessions for quicker recall.",
    content_left_3: "Topic revision plans before major mocks.",
    content_left_4: "Frequent practice tests with chapter grouping.",
    content_right_1: "Recorded lessons and compact revision notes.",
    content_right_2: "Quick quizzes for each major unit.",
    content_right_3: "Mixed biology papers for retention training.",
    content_right_4: "Tutor follow-up for doubt clarification.",
  },
  {
    id: "103",
    title: "JEE Main Chemistry Crash Course",
    description:
      "A concise chemistry track for fast concept rebuilding across physical, organic, and inorganic units.",
    exam_type: "JEE",
    course_type: "Combined",
    price: 9999,
    current_price: 4999,
    validity: 240,
    watch_hours: "135 hours",
    classes: "92",
    chapters: "18",
    tests: "14",
    portions:
      "Mole concept, thermodynamics, equilibrium, bonding, periodicity, reaction basics, organic mechanisms, and mixed revision.",
    studymaterials: "21",
    content_left_1: "Short, high-impact lectures for time-bound preparation.",
    content_left_2: "Organic mechanism linking for backlog recovery.",
    content_left_3: "Formula review blocks for physical chemistry.",
    content_left_4: "Mixed tests to improve speed and recall.",
    content_right_1: "Structured lecture flow across all chemistry branches.",
    content_right_2: "Practice sheets with solutions.",
    content_right_3: "Cumulative chemistry mock papers.",
    content_right_4: "Detailed discussion-ready revision support.",
  },
];

const DEMO_SUBJECTS = [
  { id: "sub-101-phy", course_id: "101", name: "Physics", chapters: 8 },
  { id: "sub-101-math", course_id: "101", name: "Mathematics", chapters: 7 },
  { id: "sub-101-chem", course_id: "101", name: "Chemistry", chapters: 9 },
  { id: "sub-102-bio", course_id: "102", name: "Biology", chapters: 12 },
  { id: "sub-102-phy", course_id: "102", name: "Physics", chapters: 5 },
  { id: "sub-102-chem", course_id: "102", name: "Chemistry", chapters: 5 },
  { id: "sub-103-chem", course_id: "103", name: "Chemistry", chapters: 10 },
];

const DEMO_CHAPTERS = [
  { id: "chap-kin", subject_id: "sub-101-phy", name: "Kinematics", contents: 14, icon: "K" },
  { id: "chap-newton", subject_id: "sub-101-phy", name: "Newton's Laws", contents: 12, icon: "N" },
  { id: "chap-rot", subject_id: "sub-101-phy", name: "Rotational Mechanics", contents: 16, icon: "R" },
  { id: "chap-bio-cell", subject_id: "sub-102-bio", name: "Cell Biology", contents: 10, icon: "C" },
  { id: "chap-bio-phys", subject_id: "sub-102-bio", name: "Human Physiology", contents: 15, icon: "H" },
  { id: "chap-chem-mole", subject_id: "sub-103-chem", name: "Mole Concept", contents: 9, icon: "M" },
  { id: "chap-chem-org", subject_id: "sub-103-chem", name: "Organic Basics", contents: 11, icon: "O" },
];

const DEMO_VIDEOS = [
  {
    id: "vid-1",
    chapter_id: "chap-kin",
    video_title: "Introduction to Kinematics",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000",
    duration: "18:20",
    subject: "Physics",
    language: "Hindi",
    video_path: "/learn/video/vid-1",
  },
  {
    id: "vid-2",
    chapter_id: "chap-newton",
    video_title: "Newton's Laws Core Concepts",
    thumbnail: "https://images.unsplash.com/photo-1635070041407-0d5f482b6e8f?q=80&w=1000",
    duration: "21:05",
    subject: "Physics",
    language: "Hindi",
    video_path: "/learn/video/vid-2",
  },
  {
    id: "vid-3",
    chapter_id: "chap-rot",
    video_title: "Rotational Motion Essentials",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000",
    duration: "24:10",
    subject: "Physics",
    language: "Hindi",
    video_path: "/learn/video/vid-3",
  },
  {
    id: "vid-4",
    chapter_id: "chap-bio-cell",
    video_title: "Cell Structure and Function",
    thumbnail: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1000",
    duration: "17:45",
    subject: "Biology",
    language: "English",
    video_path: "/learn/video/vid-4",
  },
  {
    id: "vid-5",
    chapter_id: "chap-chem-mole",
    video_title: "Mole Concept Crash Revision",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000",
    duration: "19:35",
    subject: "Chemistry",
    language: "Hindi",
    video_path: "/learn/video/vid-5",
  },
];

const DEMO_NOTES = [
  {
    id: "note-1",
    pdf_title: "Mechanics Revision Notes",
    pdf_type: "PDF",
    pdf_file: "/sample-notes/mechanics.pdf",
  },
  {
    id: "note-2",
    pdf_title: "NEET Biology Quick Sheets",
    pdf_type: "PDF",
    pdf_file: "/sample-notes/biology.pdf",
  },
  {
    id: "note-3",
    pdf_title: "Chemistry Formula Pack",
    pdf_type: "PDF",
    pdf_file: "/sample-notes/chemistry.pdf",
  },
];

const DEMO_EXAMS = [
  {
    exam_id: "201",
    exam_title: "Mechanics Grand Test",
    course_id: "101",
    time: 7200,
    difficulty: 3,
    subject: "Physics",
  },
  {
    exam_id: "202",
    exam_title: "Human Physiology Unit Test",
    course_id: "102",
    time: 5400,
    difficulty: 2,
    subject: "Biology",
  },
  {
    exam_id: "203",
    exam_title: "Chemistry Mixed Revision Test",
    course_id: "103",
    time: 4800,
    difficulty: 2,
    subject: "Chemistry",
  },
];

const DEMO_QUESTIONS = {
  "201": [
    {
      id: "q-201-1",
      question: "A particle moves in a circle of radius r with speed v. Its acceleration is:",
      options: ["v/r", "v2/r", "r/v", "rv"],
      answer: "v2/r",
      concept: "concept-physics-1",
    },
    {
      id: "q-201-2",
      question: "The work-energy theorem relates net work to change in:",
      options: ["momentum", "kinetic energy", "potential energy", "impulse"],
      answer: "kinetic energy",
      concept: "concept-physics-2",
    },
  ],
  "202": [
    {
      id: "q-202-1",
      question: "The functional unit of kidney is:",
      options: ["Neuron", "Nephron", "Alveolus", "Sarcomere"],
      answer: "Nephron",
      concept: "concept-bio-1",
    },
  ],
  "203": [
    {
      id: "q-203-1",
      question: "The SI unit of amount of substance is:",
      options: ["gram", "mole", "liter", "atom"],
      answer: "mole",
      concept: "concept-chem-1",
    },
  ],
};

const DEMO_CONCEPTS = {
  "concept-physics-1": { id: "concept-physics-1", name: "Circular Motion", description: "Centripetal acceleration and motion in a circle." },
  "concept-physics-2": { id: "concept-physics-2", name: "Work and Energy", description: "Net work equals the change in kinetic energy." },
  "concept-bio-1": { id: "concept-bio-1", name: "Excretory System", description: "Important organs and functional units in excretion." },
  "concept-chem-1": { id: "concept-chem-1", name: "Mole Concept", description: "Amount of substance and basic stoichiometric units." },
};

const DEMO_ANALYSIS = {
  accuracy: 76,
  score: 68,
  total_questions: 20,
  correct: 14,
  incorrect: 4,
  unattempted: 2,
};

const DEMO_STORAGE_KEYS = {
  userCourses: "demo_user_courses",
  examData: "demo_exam_data",
  registeredUser: "demo_registered_user",
};

const parseUrl = (input) => {
  const normalized = String(input || "/")
    .replace(/^undefined/, "")
    .replace(/^null/, "")
    .replace(/^api\//, "/api/")
    .replace(/^auth\//, "/auth/");
  return new URL(normalized, "https://mock.nexlearn.local");
};

const parseBody = (data) => {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return data;
};

const getStoredUserCourses = () => {
  if (typeof window === "undefined") {
    return ["101"];
  }

  const raw = localStorage.getItem(DEMO_STORAGE_KEYS.userCourses);
  if (!raw) {
    localStorage.setItem(DEMO_STORAGE_KEYS.userCourses, JSON.stringify(["101"]));
    return ["101"];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return ["101"];
  }
};

const saveStoredUserCourses = (courseIds) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_STORAGE_KEYS.userCourses, JSON.stringify(courseIds));
  }
};

const getStoredExamData = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = localStorage.getItem(DEMO_STORAGE_KEYS.examData);
  if (!raw) {
    localStorage.setItem(DEMO_STORAGE_KEYS.examData, JSON.stringify({}));
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const saveStoredExamData = (value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_STORAGE_KEYS.examData, JSON.stringify(value));
  }
};

const getRegisteredUser = () => {
  if (typeof window === "undefined") {
    return DEMO_USER;
  }

  const raw = localStorage.getItem(DEMO_STORAGE_KEYS.registeredUser);
  if (!raw) {
    return DEMO_USER;
  }

  try {
    return { ...DEMO_USER, ...JSON.parse(raw) };
  } catch {
    return DEMO_USER;
  }
};

export const shouldUseMockFallback = (error) => {
  if (!error) return false;
  if (!error.response) return true;
  return error.response.status >= 500;
};

export const isDemoToken = (token) =>
  typeof token === "string" && token.startsWith("demo-");

export const initializeDemoSession = (overrides = {}) => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = { ...getRegisteredUser(), ...overrides };
  const access = `demo-access-${user.id}`;
  const refresh = `demo-refresh-${user.id}`;

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  localStorage.setItem("user_id", user.id);
  localStorage.setItem("portal_auth", "true");

  return { access, refresh, user };
};

const makeResponse = (config, data, status = 200) => ({
  config,
  data,
  status,
  statusText: "OK",
  headers: {},
});

const findCourse = (courseId) =>
  DEMO_COURSES.find((course) => String(course.id) === String(courseId));

const findSubject = (subjectId) =>
  DEMO_SUBJECTS.find((subject) => String(subject.id) === String(subjectId));

const findChapter = (chapterId) =>
  DEMO_CHAPTERS.find((chapter) => String(chapter.id) === String(chapterId));

export const getMockResponse = (config) => {
  if (!config?.url) return null;

  const method = String(config.method || "get").toLowerCase();
  const { pathname, searchParams } = parseUrl(config.url);
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const body = parseBody(config.data);

  if (method === "post" && cleanPath.endsWith("/auth/token")) {
    const session = initializeDemoSession({ email: body.email || DEMO_USER.email });
    return makeResponse(config, {
      access: session.access,
      refresh: session.refresh,
    });
  }

  if (method === "post" && cleanPath.endsWith("/auth/token/refresh")) {
    const userId =
      (typeof window !== "undefined" && localStorage.getItem("user_id")) ||
      DEMO_USER.id;

    return makeResponse(config, {
      access: `demo-access-${userId}`,
    });
  }

  if (method === "post" && cleanPath.endsWith("/signup")) {
    const registeredUser = {
      id: DEMO_USER.id,
      user_id: DEMO_USER.id,
      name: body.name || DEMO_USER.name,
      email: body.email || DEMO_USER.email,
      phone: DEMO_USER.phone,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(
        DEMO_STORAGE_KEYS.registeredUser,
        JSON.stringify(registeredUser)
      );
    }

    return makeResponse(config, registeredUser, 201);
  }

  if (method === "get" && cleanPath === "/api/user") {
    return makeResponse(config, getRegisteredUser());
  }

  if (method === "get" && cleanPath === "/api/courses") {
    return makeResponse(config, DEMO_COURSES);
  }

  if (method === "get" && /^\/api\/courses\/[^/]+$/.test(cleanPath)) {
    const courseId = cleanPath.split("/").pop();
    return makeResponse(config, findCourse(courseId) || DEMO_COURSES[0]);
  }

  if (method === "get" && cleanPath.startsWith("/api/userCourses/")) {
    const courses = getStoredUserCourses().map((courseId) => ({
      course_id: String(courseId),
    }));

    return makeResponse(config, {
      user: DEMO_USER.id,
      courses,
    });
  }

  if (method === "post" && cleanPath === "/api/userCourses") {
    const existing = getStoredUserCourses();
    const nextId = String(body.course);
    const merged = Array.from(new Set([...existing, nextId]));
    saveStoredUserCourses(merged);
    return makeResponse(config, { success: true, courses: merged }, 201);
  }

  if (method === "post" && cleanPath === "/api/create-order") {
    return makeResponse(config, { id: `demo_order_${Date.now()}` }, 201);
  }

  if (method === "post" && cleanPath === "/api/verify-payment") {
    return makeResponse(config, { verified: true });
  }

  if (method === "get" && cleanPath === "/api/subjects") {
    const courseId = searchParams.get("course_id");
    const filtered = courseId
      ? DEMO_SUBJECTS.filter((subject) => String(subject.course_id) === String(courseId))
      : DEMO_SUBJECTS;
    return makeResponse(config, filtered);
  }

  if (method === "get" && /^\/api\/subjects\/[^/]+$/.test(cleanPath)) {
    const subjectId = cleanPath.split("/").pop();
    return makeResponse(config, findSubject(subjectId) || DEMO_SUBJECTS[0]);
  }

  if (method === "get" && cleanPath === "/api/chapters") {
    const subjectId = searchParams.get("subject_id");
    const filtered = subjectId
      ? DEMO_CHAPTERS.filter((chapter) => String(chapter.subject_id) === String(subjectId))
      : DEMO_CHAPTERS;
    return makeResponse(config, filtered);
  }

  if (method === "get" && /^\/api\/chapters\/[^/]+$/.test(cleanPath)) {
    const chapterId = cleanPath.split("/").pop();
    return makeResponse(config, findChapter(chapterId) || DEMO_CHAPTERS[0]);
  }

  if (method === "get" && cleanPath === "/api/lecture-videos") {
    const chapterId = searchParams.get("chapter_id");
    const featuredOnly = searchParams.get("is_featured");
    let videos = DEMO_VIDEOS;
    if (chapterId) {
      videos = videos.filter((video) => String(video.chapter_id) === String(chapterId));
    }
    if (featuredOnly === "true") {
      videos = videos.slice(0, 3);
    }
    return makeResponse(config, videos);
  }

  if (method === "get" && /^\/api\/lecture-videos\/[^/]+$/.test(cleanPath)) {
    const videoId = cleanPath.split("/").pop();
    const video = DEMO_VIDEOS.find((item) => String(item.id) === String(videoId));
    return makeResponse(config, video || DEMO_VIDEOS[0]);
  }

  if (method === "get" && cleanPath === "/api/featured-videos") {
    return makeResponse(config, DEMO_VIDEOS.slice(0, 3));
  }

  if (method === "get" && cleanPath === "/api/lecture-notes") {
    return makeResponse(config, DEMO_NOTES);
  }

  if (method === "get" && cleanPath === "/api/featured-exams") {
    return makeResponse(config, DEMO_EXAMS);
  }

  if (method === "get" && cleanPath === "/api/exams") {
    const courseId = searchParams.get("course_id");
    const filtered = courseId
      ? DEMO_EXAMS.filter((exam) => String(exam.course_id) === String(courseId))
      : DEMO_EXAMS;
    return makeResponse(config, filtered);
  }

  if (method === "get" && /^\/api\/exams\/[^/]+$/.test(cleanPath)) {
    const examId = cleanPath.split("/").pop();
    const exam =
      DEMO_EXAMS.find((item) => String(item.exam_id) === String(examId)) ||
      DEMO_EXAMS[0];
    return makeResponse(config, exam);
  }

  if (method === "get" && cleanPath.startsWith("/api/questions/exam-id/")) {
    const examId = cleanPath.split("/").pop();
    return makeResponse(config, DEMO_QUESTIONS[examId] || []);
  }

  if (method === "get" && cleanPath === "/api/exam-data/filter") {
    const examId = searchParams.get("exam_id");
    const userId = searchParams.get("user") || DEMO_USER.id;
    const key = `${userId}_${examId}`;
    const stored = getStoredExamData();
    const data =
      stored[key] || {
        id: key,
        exam_id: examId,
        user: userId,
        answers: {},
        score: DEMO_ANALYSIS.score,
        accuracy: DEMO_ANALYSIS.accuracy,
      };
    return makeResponse(config, [data]);
  }

  if (method === "post" && cleanPath === "/api/exam-data") {
    const stored = getStoredExamData();
    const examId = body.exam_id || body.exam;
    const userId = body.user || DEMO_USER.id;
    const key = `${userId}_${examId}`;
    const next = { id: key, ...body };
    stored[key] = next;
    saveStoredExamData(stored);
    return makeResponse(config, next, 201);
  }

  if (method === "get" && /^\/api\/exam-data\/[^/]+$/.test(cleanPath)) {
    const examDataId = cleanPath.split("/").pop();
    const stored = getStoredExamData();
    return makeResponse(config, stored[examDataId] || { id: examDataId, answers: {} });
  }

  if (
    (method === "patch" || method === "put") &&
    /^\/api\/exam-data\/[^/]+$/.test(cleanPath)
  ) {
    const examDataId = cleanPath.split("/").pop();
    const stored = getStoredExamData();
    const next = { ...(stored[examDataId] || { id: examDataId }), ...body };
    stored[examDataId] = next;
    saveStoredExamData(stored);
    return makeResponse(config, next);
  }

  if (method === "post" && cleanPath.startsWith("/api/generate-analysis/")) {
    return makeResponse(config, DEMO_ANALYSIS);
  }

  if (method === "get" && cleanPath.startsWith("/api/concepts/")) {
    const conceptId = cleanPath.split("/").pop();
    return makeResponse(
      config,
      DEMO_CONCEPTS[conceptId] || {
        id: conceptId,
        name: "Demo Concept",
        description: "Concept details are available in standalone frontend mode.",
      }
    );
  }

  if (method === "get" && cleanPath.startsWith("/verify-email/")) {
    return makeResponse(config, { message: "Email verified in demo mode." });
  }

  if (method === "post" && cleanPath.includes("/reset-password/")) {
    return makeResponse(config, { message: "Password reset in demo mode." });
  }

  return null;
};
