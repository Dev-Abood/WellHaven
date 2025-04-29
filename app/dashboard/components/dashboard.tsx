"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	CalendarDays,
	MessageSquare,
	Plus,
	Settings,
	BarChart3,
	TrendingUp,
	LineChart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Dashboard({ userData }) {
	const router = useRouter();

	// Helper function to get mood color for header background
	const getMoodColor = (mood) => {
		const moodColors = {
			SAD: "from-red-800 to-red-700",
			DEPRESSED: "from-gray-800 to-gray-700",
			NEUTRAL: "from-amber-800 to-amber-700",
			HAPPY: "from-green-800 to-green-700",
			OVERJOYED: "from-emerald-800 to-emerald-700",
		};
		return moodColors[mood] || "from-amber-800 to-amber-700";
	};

	// Helper function to get stress level text
	const getStressLevelText = (level) => {
		const stressLevels = {
			1: "Very Low (Peaceful)",
			2: "Low (Relaxed)",
			3: "Moderate",
			4: "High (Stressed)",
			5: "Very High (Overwhelmed)",
		};
		return stressLevels[level] || "Moderate";
	};

	// Helper function to format sleep quality text
	const formatSleepQuality = (quality) => {
		const sleepQualityText = {
			WORST: "Very Poor (~3hr Avg)",
			POOR: "Poor (~4hr Avg)",
			FAIR: "Fair (~5-6hr Avg)",
			GOOD: "Good (~7hr Avg)",
			EXCELLENT: "Excellent (8hr+ Avg)",
		};
		return sleepQualityText[quality] || "Fair (~5-6hr Avg)";
	};

	// Format the mood for display (capitalize first letter, lowercase rest)
	const formatMood = (mood) => {
		return mood.charAt(0) + mood.slice(1).toLowerCase();
	};

	return (
		<div className="max-w-7xl mx-auto">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-3">
					<Card
						className={`mb-6 overflow-hidden bg-gradient-to-b ${getMoodColor(userData.currentMood)} text-white`}
					>
						<CardContent className="p-6">
							<div className="flex items-center gap-4">
								<div className="relative">
									<Avatar className="h-20 w-20 border-4 border-white">
										<AvatarImage src="/avatar.png" alt="User" />
										<AvatarFallback className="text-xl">You</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<div className="flex items-center gap-2">
										<h1 className="text-3xl font-bold">Hello, You.</h1>
										<Badge
											variant="outline"
											className="bg-amber-600/30 text-white border-amber-500"
										>
											{formatMood(userData.currentMood)}
										</Badge>
									</div>
									<div className="flex items-center text-sm text-amber-100 mt-1">
										<CalendarDays className="h-4 w-4 mr-1" />
										<span>
											{new Date().toLocaleDateString("en-US", {
												weekday: "short",
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
										</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-2">
					<h2 className="text-xl font-semibold mb-4">Wellbeing Tracker</h2>

					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardContent className="p-4 flex items-center gap-4">
								<div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-green-600"
									>
										<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
										<polyline points="14 2 14 8 20 8" />
										<path d="M16 13H8" />
										<path d="M16 17H8" />
										<path d="M10 9H8" />
									</svg>
								</div>
								<div>
									<h3 className="font-medium">Stress Level</h3>
									<p className="text-sm text-muted-foreground">
										{getStressLevelText(userData.stressLevel)}
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4 flex items-center gap-4">
								<div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-purple-600"
									>
										<path d="M2 12h20" />
										<path d="M6 12a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2" />
										<path d="M6 12v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" />
										<path d="M10 16v2" />
										<path d="M14 16v2" />
									</svg>
								</div>
								<div>
									<h3 className="font-medium">Sleep Quality</h3>
									<p className="text-sm text-muted-foreground">
										{formatSleepQuality(userData.sleepQuality)}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card className="mt-4">
						<CardContent className="p-4">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-4">
									<div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="text-yellow-600"
										>
											<circle cx="12" cy="12" r="10" />
											<path d="M8 14s1.5 2 4 2 4-2 4-2" />
											<line x1="9" y1="9" x2="9.01" y2="9" />
											<line x1="15" y1="9" x2="15.01" y2="9" />
										</svg>
									</div>
									<div>
										<h3 className="font-medium">Current Mood</h3>
										<p className="text-sm text-muted-foreground">
											{formatMood(userData.currentMood)}
										</p>
									</div>
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => router.push("/dashboard/mood")}
								>
									Update Mood
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-1">
					<h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
					<Card className="mb-4">
						<CardContent className="p-4 space-y-3">
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link href="/journal">
									<Plus className="mr-2 h-4 w-4" />
									New Journal Entry
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link href="/therapy">
									<MessageSquare className="mr-2 h-4 w-4" />
									Start AI Therapy Session
								</Link>
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start"
								asChild
							>
								<Link href="/dashboard/mood">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="mr-2 h-4 w-4"
									>
										<circle cx="12" cy="12" r="10" />
										<path d="M8 14s1.5 2 4 2 4-2 4-2" />
										<line x1="9" y1="9" x2="9.01" y2="9" />
										<line x1="15" y1="9" x2="15.01" y2="9" />
									</svg>
									Track Daily Mood
								</Link>
							</Button>
						</CardContent>
					</Card>

					<h2 className="text-xl font-semibold mb-4 mt-6">Upcoming</h2>
					<Card>
						<CardContent className="p-4">
							<div className="space-y-3">
								<div className="flex items-center gap-3 pb-3 border-b">
									<div className="bg-blue-100 text-blue-600 p-2 rounded-md">
										<CalendarDays className="h-4 w-4" />
									</div>
									<div>
										<p className="text-sm font-medium">Meditation Session</p>
										<p className="text-xs text-muted-foreground">
											Tomorrow, 9:00 AM
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="bg-purple-100 text-purple-600 p-2 rounded-md">
										<MessageSquare className="h-4 w-4" />
									</div>
									<div>
										<p className="text-sm font-medium">Therapy Check-in</p>
										<p className="text-xs text-muted-foreground">
											Friday, 2:00 PM
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-3 mt-6">
					<h2 className="text-xl font-semibold mb-4">WellBeing Journal</h2>

					<Card className="bg-gray-50">
						<CardContent className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="flex items-center">
									<div className="flex-1">
										<h3 className="text-3xl font-bold">
											{userData.journalCount}
										</h3>
										<p className="text-muted-foreground">Journal Entries</p>
										<div className="flex items-center mt-2 text-sm text-muted-foreground">
											<MessageSquare className="h-4 w-4 mr-1" />
											<span>
												{userData.currentMonthJournals} entries this month
											</span>
										</div>
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium">Mood Trend</span>
										<span
											className={`text-xs ${
												userData.moodTrend.isPositive
													? "text-green-600"
													: "text-red-600"
											} flex items-center`}
										>
											<TrendingUp
												className={`h-3 w-3 mr-1 ${
													!userData.moodTrend.isPositive ? "rotate-180" : ""
												}`}
											/>
											{userData.moodTrend.isPositive ? "+" : "-"}
											{userData.moodTrend.percentage}%
										</span>
									</div>
									<div className="h-12 bg-gray-100 rounded-md relative overflow-hidden">
										<div className="absolute inset-0 flex items-end">
											<div className="h-30% w-1/7 bg-purple-400"></div>
											<div className="h-40% w-1/7 bg-red-400"></div>
											<div className="h-50% w-1/7 bg-amber-400"></div>
											<div className="h-60% w-1/7 bg-amber-400"></div>
											<div className="h-70% w-1/7 bg-green-400"></div>
											<div className="h-80% w-1/7 bg-green-400"></div>
											<div className="h-90% w-1/7 bg-green-400"></div>
										</div>
									</div>
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>Last Week</span>
										<span>This Week</span>
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium">Sleep Quality</span>
										<span
											className={`text-xs ${
												userData.sleepTrend.isPositive
													? "text-green-600"
													: "text-red-600"
											} flex items-center`}
										>
											<TrendingUp
												className={`h-3 w-3 mr-1 ${
													!userData.sleepTrend.isPositive ? "rotate-180" : ""
												}`}
											/>
											{userData.sleepTrend.isPositive ? "+" : "-"}
											{userData.sleepTrend.percentage}%
										</span>
									</div>
									<div className="h-12 bg-gray-100 rounded-md relative overflow-hidden">
										<div className="absolute inset-0 flex items-end">
											<div className="h-70% w-1/7 bg-green-400"></div>
											<div className="h-60% w-1/7 bg-green-400"></div>
											<div className="h-50% w-1/7 bg-amber-400"></div>
											<div className="h-40% w-1/7 bg-amber-400"></div>
											<div className="h-30% w-1/7 bg-red-400"></div>
											<div className="h-20% w-1/7 bg-red-400"></div>
											<div className="h-30% w-1/7 bg-red-400"></div>
										</div>
									</div>
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>Last Week</span>
										<span>This Week</span>
									</div>
								</div>
							</div>

							<div className="flex gap-2 mt-6 justify-end">
								<Button
									size="icon"
									variant="secondary"
									className="rounded-full bg-green-200 hover:bg-green-300"
								>
									<Plus className="h-5 w-5 text-green-700" />
								</Button>
								<Button
									size="icon"
									variant="secondary"
									className="rounded-full bg-orange-200 hover:bg-orange-300"
								>
									<Settings className="h-5 w-5 text-orange-700" />
								</Button>
								<Button
									size="icon"
									variant="secondary"
									className="rounded-full bg-blue-200 hover:bg-blue-300"
								>
									<LineChart className="h-5 w-5 text-blue-700" />
								</Button>
								<Button
									size="icon"
									variant="secondary"
									className="rounded-full bg-purple-200 hover:bg-purple-300"
								>
									<BarChart3 className="h-5 w-5 text-purple-700" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
