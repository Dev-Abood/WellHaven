"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"

// Types
export type AssessmentQuestion = {
  question: string
  answer: string
}

// Server actions for assessment operations
export async function getAssessments() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.assessment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getAssessmentById(id: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.assessment.findFirst({
    where: {
      id,
      userId,
    },
  })
}

export async function createAssessment(assessmentData: {
  type: string
  questions: AssessmentQuestion[]
}) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  // Calculate a simple score based on the assessment
  // In a real app, this would be more sophisticated
  let score = 0
  if (assessmentData.type === "initial") {
    // Simple scoring algorithm for demo purposes
    score = Math.floor(Math.random() * 40) + 60 // Random score between 60-100
  }

  // Generate recommendations based on the assessment
  // In a real app, this would be more sophisticated
  const recommendations = [
    "Try daily breathing exercises",
    "Consider a regular sleep schedule",
    "Practice mindfulness for 10 minutes daily",
  ]

  // Generate a summary based on the assessment
  // In a real app, this would be more sophisticated
  const summary = "Your results indicate moderate stress levels with good coping mechanisms."

  return prisma.assessment.create({
    data: {
      userId,
      type: assessmentData.type,
      questions: JSON.stringify(assessmentData.questions),
      score,
      summary,
      recommendations: JSON.stringify(recommendations),
      createdAt: new Date(),
    },
  })
}

export async function getLatestAssessment() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  const assessments = await prisma.assessment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  })

  const assessment = assessments[0] || null

  if (assessment) {
    // Parse JSON fields
    if (typeof assessment.questions === "string") {
      assessment.questions = JSON.parse(assessment.questions)
    }

    if (typeof assessment.recommendations === "string") {
      assessment.recommendations = JSON.parse(assessment.recommendations)
    }
  }

  return assessment
}
