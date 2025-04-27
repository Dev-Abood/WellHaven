// Client-side service wrapper for assessment actions
import {
  getAssessments,
  getAssessmentById,
  createAssessment,
  getLatestAssessment,
  type AssessmentQuestion,
} from "./actions/assessment-actions"

// Assessment service for managing assessments with Prisma
const AssessmentService = {
  // Get all assessments for current user
  getAssessments,

  // Get assessment by ID
  getAssessmentById,

  // Create a new assessment
  createAssessment,

  // Get the latest assessment for the current user
  getLatestAssessment,
}

export default AssessmentService
export type { AssessmentQuestion }
