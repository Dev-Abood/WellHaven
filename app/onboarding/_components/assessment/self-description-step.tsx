"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SelfDescriptionStepProps {
	value: string[] | undefined;
	onChangeAction: (value: string[]) => void;
	onNextAction: () => void;
}

export default function SelfDescriptionStep({
	value,
	onChangeAction,
	onNextAction,
}: SelfDescriptionStepProps) {
	const [descriptions, setDescriptions] = useState<string[]>(value || []);
	const [newDescription, setNewDescription] = useState("");

	const commonDescriptions = [
		"Extroverted",
		"People are Afraid of me",
		"Sarcastic",
		"Sensitive",
		"Examples",
	];

	const handleAddDescription = (description: string) => {
		if (description && !descriptions.includes(description)) {
			const updatedDescriptions = [...descriptions, description];
			setDescriptions(updatedDescriptions);
			onChangeAction(updatedDescriptions);
			setNewDescription("");
		}
	};

	const handleRemoveDescription = (description: string) => {
		const updatedDescriptions = descriptions.filter((d) => d !== description);
		setDescriptions(updatedDescriptions);
		onChangeAction(updatedDescriptions);
	};

	const handleContinue = () => {
		onNextAction();
	};

	return (
		<div className="flex flex-col items-center">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-6"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
					How would you describe
					<br />
					yourself?
				</h1>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="w-full max-w-xs mb-8"
			>
				<div className="relative w-full h-40">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="rounded-full flex items-center justify-center">
							<div className="w-80 h-80 relative">
								<Image
									src="/self-description.jpg"
									alt="Mental health symptoms"
									fill
									className="object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<div className="w-full max-w-md mb-6">
				<div className="bg-white rounded-xl p-4 mb-4">
					<div className="flex flex-wrap gap-2 mb-2">
						{descriptions.map((description, index) => (
							<div
								key={index}
								className="bg-[#e9f5d8] text-[#5a4a42] px-3 py-1 rounded-full flex items-center"
							>
								<span>{description}</span>
								<button
									type="button"
									onClick={() => handleRemoveDescription(description)}
									className="ml-2 text-[#5a4a42] hover:text-[#4a3a32]"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
						))}
					</div>

					<div className="flex gap-2">
						<Input
							type="text"
							placeholder="Add description..."
							value={newDescription}
							onChange={(e) => setNewDescription(e.target.value)}
							className="flex-1"
						/>
						<Button
							type="button"
							onClick={() => handleAddDescription(newDescription)}
							className="bg-[#a9c795] hover:bg-[#98b684] text-white"
							disabled={!newDescription}
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>

					<div className="flex flex-wrap gap-2 mt-4">
						{commonDescriptions.map((description) => (
							<button
								key={description}
								type="button"
								onClick={() => handleAddDescription(description)}
								className={`px-3 py-1 rounded-full text-sm ${
									descriptions.includes(description)
										? "bg-[#a9c795] text-white"
										: "bg-[#f0f0f0] text-[#5a4a42] hover:bg-[#e0e0e0]"
								}`}
							>
								{description}
							</button>
						))}
					</div>

					<div className="text-right text-xs text-gray-500 mt-2">
						{descriptions.length}/10
					</div>
				</div>

				<div className="mb-4">
					<h3 className="text-sm font-medium text-gray-500 mb-2">
						Most Common:
					</h3>
					<div className="flex gap-2">
						<div className="bg-[#f5a05c] text-white px-3 py-1 rounded-full flex items-center">
							easy feel sad <X className="ml-1 h-3 w-3" />
						</div>
						<div className="bg-[#f5a05c] text-white px-3 py-1 rounded-full flex items-center">
							pessimistic <X className="ml-1 h-3 w-3" />
						</div>
					</div>
				</div>
			</div>

			<Button
				onClick={handleContinue}
				className="bg-[#5a4a42] hover:bg-[#4a3a32] text-white rounded-full px-8 py-6 flex items-center gap-2"
			>
				Continue <ChevronRight className="h-5 w-5" />
			</Button>
		</div>
	);
}
