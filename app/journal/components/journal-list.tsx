"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mood } from "@prisma/client";
import { deleteJournal } from "../actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

// Mood mapping configuration
const moodMap = {
	OVERJOYED: {
		icon: "😊",
		color: "bg-green-200",
	},
	HAPPY: {
		icon: "🙂",
		color: "bg-blue-200",
	},
	NEUTRAL: {
		icon: "😐",
		color: "bg-neutral-200",
	},
	SAD: {
		icon: "😢",
		color: "bg-orange-200",
	},
	DEPRESSED: {
		icon: "😞",
		color: "bg-red-200",
	},
	// Add more moods as needed
} as const;

type MoodKey = keyof typeof moodMap;

// Function to get stress level color based on level (1-5)
function getStressLevelColor(level: number) {
	switch (level) {
		case 1:
			return "bg-green-500";
		case 2:
			return "bg-lime-500";
		case 3:
			return "bg-yellow-500";
		case 4:
			return "bg-orange-500";
		case 5:
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
}

type Journal = {
	id: string;
	title: string;
	mood: Mood;
	content: string;
	stressLevel: number;
	createdAt: Date;
	userId: string;
	updatedAt: Date;
};

interface JournalListProps {
	journalData: Journal[];
}

const JournalList = ({ journalData }: JournalListProps) => {
	const [open, setOpen] = useState(false);
	const [journalToDelete, setJournalToDelete] = useState<string | null>(null);

	async function onSubmit(journalId: string) {
		try {
			const response = await deleteJournal(journalId);

			if (response.success) {
				toast.success("Journal deleted successfully");
			} else {
				toast.error("Something went wrong. Please try again.");
				console.log(response.error);
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong. Please try again.");
		} finally {
			setOpen(false);
		}
	}

	const handleDeleteClick = (journalId: string) => {
		setJournalToDelete(journalId);
		setOpen(true);
	};

	return (
		<div className="space-y-6">
			{/* Alert Dialog */}
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							journal entry.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								if (journalToDelete) {
									onSubmit(journalToDelete);
								}
							}}
							className="bg-red-600 hover:bg-red-700"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{journalData.map((journal) => {
				// Get the mood details from the map
				const moodDetails = moodMap[journal.mood as MoodKey] || {
					icon: "❓",
					color: "bg-gray-200",
				};

				return (
					<Card
						key={journal.id}
						className="overflow-hidden border-none shadow-md"
					>
						<CardContent className="p-0">
							<div className="flex items-start p-4 gap-4">
								<div
									className={`${moodDetails.color} p-3 rounded-full flex-shrink-0`}
								>
									<span className="text-2xl">{moodDetails.icon}</span>
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex justify-between items-start">
										<h3 className="font-semibold text-lg truncate">
											{journal.title}
										</h3>
										<Badge
											variant="outline"
											className={`${moodDetails.color} border-none ml-2`}
										>
											{journal.mood.toLowerCase()}
										</Badge>
									</div>
									<p className="text-muted-foreground line-clamp-2 mt-1">
										{journal.content}
									</p>

									{/* Stress Level Indicator */}
									<div className="mt-3 flex items-center gap-2">
										<span className="text-xs font-medium text-muted-foreground">
											Stress Level:
										</span>
										<div className="flex items-center gap-1">
											{[1, 2, 3, 4, 5].map((level) => (
												<div
													key={level}
													className={`h-2 w-6 rounded-full ${
														level <= journal.stressLevel
															? getStressLevelColor(level)
															: "bg-gray-200"
													}`}
												/>
											))}
										</div>
										<span className="text-xs font-medium">
											{journal.stressLevel}/5
										</span>
									</div>

									<div className="flex justify-between items-center mt-3">
										<span className="text-xs text-muted-foreground">
											{formatDistanceToNow(journal.createdAt, {
												addSuffix: true,
											})}
										</span>
										<div className="flex items-center gap-2">
											<Link href={`/journal/${journal.id}`}>
												<Button
													variant="outline"
													size="sm"
													className="h-8 text-[#5D4037] border-[#5D4037] hover:bg-[#5D4037]/10"
												>
													Edit
												</Button>
											</Link>
											<Button
												variant="outline"
												size="sm"
												className="h-8 text-red-600 border-red-600 hover:bg-red-600/10"
												onClick={() => handleDeleteClick(journal.id)}
											>
												Delete
											</Button>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};

export default JournalList;
