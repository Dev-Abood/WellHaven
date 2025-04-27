// Client-side service wrapper for user actions
import { getCurrentUser, getUserById, updateUser } from "./actions/user-actions"

// User service for managing user data with Prisma
const UserService = {
  // Get or create a user based on Clerk authentication
  getOrCreateUser: getCurrentUser,

  // Get user by ID
  getUserById,

  // Update user
  updateUser,
}

export default UserService
