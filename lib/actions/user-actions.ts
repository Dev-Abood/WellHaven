"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"
import type { User } from "@prisma/client"

// Server actions for user operations
export async function getCurrentUser() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  // Check if user exists in database
  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  // If user doesn't exist, create a new one
  if (!user) {
    // Get user data from Clerk
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    })

    const clerkUser = await response.json()

    // Create user in database
    user = await prisma.user.create({
      data: {
        id: userId, // Use Clerk userId as the primary ID
        email: clerkUser.email_addresses[0].email_address,
        name: `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim(),
        createdAt: new Date(),
      },
    })
  }

  return user
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  })
}
