// app/onboarding/actions.ts
"use server";

import { updateProfile } from "@/lib/actions/profile-actions";
import { redirect } from "next/navigation";

export type OnboardingValues = {
  name: string;
  age: number;
  gender: string;
  goals: string;
};

export async function handleOnboarding(formData: FormData) {
  // parse & validate
  const values: OnboardingValues = {
    name: formData.get("name")?.toString() ?? "",
    age: parseInt(formData.get("age")?.toString() ?? "0", 10),
    gender: formData.get("gender")?.toString() ?? "",
    goals: formData.get("goals")?.toString() ?? "",
  };

  // call your existing server‐action helper
  await updateProfile(values);

  // finally, redirect to assessment
  redirect("/assessment");
}
