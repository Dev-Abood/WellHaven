// Client-side service wrapper for therapy actions
import { getMessages, sendMessage } from "./actions/therapy-actions"

// Therapy service for managing therapy messages with Prisma
const TherapyService = {
  // Get all messages for current user
  getMessages,

  // Send a message
  sendMessage,
}

export default TherapyService
