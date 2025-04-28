"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoodDialog } from "./mood-dialog";

// Mood types and colors
export type MoodType = "happy" | "neutral" | "overjoyed" | "sad" | "depressed";

export const moodColors: Record<string, string> = {
	happy: "bg-yellow-300 hover:bg-yellow-400",
	neutral: "bg-amber-200 hover:bg-amber-300",
	overjoyed: "bg-green-300 hover:bg-green-400",
	sad: "bg-red-300 hover:bg-red-400",
	depressed: "bg-purple-300 hover:bg-purple-400",
};

export const moodEmojis: Record<string, string> = {
	happy: "😊",
	neutral: "😐",
	overjoyed: "😄",
	sad: "😔",
	depressed: "😞",
};

// Interface for mood data
export interface MoodData {
	mood: MoodType;
	sleep: number;
	date: string; // ISO date string format
}

// Mock data for the calendar
const generateMockMoodData = () => {
	const moods: MoodType[] = [
		"happy",
		"neutral",
		"overjoyed",
		"sad",
		"depressed",
	];
	const today = new Date();

	const mockData: Record<string, MoodData> = {};

	// Generate data for past 3 months and next 3 months
	for (let monthOffset = -3; monthOffset <= 3; monthOffset++) {
		const currentYear =
			today.getFullYear() + Math.floor((today.getMonth() + monthOffset) / 12);
		const adjustedMonth = (((today.getMonth() + monthOffset) % 12) + 12) % 12; // Handle negative months

		const daysInMonth = new Date(currentYear, adjustedMonth + 1, 0).getDate();

		for (let day = 1; day <= daysInMonth; day++) {
			// Only add data for past days and some random future days
			const date = new Date(currentYear, adjustedMonth, day);
			const isoDate = date.toISOString().split("T")[0];

			if (date < today || Math.random() > 0.7) {
				mockData[isoDate] = {
					mood: moods[Math.floor(Math.random() * moods.length)],
					sleep: Math.floor(Math.random() * 5) + 1,
					date: isoDate,
				};
			}
		}
	}

	return mockData;
};

export function MoodCalendar() {
	const [visibleMonthsStart, setVisibleMonthsStart] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [moodData, setMoodData] = useState<Record<string, MoodData>>({});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Number of months to display
	const numberOfMonthsToShow = 3;

	// Load mock data
	useEffect(() => {
		// Simulate API call
		setTimeout(() => {
			setMoodData(generateMockMoodData());
			setIsLoading(false);
		}, 500);
	}, []);

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
	const saveMoodData = (date: Date, mood: MoodType, sleep: number) => {
		const isoDate = date.toISOString().split("T")[0];

		const updatedData = {
			...moodData,
			[isoDate]: {
				mood,
				sleep,
				date: isoDate,
			},
		};

		setMoodData(updatedData);
		setIsDialogOpen(false);

		console.log("Saving mood data:", {
			date: isoDate,
			mood,
			sleep,
		});

		// This is where you would send data to your backend
		// Example:
		// fetch('/api/mood', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify({ date: isoDate, mood, sleep })
		// })
	};

	// Get mood for a specific date
	const getMoodForDate = (date: Date) => {
		const isoDate = date.toISOString().split("T")[0];
		return moodData[isoDate]?.mood || null;
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
					<div className="w-4 h-4 rounded-full bg-amber-200"></div>
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
					initialMood={getMoodForDate(selectedDate)}
					initialSleep={
						moodData[selectedDate.toISOString().split("T")[0]]?.sleep || 3
					}
					onSave={saveMoodData}
				/>
			)}
		</div>
	);
}

interface MonthCalendarProps {
	date: Date;
	getMoodForDate: (date: Date) => MoodType;
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
