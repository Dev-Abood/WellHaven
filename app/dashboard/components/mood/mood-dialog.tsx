"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { moodColors, moodEmojis, MoodType } from "./mood-calendar";

interface MoodDialogProps {
	isOpen: boolean;
	onClose: () => void;
	date: Date;
	initialMood: MoodType;
	initialSleep: number;
	onSave: (date: Date, mood: MoodType, sleep: number) => void;
}

export function MoodDialog({
	isOpen,
	onClose,
	date,
	initialMood,
	initialSleep,
	onSave,
}: MoodDialogProps) {
	const [selectedMood, setSelectedMood] = useState<MoodType>(initialMood);
	const [sleepQuality, setSleepQuality] = useState<number>(initialSleep);

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

	const moods: MoodType[] = [
		"happy",
		"neutral",
		"overjoyed",
		"sad",
		"depressed",
	];

	const sleepLabels = [
		"Excellent (8+ hours)",
		"Good (6-8 hours)",
		"Average (5-6 hours)",
		"Poor (3-5 hours)",
		"Insomniac (<3 hours)",
	];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Record Your Mood</DialogTitle>
				</DialogHeader>

				<div className="py-4">
					<div className="flex flex-col gap-1 mb-4">
						<p className="text-sm text-muted-foreground">{formatDate(date)}</p>
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
											{mood}
										</span>
									</button>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-3">Sleep Quality</h3>
							<div className="space-y-2">
								{[1, 2, 3, 4, 5].map((level) => (
									<button
										key={level}
										className={cn(
											"w-full p-3 text-left rounded-lg flex items-center gap-3 transition-all",
											sleepQuality === level
												? "bg-primary/10 ring-2 ring-primary"
												: "bg-gray-100 hover:bg-gray-200",
										)}
										onClick={() => setSleepQuality(level)}
									>
										<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
											{level}
										</div>
										<span>{sleepLabels[level - 1]}</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
