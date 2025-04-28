"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

// Define types to match the assessment data
const weightSchema = z.object({
	value: z.number().optional(),
	unit: z.enum(["kg", "lbs"]),
});

// Define schema for the assessment data with all fields optional for validation
const assessmentSchema = z.object({
	healthGoal: z
		.enum([
			"reduce_stress",
			"ai_therapy",
			"cope_with_trauma",
			"better_person",
			"trying_out",
		])
		.optional(),
	gender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
	age: z.number().min(13).max(100).optional(),
	weight: weightSchema.optional(),
	professionalHelp: z.boolean().optional(),
	physicalDistress: z.boolean().optional(),
	medications: z.array(z.string()).optional(),
	medicationReminder: z.boolean().optional(),
	medicationReminders: z.array(z.any()).optional(),
	mentalHealthSymptoms: z.array(z.string()).optional(),
	selfDescriptions: z.array(z.string()).optional(),
	stressLevel: z.number().min(1).max(5).optional(),
	sleepQuality: z
		.enum(["excellent", "good", "fair", "poor", "worst"])
		.optional(),
	mood: z.enum(["very_good", "good", "neutral", "bad", "very_bad"]).optional(),
});

// Type for the assessment data
type PartialAssessmentData = z.infer<typeof assessmentSchema>;

// Convert frontend values to database enum values
function mapHealthGoal(
	goal: string | undefined,
):
	| "REDUCE_STRESS"
	| "AI_THERAPY"
	| "COPE_WITH_TRAUMA"
	| "BE_BETTER_PERSON"
	| "TRYING_OUT" {
	if (!goal) return "TRYING_OUT";

	const goalMap: Record<string, any> = {
		reduce_stress: "REDUCE_STRESS",
		ai_therapy: "AI_THERAPY",
		cope_with_trauma: "COPE_WITH_TRAUMA",
		better_person: "BE_BETTER_PERSON",
		trying_out: "TRYING_OUT",
	};
	return goalMap[goal] || "TRYING_OUT";
}

function mapGender(gender: string | undefined): "MALE" | "FEMALE" | undefined {
	if (!gender || gender === "prefer_not_to_say") return undefined;
	return gender.toUpperCase() as "MALE" | "FEMALE";
}

function mapSleepQuality(
	quality: string | undefined,
): "WORST" | "POOR" | "FAIR" | "GOOD" | "EXCELLENT" {
	if (!quality) return "FAIR";

	const qualityMap: Record<string, any> = {
		worst: "WORST",
		poor: "POOR",
		fair: "FAIR",
		good: "GOOD",
		excellent: "EXCELLENT",
	};
	return qualityMap[quality] || "FAIR";
}

function mapMood(
	mood: string | undefined,
): "SAD" | "OVERJOYED" | "HAPPY" | "NEUTRAL" | "DEPRESSED" {
	if (!mood) return "NEUTRAL";

	const moodMap: Record<string, any> = {
		very_good: "OVERJOYED",
		good: "HAPPY",
		neutral: "NEUTRAL",
		bad: "SAD",
		very_bad: "DEPRESSED",
	};
	return moodMap[mood] || "NEUTRAL";
}

export async function createUser(assessmentData: PartialAssessmentData) {
	try {
		// Validate the assessment data
		const validatedData = assessmentSchema.parse(assessmentData);

		// Get user ID from auth
		const { userId } = await auth();

		if (!userId) {
			throw new Error("User not authenticated");
		}

		// Set default values for required fields in the database
		const userData = {
			goal: mapHealthGoal(validatedData.healthGoal),
			gender: mapGender(validatedData.gender),
			age: validatedData.age ?? 18, // Default age if not provided
			weight: validatedData.weight?.value,
			soughtProfessionalHelp: validatedData.professionalHelp ?? false,
			experiencedPhysicalDistress: validatedData.physicalDistress ?? false,
			medications: validatedData.medications || [],
			wantsMedicationReminders: validatedData.medicationReminder ?? false,
			mentalHealthSymptoms: validatedData.mentalHealthSymptoms || [],
			selfDescriptions: validatedData.selfDescriptions || [],
			initialStressLevel: validatedData.stressLevel ?? 3, // Default to medium stress level
			initialSleepQuality: mapSleepQuality(validatedData.sleepQuality),
			initialMood: mapMood(validatedData.mood),
		};

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (existingUser) {
			// Update existing user
			return await prisma.user.update({
				where: { id: userId },
				data: {
					...userData,
					updatedAt: new Date(),
				},
			});
		}

		// Create new user
		return await prisma.user.create({
			data: {
				id: userId,
				...userData,
			},
		});
	} catch (error) {
		console.error("Error creating/updating user:", error);
		throw new Error("Failed to create or update user profile");
	}
}
