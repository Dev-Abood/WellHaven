"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Type for mood creation
interface CreateMoodInput {
	mood: string;
	sleepQuality: string;
	date: string;
}

// Type for mood update
interface UpdateMoodInput {
	id: string;
	mood: string;
	sleepQuality: string;
	date: string;
}

// Create a new mood entry
export async function createMood(data: CreateMoodInput) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	try {
		const dateObj = new Date(data.date);

		// Check if an entry already exists for this date
		const existingMood = await prisma.dailyMood.findFirst({
			where: {
				userId,
				date: {
					gte: new Date(dateObj.setHours(0, 0, 0, 0)),
					lte: new Date(dateObj.setHours(23, 59, 59, 999)),
				},
			},
		});

		if (existingMood) {
			// Update the existing mood instead
			const updatedMood = await prisma.dailyMood.update({
				where: {
					id: existingMood.id,
				},
				data: {
					mood: data.mood as any,
					sleepQuality: data.sleepQuality as any,
					updatedAt: new Date(),
				},
			});

			revalidatePath("/mood");
			return updatedMood;
		}

		// Create new mood
		const newMood = await prisma.dailyMood.create({
			data: {
				userId,
				date: new Date(data.date),
				mood: data.mood as any,
				sleepQuality: data.sleepQuality as any,
			},
		});

		revalidatePath("/mood");
		return newMood;
	} catch (error) {
		console.error("Error creating mood:", error);
		throw new Error("Failed to create mood");
	}
}

// Update an existing mood entry
export async function updateMood(data: UpdateMoodInput) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	try {
		// Verify the mood belongs to the user
		const mood = await prisma.dailyMood.findUnique({
			where: {
				id: data.id,
			},
		});

		if (!mood || mood.userId !== userId) {
			throw new Error("Mood not found or access denied");
		}

		const updatedMood = await prisma.dailyMood.update({
			where: {
				id: data.id,
			},
			data: {
				mood: data.mood as any,
				sleepQuality: data.sleepQuality as any,
				date: new Date(data.date),
				updatedAt: new Date(),
			},
		});

		revalidatePath("/mood");
		return updatedMood;
	} catch (error) {
		console.error("Error updating mood:", error);
		throw new Error("Failed to update mood");
	}
}

// Delete a mood entry
export async function deleteMood(id: string) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	try {
		// Verify the mood belongs to the user
		const mood = await prisma.dailyMood.findUnique({
			where: {
				id,
			},
		});

		if (!mood || mood.userId !== userId) {
			throw new Error("Mood not found or access denied");
		}

		await prisma.dailyMood.delete({
			where: {
				id,
			},
		});

		revalidatePath("/mood");
		return { success: true };
	} catch (error) {
		console.error("Error deleting mood:", error);
		throw new Error("Failed to delete mood");
	}
}
