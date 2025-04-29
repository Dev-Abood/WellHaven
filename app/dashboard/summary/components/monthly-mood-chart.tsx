"use client";

import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
	Label,
} from "recharts";
import { Mood, SleepQuality } from "@prisma/client";

// Define the props type to match your actual data structure
interface MonthlyMoodChartProps {
	data: {
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

export function MonthlyMoodChart({ data }: MonthlyMoodChartProps) {
	const [timeRange, setTimeRange] = useState<"30days" | "90days" | "year">(
		"30days",
	);

	// Filter data based on selected time range
	const getFilteredData = () => {
		const today = new Date();
		let daysToSubtract = 30;

		if (timeRange === "90days") daysToSubtract = 90;
		if (timeRange === "year") daysToSubtract = 365;

		const startDate = new Date();
		startDate.setDate(today.getDate() - daysToSubtract);

		return data
			.filter((item) => {
				const itemDate = new Date(item.date);
				return itemDate >= startDate;
			})
			.map((item) => ({
				date: new Date(item.date).toISOString().split("T")[0], // Format as YYYY-MM-DD
				formattedDate: new Date(item.date).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				}),
				mood: getMoodValue(item.mood), // Convert mood enum to numeric value
				originalMood: item.mood, // Keep original mood for reference
			}));
	};

	const filteredData = getFilteredData();

	// Add mood labels at specific points
	const moodLabels = [
		{ value: 5, label: "Overjoyed", color: "#4ade80" },
		{ value: 4, label: "Happy", color: "#fbbf24" },
		{ value: 3, label: "Neutral", color: "#d1d5db" },
		{ value: 2, label: "Sad", color: "#f87171" },
		{ value: 1, label: "Depressed", color: "#c084fc" },
	];

	// Custom tooltip
	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			const moodValue = payload[0].value;
			const moodLabel =
				moodLabels.find((m) => Math.round(moodValue) === m.value)?.label ||
				"Neutral";

			return (
				<div className="bg-white p-3 border rounded-md shadow-md">
					<p className="text-sm">{`Date: ${label}`}</p>
					<p className="text-sm font-medium">{`Mood: ${moodLabel} (${moodValue.toFixed(1)})`}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-medium">Mood Trends</h3>
				<Select
					value={timeRange}
					onValueChange={(value) => setTimeRange(value as any)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select time range" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="30days">Last 30 Days</SelectItem>
						<SelectItem value="90days">Last 90 Days</SelectItem>
						<SelectItem value="year">Last Year</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="w-full h-[300px]">
				{filteredData.length > 0 ? (
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={filteredData}
							margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
						>
							<defs>
								<linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#4ade80" stopOpacity={0.8} />
									<stop offset="50%" stopColor="#fbbf24" stopOpacity={0.6} />
									<stop offset="100%" stopColor="#f87171" stopOpacity={0.4} />
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								opacity={0.2}
							/>
							<XAxis
								dataKey="formattedDate"
								tick={{ fontSize: 12 }}
								tickCount={5}
								interval="preserveStartEnd"
							/>
							<YAxis
								domain={[1, 5]}
								ticks={[1, 2, 3, 4, 5]}
								tick={false}
								axisLine={false}
							/>
							<Tooltip content={<CustomTooltip />} />

							{/* Reference lines for mood levels */}
							{moodLabels.map((mood) => (
								<ReferenceLine
									key={mood.value}
									y={mood.value}
									stroke={mood.color}
									strokeDasharray="3 3"
									opacity={0.7}
								>
									<Label
										value={mood.label}
										position="left"
										fill={mood.color}
										fontSize={12}
										fontWeight="bold"
									/>
								</ReferenceLine>
							))}

							<Area
								type="monotone"
								dataKey="mood"
								stroke="#6366f1"
								strokeWidth={2}
								fill="url(#moodGradient)"
								activeDot={{ r: 6 }}
							/>
						</AreaChart>
					</ResponsiveContainer>
				) : (
					<div className="flex items-center justify-center h-full">
						<p className="text-muted-foreground">
							No mood data available for this time period
						</p>
					</div>
				)}
			</div>

			<div className="text-sm text-muted-foreground">
				<p>
					This chart shows your mood fluctuations over time. Higher points
					indicate more positive moods, while lower points represent more
					challenging days.
				</p>
			</div>
		</div>
	);
}
