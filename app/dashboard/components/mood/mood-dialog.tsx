"use client";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { moodColors, moodEmojis } from "./mood-calendar";
import { Trash2 } from "lucide-react";
import { Mood, SleepQuality } from "@prisma/client";
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

interface MoodDialogProps {
	isOpen: boolean;
	onClose: () => void;
	date: Date;
	initialMood: Mood;
	initialSleep: SleepQuality;
	onSave: (date: Date, mood: Mood, sleep: SleepQuality) => void;
	onDelete?: () => void;
	isDeleting?: boolean;
	isEditing?: boolean;
}

export function MoodDialog({
	isOpen,
	onClose,
	date,
	initialMood,
	initialSleep,
	onSave,
	onDelete,
	isDeleting = false,
	isEditing = false,
}: MoodDialogProps) {
	const [selectedMood, setSelectedMood] = useState<Mood>(initialMood);
	const [sleepQuality, setSleepQuality] = useState<SleepQuality>(initialSleep);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	// Add this useEffect to sync state with props
	useEffect(() => {
		setSelectedMood(initialMood);
		setSleepQuality(initialSleep);
	}, [initialMood, initialSleep, isOpen]); // Also trigger when dialog opens

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const handleSave = () => {
		onSave(date, selectedMood, sleepQuality);
	};

	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		setIsDeleteDialogOpen(false);
		if (onDelete) {
			onDelete();
		}
	};

	const moods: Mood[] = ["HAPPY", "NEUTRAL", "OVERJOYED", "SAD", "DEPRESSED"];

	const sleepQualities: SleepQuality[] = [
		"EXCELLENT",
		"GOOD",
		"FAIR",
		"POOR",
		"WORST",
	];

	const sleepLabels: Record<SleepQuality, string> = {
		EXCELLENT: "Excellent (8+ hours)",
		GOOD: "Good (6-8 hours)",
		FAIR: "Average (5-6 hours)",
		POOR: "Poor (3-5 hours)",
		WORST: "Insomniac (<3 hours)",
	};

	console.log(initialMood, initialSleep);

	return (
		<>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>
							{isEditing ? "Edit Your Mood" : "Record Your Mood"}
						</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<div className="flex flex-col gap-1 mb-4">
							<p className="text-sm text-muted-foreground">
								{formatDate(date)}
							</p>
							<p className="text-xs text-muted-foreground">
								ISO Date:{" "}
								<code className="bg-gray-100 px-1 py-0.5 rounded">
									{date.toISOString().split("T")[0]}
								</code>
							</p>
						</div>
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-medium mb-3">
									How are you feeling today?
								</h3>
								<div className="flex justify-between gap-2">
									{moods.map((mood) => (
										<button
											key={mood}
											className={cn(
												"flex-1 aspect-square rounded-lg flex flex-col items-center justify-center gap-2 transition-all",
												selectedMood === mood
													? `${moodColors[mood]} ring-2 ring-offset-2 ring-primary`
													: `bg-gray-100 hover:${moodColors[mood].split(" ")[1]}`,
											)}
											onClick={() => setSelectedMood(mood)}
										>
											<span className="text-2xl">{moodEmojis[mood]}</span>
											<span className="text-xs font-medium capitalize">
												{mood.toLowerCase()}
											</span>
										</button>
									))}
								</div>
							</div>
							<div>
								<h3 className="text-lg font-medium mb-3">Sleep Quality</h3>
								<div className="space-y-2">
									{sleepQualities.map((quality, index) => (
										<button
											key={quality}
											className={cn(
												"w-full p-3 text-left rounded-lg flex items-center gap-3 transition-all",
												sleepQuality === quality
													? "bg-primary/10 ring-2 ring-primary"
													: "bg-gray-100 hover:bg-gray-200",
											)}
											onClick={() => setSleepQuality(quality)}
										>
											<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
												{5 - index}
											</div>
											<span>{sleepLabels[quality]}</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
					<DialogFooter className="flex justify-between items-center w-full">
						<div className="flex gap-2">
							{isEditing && onDelete && (
								<Button
									variant="destructive"
									size="icon"
									onClick={handleDeleteClick}
									disabled={isDeleting}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							)}
						</div>
						<div className="flex gap-2">
							<Button variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button onClick={handleSave}>
								{isEditing ? "Update" : "Save"}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							mood record for {formatDate(date)}.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
