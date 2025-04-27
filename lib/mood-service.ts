// Client-side service wrapper for mood actions
import {
  getMoods,
  getMoodsByDateRange,
  getMoodById,
  createMood,
  updateMood,
  deleteMood,
  getMoodSummary,
} from "./actions/mood-actions"
import type { Mood } from "@prisma/client"

// Types
export type MoodSummary = {
  mostFrequentMood: string
  averageIntensity: number
  totalEntries: number
  moodDistribution: Record<string, number>
}

// Mood service for managing mood entries with Prisma
const MoodService = {
  // Get all moods for current user
  getMoods,

  // Get moods for a specific date range
  getMoodsByDateRange,

  // Get mood by ID
  getMoodById,

  // Create a new mood entry
  createMood,

  // Update a mood entry
  updateMood,

  // Delete a mood entry
  deleteMood,

  // Get mood summary for a date range
  getMoodSummary,
}

export default MoodService
export type { Mood }
