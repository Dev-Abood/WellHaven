// app/assessment/page.tsx
"use client";

import { useState } from "react";
import { handleCreateAssessment } from "./actions";
import type { AssessmentQuestion } from "@/lib/actions/assessment-actions";

export default function AssessmentPage() {
  // Replace these with your actual questions
  const initialQuestions: AssessmentQuestion[] = [
    { question: "How are you feeling today?", answer: "" },
    { question: "What’s been on your mind most?", answer: "" },
    { question: "Rate your stress level (1–5)", answer: "" },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [type] = useState("initial"); // or pull from router/query

  function onAnswerChange(idx: number, value: string) {
    const updated = [...questions];
    updated[idx].answer = value;
    setQuestions(updated);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Take Your Assessment</h1>

      <form action={handleCreateAssessment} className="space-y-6">
        {/* hidden fields for our server action */}
        <input type="hidden" name="type" value={type} />
        <input
          type="hidden"
          name="questions"
          value={JSON.stringify(questions)}
        />

        {questions.map((q, i) => (
          <div key={i} className="space-y-1">
            <p className="font-medium">{q.question}</p>
            <textarea
              name={`answer_${i}`}
              value={q.answer}
              onChange={(e) => onAnswerChange(i, e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Submit Assessment
        </button>
      </form>
    </div>
  );
}
