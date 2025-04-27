// Client-side service wrapper for settings actions
import {
  getSettings,
  updateSettings,
  updateTheme,
  updateNotifications,
  updatePrivacy,
  type NotificationSettings,
  type PrivacySettings,
} from "./actions/settings-actions"
import type { Settings } from "@prisma/client"

// Settings service for managing user settings with Prisma
const SettingsService = {
  // Get settings for current user
  getSettings,

  // Update settings
  updateSettings,

  // Update theme
  updateTheme,

  // Update notification settings
  updateNotifications,

  // Update privacy settings
  updatePrivacy,
}

export default SettingsService
export type { NotificationSettings, PrivacySettings, Settings }
