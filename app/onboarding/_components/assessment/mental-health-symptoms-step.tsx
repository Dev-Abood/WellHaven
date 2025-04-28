"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MentalHealthSymptomsStepProps {
	value: string[] | undefined;
	onChangeAction: (value: string[]) => void;
	onNextAction: () => void;
}

export default function MentalHealthSymptomsStep({
	value,
	onChangeAction,
	onNextAction,
}: MentalHealthSymptomsStepProps) {
	const [symptoms, setSymptoms] = useState<string[]>(value || []);
	const [newSymptom, setNewSymptom] = useState("");

	const commonSymptoms = [
		"Social Withdrawal",
		"Feeling Numbness",
		"Feeling Sad",
		"Depressed",
		"Angry",
	];

	const handleAddSymptom = (symptom: string) => {
		if (symptom && !symptoms.includes(symptom)) {
			const updatedSymptoms = [...symptoms, symptom];
			setSymptoms(updatedSymptoms);
			onChangeAction(updatedSymptoms);
			setNewSymptom("");
		}
	};

	const handleRemoveSymptom = (symptom: string) => {
		const updatedSymptoms = symptoms.filter((s) => s !== symptom);
		setSymptoms(updatedSymptoms);
		onChangeAction(updatedSymptoms);
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
					Do you have other mental
					<br />
					health symptoms?
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
									src="/mental-health-symptoms.jpg"
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
						{symptoms.map((symptom, index) => (
							<div
								key={index}
								className="bg-[#e9f5d8] text-[#5a4a42] px-3 py-1 rounded-full flex items-center"
							>
								<span>{symptom}</span>
								<button
									type="button"
									onClick={() => handleRemoveSymptom(symptom)}
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
							placeholder="Add symptom..."
							value={newSymptom}
							onChange={(e) => setNewSymptom(e.target.value)}
							className="flex-1"
						/>
						<Button
							type="button"
							onClick={() => handleAddSymptom(newSymptom)}
							className="bg-[#a9c795] hover:bg-[#98b684] text-white"
							disabled={!newSymptom}
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>

					<div className="flex flex-wrap gap-2 mt-4">
						{commonSymptoms.map((symptom) => (
							<button
								key={symptom}
								type="button"
								onClick={() => handleAddSymptom(symptom)}
								className={`px-3 py-1 rounded-full text-sm ${
									symptoms.includes(symptom)
										? "bg-[#a9c795] text-white"
										: "bg-[#f0f0f0] text-[#5a4a42] hover:bg-[#e0e0e0]"
								}`}
							>
								{symptom}
							</button>
						))}
					</div>

					<div className="text-right text-xs text-gray-500 mt-2">
						{symptoms.length}/10
					</div>
				</div>

				<div className="mb-4">
					<h3 className="text-sm font-medium text-gray-500 mb-2">
						Most Common:
					</h3>
					<div className="flex gap-2">
						<div className="bg-[#f5a05c] text-white px-3 py-1 rounded-full flex items-center">
							Depressed <X className="ml-1 h-3 w-3" />
						</div>
						<div className="bg-[#f5a05c] text-white px-3 py-1 rounded-full flex items-center">
							Angry <X className="ml-1 h-3 w-3" />
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
