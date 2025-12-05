"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Plus,
    Upload,
    Save,
    Trash2,
    Edit,
    GripVertical,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";
import { createTest } from "@/lib/testStorage";

interface Question {
    id: string;
    text: string;
    type: "multiple_choice" | "true_false" | "short_answer";
    options?: string[];
    correct_answer: string | string[];
    points: number;
    explanation?: string;
    order: number;
}

export default function CreateTestPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    // Test details state
    const [testDetails, setTestDetails] = useState({
        title: "",
        description: "",
        duration: 45,
        passing_score: 70,
        status: "draft" as "published" | "draft",
    });

    // Questions state
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(
        null
    );

    // Question form state
    const [questionFormData, setQuestionFormData] = useState({
        text: "",
        type: "multiple_choice" as
            | "multiple_choice"
            | "true_false"
            | "short_answer",
        options: ["", "", "", ""],
        correct_answer: "",
        points: 5,
        explanation: "",
    });

    // Bulk upload state
    const [bulkUploadText, setBulkUploadText] = useState("");

    const handleTestDetailChange = (field: string, value: any) => {
        setTestDetails({ ...testDetails, [field]: value });
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
        if (!questionFormData.text.trim()) {
            alert("Please enter a question text");
            return;
        }

        if (!questionFormData.correct_answer) {
            alert("Please specify the correct answer");
            return;
        }

        if (editingQuestion) {
            // Update existing question
            setQuestions(
                questions.map((q) =>
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
                )
            );
        } else {
            // Add new question
            const newQuestion: Question = {
                id: `temp-${Date.now()}`,
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
            setQuestions([...questions, newQuestion]);
        }
        setShowQuestionModal(false);
    };

    const handleDeleteQuestion = (questionId: string) => {
        setQuestions(questions.filter((q) => q.id !== questionId));
    };

    const handleBulkUpload = () => {
        try {
            const parsed = JSON.parse(bulkUploadText);
            if (parsed.questions && Array.isArray(parsed.questions)) {
                const newQuestions: Question[] = parsed.questions.map(
                    (q: any, index: number) => ({
                        id: `temp-bulk-${Date.now()}-${index}`,
                        text: q.text,
                        type: q.type,
                        options: q.options,
                        correct_answer: q.correctAnswer,
                        points: q.points || 5,
                        explanation: q.explanation || "",
                        order: questions.length + index + 1,
                    })
                );
                setQuestions([...questions, ...newQuestions]);
                setBulkUploadText("");
                setShowBulkUploadModal(false);
            } else {
                alert("Invalid JSON format. Please check the structure.");
            }
        } catch (error) {
            alert("Error parsing JSON. Please check the format.");
        }
    };

    const handleCreateTest = async () => {
        // Validation
        if (!testDetails.title.trim()) {
            alert("Please enter a test title");
            return;
        }

        if (!testDetails.description.trim()) {
            alert("Please enter a test description");
            return;
        }

        if (questions.length === 0) {
            alert("Please add at least one question to the test");
            return;
        }

        setIsSaving(true);

        try {
            // Prepare questions data (remove temporary IDs)
            const questionsToSave = questions.map((q) => ({
                text: q.text,
                type: q.type,
                options: q.options,
                correct_answer: q.correct_answer,
                points: q.points,
                explanation: q.explanation,
                order: q.order,
            }));

            // Save to localStorage
            const newTest = createTest(testDetails, questionsToSave);

            console.log("Test created successfully:", newTest);

            // Redirect to tests dashboard
            setTimeout(() => {
                setIsSaving(false);
                router.push("/admin/dashboard/tests");
            }, 500);
        } catch (error) {
            console.error("Error creating test:", error);
            alert("Failed to create test. Please try again.");
            setIsSaving(false);
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

    const isFormValid =
        testDetails.title.trim() &&
        testDetails.description.trim() &&
        questions.length > 0;

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
                <span className="text-base-content font-medium">
                    Create New Test
                </span>
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
                            Create New Test
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            Set up test details and add questions
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleCreateTest}
                    disabled={!isFormValid || isSaving}
                    className="btn btn-primary"
                >
                    {isSaving ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Creating...
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            Create Test
                        </>
                    )}
                </button>
            </div>

            {/* Validation Alert */}
            {!isFormValid && (
                <div className="alert alert-warning">
                    <AlertCircle size={20} />
                    <div>
                        <p className="font-semibold">
                            Please complete the following:
                        </p>
                        <ul className="list-disc list-inside text-sm mt-1">
                            {!testDetails.title.trim() && (
                                <li>Enter a test title</li>
                            )}
                            {!testDetails.description.trim() && (
                                <li>Enter a test description</li>
                            )}
                            {questions.length === 0 && (
                                <li>Add at least one question</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}

            {/* Test Details Section */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">Test Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Test Title
                                    <span className="text-error ml-1">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                value={testDetails.title}
                                onChange={(e) =>
                                    handleTestDetailChange("title", e.target.value)
                                }
                                placeholder="e.g., Communication Theory Fundamentals"
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
                                value={testDetails.status}
                                onChange={(e) =>
                                    handleTestDetailChange("status", e.target.value)
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
                                    <span className="text-error ml-1">*</span>
                                </span>
                            </label>
                            <textarea
                                value={testDetails.description}
                                onChange={(e) =>
                                    handleTestDetailChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                placeholder="Provide a brief description of what this test covers..."
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
                                value={testDetails.duration}
                                onChange={(e) =>
                                    handleTestDetailChange(
                                        "duration",
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                min="1"
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
                                value={testDetails.passing_score}
                                onChange={(e) =>
                                    handleTestDetailChange(
                                        "passing_score",
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                min="0"
                                max="100"
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
                            <h2 className="card-title text-xl">
                                Questions
                                <span className="text-error ml-1">*</span>
                            </h2>
                            <p className="text-base-content/70 text-sm mt-1">
                                {questions.length} question(s) added
                                {questions.length > 0 &&
                                    ` • ${questions.reduce((sum, q) => sum + q.points, 0)} total points`}
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

                    {/* Questions Preview */}
                    {questions.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-base-300 rounded-lg">
                            <AlertCircle
                                size={48}
                                className="mx-auto text-warning mb-4"
                            />
                            <p className="text-base-content/70 text-lg">
                                No questions added yet
                            </p>
                            <p className="text-base-content/50 text-sm mt-2 mb-4">
                                Add questions using the buttons above
                            </p>
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={handleAddQuestion}
                                    className="btn btn-primary btn-sm"
                                >
                                    <Plus size={16} />
                                    Add Single Question
                                </button>
                                <button
                                    onClick={() => setShowBulkUploadModal(true)}
                                    className="btn btn-outline btn-sm"
                                >
                                    <Upload size={16} />
                                    Bulk Upload JSON
                                </button>
                            </div>
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
                                                    {!question.options && (
                                                        <div className="mt-2 p-2 bg-success/10 border border-success/20 rounded text-sm">
                                                            <span className="font-semibold text-success">
                                                                Correct Answer:
                                                            </span>{" "}
                                                            <span className="text-base-content">
                                                                {question.correct_answer}
                                                            </span>
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
                                                        title="Edit question"
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
                                                        title="Delete question"
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
                                    <span className="label-text">
                                        Question Text
                                        <span className="text-error ml-1">*</span>
                                    </span>
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
                                                points: parseInt(e.target.value) || 0,
                                            })
                                        }
                                        min="1"
                                        className="input input-bordered"
                                    />
                                </div>
                            </div>

                            {questionFormData.type === "multiple_choice" && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Options
                                            <span className="text-error ml-1">*</span>
                                        </span>
                                    </label>
                                    <div className="space-y-2">
                                        {questionFormData.options.map(
                                            (option, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2"
                                                >
                                                    <input
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
                                                        placeholder={`Option ${
                                                            String.fromCharCode(
                                                                65 + index
                                                            )
                                                        }`}
                                                        className="input input-bordered flex-1"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Correct Answer
                                        <span className="text-error ml-1">*</span>
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
                                        {questionFormData.options
                                            .filter((o) => o.trim())
                                            .map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option ||
                                                        `Option ${String.fromCharCode(65 + index)}`}
                                                </option>
                                            ))}
                                    </select>
                                ) : questionFormData.type === "true_false" ? (
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
                                        <option value="">Select answer</option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
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
                                    placeholder="Explain why this is the correct answer"
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
                    <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
                        <h3 className="font-bold text-lg mb-4">
                            Bulk Upload Questions (JSON)
                        </h3>
                        <div className="space-y-4">
                            <div className="alert alert-info">
                                <div className="w-full">
                                    <p className="font-semibold mb-2">
                                        JSON Format Example:
                                    </p>
                                    <pre className="text-xs overflow-x-auto bg-base-200 p-3 rounded">
{`{
  "questions": [
    {
      "text": "What does HTML stand for?",
      "type": "multiple_choice",
      "options": [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language"
      ],
      "correctAnswer": "Hyper Text Markup Language",
      "points": 5,
      "explanation": "HTML stands for Hyper Text Markup Language"
    },
    {
      "text": "JavaScript is a compiled language.",
      "type": "true_false",
      "correctAnswer": "False",
      "points": 3,
      "explanation": "JavaScript is an interpreted language"
    },
    {
      "text": "What year was JavaScript created?",
      "type": "short_answer",
      "correctAnswer": "1995",
      "points": 4,
      "explanation": "JavaScript was created in 1995 by Brendan Eich"
    }
  ]
}`}
                                    </pre>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Paste JSON Data
                                    </span>
                                </label>
                                <textarea
                                    value={bulkUploadText}
                                    onChange={(e) =>
                                        setBulkUploadText(e.target.value)
                                    }
                                    className="textarea textarea-bordered font-mono text-sm"
                                    rows={12}
                                    placeholder="Paste your JSON here..."
                                ></textarea>
                            </div>

                            <div className="alert">
                                <AlertCircle size={20} />
                                <div>
                                    <p className="text-sm">
                                        <strong>Tips:</strong>
                                    </p>
                                    <ul className="text-sm list-disc list-inside mt-1">
                                        <li>
                                            Question types: multiple_choice,
                                            true_false, short_answer
                                        </li>
                                        <li>
                                            For multiple_choice, include options
                                            array
                                        </li>
                                        <li>
                                            correctAnswer must match one of the
                                            options (for MCQ)
                                        </li>
                                        <li>Explanation is optional</li>
                                    </ul>
                                </div>
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
                                disabled={!bulkUploadText.trim()}
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
        </div>
    );
}
