import type React from "react";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssessmentLayoutProps {
	children: React.ReactNode;
	currentStep: number;
	totalSteps: number;
	onBack: () => void;
}

export default function AssessmentLayout({
	children,
	currentStep,
	totalSteps,
	onBack,
}: AssessmentLayoutProps) {
	return (
		<div className="bg-[#faf7f2] rounded-2xl shadow-lg overflow-hidden">
			<div className="p-6 md:p-8">
				<div className="flex justify-between items-center mb-8">
					<Button
						variant="ghost"
						size="icon"
						onClick={onBack}
						className="text-[#5a4a42] hover:bg-[#5a4a42]/10 rounded-full w-10 h-10"
					>
						<ChevronLeft className="h-5 w-5" />
						<span className="sr-only">Back</span>
					</Button>

					<div className="flex items-center">
						<span className="text-[#5a4a42] font-medium">Assessment</span>
						<span className="ml-2 px-3 py-1 bg-[#e9dfd5] text-[#5a4a42] text-sm rounded-full">
							{currentStep} of {totalSteps}
						</span>
					</div>
				</div>

				<div className="max-w-2xl mx-auto">{children}</div>
			</div>
		</div>
	);
}
