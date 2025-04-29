"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoodDialog } from "./mood-dialog";
import { toast } from "sonner";
import { createMood, deleteMood, updateMood } from "../../mood/actions";
import { Mood, SleepQuality } from "@prisma/client";

// Mood types and colors based on your schema

export const moodColors: Record<string, string> = {
	HAPPY: "bg-yellow-300 hover:bg-yellow-400",
	NEUTRAL: "bg-zinc-200 hover:bg-zinc-300",
	OVERJOYED: "bg-green-300 hover:bg-green-400",
	SAD: "bg-red-300 hover:bg-red-400",
	DEPRESSED: "bg-purple-300 hover:bg-purple-400",
};

export const moodEmojis: Record<string, string> = {
	HAPPY: "😊",
	NEUTRAL: "😐",
	OVERJOYED: "😄",
	SAD: "😔",
	DEPRESSED: "😞",
};

// Interface for mood data
export interface MoodData {
	id: string;
	mood: Mood;
	date: Date;
	sleepQuality: SleepQuality;
}

// Props for the MoodCalendar component
interface MoodCalendarProps {
	dailyMoods: MoodData[];
}

export function MoodCalendar({ dailyMoods }: MoodCalendarProps) {
	const [visibleMonthsStart, setVisibleMonthsStart] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [moodData, setMoodData] = useState<Record<string, MoodData>>({});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	// Number of months to display
	const numberOfMonthsToShow = 3;

	// Load initial data from props
	useEffect(() => {
		const moodMap: Record<string, MoodData> = {};

		// Convert dailyMoods array to a date-keyed object
		dailyMoods.forEach((mood) => {
			const isoDate = mood.date.toISOString().split("T")[0];
			moodMap[isoDate] = mood;
		});

		setMoodData(moodMap);
		setIsLoading(false);
	}, [dailyMoods]);

	// Navigate to previous months
	const prevMonths = () => {
		const newDate = new Date(visibleMonthsStart);
		newDate.setMonth(newDate.getMonth() - numberOfMonthsToShow);
		setVisibleMonthsStart(newDate);
	};

	// Navigate to next months
	const nextMonths = () => {
		const newDate = new Date(visibleMonthsStart);
		newDate.setMonth(newDate.getMonth() + numberOfMonthsToShow);
		setVisibleMonthsStart(newDate);
	};

	// Handle day click
	const handleDayClick = (date: Date) => {
		setSelectedDate(date);
		setIsDialogOpen(true);
	};

	// Save mood data
	const saveMoodData = async (
		date: Date,
		mood: Mood,
		sleepQuality: SleepQuality,
	) => {
		const isoDate = date.toISOString().split("T")[0];
		const existingMood = moodData[isoDate];

		try {
			if (existingMood?.id) {
				// Update existing mood
				await updateMood({
					id: existingMood.id,
					mood,
					sleepQuality,
					date: new Date(date).toISOString(),
				});

				toast.success("Mood updated successfully");

				// Update the local state
				const updatedData = {
					...moodData,
					[isoDate]: {
						id: existingMood.id,
						mood,
						sleepQuality,
						date: new Date(date),
					},
				};

				setMoodData(updatedData);
			} else {
				// Create new mood
				const newMood = await createMood({
					mood,
					sleepQuality,
					date: new Date(date).toISOString(),
				});

				toast.success("Mood recorded successfully");

				// Update the local state
				const updatedData = {
					...moodData,
					[isoDate]: {
						id: newMood.id,
						mood,
						sleepQuality,
						date: new Date(date),
					},
				};

				setMoodData(updatedData);
			}
		} catch (error) {
			toast.error("Failed to save mood");
			console.error("Error saving mood:", error);
		}

		setIsDialogOpen(false);
	};

	// Delete mood data
	const handleDeleteMood = async () => {
		if (!selectedDate) return;

		const isoDate = selectedDate.toISOString().split("T")[0];
		const existingMood = moodData[isoDate];

		if (existingMood?.id) {
			setIsDeleting(true);

			try {
				await deleteMood(existingMood.id);

				// Remove from local state
				const updatedData = { ...moodData };
				delete updatedData[isoDate];
				setMoodData(updatedData);

				toast.success("Mood deleted successfully");
			} catch (error) {
				toast.error("Failed to delete mood");
				console.error("Error deleting mood:", error);
			} finally {
				setIsDeleting(false);
				setIsDialogOpen(false);
			}
		}
	};

	// Get mood for a specific date
	const getMoodForDate = (date: Date) => {
		const isoDate = date.toISOString().split("T")[0];
		return moodData[isoDate]?.mood || null;
	};

	// Get sleep quality for a specific date
	const getSleepQualityForDate = (date: Date): SleepQuality | null => {
		const isoDate = date.toISOString().split("T")[0];
		return moodData[isoDate]?.sleepQuality || null;
	};

	// Get mood data for a specific date
	const getMoodDataForDate = (date: Date): MoodData | null => {
		const isoDate = date.toISOString().split("T")[0];
		return moodData[isoDate] || null;
	};

	// Generate months to display
	const generateMonths = () => {
		const months = [];

		for (let i = 0; i < numberOfMonthsToShow; i++) {
			const monthDate = new Date(visibleMonthsStart);
			monthDate.setMonth(visibleMonthsStart.getMonth() + i);
			months.push(
				<MonthCalendar
					key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}
					date={monthDate}
					getMoodForDate={getMoodForDate}
					onDayClick={handleDayClick}
				/>,
			);
		}

		return months;
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold">Mood Calendar</h2>
				<div className="flex gap-2">
					<Button variant="outline" size="icon" onClick={prevMonths}>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="icon" onClick={nextMonths}>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{generateMonths()}
				</div>
			)}

			<div className="mt-8 flex flex-wrap gap-4">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-yellow-300"></div>
					<span className="text-sm">Happy</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-zinc-200"></div>
					<span className="text-sm">Neutral</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-green-300"></div>
					<span className="text-sm">Overjoyed</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-red-300"></div>
					<span className="text-sm">Sad</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-purple-300"></div>
					<span className="text-sm">Depressed</span>
				</div>
			</div>

			{selectedDate && (
				<MoodDialog
					isOpen={isDialogOpen}
					onClose={() => setIsDialogOpen(false)}
					date={selectedDate}
					initialMood={(getMoodForDate(selectedDate) as Mood) || "NEUTRAL"}
					initialSleep={getSleepQualityForDate(selectedDate) || "GOOD"}
					onSave={saveMoodData}
					onDelete={handleDeleteMood}
					isDeleting={isDeleting}
					isEditing={!!getMoodDataForDate(selectedDate)}
				/>
			)}
		</div>
	);
}

interface MonthCalendarProps {
	date: Date;
	getMoodForDate: (date: Date) => Mood | null;
	onDayClick: (date: Date) => void;
}

function MonthCalendar({
	date,
	getMoodForDate,
	onDayClick,
}: MonthCalendarProps) {
	const currentMonth = date.getMonth();
	const currentYear = date.getFullYear();

	// Get the first day of the month
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
	const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

	// Get the number of days in the month
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	// Get the number of days in the previous month
	const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

	// Get month name
	const monthName = date.toLocaleString("default", { month: "long" });

	// Generate calendar days
	const generateCalendarDays = () => {
		const days = [];
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Add days from previous month
		for (let i = startingDayOfWeek - 1; i >= 0; i--) {
			const day = daysInPrevMonth - i;
			const prevMonthDate = new Date(currentYear, currentMonth - 1, day);
			const mood = getMoodForDate(prevMonthDate);

			days.push(
				<button
					key={`prev-${day}`}
					className={cn(
						"h-10 w-10 rounded-full flex items-center justify-center text-sm text-gray-400",
						mood ? moodColors[mood] : "hover:bg-gray-100",
					)}
					onClick={() => onDayClick(prevMonthDate)}
					aria-label={`${prevMonthDate.toLocaleDateString()}`}
				>
					{day}
				</button>,
			);
		}

		// Add days from current month
		for (let day = 1; day <= daysInMonth; day++) {
			const currentDate = new Date(currentYear, currentMonth, day);
			const isToday = currentDate.getTime() === today.getTime();
			const mood = getMoodForDate(currentDate);

			days.push(
				<button
					key={`current-${day}`}
					className={cn(
						"h-10 w-10 rounded-full flex items-center justify-center text-sm",
						isToday ? "ring-2 ring-offset-2 ring-primary" : "",
						mood ? moodColors[mood] : "hover:bg-gray-100",
					)}
					onClick={() => onDayClick(currentDate)}
					aria-label={`${currentDate.toLocaleDateString()}`}
				>
					{day}
				</button>,
			);
		}

		// Add days from next month to fill the grid
		const totalDaysDisplayed = days.length;
		const remainingCells = 42 - totalDaysDisplayed; // 6 rows of 7 days

		for (let day = 1; day <= remainingCells; day++) {
			const nextMonthDate = new Date(currentYear, currentMonth + 1, day);
			const mood = getMoodForDate(nextMonthDate);

			days.push(
				<button
					key={`next-${day}`}
					className={cn(
						"h-10 w-10 rounded-full flex items-center justify-center text-sm text-gray-400",
						mood ? moodColors[mood] : "hover:bg-gray-100",
					)}
					onClick={() => onDayClick(nextMonthDate)}
					aria-label={`${nextMonthDate.toLocaleDateString()}`}
				>
					{day}
				</button>,
			);
		}

		return days;
	};

	return (
		<Card>
			<CardContent className="p-4">
				<h3 className="text-xl font-semibold mb-4">
					{monthName} {currentYear}
				</h3>
				<div className="grid grid-cols-7 gap-1">
					{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
						<div
							key={day}
							className="h-8 flex items-center justify-center text-xs font-medium text-gray-500"
						>
							{day}
						</div>
					))}
					{generateCalendarDays()}
				</div>
			</CardContent>
		</Card>
	);
}
