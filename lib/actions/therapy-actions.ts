"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"

// Server actions for therapy operations
export async function getMessages() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.therapyMessage.findMany({
    where: {
      userId,
    },
    orderBy: {
      timestamp: "asc",
    },
  })
}

export async function sendMessage(content: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  // Create user message
  const userMessage = await prisma.therapyMessage.create({
    data: {
      userId,
      role: "user",
      content,
      timestamp: new Date(),
    },
  })

  // Generate AI response
  // In a real app, this would call an AI service
  const aiResponse = await generateAIResponse(content)

  // Create assistant message
  const assistantMessage = await prisma.therapyMessage.create({
    data: {
      userId,
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    },
  })

  return [userMessage, assistantMessage]
}

// Generate AI response (mock)
async function generateAIResponse(userMessage: string): Promise<string> {
  // In a real app, this would call an AI service
  // For demo purposes, we'll use simple pattern matching

  // Wait for a realistic delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lowerCaseMessage = userMessage.toLowerCase()

  if (lowerCaseMessage.includes("anxious") || lowerCaseMessage.includes("anxiety")) {
    return "It sounds like you're experiencing anxiety. Remember that anxiety is a normal response to stress. Have you tried any breathing exercises or mindfulness techniques?"
  } else if (lowerCaseMessage.includes("sad") || lowerCaseMessage.includes("depressed")) {
    return "I'm sorry to hear you're feeling down. Depression and sadness are common emotions. Would you like to talk more about what might be contributing to these feelings?"
  } else if (lowerCaseMessage.includes("stress") || lowerCaseMessage.includes("stressed")) {
    return "Stress can be challenging to manage. What specific situations are causing you stress right now? Identifying triggers can be a helpful first step."
  } else if (lowerCaseMessage.includes("happy") || lowerCaseMessage.includes("good")) {
    return "I'm glad to hear you're feeling positive! What things have been contributing to your good mood lately?"
  } else if (lowerCaseMessage.includes("sleep") || lowerCaseMessage.includes("tired")) {
    return "Sleep is crucial for mental health. Are you having trouble sleeping? I can suggest some techniques that might help improve your sleep quality."
  } else if (lowerCaseMessage.includes("thank")) {
    return "You're welcome! I'm here to support you on your mental health journey. Is there anything else you'd like to discuss?"
  } else {
    return "I understand. Could you tell me more about how you're feeling? The more details you share, the better I can support you."
  }
}
