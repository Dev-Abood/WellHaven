"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompletionStepProps {
	onComplete: () => void;
}

export default function CompletionStep({ onComplete }: CompletionStepProps) {
	return (
		<div className="flex flex-col items-center">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="w-20 h-20 rounded-full bg-[#a9c795] flex items-center justify-center mb-6"
			>
				<CheckCircle className="h-10 w-10 text-white" />
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="text-center mb-8"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42] mb-2">
					Assessment Complete!
				</h1>
				<p className="text-gray-600">
					Thank you for sharing your information with us. We're ready to help
					you on your wellness journey.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				<Button
					onClick={onComplete}
					className="bg-[#5a4a42] hover:bg-[#4a3a32] text-white rounded-full px-8 py-6"
				>
					Go to Dashboard
				</Button>
			</motion.div>
		</div>
	);
}
