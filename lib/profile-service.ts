// Client-side service wrapper for profile actions
import { getProfile, updateProfile } from "./actions/profile-actions"
import type { Profile } from "@prisma/client"

// Profile service for managing user profiles with Prisma
const ProfileService = {
  // Get profile for current user
  getProfile,

  // Update profile
  updateProfile,
}

export default ProfileService
export type { Profile }
