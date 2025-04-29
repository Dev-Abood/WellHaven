"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mood, SleepQuality } from "@prisma/client";

interface MoodSummaryStatsProps {
	weeklyData: { date: Date; mood: Mood }[];
	monthlyData: {
		id: string;
		mood: Mood;
		sleepQuality: SleepQuality;
		date: Date;
	}[];
	isLoading: boolean;
}

export function MoodSummaryStats({
	weeklyData,
	monthlyData,
	isLoading,
}: MoodSummaryStatsProps) {
	// Calculate average mood from monthly data
	const calculateAverageMood = () => {
		if (monthlyData.length === 0) return 0;

		// Convert mood enum to number value for calculation
		const moodValues = {
			DEPRESSED: 1,
			SAD: 2,
			NEUTRAL: 3,
			HAPPY: 4,
			OVERJOYED: 5,
		};

		const sum = monthlyData.reduce((acc, day) => acc + moodValues[day.mood], 0);
		return sum / monthlyData.length;
	};

	const averageMood = calculateAverageMood();

	// Calculate mood distribution from weekly data
	const calculateMoodDistribution = () => {
		const distribution: Record<string, number> = {
			HAPPY: 0,
			NEUTRAL: 0,
			OVERJOYED: 0,
			SAD: 0,
			DEPRESSED: 0,
		};

		weeklyData.forEach((day) => {
			if (day.mood) {
				distribution[day.mood]++;
			}
		});

		return distribution;
	};

	const moodDistribution = calculateMoodDistribution();

	// Calculate streak (consecutive days with recorded mood)
	const calculateStreak = () => {
		let streak = 0;
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Sort data by date (newest first)
		const sortedData = [...monthlyData].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

		// Check for consecutive days
		for (let i = 0; i < 30; i++) {
			const date = new Date();
			date.setDate(today.getDate() - i);
			date.setHours(0, 0, 0, 0);

			const dateStr = date.toISOString().split("T")[0];
			const hasMood = sortedData.some(
				(d) => new Date(d.date).toISOString().split("T")[0] === dateStr,
			);

			if (hasMood) streak++;
			else break;
		}

		return streak;
	};

	const streak = calculateStreak();

	// Calculate mood stability (standard deviation)
	const calculateMoodStability = () => {
		if (monthlyData.length < 2) return 100;

		// Convert mood enum to number value for calculation
		const moodValues = {
			DEPRESSED: 1,
			SAD: 2,
			NEUTRAL: 3,
			HAPPY: 4,
			OVERJOYED: 5,
		};

		const moodScores = monthlyData.map((d) => moodValues[d.mood]);
		const mean =
			moodScores.reduce((sum, val) => sum + val, 0) / moodScores.length;
		const squaredDiffs = moodScores.map((score) => Math.pow(score - mean, 2));
		const variance =
			squaredDiffs.reduce((acc, val) => acc + val, 0) / moodScores.length;
		const stdDev = Math.sqrt(variance);

		// Convert to a 0-100 scale where 100 is most stable
		return Math.max(0, Math.min(100, 100 - stdDev * 25));
	};

	const stability = calculateMoodStability();

	// Get mood description based on average
	const getMoodDescription = (avg: number) => {
		if (avg >= 4.5) return "Overjoyed";
		if (avg >= 3.5) return "Happy";
		if (avg >= 2.5) return "Neutral";
		if (avg >= 1.5) return "Sad";
		return "Depressed";
	};

	const renderStat = (
		title: string,
		value: string | number,
		description: string,
	) => {
		return (
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">{description}</p>
			</div>
		);
	};

	// Find the most common mood
	const getMostCommonMood = () => {
		const entries = Object.entries(moodDistribution);
		if (entries.length === 0) return ["NEUTRAL", 0];

		const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
		return sortedEntries[0];
	};

	const [mostCommonMood, mostCommonCount] = getMostCommonMood();
	const formattedMostCommonMood =
		(mostCommonMood as string).charAt(0) +
		(mostCommonMood as string).slice(1).toLowerCase();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Mood Statistics</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{isLoading ? (
						<>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-8 w-16" />
								<Skeleton className="h-3 w-32" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-8 w-16" />
								<Skeleton className="h-3 w-32" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-8 w-16" />
								<Skeleton className="h-3 w-32" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-8 w-16" />
								<Skeleton className="h-3 w-32" />
							</div>
						</>
					) : (
						<>
							{renderStat(
								"Average Mood",
								averageMood.toFixed(1),
								getMoodDescription(averageMood),
							)}

							{renderStat(
								"Most Common Mood",
								formattedMostCommonMood,
								`${mostCommonCount} ${mostCommonCount === 1 ? "day" : "days"} this week`,
							)}

							{renderStat(
								"Current Streak",
								streak,
								`${streak === 1 ? "day" : "days"} in a row`,
							)}

							{renderStat(
								"Mood Stability",
								`${Math.round(stability)}%`,
								stability >= 75
									? "Very stable"
									: stability >= 50
										? "Moderately stable"
										: stability >= 25
											? "Somewhat variable"
											: "Highly variable",
							)}
						</>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
