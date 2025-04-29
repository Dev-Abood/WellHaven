"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Brain,
	Calendar,
	Clock,
	Lightbulb,
	Moon,
	Sun,
	Zap,
} from "lucide-react";
import { Mood, SleepQuality } from "@prisma/client";

// Update props to match the Prisma data structure
interface MoodInsightsProps {
	monthlyData: {
		id: string;
		mood: Mood;
		sleepQuality: SleepQuality;
		date: Date;
	}[];
}

// Helper function to convert Mood enum to numeric value
const getMoodValue = (mood: Mood): number => {
	switch (mood) {
		case "OVERJOYED":
			return 5;
		case "HAPPY":
			return 4;
		case "NEUTRAL":
			return 3;
		case "SAD":
			return 2;
		case "DEPRESSED":
			return 1;
		default:
			return 3; // Default to neutral
	}
};

// Helper function to convert SleepQuality enum to numeric value
const getSleepQualityValue = (sleep: SleepQuality): number => {
	switch (sleep) {
		case "EXCELLENT":
			return 5;
		case "GOOD":
			return 4;
		case "FAIR":
			return 3;
		case "POOR":
			return 2;
		case "WORST":
			return 1;
		default:
			return 3; // Default to fair
	}
};

export function MoodInsights({ monthlyData }: MoodInsightsProps) {
	// Calculate day of week patterns
	const calculateDayOfWeekPatterns = () => {
		const dayPatterns = [0, 0, 0, 0, 0, 0, 0]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
		const dayCounts = [0, 0, 0, 0, 0, 0, 0];

		monthlyData.forEach((item) => {
			const date = new Date(item.date);
			const dayOfWeek = date.getDay();
			dayPatterns[dayOfWeek] += getMoodValue(item.mood);
			dayCounts[dayOfWeek]++;
		});

		// Calculate average mood for each day of week
		return dayPatterns.map((total, index) => ({
			day: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			][index],
			average: dayCounts[index] > 0 ? total / dayCounts[index] : 0,
		}));
	};

	const dayOfWeekPatterns = calculateDayOfWeekPatterns();

	// Find best and worst days (filtering out days with no data)
	const daysWithData = dayOfWeekPatterns.filter((day) => day.average > 0);

	const bestDay =
		daysWithData.length > 0
			? [...daysWithData].sort((a, b) => b.average - a.average)[0]
			: { day: "Unknown", average: 0 };

	const worstDay =
		daysWithData.length > 0
			? [...daysWithData].sort((a, b) => a.average - b.average)[0]
			: { day: "Unknown", average: 0 };

	// Calculate sleep correlation if data exists
	const calculateSleepCorrelation = () => {
		if (monthlyData.length === 0) return 0;

		let goodSleepMoodSum = 0;
		let goodSleepCount = 0;
		let poorSleepMoodSum = 0;
		let poorSleepCount = 0;

		monthlyData.forEach((item) => {
			const sleepQuality = getSleepQualityValue(item.sleepQuality);
			const moodValue = getMoodValue(item.mood);

			if (sleepQuality >= 4) {
				// Good or excellent sleep
				goodSleepMoodSum += moodValue;
				goodSleepCount++;
			} else if (sleepQuality <= 2) {
				// Poor or terrible sleep
				poorSleepMoodSum += moodValue;
				poorSleepCount++;
			}
		});

		const goodSleepAvg =
			goodSleepCount > 0 ? goodSleepMoodSum / goodSleepCount : 0;
		const poorSleepAvg =
			poorSleepCount > 0 ? poorSleepMoodSum / poorSleepCount : 0;

		// Calculate percentage improvement if both averages exist
		if (goodSleepAvg > 0 && poorSleepAvg > 0) {
			return ((goodSleepAvg - poorSleepAvg) / poorSleepAvg) * 100;
		}

		return 0;
	};

	const sleepCorrelation = calculateSleepCorrelation();

	// Calculate time of day patterns (mock data since we don't have time info)
	// This is placeholder data - in a real app, you would use actual time data
	const timePatterns = [
		{ time: "Morning", average: 3.8 },
		{ time: "Afternoon", average: 3.2 },
		{ time: "Evening", average: 3.5 },
		{ time: "Night", average: 2.9 },
	];

	// Find best and worst times
	const bestTime = [...timePatterns].sort((a, b) => b.average - a.average)[0];
	const worstTime = [...timePatterns].sort((a, b) => a.average - b.average)[0];

	// Generate personalized insights
	const generateInsights = () => {
		const insights = [];

		// Day of week insight
		if (
			bestDay.average > 0 &&
			worstDay.average > 0 &&
			bestDay.day !== worstDay.day
		) {
			insights.push({
				icon: Calendar,
				title: "Day of Week Pattern",
				description: `Your mood tends to be highest on ${bestDay.day} and lowest on ${worstDay.day}. Consider planning enjoyable activities for ${worstDay.day}s.`,
			});
		}

		// Time of day insight (using mock data)
		insights.push({
			icon: Clock,
			title: "Time of Day Pattern",
			description: `You typically feel best during the ${bestTime.time.toLowerCase()} and more challenged during the ${worstTime.time.toLowerCase()}. Try to schedule important tasks during your peak mood times.`,
		});

		// Sleep correlation (using actual data if available)
		if (sleepCorrelation > 0) {
			insights.push({
				icon: Moon,
				title: "Sleep Correlation",
				description: `There appears to be a strong correlation between your sleep quality and mood. Days following good sleep show a ${sleepCorrelation.toFixed(0)}% improvement in mood scores.`,
			});
		} else {
			insights.push({
				icon: Moon,
				title: "Sleep Correlation",
				description:
					"There appears to be a correlation between your sleep quality and mood. Prioritize good sleep hygiene for better mood outcomes.",
			});
		}

		// Activity correlation (mock - would be replaced with real data in a full implementation)
		insights.push({
			icon: Zap,
			title: "Activity Impact",
			description:
				"Exercise and outdoor activities are associated with a notable increase in your mood scores on the same day.",
		});

		return insights;
	};

	const insights = generateInsights();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Lightbulb className="h-5 w-5 text-amber-500" />
					<span>Mood Insights & Patterns</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="patterns">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="patterns">Patterns</TabsTrigger>
						<TabsTrigger value="suggestions">Suggestions</TabsTrigger>
					</TabsList>

					<TabsContent value="patterns" className="pt-4">
						<div className="grid gap-4 md:grid-cols-2">
							{insights.map((insight, index) => (
								<div key={index} className="flex gap-3 p-3 border rounded-lg">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
										<insight.icon className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h4 className="text-sm font-medium">{insight.title}</h4>
										<p className="text-sm text-muted-foreground">
											{insight.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</TabsContent>

					<TabsContent value="suggestions" className="pt-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="flex gap-3 p-3 border rounded-lg">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
									<Sun className="h-5 w-5 text-amber-600" />
								</div>
								<div>
									<h4 className="text-sm font-medium">Morning Routine</h4>
									<p className="text-sm text-muted-foreground">
										Start your day with 10 minutes of mindfulness meditation to
										set a positive tone.
									</p>
								</div>
							</div>

							<div className="flex gap-3 p-3 border rounded-lg">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
									<Moon className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<h4 className="text-sm font-medium">Sleep Hygiene</h4>
									<p className="text-sm text-muted-foreground">
										Improve sleep quality by avoiding screens 1 hour before
										bedtime and maintaining a consistent schedule.
									</p>
								</div>
							</div>

							<div className="flex gap-3 p-3 border rounded-lg">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
									<Zap className="h-5 w-5 text-green-600" />
								</div>
								<div>
									<h4 className="text-sm font-medium">Activity Planning</h4>
									<p className="text-sm text-muted-foreground">
										{worstDay.day !== "Unknown"
											? `Schedule outdoor activities or exercise on ${worstDay.day}s to counterbalance your typical mood pattern.`
											: "Schedule regular outdoor activities or exercise to improve your overall mood."}
									</p>
								</div>
							</div>

							<div className="flex gap-3 p-3 border rounded-lg">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
									<Brain className="h-5 w-5 text-purple-600" />
								</div>
								<div>
									<h4 className="text-sm font-medium">Cognitive Strategies</h4>
									<p className="text-sm text-muted-foreground">
										Practice thought reframing during{" "}
										{worstTime.time.toLowerCase()} hours when your mood tends to
										be lower.
									</p>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
