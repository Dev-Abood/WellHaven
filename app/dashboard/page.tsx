import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Dashboard } from "./components/dashboard";
import { AppSidebar } from "./components/app-sidebar";
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const { userId } = await auth();
	if (!userId) {
		redirect("/sign-in");
	}

	// Fetch user data
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			initialMood: true,
			initialSleepQuality: true,
			initialStressLevel: true,
		},
	});

	// Get the latest daily mood for the user
	const latestDailyMood = await prisma.dailyMood.findFirst({
		where: {
			userId: userId,
		},
		orderBy: {
			date: "desc",
		},
	});

	// Get the latest journal entry for the user
	const latestJournal = await prisma.journal.findFirst({
		where: {
			userId: userId,
		},
		orderBy: {
			createdAt: "desc",
		},
		select: {
			stressLevel: true,
			mood: true,
			title: true,
			createdAt: true,
		},
	});

	// Get journal count
	const journalCount = await prisma.journal.count({
		where: {
			userId: userId,
		},
	});

	// Get current month's journal entries
	const currentMonth = new Date();
	const startOfMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth(),
		1,
	);

	const currentMonthJournals = await prisma.journal.count({
		where: {
			userId: userId,
			createdAt: {
				gte: startOfMonth,
			},
		},
	});

	// Calculate mood and sleep trends
	// Get last 14 days of mood data
	const twoWeeksAgo = new Date();
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

	const moodData = await prisma.dailyMood.findMany({
		where: {
			userId: userId,
			date: {
				gte: twoWeeksAgo,
			},
		},
		orderBy: {
			date: "asc",
		},
		select: {
			mood: true,
			sleepQuality: true,
			date: true,
		},
	});

	// Calculate trends
	let moodTrend = { percentage: 0, isPositive: true };
	let sleepTrend = { percentage: 0, isPositive: false };

	if (moodData.length > 0) {
		// Split data into week segments
		const midpoint = Math.floor(moodData.length / 2);
		const lastWeekMoods = moodData.slice(0, midpoint);
		const thisWeekMoods = moodData.slice(midpoint);

		// Calculate mood scores - simple numeric mapping
		const moodScores = {
			SAD: 1,
			DEPRESSED: 1,
			NEUTRAL: 3,
			HAPPY: 4,
			OVERJOYED: 5,
		};

		const sleepScores = {
			WORST: 1,
			POOR: 2,
			FAIR: 3,
			GOOD: 4,
			EXCELLENT: 5,
		};

		// Calculate average mood scores
		const calcAverage = (data: any, scoreMap: any, property: any) => {
			if (data.length === 0) return 0;
			const sum = data.reduce(
				(acc: any, item: any) => acc + scoreMap[item[property]],
				0,
			);
			return sum / data.length;
		};

		const lastWeekMoodAvg = calcAverage(lastWeekMoods, moodScores, "mood");
		const thisWeekMoodAvg = calcAverage(thisWeekMoods, moodScores, "mood");

		const lastWeekSleepAvg = calcAverage(
			lastWeekMoods,
			sleepScores,
			"sleepQuality",
		);
		const thisWeekSleepAvg = calcAverage(
			thisWeekMoods,
			sleepScores,
			"sleepQuality",
		);

		// Calculate percentage changes
		const calcPercentChange = (previous: number, current: number) => {
			if (previous === 0) return 0;
			return Math.round(((current - previous) / previous) * 100);
		};

		const moodPercentChange = calcPercentChange(
			lastWeekMoodAvg,
			thisWeekMoodAvg,
		);
		const sleepPercentChange = calcPercentChange(
			lastWeekSleepAvg,
			thisWeekSleepAvg,
		);

		moodTrend = {
			percentage: Math.abs(moodPercentChange),
			isPositive: moodPercentChange >= 0,
		};

		sleepTrend = {
			percentage: Math.abs(sleepPercentChange),
			isPositive: sleepPercentChange >= 0,
		};
	}

	if (!user) {
		redirect("/sign-in");
	}

	// Prepare the data to pass to Dashboard component
	const userData = {
		currentMood: latestDailyMood?.mood || user.initialMood || "NEUTRAL",
		sleepQuality:
			latestDailyMood?.sleepQuality || user.initialSleepQuality || "FAIR",
		stressLevel: latestJournal?.stressLevel || user.initialStressLevel || 3,
		journalCount,
		currentMonthJournals,
		moodTrend,
		sleepTrend,
	};

	return (
		<main className="flex min-h-screen bg-gray-50">
			<AppSidebar />
			<div className="flex-1 flex flex-col">
				<div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
					<Dashboard userData={userData} />
				</div>
			</div>
		</main>
	);
}
