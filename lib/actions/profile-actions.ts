"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"
import type { Profile } from "@prisma/client"

// Server actions for profile operations
export async function getProfile() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return prisma.profile.findUnique({
    where: {
      userId: userId,
    },
  })
}

export async function updateProfile(profileData: Partial<Profile>) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  const currentProfile = await getProfile()

  if (!currentProfile) {
    // Create new profile if it doesn't exist
    return prisma.profile.create({
      data: {
        userId,
        name: profileData.name || "",
        age: profileData.age,
        gender: profileData.gender,
        bio: profileData.bio,
        goals: profileData.goals,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  } else {
    // Update existing profile
    return prisma.profile.update({
      where: {
        id: currentProfile.id,
      },
      data: {
        ...profileData,
        updatedAt: new Date(),
      },
    })
  }
}
