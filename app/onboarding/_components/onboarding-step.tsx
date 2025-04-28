import { ChevronLeft, ChevronRight } from "lucide-react";
import { RegularStepData } from "../types/types";
import Image from "next/image";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface OnboardingStepProps {
	data: RegularStepData;
	currentStep: number;
	totalSteps: number;
	onNext: () => void;
	onBack: () => void;
	onSkip: () => void;
}

export function OnboardingStep({
	data,
	currentStep,
	totalSteps,
	onNext,
	onBack,
	onSkip,
}: OnboardingStepProps) {
	// Calculate progress percentage
	const progressPercentage = (currentStep / totalSteps) * 100;

	return (
		<div
			className={`${data.bgColor} rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row`}
		>
			<div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
				<div className="flex justify-between items-center mb-8">
					<Button
						onClick={onBack}
						className={`${data.bgColor === "bg-[#f0f0f0]" ? "bg-[#5a4a42]" : data.progressColor} hover:opacity-90 text-white rounded-full w-12 h-12 flex items-center justify-center`}
					>
						<ChevronLeft className="h-5 w-5" />
						<span className="sr-only">Back</span>
					</Button>

					<Button
						onClick={onSkip}
						className={`${data.bgColor === "bg-[#f0f0f0]" ? "bg-[#5a4a42]" : data.progressColor} hover:opacity-90 text-white w-12 h-12 flex items-center justify-center`}
					>
						Skip
					</Button>
				</div>

				<div className="flex-1 flex flex-col justify-center">
					<div className="mb-6">
						<div
							className={`inline-block px-4 py-1 rounded-full ${data.textColor} border border-current`}
						>
							Step {data.step}
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mb-8"
					>
						<h1
							className={`text-3xl lg:text-4xl font-bold ${data.textColor} mb-2`}
						>
							{data.title} <br />
							<span className={data.highlightColor}>{data.titleHighlight}</span>
							{data.titleEnd && (
								<span className={data.textColor}> {data.titleEnd}</span>
							)}
						</h1>
					</motion.div>
				</div>

				<div>
					<div className="mb-6">
						<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
							<div
								className={`h-full ${data.progressColor} rounded-full`}
								style={{ width: `${progressPercentage}%` }}
							></div>
						</div>
					</div>

					<Button
						onClick={onNext}
						className={`${data.bgColor === "bg-[#f0f0f0]" ? "bg-[#5a4a42]" : data.progressColor} hover:opacity-90 text-white rounded-full w-12 h-12 flex items-center justify-center`}
					>
						<ChevronRight className="h-5 w-5" />
						<span className="sr-only">Next</span>
					</Button>
				</div>
			</div>

			<div className="w-full lg:w-1/2 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="relative w-full h-[400px] lg:h-[600px]"
				>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="relative w-[400px] h-[400px] items-center justify-center">
							<Image
								src={data.image}
								alt={`Step ${data.step}`}
								width={400}
								height={400}
								quality={100}
								className="rounded-lg shadow-lg border border-gray-200"
								priority
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
