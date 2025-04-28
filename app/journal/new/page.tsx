import { JournalForm } from "../components/journal-form";

export default function NewJournalPage() {
	return (
		<div className="min-h-screen bg-white">
			{/* Brown curved header */}
			<div className="relative">
				<div className="bg-[#5D4037] h-20 mb-8 rounded-b-[20%] w-full flex items-start justify-between px-8 pt-8">
					<h1 className="text-white text-3xl font-bold">Add New Journal</h1>
				</div>
			</div>

			{/* Journal form */}
			<div className="max-w-4xl mx-auto px-4 pb-8">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<JournalForm />
				</div>
			</div>
		</div>
	);
}
