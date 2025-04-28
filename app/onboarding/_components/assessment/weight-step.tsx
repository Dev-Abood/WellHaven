"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface WeightValue {
	value?: number;
	unit: "kg" | "lbs";
}

interface WeightStepProps {
	value: WeightValue | undefined;
	onChangeAction: (value: WeightValue) => void;
	onNextAction: () => void;
}

export default function WeightStep({
	value,
	onChangeAction,
	onNextAction,
}: WeightStepProps) {
	const [weightData, setWeightData] = useState<WeightValue>(
		value || { value: undefined, unit: "kg" },
	);

	const handleUnitChange = (unit: "kg" | "lbs") => {
		const newData = { ...weightData, unit };
		setWeightData(newData);
		onChangeAction(newData);
	};

	const handleWeightChange = (value: number[]) => {
		const newData = { ...weightData, value: value[0] };
		setWeightData(newData);
		onChangeAction(newData);
	};

	const handleSkip = () => {
		const newData = { ...weightData, value: undefined };
		setWeightData(newData);
		onChangeAction(newData);
		onNextAction();
	};

	const handleContinue = () => {
		onNextAction();
	};

	// Weight range based on unit
	const minWeight = weightData.unit === "kg" ? 40 : 88;
	const maxWeight = weightData.unit === "kg" ? 150 : 330;
	const defaultWeight = weightData.unit === "kg" ? 70 : 154;

	return (
		<div className="flex flex-col items-center">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-8"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
					What's your weight?
				</h1>
			</motion.div>

			<div className="w-full max-w-md mb-8">
				<div className="flex justify-center mb-8">
					<div className="flex rounded-full overflow-hidden">
						<button
							type="button"
							onClick={() => handleUnitChange("kg")}
							className={`px-8 py-3 ${
								weightData.unit === "kg"
									? "bg-[#f5a05c] text-white"
									: "bg-white text-[#5a4a42]"
							}`}
						>
							kg
						</button>
						<button
							type="button"
							onClick={() => handleUnitChange("lbs")}
							className={`px-8 py-3 ${
								weightData.unit === "lbs"
									? "bg-[#f5a05c] text-white"
									: "bg-white text-[#5a4a42]"
							}`}
						>
							lbs
						</button>
					</div>
				</div>

				<div className="mb-8">
					<div className="text-center mb-4">
						<span className="text-3xl font-bold text-[#5a4a42]">
							{weightData.value || "—"} {weightData.unit}
						</span>
					</div>

					<Slider
						defaultValue={[weightData.value || defaultWeight]}
						min={minWeight}
						max={maxWeight}
						step={1}
						onValueChange={handleWeightChange}
						className="py-4"
					/>

					<div className="flex justify-between text-sm text-gray-500 mt-2">
						<span>{minWeight}</span>
						<span>{Math.round((minWeight + maxWeight) / 2)}</span>
						<span>{maxWeight}</span>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-4"
				>
					<button
						type="button"
						onClick={handleSkip}
						className="w-full flex items-center justify-center p-3 rounded-full bg-[#e9dfd5] text-[#5a4a42] hover:bg-[#e9dfd5]/70"
					>
						<span>Prefer to skip, thanks</span>
						<X className="ml-2 h-4 w-4" />
					</button>
				</motion.div>
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
