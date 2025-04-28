"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, X } from "lucide-react";

interface PhysicalDistressStepProps {
	value: boolean;
	onChangeAction: (value: boolean) => void;
	onNextAction: () => void;
}

export default function PhysicalDistressStep({
	value,
	onChangeAction,
	onNextAction,
}: PhysicalDistressStepProps) {
	const [hasPhysicalDistress, setHasPhysicalDistress] =
		useState<boolean>(value);

	const handleSelect = (hasDistress: boolean) => {
		setHasPhysicalDistress(hasDistress);
		onChangeAction(hasDistress);
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
					Are you experiencing any
					<br />
					physical distress?
				</h1>
			</motion.div>

			<div className="w-full max-w-md space-y-4 mb-8">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<button
						type="button"
						onClick={() => handleSelect(true)}
						className={`w-full flex items-start p-6 rounded-xl transition-all ${
							hasPhysicalDistress
								? "bg-white border-2 border-[#a9c795]"
								: "bg-white hover:bg-gray-50"
						}`}
					>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
								hasPhysicalDistress
									? "bg-[#a9c795] text-white"
									: "bg-gray-100 text-gray-400"
							}`}
						>
							<Check className="w-5 h-5" />
						</div>
						<div className="flex-1">
							<div className="font-medium text-[#5a4a42]">
								Yes, one or multiple
							</div>
							<div className="text-sm text-gray-500 mt-1">
								I'm experiencing physical pain in different place over my body.
							</div>
						</div>
						<div
							className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
								hasPhysicalDistress ? "border-[#a9c795]" : "border-gray-300"
							}`}
						>
							{hasPhysicalDistress && (
								<div className="w-3 h-3 rounded-full bg-[#a9c795]" />
							)}
						</div>
					</button>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<button
						type="button"
						onClick={() => handleSelect(false)}
						className={`w-full flex items-start p-6 rounded-xl transition-all ${
							!hasPhysicalDistress
								? "bg-white border-2 border-[#a9c795]"
								: "bg-white hover:bg-gray-50"
						}`}
					>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
								!hasPhysicalDistress
									? "bg-[#a9c795] text-white"
									: "bg-gray-100 text-gray-400"
							}`}
						>
							<X className="w-5 h-5" />
						</div>
						<div className="flex-1">
							<div className="font-medium text-[#5a4a42]">
								No Physical Pain At All
							</div>
							<div className="text-sm text-gray-500 mt-1">
								I'm not experiencing any physical pain in my body at all :)
							</div>
						</div>
						<div
							className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
								!hasPhysicalDistress ? "border-[#a9c795]" : "border-gray-300"
							}`}
						>
							{!hasPhysicalDistress && (
								<div className="w-3 h-3 rounded-full bg-[#a9c795]" />
							)}
						</div>
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
