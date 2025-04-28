"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface AgeStepProps {
	value: number | undefined;
	onChangeAction: (value: number) => void;
	onNextAction: () => void;
}

export default function AgeStep({
	value,
	onChangeAction,
	onNextAction,
}: AgeStepProps) {
	const [selectedAge, setSelectedAge] = useState<number>(value || 18);
	const [visibleAges, setVisibleAges] = useState<number[]>([]);

	useEffect(() => {
		// Generate visible ages around the selected age
		const generateVisibleAges = () => {
			const ages = [];
			for (let i = selectedAge - 2; i <= selectedAge + 2; i++) {
				if (i >= 13 && i <= 100) {
					ages.push(i);
				}
			}
			setVisibleAges(ages);
		};

		generateVisibleAges();
	}, [selectedAge]);

	const handleSelect = (age: number) => {
		setSelectedAge(age);
		onChangeAction(age);
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
				className="text-center mb-12"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
					What's your age?
				</h1>
			</motion.div>

			<div className="w-full max-w-md mb-12">
				<div className="flex flex-col items-center">
					{visibleAges.map((age, index) => {
						const isSelected = age === selectedAge;
						const distance = Math.abs(visibleAges.indexOf(selectedAge) - index);

						return (
							<motion.button
								key={age}
								initial={{ opacity: 0, y: 10 }}
								animate={{
									opacity: isSelected ? 1 : 0.5 - distance * 0.1,
									y: 0,
									scale: isSelected ? 1 : 1 - distance * 0.1,
								}}
								transition={{ duration: 0.3 }}
								onClick={() => handleSelect(age)}
								className={`w-full py-3 text-center text-3xl font-bold transition-all ${
									isSelected
										? "text-[#5a4a42] bg-[#a9c795] rounded-full px-12"
										: "text-gray-400"
								}`}
							>
								{age}
							</motion.button>
						);
					})}
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
