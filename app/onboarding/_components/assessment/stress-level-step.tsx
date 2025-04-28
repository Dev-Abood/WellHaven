"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface StressLevelStepProps {
	value: number;
	onChangeAction: (value: number) => void;
	onNextAction: () => void;
}

export default function StressLevelStep({
	value,
	onChangeAction,
	onNextAction,
}: StressLevelStepProps) {
	const [stressLevel, setStressLevel] = useState<number>(value);

	const handleSelect = (level: number) => {
		setStressLevel(level);
		onChangeAction(level);
	};

	const handleContinue = () => {
		onNextAction();
	};

	const getStressLevelText = (level: number) => {
		switch (level) {
			case 1:
				return "You are well Relaxed!";
			case 2:
				return "You are slightly stressed";
			case 3:
				return "You have moderate stress";
			case 4:
				return "You are quite stressed";
			case 5:
				return "You are extremely stressed";
			default:
				return "";
		}
	};

	return (
		<div className="flex flex-col items-center">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-8"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
					How would you rate your
					<br />
					stress level?
				</h1>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="text-center mb-8"
			>
				<div className="text-8xl font-bold text-[#5a4a42] mb-8">
					{stressLevel}
				</div>

				<div className="flex justify-between items-center w-full max-w-md">
					{[1, 2, 3, 4, 5].map((level) => (
						<button
							key={level}
							type="button"
							onClick={() => handleSelect(level)}
							className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
								stressLevel === level
									? "bg-[#f5a05c] text-white"
									: "bg-gray-100 text-gray-500 hover:bg-gray-200"
							}`}
						>
							{level}
						</button>
					))}
				</div>

				<div className="text-[#5a4a42] mt-4">
					{getStressLevelText(stressLevel)}
				</div>
			</motion.div>

			<Button
				onClick={handleContinue}
				className="bg-[#5a4a42] hover:bg-[#4a3a32] text-white rounded-full px-8 py-6 flex items-center gap-2"
			>
				Continue <ChevronRight className="h-5 w-5" />
			</Button>
		</div>
	);
}
