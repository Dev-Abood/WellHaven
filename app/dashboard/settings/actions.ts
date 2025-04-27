// app/dashboard/settings/actions.ts
"use server";

import { getSettings, updateSettings } from "@/lib/actions/settings-actions";
import { redirect } from "next/navigation";

export type RawSettings = {
  theme: string;
  notifications: {
    dailyReminders: boolean;
    weeklyReports: boolean;
    assessmentReminders: boolean;
    tips: boolean;
    emailNotifications: boolean;
  };
  privacy: {
    dataSharing: boolean;
  };
};

export async function handleSaveSettings(formData: FormData) {
  // parse theme
  const theme = formData.get("theme")?.toString() ?? "light";

  // parse notification toggles (checkboxes send "on" when checked)
  const notifications = {
    dailyReminders:        formData.get("dailyReminders")        === "on",
    weeklyReports:         formData.get("weeklyReports")         === "on",
    assessmentReminders:   formData.get("assessmentReminders")   === "on",
    tips:                  formData.get("tips")                  === "on",
    emailNotifications:    formData.get("emailNotifications")    === "on",
  };

  // parse privacy toggles
  const privacy = {
    dataSharing: formData.get("dataSharing") === "on",
  };

  // commit in one shot
  await updateSettings({
    theme,
    notifications: JSON.stringify(notifications),
    privacy:       JSON.stringify(privacy),
  });

  // stay on this page, but re-load
  redirect("/dashboard/settings");
}

// app/dashboard/settings/actions.ts
export async function fetchSettings(): Promise<RawSettings> {
    const row = await getSettings();
    if (!row) {
      throw new Error("Settings record not found");
    }
  
    // now `row` is definitely non-null
    const notifications = typeof row.notifications === "string"
      ? JSON.parse(row.notifications)
      : row.notifications;
    const privacy = typeof row.privacy === "string"
      ? JSON.parse(row.privacy)
      : row.privacy;
  
    return {
      theme: row.theme,
      notifications,
      privacy,
    };
  }
  
