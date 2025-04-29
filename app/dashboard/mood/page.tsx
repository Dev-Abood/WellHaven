import { auth } from "@clerk/nextjs/server";
import { AppSidebar } from "../components/app-sidebar";
import { MoodCalendar } from "../components/mood/mood-calendar";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function MoodPage() {
	const { userId } = await auth();
	if (!userId) {
		redirect("/sign-in");
	}

	const dailyMoods = await prisma.dailyMood.findMany({
		where: {
			userId,
		},
	});

	console.log("Daily Moods", dailyMoods);

	return (
		<main className="flex min-h-screen bg-gray-50">
			<AppSidebar />
			<div className="flex-1 flex flex-col">
				<div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
					<div className="max-w-7xl mx-auto">
						<MoodCalendar />
					</div>
				</div>
			</div>
		</main>
	);
}
