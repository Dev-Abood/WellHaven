"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoodInsights } from "./mood-insights";
import { MonthlyMoodChart } from "./monthly-mood-chart";
import { WeeklyMoodReport } from "./weekly-mood-report";
import { QuoteDisplay } from "./quote-display";
import { Mood, SleepQuality } from "@prisma/client";
import { useEffect, useState } from "react";
import { MoodSummaryStats } from "./mood-summary-stats";

interface SummaryDashboardProps {
	dailyMoods: {
		id: string;
		mood: Mood;
		sleepQuality: SleepQuality;
		date: Date;
	}[];
}

export function SummaryDashboard({ dailyMoods }: SummaryDashboardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [overallMood, setOverallMood] = useState<"High" | "Medium" | "Low">(
		"Medium",
	);

	// Process the weekly data - Last 7 days
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
	const weeklyData = dailyMoods
		.filter((mood) => new Date(mood.date) >= sevenDaysAgo)
		.map((mood) => ({
			date: new Date(mood.date),
			mood: mood.mood,
		}));

	// Calculate overall mood when data changes
	useEffect(() => {
		if (weeklyData.length > 0) {
			const recentMoods = weeklyData.slice(-3).map((d) => d.mood);
			const moodCount = {
				positive: recentMoods.filter((m) => m === "HAPPY" || m === "OVERJOYED")
					.length,
				negative: recentMoods.filter((m) => m === "SAD" || m === "DEPRESSED")
					.length,
			};
			if (moodCount.positive >= 2) setOverallMood("High");
			else if (moodCount.negative >= 2) setOverallMood("Low");
			else setOverallMood("Medium");
		}
	}, [weeklyData]);

	console.log(weeklyData);

	const moodColors = {
		High: "bg-green-100 text-green-800",
		Medium: "bg-amber-100 text-amber-800",
		Low: "bg-red-100 text-red-800",
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Summary</h1>
					<p className="text-muted-foreground">
						Your mood analytics and insights
					</p>
				</div>
				<Badge className={`text-sm px-3 py-1 ${moodColors[overallMood]}`}>
					{overallMood}
				</Badge>
			</div>
			<QuoteDisplay />
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Weekly Mood Report</CardTitle>
						</CardHeader>
						<CardContent>
							{isLoading ? (
								<div className="flex justify-center items-center h-48">
									<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
								</div>
							) : (
								<WeeklyMoodReport data={weeklyData} />
							)}
						</CardContent>
					</Card>
				</div>
				<div className="lg:col-span-1">
					<MoodSummaryStats
						weeklyData={weeklyData}
						monthlyData={dailyMoods}
						isLoading={isLoading}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Monthly Mood Trends</CardTitle>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="flex justify-center items-center h-48">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
							</div>
						) : (
							<MonthlyMoodChart data={dailyMoods} />
						)}
					</CardContent>
				</Card>
			</div>

			{/* Add MoodInsights component if not loading */}
			{!isLoading && <MoodInsights monthlyData={dailyMoods} />}
		</div>
	);
}
