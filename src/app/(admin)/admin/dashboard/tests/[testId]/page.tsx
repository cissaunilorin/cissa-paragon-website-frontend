"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Save,
    Trash2,
    Plus,
    Upload,
    Edit,
    GripVertical,
    CheckCircle,
    XCircle,
} from "lucide-react";
import {
    getTestById,
    getQuestionsByTestId,
    updateTest,
    updateTestQuestions,
    deleteTest as deleteTestFromStorage,
    type Test,
    type Question,
} from "@/lib/testStorage";

export default function TestDetailsPage({
    params,
}: {
    params: Promise<{ testId: string }>;
}) {
    const { testId } = use(params);
    const router = useRouter();
    const [test, setTest] = useState<Test | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
    const [showDeleteTestModal, setShowDeleteTestModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(
        null
    );
    const [questionFormData, setQuestionFormData] = useState({
        text: "",
        type: "multiple_choice" as "multiple_choice" | "true_false" | "short_answer",
        options: ["", "", "", ""],
        correct_answer: "",
        points: 5,
        explanation: "",
    });
    const [bulkUploadText, setBulkUploadText] = useState("");

    // Load data from localStorage
    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            // Simulate API delay
            setTimeout(() => {
                const foundTest = getTestById(testId);
                if (foundTest) {
                    setTest(foundTest);
                    const testQuestions = getQuestionsByTestId(testId);
                    setQuestions(testQuestions);
                }
                setLoading(false);
            }, 500);
        };

        loadData();
    }, [testId]);

    const handleTestUpdate = (field: string, value: any) => {
        if (test) {
            setTest({ ...test, [field]: value });
        }
    };

    const handleSaveTestDetails = () => {
        if (!test) return;

        setIsSaving(true);
        const updated = updateTest(testId, {
            title: test.title,
            description: test.description,
            duration: test.duration,
            passing_score: test.passing_score,
            status: test.status,
        });

        if (updated) {
            setTest(updated);
            setTimeout(() => {
                setIsSaving(false);
                alert("Test details saved successfully!");
            }, 300);
        } else {
            setIsSaving(false);
            alert("Failed to save test details.");
        }
    };

    const handleDeleteTest = () => {
        if (!test) return;

        const success = deleteTestFromStorage(test.id);
        if (success) {
            setShowDeleteTestModal(false);
            router.push("/admin/dashboard/tests");
        } else {
            alert("Failed to delete test.");
        }
    };

    const handleAddQuestion = () => {
        setEditingQuestion(null);
        setQuestionFormData({
            text: "",
            type: "multiple_choice",
            options: ["", "", "", ""],
            correct_answer: "",
            points: 5,
            explanation: "",
        });
        setShowQuestionModal(true);
    };

    const handleEditQuestion = (question: Question) => {
        setEditingQuestion(question);
        setQuestionFormData({
            text: question.text,
            type: question.type,
            options: question.options || ["", "", "", ""],
            correct_answer: Array.isArray(question.correct_answer)
                ? question.correct_answer[0]
                : question.correct_answer,
            points: question.points,
            explanation: question.explanation || "",
        });
        setShowQuestionModal(true);
    };

    const handleSaveQuestion = () => {
        let updatedQuestions: Question[];

        if (editingQuestion) {
            // Update existing question
            updatedQuestions = questions.map((q) =>
                q.id === editingQuestion.id
                    ? {
                          ...q,
                          text: questionFormData.text,
                          type: questionFormData.type,
                          options:
                              questionFormData.type === "multiple_choice"
                                  ? questionFormData.options.filter((o) =>
                                        o.trim()
                                    )
                                  : undefined,
                          correct_answer: questionFormData.correct_answer,
                          points: questionFormData.points,
                          explanation: questionFormData.explanation,
                      }
                    : q
            );
        } else {
            // Add new question
            const newQuestion: Question = {
                id: `q-${testId}-${Date.now()}`,
                test_id: testId,
                text: questionFormData.text,
                type: questionFormData.type,
                options:
                    questionFormData.type === "multiple_choice"
                        ? questionFormData.options.filter((o) => o.trim())
                        : undefined,
                correct_answer: questionFormData.correct_answer,
                points: questionFormData.points,
                explanation: questionFormData.explanation,
                order: questions.length + 1,
            };
            updatedQuestions = [...questions, newQuestion];
        }

        // Save to storage
        const success = updateTestQuestions(testId, updatedQuestions);
        if (success) {
            setQuestions(updatedQuestions);
            // Update test data to reflect new question count
            const updatedTest = getTestById(testId);
            if (updatedTest) {
                setTest(updatedTest);
            }
        }

        setShowQuestionModal(false);
    };

    const handleDeleteQuestion = (questionId: string) => {
        const updatedQuestions = questions.filter((q) => q.id !== questionId);

        // Save to storage
        const success = updateTestQuestions(testId, updatedQuestions);
        if (success) {
            setQuestions(updatedQuestions);
            // Update test data to reflect new question count
            const updatedTest = getTestById(testId);
            if (updatedTest) {
                setTest(updatedTest);
            }
        }
    };

    const handleBulkUpload = () => {
        try {
            const parsed = JSON.parse(bulkUploadText);
            if (parsed.questions && Array.isArray(parsed.questions)) {
                const newQuestions: Question[] = parsed.questions.map(
                    (q: any, index: number) => ({
                        id: `q-bulk-${testId}-${Date.now()}-${index}`,
                        test_id: testId,
                        text: q.text,
                        type: q.type,
                        options: q.options,
                        correct_answer: q.correctAnswer,
                        points: q.points || 5,
                        explanation: q.explanation || "",
                        order: questions.length + index + 1,
                    })
                );

                const updatedQuestions = [...questions, ...newQuestions];

                // Save to storage
                const success = updateTestQuestions(testId, updatedQuestions);
                if (success) {
                    setQuestions(updatedQuestions);
                    // Update test data to reflect new question count
                    const updatedTest = getTestById(testId);
                    if (updatedTest) {
                        setTest(updatedTest);
                    }
                    setBulkUploadText("");
                    setShowBulkUploadModal(false);
                } else {
                    alert("Failed to save questions.");
                }
            } else {
                alert("Invalid JSON format. Please check the structure.");
            }
        } catch (error) {
            alert("Error parsing JSON. Please check the format.");
        }
    };

    const getQuestionTypeLabel = (type: string) => {
        switch (type) {
            case "multiple_choice":
                return "Multiple Choice";
            case "true_false":
                return "True/False";
            case "short_answer":
                return "Short Answer";
            default:
                return type;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
                    <p className="text-base-content/70">Loading test details...</p>
                </div>
            </div>
        );
    }

    if (!test) {
        return (
            <div className="text-center py-12">
                <p className="text-base-content/70 text-lg">Test not found</p>
                <Link href="/admin/dashboard/tests" className="btn btn-primary mt-4">
                    Back to Tests
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href="/admin/dashboard"
                    className="text-base-content/70 hover:text-base-content"
                >
                    Admin
                </Link>
                <span className="text-base-content/50">/</span>
                <Link
                    href="/admin/dashboard/tests"
                    className="text-base-content/70 hover:text-base-content"
                >
                    Tests
                </Link>
                <span className="text-base-content/50">/</span>
                <span className="text-base-content font-medium">{test.title}</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/dashboard/tests"
                        className="btn btn-ghost btn-sm"
                    >
                        <ChevronLeft size={20} />
                        Back
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-base-content">
                            {test.title}
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            Manage test details and questions
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSaveTestDetails}
                        disabled={isSaving}
                        className="btn btn-success"
                    >
                        {isSaving ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Save Changes
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setShowDeleteTestModal(true)}
                        className="btn btn-error"
                    >
                        <Trash2 size={20} />
                        Delete Test
                    </button>
                </div>
            </div>

            {/* Test Details Section */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">Test Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Test Title
                                </span>
                            </label>
                            <input
                                type="text"
                                value={test.title}
                                onChange={(e) =>
                                    handleTestUpdate("title", e.target.value)
                                }
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Status
                                </span>
                            </label>
                            <select
                                value={test.status}
                                onChange={(e) =>
                                    handleTestUpdate("status", e.target.value)
                                }
                                className="select select-bordered"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Description
                                </span>
                            </label>
                            <textarea
                                value={test.description}
                                onChange={(e) =>
                                    handleTestUpdate("description", e.target.value)
                                }
                                className="textarea textarea-bordered"
                                rows={3}
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Duration (minutes)
                                </span>
                            </label>
                            <input
                                type="number"
                                value={test.duration}
                                onChange={(e) =>
                                    handleTestUpdate(
                                        "duration",
                                        parseInt(e.target.value)
                                    )
                                }
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Passing Score (%)
                                </span>
                            </label>
                            <input
                                type="number"
                                value={test.passing_score}
                                onChange={(e) =>
                                    handleTestUpdate(
                                        "passing_score",
                                        parseInt(e.target.value)
                                    )
                                }
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Question Management Section */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="card-title text-xl">Questions</h2>
                            <p className="text-base-content/70 text-sm mt-1">
                                {questions.length} question(s) in this test
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowBulkUploadModal(true)}
                                className="btn btn-outline"
                            >
                                <Upload size={20} />
                                Bulk Upload
                            </button>
                            <button
                                onClick={handleAddQuestion}
                                className="btn btn-primary"
                            >
                                <Plus size={20} />
                                Add Question
                            </button>
                        </div>
                    </div>

                    {questions.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-base-300 rounded-lg">
                            <p className="text-base-content/70 text-lg">
                                No questions added yet
                            </p>
                            <p className="text-base-content/50 text-sm mt-2">
                                Click &quot;Add Question&quot; to create your first question
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="border border-base-300 rounded-lg p-4 hover:border-primary transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1 cursor-move">
                                            <GripVertical
                                                size={20}
                                                className="text-base-content/50"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="badge badge-primary">
                                                            Q{index + 1}
                                                        </span>
                                                        <span className="badge badge-outline">
                                                            {getQuestionTypeLabel(
                                                                question.type
                                                            )}
                                                        </span>
                                                        <span className="badge badge-secondary">
                                                            {question.points} points
                                                        </span>
                                                    </div>
                                                    <p className="text-base-content font-medium mb-2">
                                                        {question.text}
                                                    </p>
                                                    {question.options && (
                                                        <div className="space-y-1 mt-2">
                                                            {question.options.map(
                                                                (option, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="flex items-center gap-2 text-sm"
                                                                    >
                                                                        {option ===
                                                                        question.correct_answer ? (
                                                                            <CheckCircle
                                                                                size={16}
                                                                                className="text-success"
                                                                            />
                                                                        ) : (
                                                                            <XCircle
                                                                                size={16}
                                                                                className="text-base-content/30"
                                                                            />
                                                                        )}
                                                                        <span
                                                                            className={
                                                                                option ===
                                                                                question.correct_answer
                                                                                    ? "text-success font-medium"
                                                                                    : "text-base-content/70"
                                                                            }
                                                                        >
                                                                            {option}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                    {question.explanation && (
                                                        <div className="mt-2 p-2 bg-base-200 rounded text-sm">
                                                            <span className="font-semibold">
                                                                Explanation:
                                                            </span>{" "}
                                                            {question.explanation}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditQuestion(
                                                                question
                                                            )
                                                        }
                                                        className="btn btn-ghost btn-sm"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteQuestion(
                                                                question.id
                                                            )
                                                        }
                                                        className="btn btn-ghost btn-sm text-error"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Question Modal */}
            {showQuestionModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">
                            {editingQuestion ? "Edit Question" : "Add New Question"}
                        </h3>
                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Question Text</span>
                                </label>
                                <textarea
                                    value={questionFormData.text}
                                    onChange={(e) =>
                                        setQuestionFormData({
                                            ...questionFormData,
                                            text: e.target.value,
                                        })
                                    }
                                    className="textarea textarea-bordered"
                                    rows={3}
                                    placeholder="Enter your question"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Question Type
                                        </span>
                                    </label>
                                    <select
                                        value={questionFormData.type}
                                        onChange={(e) =>
                                            setQuestionFormData({
                                                ...questionFormData,
                                                type: e.target.value as any,
                                            })
                                        }
                                        className="select select-bordered"
                                    >
                                        <option value="multiple_choice">
                                            Multiple Choice
                                        </option>
                                        <option value="true_false">
                                            True/False
                                        </option>
                                        <option value="short_answer">
                                            Short Answer
                                        </option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Points</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={questionFormData.points}
                                        onChange={(e) =>
                                            setQuestionFormData({
                                                ...questionFormData,
                                                points: parseInt(e.target.value),
                                            })
                                        }
                                        className="input input-bordered"
                                    />
                                </div>
                            </div>

                            {questionFormData.type === "multiple_choice" && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Options</span>
                                    </label>
                                    <div className="space-y-2">
                                        {questionFormData.options.map(
                                            (option, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => {
                                                        const newOptions = [
                                                            ...questionFormData.options,
                                                        ];
                                                        newOptions[index] =
                                                            e.target.value;
                                                        setQuestionFormData({
                                                            ...questionFormData,
                                                            options: newOptions,
                                                        });
                                                    }}
                                                    placeholder={`Option ${index + 1}`}
                                                    className="input input-bordered w-full"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Correct Answer
                                    </span>
                                </label>
                                {questionFormData.type === "multiple_choice" ? (
                                    <select
                                        value={questionFormData.correct_answer}
                                        onChange={(e) =>
                                            setQuestionFormData({
                                                ...questionFormData,
                                                correct_answer: e.target.value,
                                            })
                                        }
                                        className="select select-bordered"
                                    >
                                        <option value="">
                                            Select correct answer
                                        </option>
                                        {questionFormData.options.map(
                                            (option, index) => (
                                                <option key={index} value={option}>
                                                    {option || `Option ${index + 1}`}
                                                </option>
                                            )
                                        )}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={questionFormData.correct_answer}
                                        onChange={(e) =>
                                            setQuestionFormData({
                                                ...questionFormData,
                                                correct_answer: e.target.value,
                                            })
                                        }
                                        placeholder="Enter correct answer"
                                        className="input input-bordered"
                                    />
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Explanation (Optional)
                                    </span>
                                </label>
                                <textarea
                                    value={questionFormData.explanation}
                                    onChange={(e) =>
                                        setQuestionFormData({
                                            ...questionFormData,
                                            explanation: e.target.value,
                                        })
                                    }
                                    className="textarea textarea-bordered"
                                    rows={2}
                                    placeholder="Explain the correct answer"
                                ></textarea>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                onClick={() => setShowQuestionModal(false)}
                                className="btn"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveQuestion}
                                className="btn btn-primary"
                            >
                                {editingQuestion
                                    ? "Update Question"
                                    : "Add Question"}
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => setShowQuestionModal(false)}
                    ></div>
                </div>
            )}

            {/* Bulk Upload Modal */}
            {showBulkUploadModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">
                            Bulk Upload Questions
                        </h3>
                        <div className="space-y-4">
                            <div className="alert alert-info">
                                <div>
                                    <p className="font-semibold">JSON Format:</p>
                                    <pre className="text-xs mt-2 overflow-x-auto">
{`{
  "questions": [
    {
      "text": "Question text here?",
      "type": "multiple_choice",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "points": 10,
      "explanation": "Optional"
    }
  ]
}`}
                                    </pre>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Paste JSON Data
                                    </span>
                                </label>
                                <textarea
                                    value={bulkUploadText}
                                    onChange={(e) =>
                                        setBulkUploadText(e.target.value)
                                    }
                                    className="textarea textarea-bordered font-mono text-sm"
                                    rows={10}
                                    placeholder="Paste your JSON here..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                onClick={() => setShowBulkUploadModal(false)}
                                className="btn"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBulkUpload}
                                className="btn btn-primary"
                            >
                                <Upload size={20} />
                                Import Questions
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => setShowBulkUploadModal(false)}
                    ></div>
                </div>
            )}

            {/* Delete Test Modal */}
            {showDeleteTestModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Test</h3>
                        <p className="py-4">
                            Are you sure you want to delete this test? This action
                            cannot be undone and will delete all {questions.length}{" "}
                            associated questions.
                        </p>
                        <div className="modal-action">
                            <button
                                onClick={() => setShowDeleteTestModal(false)}
                                className="btn"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteTest}
                                className="btn btn-error"
                            >
                                Delete Test
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => setShowDeleteTestModal(false)}
                    ></div>
                </div>
            )}
        </div>
    );
}
