"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Smile } from "lucide-react";

type Mood = "very_good" | "good" | "neutral" | "bad" | "very_bad";

interface MoodStepProps {
	value: Mood;
	onChangeAction: (value: Mood) => void;
	onNextAction: () => void;
}

export default function MoodStep({
	value,
	onChangeAction,
	onNextAction,
}: MoodStepProps) {
	const [mood, setMood] = useState<Mood>(value);

	const handleMoodChange = (newMood: Mood) => {
		setMood(newMood);
		onChangeAction(newMood);
	};

	const handleContinue = () => {
		onNextAction();
	};

	const getMoodText = (mood: Mood) => {
		switch (mood) {
			case "very_good":
				return "I Feel Great!";
			case "good":
				return "I Feel Good.";
			case "neutral":
				return "I Feel Okay.";
			case "bad":
				return "I Feel Bad.";
			case "very_bad":
				return "I Feel Terrible.";
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
					How would you
					<br />
					describe your mood?
				</h1>
			</motion.div>

			<div className="w-full max-w-md mb-12">
				<div className="text-center mb-8">
					<div className="text-xl font-medium text-[#5a4a42]">
						{getMoodText(mood)}
					</div>
					<div className="mt-4">
						{mood === "good" && (
							<div className="w-16 h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center">
								<Smile className="h-10 w-10 text-white" />
							</div>
						)}
					</div>
				</div>

				<div className="relative h-40">
					{/* Mood meter background */}
					<div className="absolute bottom-0 left-0 right-0 h-24 rounded-t-full overflow-hidden flex">
						<div className="flex-1 bg-red-500"></div>
						<div className="flex-1 bg-orange-400"></div>
						<div className="flex-1 bg-yellow-400"></div>
						<div className="flex-1 bg-green-500"></div>
						<div className="flex-1 bg-purple-500"></div>
					</div>

					{/* Mood indicator */}
					<div
						className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#5a4a42]"
						style={{
							borderRadius: "50% 50% 0 0",
							marginLeft:
								mood === "very_good"
									? "40px"
									: mood === "good"
										? "20px"
										: mood === "neutral"
											? "0px"
											: mood === "bad"
												? "-20px"
												: "-40px",
						}}
					></div>
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
