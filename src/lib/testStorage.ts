// Utility functions for managing test data in localStorage
import demoData from "@/data/demo-tests.json";

const STORAGE_KEY = "cissa_tests_data";

export interface Question {
    id: string;
    test_id: string;
    text: string;
    type: "multiple_choice" | "true_false" | "short_answer";
    options?: string[];
    correct_answer: string | string[];
    points: number;
    explanation?: string;
    order: number;
}

export interface Test {
    id: string;
    title: string;
    description: string;
    duration: number;
    passing_score: number;
    status: "published" | "draft";
    questions_count: number;
    created_at: string;
    updated_at: string;
}

export interface TestsData {
    tests: Test[];
    questions: Record<string, Question[]>;
    statistics: {
        total_tests: number;
        published_tests: number;
        draft_tests: number;
        total_questions: number;
    };
}

/**
 * Initialize storage with demo data if not exists
 */
export const initializeStorage = (): void => {
    if (typeof window === "undefined") return;

    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
    }
};

/**
 * Get all tests data from storage
 */
export const getTestsData = (): TestsData => {
    if (typeof window === "undefined") {
        return demoData as TestsData;
    }

    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : demoData;
};

/**
 * Get all tests
 */
export const getTests = (): Test[] => {
    const data = getTestsData();
    return data.tests;
};

/**
 * Get a single test by ID
 */
export const getTestById = (testId: string): Test | undefined => {
    const data = getTestsData();
    return data.tests.find((test) => test.id === testId);
};

/**
 * Get questions for a specific test
 */
export const getQuestionsByTestId = (testId: string): Question[] => {
    const data = getTestsData();
    return data.questions[testId] || [];
};

/**
 * Calculate statistics from current data
 */
const calculateStatistics = (
    tests: Test[],
    questions: Record<string, Question[]>
): TestsData["statistics"] => {
    const totalQuestions = Object.values(questions).reduce(
        (sum, qs) => sum + qs.length,
        0
    );

    return {
        total_tests: tests.length,
        published_tests: tests.filter((t) => t.status === "published").length,
        draft_tests: tests.filter((t) => t.status === "draft").length,
        total_questions: totalQuestions,
    };
};

/**
 * Save data to storage
 */
const saveData = (data: TestsData): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Create a new test with questions
 */
export const createTest = (
    testDetails: {
        title: string;
        description: string;
        duration: number;
        passing_score: number;
        status: "published" | "draft";
    },
    questions: Omit<Question, "id" | "test_id">[]
): Test => {
    const data = getTestsData();

    // Generate new test ID
    const testId = `test-${Date.now()}`;
    const now = new Date().toISOString();

    // Create test object
    const newTest: Test = {
        id: testId,
        title: testDetails.title,
        description: testDetails.description,
        duration: testDetails.duration,
        passing_score: testDetails.passing_score,
        status: testDetails.status,
        questions_count: questions.length,
        created_at: now,
        updated_at: now,
    };

    // Create questions with proper IDs
    const newQuestions: Question[] = questions.map((q, index) => ({
        ...q,
        id: `q-${testId}-${index + 1}`,
        test_id: testId,
        order: index + 1,
    }));

    // Update data
    data.tests.push(newTest);
    data.questions[testId] = newQuestions;
    data.statistics = calculateStatistics(data.tests, data.questions);

    saveData(data);
    return newTest;
};

/**
 * Update an existing test
 */
export const updateTest = (
    testId: string,
    updates: Partial<
        Omit<Test, "id" | "created_at" | "updated_at" | "questions_count">
    >
): Test | null => {
    const data = getTestsData();
    const testIndex = data.tests.findIndex((t) => t.id === testId);

    if (testIndex === -1) return null;

    const updatedTest = {
        ...data.tests[testIndex],
        ...updates,
        updated_at: new Date().toISOString(),
    };

    data.tests[testIndex] = updatedTest;
    data.statistics = calculateStatistics(data.tests, data.questions);

    saveData(data);
    return updatedTest;
};

/**
 * Delete a test and its questions
 */
export const deleteTest = (testId: string): boolean => {
    const data = getTestsData();
    const testIndex = data.tests.findIndex((t) => t.id === testId);

    if (testIndex === -1) return false;

    // Remove test
    data.tests.splice(testIndex, 1);

    // Remove associated questions
    delete data.questions[testId];

    data.statistics = calculateStatistics(data.tests, data.questions);

    saveData(data);
    return true;
};

/**
 * Update questions for a test
 */
export const updateTestQuestions = (
    testId: string,
    questions: Omit<Question, "test_id">[]
): boolean => {
    const data = getTestsData();
    const testIndex = data.tests.findIndex((t) => t.id === testId);

    if (testIndex === -1) return false;

    // Update questions
    const updatedQuestions: Question[] = questions.map((q) => ({
        ...q,
        test_id: testId,
    }));

    data.questions[testId] = updatedQuestions;

    // Update test questions count
    data.tests[testIndex].questions_count = questions.length;
    data.tests[testIndex].updated_at = new Date().toISOString();

    data.statistics = calculateStatistics(data.tests, data.questions);

    saveData(data);
    return true;
};

/**
 * Add a single question to a test
 */
export const addQuestionToTest = (
    testId: string,
    question: Omit<Question, "id" | "test_id" | "order">
): Question | null => {
    const data = getTestsData();
    const testIndex = data.tests.findIndex((t) => t.id === testId);

    if (testIndex === -1) return null;

    const testQuestions = data.questions[testId] || [];
    const newOrder = testQuestions.length + 1;

    const newQuestion: Question = {
        ...question,
        id: `q-${testId}-${Date.now()}`,
        test_id: testId,
        order: newOrder,
    };

    testQuestions.push(newQuestion);
    data.questions[testId] = testQuestions;

    // Update test questions count
    data.tests[testIndex].questions_count = testQuestions.length;
    data.tests[testIndex].updated_at = new Date().toISOString();

    data.statistics = calculateStatistics(data.tests, data.questions);

    saveData(data);
    return newQuestion;
};

/**
 * Delete a question from a test
 */
export const deleteQuestion = (testId: string, questionId: string): boolean => {
    const data = getTestsData();
    const testIndex = data.tests.findIndex((t) => t.id === testId);

    if (testIndex === -1) return false;

    const testQuestions = data.questions[testId] || [];
    const questionIndex = testQuestions.findIndex((q) => q.id === questionId);

    if (questionIndex === -1) return false;

    testQuestions.splice(questionIndex, 1);
    data.questions[testId] = testQuestions;

    // Update test questions count
    data.tests[testIndex].questions_count = testQuestions.length;
    data.tests[testIndex].updated_at = new Date().toISOString();

    data.statistics = calculateStatistics(data.tests, data.questions);

    saveData(data);
    return true;
};

/**
 * Toggle test status (draft <-> published)
 */
export const toggleTestStatus = (testId: string): Test | null => {
    const data = getTestsData();
    const testIndex = data.tests.findIndex((t) => t.id === testId);

    if (testIndex === -1) return null;

    const test = data.tests[testIndex];
    const newStatus = test.status === "published" ? "draft" : "published";

    data.tests[testIndex] = {
        ...test,
        status: newStatus,
        updated_at: new Date().toISOString(),
    };

    data.statistics = calculateStatistics(data.tests, data.questions);

    saveData(data);
    return data.tests[testIndex];
};

/**
 * Reset to demo data (useful for testing)
 */
export const resetToDemo = (): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
};
