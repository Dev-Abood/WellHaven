"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Smile, Meh, Frown, AlertCircle } from "lucide-react";

type SleepQuality = "excellent" | "good" | "fair" | "poor" | "worst";

interface SleepQualityStepProps {
	value: SleepQuality;
	onChangeAction: (value: SleepQuality) => void;
	onNextAction: () => void;
}

export default function SleepQualityStep({
	value,
	onChangeAction,
	onNextAction,
}: SleepQualityStepProps) {
	const [sleepQuality, setSleepQuality] = useState<SleepQuality>(value);

	const sleepQualityOptions: {
		value: SleepQuality;
		label: string;
		hours: string;
		icon: React.ReactNode;
	}[] = [
		{
			value: "excellent",
			label: "Excellent",
			hours: "7+ hours",
			icon: <Smile className="h-6 w-6 text-green-500" />,
		},
		{
			value: "good",
			label: "Good",
			hours: "6-7 hours",
			icon: <Smile className="h-6 w-6 text-yellow-500" />,
		},
		{
			value: "fair",
			label: "Fair",
			hours: "5 hours",
			icon: <Meh className="h-6 w-6 text-gray-500" />,
		},
		{
			value: "poor",
			label: "Poor",
			hours: "3-4 hours",
			icon: <Frown className="h-6 w-6 text-orange-500" />,
		},
		{
			value: "worst",
			label: "Worst",
			hours: "<3 hours",
			icon: <AlertCircle className="h-6 w-6 text-purple-500" />,
		},
	];

	const sleepQualityIndex = sleepQualityOptions.findIndex(
		(option) => option.value === sleepQuality,
	);

	const handleSliderChange = (values: number[]) => {
		const index = values[0];
		const quality = sleepQualityOptions[index].value;
		setSleepQuality(quality);
		onChangeAction(quality);
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
				className="text-center mb-8"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
					How would you rate your
					<br />
					sleep quality?
				</h1>
			</motion.div>

			<div className="w-full max-w-md mb-12">
				<div className="flex flex-col">
					<div className="flex justify-between mb-8">
						{sleepQualityOptions.map((option, index) => (
							<div
								key={option.value}
								className={`flex flex-col items-center ${sleepQuality === option.value ? "opacity-100" : "opacity-50"}`}
							>
								<div className="text-xs text-gray-500">{option.label}</div>
								<div className="text-xs text-gray-400">{option.hours}</div>
								<div className="mt-2">{option.icon}</div>
							</div>
						))}
					</div>

					<div className="relative">
						<Slider
							value={[sleepQualityIndex]}
							min={0}
							max={4}
							step={1}
							onValueChange={handleSliderChange}
							className="py-4"
						/>
						<div className="absolute -top-2 left-0 w-full flex justify-between">
							<div className="h-4 w-0.5 bg-gray-200"></div>
							<div className="h-4 w-0.5 bg-gray-200"></div>
							<div className="h-4 w-0.5 bg-gray-200"></div>
							<div className="h-4 w-0.5 bg-gray-200"></div>
							<div className="h-4 w-0.5 bg-gray-200"></div>
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
