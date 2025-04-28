import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Dashboard } from "./components/dashboard";
import { AppSidebar } from "./components/app-sidebar";

export default async function Home() {
	/* const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	} */
	return (
		<main className="flex min-h-screen bg-gray-50">
			<AppSidebar />
			<div className="flex-1 flex flex-col">
				<div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
					<Dashboard />
				</div>
			</div>
		</main>
	);
}
