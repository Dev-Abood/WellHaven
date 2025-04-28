"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Define the form schema with Zod for validation
const journalFormSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be less than 100 characters"),
	content: z.string().min(1, "Journal entry is required"),
	stressLevel: z.number().min(1).max(5),
	mood: z.enum(["OVERJOYED", "HAPPY", "NEUTRAL", "SAD", "DEPRESSED"]),
});

export type JournalFormValues = z.infer<typeof journalFormSchema>;

// Map the front-end mood values to the Prisma enum
const moodMapping = {
	overjoyed: "OVERJOYED",
	happy: "HAPPY",
	neutral: "NEUTRAL",
	sad: "SAD",
	depressed: "DEPRESSED",
} as const;

// Create a new journal entry
export async function createJournal(formData: JournalFormValues) {
	// Get the authenticated user
	const { userId } = await auth();

	// Check if the user is authenticated
	if (!userId) {
		throw new Error("Authentication required");
	}

	try {
		// Validate the form data
		const validatedData = journalFormSchema.parse({
			...formData,
			mood: moodMapping[
				formData.mood.toLowerCase() as keyof typeof moodMapping
			],
		});

		// Create a new journal entry
		const journal = await prisma.journal.create({
			data: {
				title: validatedData.title,
				content: validatedData.content,
				stressLevel: validatedData.stressLevel,
				mood: validatedData.mood as any, // Cast to any since we've already validated
				userId: userId,
			},
		});

		// Revalidate the journal page to show the new entry
		revalidatePath("/journal");

		return { success: true, data: journal };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, error: error.format() };
		}

		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to create journal entry",
		};
	}
}

// Update an existing journal entry
export async function updateJournal(
	journalId: string,
	formData: JournalFormValues,
) {
	console.log("Updating journal entry with ID:", journalId);
	console.log("Form data:", formData);
	// Get the authenticated user
	const { userId } = await auth();

	// Check if the user is authenticated
	if (!userId) {
		throw new Error("Authentication required");
	}

	try {
		// Validate the form data
		const validatedData = journalFormSchema.parse({
			...formData,
			mood: moodMapping[
				formData.mood.toLowerCase() as keyof typeof moodMapping
			],
		});

		// First check if the journal belongs to the current user
		const existingJournal = await prisma.journal.findUnique({
			where: { id: journalId },
			select: { userId: true },
		});

		if (!existingJournal) {
			throw new Error("Journal entry not found");
		}

		if (existingJournal.userId !== userId) {
			throw new Error("Unauthorized access to journal entry");
		}

		// Update the journal entry
		const journal = await prisma.journal.update({
			where: { id: journalId },
			data: {
				title: validatedData.title,
				content: validatedData.content,
				stressLevel: validatedData.stressLevel,
				mood: validatedData.mood as any, // Cast to any since we've already validated
			},
		});

		// Revalidate the journal page to show the updated entry
		revalidatePath("/journal");

		return { success: true, data: journal };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, error: error.format() };
		}

		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to update journal entry",
		};
	}
}

// Delete a journal entry
export async function deleteJournal(journalId: string) {
	// Get the authenticated user
	const { userId } = await auth();

	// Check if the user is authenticated
	if (!userId) {
		throw new Error("Authentication required");
	}

	try {
		// First check if the journal belongs to the current user
		const existingJournal = await prisma.journal.findUnique({
			where: { id: journalId },
			select: { userId: true },
		});

		if (!existingJournal) {
			throw new Error("Journal entry not found");
		}

		if (existingJournal.userId !== userId) {
			throw new Error("Unauthorized access to journal entry");
		}

		// Delete the journal entry
		await prisma.journal.delete({
			where: { id: journalId },
		});

		// Revalidate the journal page to reflect the deletion
		revalidatePath("/journal");

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to delete journal entry",
		};
	}
}
