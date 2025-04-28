import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { WelcomeStepData } from "../types/types";

interface OnboardingWelcomeProps {
	data: WelcomeStepData;
	onNext: () => void;
}

export function OnboardingWelcome({ data, onNext }: OnboardingWelcomeProps) {
	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
			<div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
				<div className="mb-6 flex justify-center lg:justify-start">
					<div className="rounded-full flex items-center justify-center">
						<Image
							src="/logo.jpg"
							alt="Logo"
							width={90}
							height={90}
							className="rounded-full abosolute"
						/>
					</div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="text-center lg:text-left mb-8"
				>
					<h1 className="text-3xl lg:text-4xl font-bold text-[#5a4a42] mb-2">
						{data.title}{" "}
						<span className="text-[#8d6e63]">{data.titleHighlight}</span>
					</h1>
					<p className="text-gray-600 mt-4">{data.description}</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					className="flex flex-col items-center lg:items-start gap-4"
				>
					<Button
						onClick={onNext}
						className="bg-[#5a4a42] hover:bg-[#4a3a32] text-white rounded-full px-8 py-6 flex items-center gap-2 text-lg"
					>
						Get Started <ChevronRight className="h-5 w-5" />
					</Button>
					<p className="text-sm text-gray-500 mt-2">
						Already have an account?{" "}
						<a href="/sign-in" className="text-[#f5a05c] font-medium">
							Sign In
						</a>
					</p>
				</motion.div>
			</div>
			<div className="w-full lg:w-1/2 bg-[#f9f5f2] p-8 lg:p-0 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="relative w-full max-w-md aspect-[9/16] lg:aspect-auto lg:h-full"
				>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="relative w-full h-full">
							<Image
								src={data.image}
								alt="Welcome to WellHaven"
								fill
								className="object-contain"
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
