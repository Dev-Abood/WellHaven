"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ProfessionalHelpStepProps {
	value: boolean;
	onChangeAction: (value: boolean) => void;
	onNextAction: () => void;
}

export default function ProfessionalHelpStep({
	value,
	onChangeAction,
	onNextAction,
}: ProfessionalHelpStepProps) {
	const [selectedValue, setSelectedValue] = useState<boolean>(value);

	const handleSelect = (value: boolean) => {
		setSelectedValue(value);
		onChangeAction(value);
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
				className="text-center mb-6"
			>
				<h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
					Have you sought
					<br />
					professional help before?
				</h1>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="w-full max-w-xs mb-8"
			>
				<div className="relative w-full h-48 md:h-64">
					<Image
						src="professional-help-illustration.jpg"
						alt="Professional help illustration"
						fill
						className="object-contain"
					/>
				</div>
			</motion.div>

			<div className="w-full max-w-md mb-8">
				<div className="flex justify-center gap-4">
					<motion.button
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						type="button"
						onClick={() => handleSelect(true)}
						className={`px-10 py-3 rounded-full transition-all ${
							selectedValue === true
								? "bg-[#5a4a42] text-white"
								: "bg-white text-[#5a4a42] hover:bg-gray-100"
						}`}
					>
						Yes
					</motion.button>

					<motion.button
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						type="button"
						onClick={() => handleSelect(false)}
						className={`px-10 py-3 rounded-full transition-all ${
							selectedValue === false
								? "bg-[#5a4a42] text-white"
								: "bg-white text-[#5a4a42] hover:bg-gray-100"
						}`}
					>
						No
					</motion.button>
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
