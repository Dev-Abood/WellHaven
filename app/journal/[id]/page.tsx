import { auth } from "@clerk/nextjs/server";
import { JournalForm } from "../components/journal-form";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const EditJournalPage = async ({ params }: { params: { id: string } }) => {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const journalData = await prisma.journal.findUnique({
		where: {
			userId,
			id: params.id,
		},
	});

	return (
		<div className="min-h-screen bg-white">
			{/* Brown curved header */}
			<div className="relative">
				<div className="bg-[#5D4037] h-20 mb-8 rounded-b-[20%] w-full flex items-start justify-between px-8 pt-8">
					<h1 className="text-white text-3xl font-bold">Edit Journal</h1>
				</div>
			</div>

			{/* Journal form */}
			<div className="max-w-4xl mx-auto px-4 pb-8">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<JournalForm journalData={journalData} />
				</div>
			</div>
		</div>
	);
};

export default EditJournalPage;
