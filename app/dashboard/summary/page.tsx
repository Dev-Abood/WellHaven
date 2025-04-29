import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "../components/app-sidebar";
import { SummaryDashboard } from "./components/summary-dashboard";
import { prisma } from "@/lib/prisma";

export default async function SummaryPage() {
	const { userId } = await auth();
	if (!userId) {
		redirect("/sign-in");
	}

	// Calculate date 30 days ago for monthly data
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	// Fetch all mood data for the last 30 days
	const dailyMoods = await prisma.dailyMood.findMany({
		where: {
			userId,
			date: {
				gte: thirtyDaysAgo,
			},
		},
		select: {
			id: true,
			mood: true,
			sleepQuality: true,
			date: true,
		},
		orderBy: {
			date: "asc", // Order from oldest to newest
		},
	});

	return (
		<main className="flex min-h-screen bg-gray-50">
			<AppSidebar />
			<div className="flex-1 flex flex-col">
				<div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
					<div className="max-w-7xl mx-auto">
						<SummaryDashboard dailyMoods={dailyMoods} />
					</div>
				</div>
			</div>
		</main>
	);
}
