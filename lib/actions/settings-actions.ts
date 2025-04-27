"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"
import type { Settings } from "@prisma/client"

// Types
export type NotificationSettings = {
  dailyReminders: boolean
  weeklyReports: boolean
  assessmentReminders: boolean
  tips: boolean
  emailNotifications: boolean
}

export type PrivacySettings = {
  dataSharing: boolean
}

// Server actions for settings operations
export async function getSettings() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.settings.findUnique({
    where: {
      userId,
    },
  })
}

export async function updateSettings(settingsData: Partial<Settings>) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  // Get current settings
  const currentSettings = await getSettings()

  // Handle JSON fields
  const data: any = { ...settingsData }
  if (settingsData.notifications && typeof settingsData.notifications !== "string") {
    data.notifications = JSON.stringify(settingsData.notifications)
  }
  if (settingsData.privacy && typeof settingsData.privacy !== "string") {
    data.privacy = JSON.stringify(settingsData.privacy)
  }

  if (!currentSettings) {
    // Create new settings if they don't exist
    return prisma.settings.create({
      data: {
        userId,
        theme: data.theme || "light",
        notifications:
          data.notifications ||
          JSON.stringify({
            dailyReminders: true,
            weeklyReports: true,
            assessmentReminders: true,
            tips: true,
            emailNotifications: false,
          }),
        privacy:
          data.privacy ||
          JSON.stringify({
            dataSharing: false,
          }),
        updatedAt: new Date(),
      },
    })
  } else {
    // Update existing settings
    return prisma.settings.update({
      where: {
        id: currentSettings.id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }
}

export async function updateTheme(theme: string) {
  return updateSettings({ theme })
}

export async function updateNotifications(notifications: Partial<NotificationSettings>) {
  const currentSettings = await getSettings()
  let currentNotifications: NotificationSettings

  if (currentSettings?.notifications) {
    currentNotifications =
      typeof currentSettings.notifications === "string"
        ? JSON.parse(currentSettings.notifications)
        : currentSettings.notifications
  } else {
    currentNotifications = {
      dailyReminders: true,
      weeklyReports: true,
      assessmentReminders: true,
      tips: true,
      emailNotifications: false,
    }
  }

  return updateSettings({
    notifications: JSON.stringify({
      ...currentNotifications,
      ...notifications,
    }),
  })
}

export async function updatePrivacy(privacy: Partial<PrivacySettings>) {
  const currentSettings = await getSettings()
  let currentPrivacy: PrivacySettings

  if (currentSettings?.privacy) {
    currentPrivacy =
      typeof currentSettings.privacy === "string" ? JSON.parse(currentSettings.privacy) : currentSettings.privacy
  } else {
    currentPrivacy = {
      dataSharing: false,
    }
  }

  return updateSettings({
    privacy: JSON.stringify({
      ...currentPrivacy,
      ...privacy,
    }),
  })
}
