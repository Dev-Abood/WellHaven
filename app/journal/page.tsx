import Link from "next/link";
import { ChevronLeft, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import JournalList from "./components/journal-list";

const JournalPage = async () => {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const journalData = await prisma.journal.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	console.log(journalData);

	return (
		<div className="bg-white">
			{/* Brown curved header */}
			<div className="relative">
				<div className="bg-[#5D4037] h-20 mb-8 rounded-b-[20%] w-full flex items-start justify-between px-8 pt-8">
					<h1 className="text-white text-3xl font-bold">Journal</h1>
				</div>
			</div>

			<Button
				asChild
				size="icon"
				className="ml-12 text-white bg-[#5a4a42] hover:bg-[#5a4a42]/90 rounded-full w-10 h-10 mb-4"
			>
				<Link href="/dashboard">
					<ChevronLeft className="h-5 w-5" />
				</Link>
			</Button>
			{/* Journal content */}
			<div className="max-w-4xl mx-auto  px-4">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<JournalList journalData={journalData} />

					<div className="flex justify-center mt-8">
						<Link href="/journal/new">
							<Button
								size="lg"
								className="rounded-full h-14 w-14 p-0 bg-[#5D4037] hover:bg-[#4E342E]"
							>
								<PlusCircle className="h-8 w-8" />
								<span className="sr-only">Add new journal</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JournalPage;
