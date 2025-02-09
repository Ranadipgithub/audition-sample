import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";  
import { questions } from "../assets/questions.js";
import { QuestionRenderer } from "../components/QuestionRenderer.jsx";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

export default function AuditionForm() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const isComplete = questions.every((q) => {
        if (!q.required) return true;

        const value = formData[q.id];
        if (value === undefined || value === null) return false;

        switch (q.type) {
            case 'rating':
                return value && Object.keys(value).length === q.fields?.length;
            case 'checkbox':
                return Array.isArray(value) && value.length > 0;
            case 'text':
            case 'textarea':
            case 'radio':
                return Boolean(value);
            default:
                return Boolean(value);
        }
    });

    const submitAnswers = async () => {
        const transformedData = {
            answers: Object.entries(formData).map(([questionId, answer]) => ({
                questionId: parseInt(questionId, 10), 
                answer: answer,
            })),
        };

        try {
            const response = await axios.post(`${VITE_BACKEND_URL}/submit`, transformedData, {
                headers: { "Content-Type": "application/json" },
            });
            alert("Your application has been submitted successfully!");
            console.log("Server response:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit your application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isComplete || isSubmitting) return;

        setIsSubmitting(true);
        await submitAnswers();
    };

    const currentQ = questions[currentQuestion];

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card w-full max-w-3xl p-8 rounded-2xl"
            >
                <div className="mb-8">
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-white text-sm mt-2">
                        Question {currentQuestion + 1} of {questions.length}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQ.id}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-semibold text-white mb-6">
                                {currentQ.label}
                            </h2>

                            <QuestionRenderer
                                question={currentQ}
                                value={formData[currentQ.id]}
                                onChange={(value) => setFormData(prev => ({ ...prev, [currentQ.id]: value }))}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={() => setCurrentQuestion((c) => Math.max(0, c - 1))}
                            disabled={currentQuestion === 0}
                            className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                       flex items-center space-x-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>

                        {currentQuestion < questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={() => setCurrentQuestion((c) => Math.min(questions.length - 1, c + 1))}
                                className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-600 
                         transition-colors flex items-center space-x-2"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!isComplete || isSubmitting}
                                className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                         flex items-center space-x-2"
                            >
                                <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                                <Send className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
