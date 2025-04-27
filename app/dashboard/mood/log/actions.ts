// app/dashboard/mood/log/actions.ts
"use server";

import { createMood } from "@/lib/actions/mood-actions";
import { redirect } from "next/navigation";

export async function handleCreateMood(formData: FormData) {
  // parse values from the submitted form
  const mood     = formData.get("mood")!.toString();
  const intensity = parseInt(formData.get("intensity")!.toString(), 10);
  const note      = formData.get("note")?.toString() || "";

  // for checkboxes named "factors", Next.js packs getAll
  const factors = formData.getAll("factors").map((v) => v.toString());

  // call your existing Prisma server‐action
  await createMood({ mood, intensity, note, factors });

  // send the user back to the dashboard
  redirect("/dashboard");
}
