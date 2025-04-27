"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"
import type { Mood } from "@prisma/client"

// Server actions for mood operations
export async function getMoods() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.mood.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getMoodsByDateRange(startDate: Date, endDate: Date) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.mood.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getMoodById(id: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.mood.findFirst({
    where: {
      id,
      userId,
    },
  })
}

export async function createMood(moodData: {
  mood: string
  intensity: number
  note?: string
  factors?: string[]
}) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.mood.create({
    data: {
      userId,
      mood: moodData.mood,
      intensity: moodData.intensity,
      note: moodData.note,
      factors: moodData.factors ? JSON.stringify(moodData.factors) : null,
      createdAt: new Date(),
    },
  })
}

export async function updateMood(id: string, moodData: Partial<Mood>) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  // Ensure the mood belongs to the current user
  const currentMood = await getMoodById(id)
  if (!currentMood || currentMood.userId !== userId) {
    throw new Error("Unauthorized to update this mood")
  }

  // Handle factors array if provided
  const data: any = { ...moodData }
  if (moodData.factors && typeof moodData.factors !== "string") {
    data.factors = JSON.stringify(moodData.factors)
  }

  return prisma.mood.update({
    where: {
      id,
    },
    data,
  })
}

export async function deleteMood(id: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  // Ensure the mood belongs to the current user
  const currentMood = await getMoodById(id)
  if (!currentMood || currentMood.userId !== userId) {
    throw new Error("Unauthorized to delete this mood")
  }

  await prisma.mood.delete({
    where: {
      id,
    },
  })

  return true
}

export async function getMoodSummary(startDate: Date, endDate: Date) {
  const moods = await getMoodsByDateRange(startDate, endDate)

  if (moods.length === 0) {
    return {
      mostFrequentMood: "No data",
      averageIntensity: 0,
      totalEntries: 0,
      moodDistribution: {},
    }
  }

  // Calculate mood distribution
  const moodDistribution: Record<string, number> = {}
  let totalIntensity = 0

  moods.forEach((mood) => {
    moodDistribution[mood.mood] = (moodDistribution[mood.mood] || 0) + 1
    totalIntensity += mood.intensity
  })

  // Find most frequent mood
  let mostFrequentMood = ""
  let maxCount = 0

  Object.entries(moodDistribution).forEach(([mood, count]) => {
    if (count > maxCount) {
      mostFrequentMood = mood
      maxCount = count
    }
  })

  return {
    mostFrequentMood,
    averageIntensity: totalIntensity / moods.length,
    totalEntries: moods.length,
    moodDistribution,
  }
}
