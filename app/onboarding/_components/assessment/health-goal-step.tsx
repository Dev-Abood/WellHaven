"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Brain, Smile, Coffee } from "lucide-react";

type HealthGoal =
	| "reduce_stress"
	| "ai_therapy"
	| "cope_with_trauma"
	| "better_person"
	| "trying_out"
	| undefined;

interface HealthGoalStepProps {
	value: HealthGoal;
	onChangeAction: (value: HealthGoal) => void;
	onNextAction: () => void;
}

export default function HealthGoalStep({
	value,
	onChangeAction,
	onNextAction,
}: HealthGoalStepProps) {
	const [selectedGoal, setSelectedGoal] = useState<HealthGoal>(value);

	const handleSelect = (goal: HealthGoal) => {
		setSelectedGoal(goal);
		onChangeAction(goal);
	};

	const handleContinue = () => {
		if (selectedGoal) {
			onNextAction();
		}
	};

	const goals = [
		{
			id: "reduce_stress",
			label: "I wanna reduce stress",
			icon: <Heart className="w-5 h-5" />,
		},
		{
			id: "ai_therapy",
			label: "I wanna try AI Therapy",
			icon: <Brain className="w-5 h-5" />,
		},
		{
			id: "cope_with_trauma",
			label: "I want to cope with trauma",
			icon: <Heart className="w-5 h-5" />,
		},
		{
			id: "better_person",
			label: "I want to be a better person",
			icon: <Smile className="w-5 h-5" />,
		},
		{
			id: "trying_out",
			label: "Just trying out the app, mate!",
			icon: <Coffee className="w-5 h-5" />,
		},
	];

	return (
		<div className="flex flex-col items-center">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-8"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
					What's your health goal
					<br />
					for today?
				</h1>
			</motion.div>

			<div className="w-full max-w-md space-y-3 mb-8">
				{goals.map((goal) => (
					<motion.div
						key={goal.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: goals.findIndex((g) => g.id === goal.id) * 0.1,
						}}
					>
						<button
							type="button"
							onClick={() => handleSelect(goal.id as HealthGoal)}
							className={`w-full flex items-center p-4 rounded-full transition-all ${
								selectedGoal === goal.id
									? "bg-[#a9c795] text-white"
									: "bg-white text-[#5a4a42] hover:bg-gray-100"
							}`}
						>
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
									selectedGoal === goal.id ? "text-white" : "text-gray-400"
								}`}
							>
								{goal.icon}
							</div>
							<span className="flex-1 text-left">{goal.label}</span>
							<div
								className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
									selectedGoal === goal.id
										? "border-white bg-white"
										: "border-gray-300"
								}`}
							>
								{selectedGoal === goal.id && (
									<div className="w-3 h-3 rounded-full bg-[#a9c795]" />
								)}
							</div>
						</button>
					</motion.div>
				))}
			</div>

			<Button
				onClick={handleContinue}
				disabled={!selectedGoal}
				className="bg-[#5a4a42] hover:bg-[#4a3a32] text-white rounded-full px-8 py-6 flex items-center gap-2"
			>
				Continue <ChevronRight className="h-5 w-5" />
			</Button>
		</div>
	);
}
