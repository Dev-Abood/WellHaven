// app/assessment/actions.ts
"use server";

import { createAssessment } from "@/lib/actions/assessment-actions";
import { redirect } from "next/navigation";
import type { AssessmentQuestion } from "@/lib/actions/assessment-actions";

/**
 * Called by the <form> on /assessment.
 * Expects two hidden fields:
 *  - type        (string)
 *  - questions   (JSON-encoded AssessmentQuestion[])
 */
export async function handleCreateAssessment(formData: FormData) {
  const type = formData.get("type")!.toString();
  const questions: AssessmentQuestion[] = JSON.parse(
    formData.get("questions")!.toString()
  );

  await createAssessment({ type, questions });

  // After saving, send them to their dashboard list
  redirect("/dashboard/assessments");
}
