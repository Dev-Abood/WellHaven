"use client";

import { cn } from "@/lib/utils";
import { Mood } from "@prisma/client";
import { useEffect, useState } from "react";

const moodEmojis: Record<Mood, string> = {
	HAPPY: "😊",
	NEUTRAL: "😐",
	OVERJOYED: "😁",
	SAD: "😔",
	DEPRESSED: "😢",
};

const emptyMoodEmoji = "🫥"; // Dotted line face
const emptyMoodColor = "bg-slate-100";

interface WeeklyMoodReportProps {
	data: { date: Date; mood: Mood }[];
}

export function WeeklyMoodReport({ data }: WeeklyMoodReportProps) {
	const [displayData, setDisplayData] = useState<
		{ date: Date; mood: Mood | null }[]
	>([]);

	// Ensure we always show 7 days, filling in gaps with null moods
	useEffect(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Normalize to start of day

		const sevenDaysAgo = new Date(today);
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Get full 7 days including today

		// Create a map of dates to moods for easy lookup
		const moodMap = new Map<string, Mood>();
		data.forEach((item) => {
			const date = new Date(item.date);
			date.setHours(0, 0, 0, 0); // Normalize to start of day
			const dateStr = date.toISOString().split("T")[0];
			moodMap.set(dateStr, item.mood);
		});

		// Generate display data for the last 7 days
		const newDisplayData: { date: Date; mood: Mood | null }[] = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(sevenDaysAgo);
			date.setDate(date.getDate() + i);
			date.setHours(0, 0, 0, 0); // Ensure time is normalized
			const dateStr = date.toISOString().split("T")[0];

			newDisplayData.push({
				date,
				mood: moodMap.get(dateStr) || null,
			});
		}

		setDisplayData(newDisplayData);
	}, [data]);

	const moodColors: Record<Mood, string> = {
		HAPPY: "bg-yellow-300",
		NEUTRAL: "bg-zinc-200",
		OVERJOYED: "bg-green-300",
		SAD: "bg-red-300",
		DEPRESSED: "bg-purple-300",
	};

	const getDayName = (date: Date) => {
		return date.toLocaleDateString("en-US", { weekday: "short" });
	};

	const isToday = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);
		return date.getTime() === today.getTime();
	};

	return (
		<div className="py-4">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h3 className="text-lg font-medium">Last 7 Days</h3>
					<p className="text-sm text-muted-foreground">
						Your mood journey for the past week
					</p>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-2 md:gap-4">
				{displayData.map((day, index) => (
					<div key={index} className="flex flex-col items-center gap-2">
						<div
							className={cn(
								"w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl",
								day.mood ? moodColors[day.mood] : emptyMoodColor,
								isToday(day.date) ? "ring-2 ring-offset-2 ring-primary" : "",
							)}
						>
							{day.mood ? moodEmojis[day.mood] : emptyMoodEmoji}
						</div>
						<div className="text-center">
							<p
								className={cn(
									"text-xs font-medium",
									isToday(day.date) ? "text-primary font-bold" : "",
								)}
							>
								{getDayName(day.date)}
							</p>
							<p className="text-xs text-muted-foreground">
								{day.date.getDate()}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 pt-4 border-t">
				<h4 className="text-sm font-medium mb-3">Mood Legend</h4>
				<div className="grid grid-cols-3 gap-2 text-xs">
					{/* Mood items */}
					{Object.entries(moodEmojis).map(([mood, emoji]) => (
						<div key={mood} className="flex items-center gap-2">
							<div
								className={`w-5 h-5 rounded-full ${moodColors[mood as Mood]}`}
							/>
							<span>
								{emoji} {mood.toLowerCase()}
							</span>
						</div>
					))}
					{/* Empty state item */}
					<div className="flex items-center gap-2">
						<div className={`w-5 h-5 rounded-full ${emptyMoodColor}`} />
						<span>{emptyMoodEmoji} No data</span>
					</div>
				</div>
			</div>

			<div className="mt-8 pt-6 border-t">
				<h4 className="text-sm font-medium mb-2">Weekly Insights</h4>
				<p className="text-sm text-muted-foreground">
					{generateWeeklyInsight(
						displayData.filter((d) => d.mood !== null) as {
							date: Date;
							mood: Mood;
						}[],
					)}
				</p>
			</div>
		</div>
	);
}

function generateWeeklyInsight(data: { date: Date; mood: Mood }[]): string {
	if (data.length === 0) {
		return "No mood data available for this week. Check back later or add your moods!";
	}

	const moodCounts = {
		positive: data.filter((d) => d.mood === "HAPPY" || d.mood === "OVERJOYED")
			.length,
		neutral: data.filter((d) => d.mood === "NEUTRAL").length,
		negative: data.filter((d) => d.mood === "SAD" || d.mood === "DEPRESSED")
			.length,
	};

	const total = moodCounts.positive + moodCounts.neutral + moodCounts.negative;

	if (
		moodCounts.positive > moodCounts.negative &&
		moodCounts.positive > moodCounts.neutral
	) {
		return `You've had a positive week with ${moodCounts.positive} good days out of ${total}. Keep up the great work!`;
	} else if (
		moodCounts.negative > moodCounts.positive &&
		moodCounts.negative > moodCounts.neutral
	) {
		return `This week has been challenging with ${moodCounts.negative} difficult days out of ${total}. Remember to practice self-care.`;
	} else if (
		moodCounts.neutral > moodCounts.positive &&
		moodCounts.neutral > moodCounts.negative
	) {
		return `Your week has been mostly neutral with ${moodCounts.neutral} balanced days out of ${total}. Consider activities that bring you joy.`;
	} else {
		return `Your week has been mixed with ${moodCounts.positive} good days, ${moodCounts.neutral} neutral days, and ${moodCounts.negative} challenging days.`;
	}
}
