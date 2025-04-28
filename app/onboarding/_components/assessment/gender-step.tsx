"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";

type Gender = "male" | "female" | "prefer_not_to_say" | undefined;

interface GenderStepProps {
	value: Gender;
	onChangeAction: (value: Gender) => void;
	onNextAction: () => void;
}

export default function GenderStep({
	value,
	onChangeAction,
	onNextAction,
}: GenderStepProps) {
	const [selectedGender, setSelectedGender] = useState<Gender>(value);

	const handleSelect = (gender: Gender) => {
		setSelectedGender(gender);
		onChangeAction(gender);
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
					What's your gender?
				</h1>
			</motion.div>

			<div className="w-full max-w-md mb-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<motion.div
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<button
							type="button"
							onClick={() => handleSelect("male")}
							className={`w-full h-full flex flex-col items-center p-6 rounded-xl transition-all ${
								selectedGender === "male"
									? "bg-[#a9c795]/20 border-2 border-[#a9c795]"
									: "bg-white hover:bg-gray-50"
							}`}
						>
							<div className="mb-2 text-[#5a4a42]">♂</div>
							<div className="text-[#5a4a42] font-medium mb-2">I am Male</div>
							<div className="relative w-full h-32 md:h-40">
								<Image
									src="/male-illustration.jpg"
									alt="Male illustration"
									fill
									className="object-contain object-left"
								/>
							</div>
						</button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<button
							type="button"
							onClick={() => handleSelect("female")}
							className={`w-full h-full flex flex-col items-center p-6 rounded-xl transition-all ${
								selectedGender === "female"
									? "bg-[#f5a05c]/20 border-2 border-[#f5a05c]"
									: "bg-white hover:bg-gray-50"
							}`}
						>
							<div className="mb-2 text-[#5a4a42]">♀</div>
							<div className="text-[#5a4a42] font-medium mb-2">I am Female</div>
							<div className="relative w-full h-32 md:h-40">
								<Image
									src="/female-illustration.jpg"
									alt="Male illustration"
									fill
									className="object-contain object-left"
								/>
							</div>
						</button>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-4"
				>
					<button
						type="button"
						onClick={() => handleSelect("prefer_not_to_say")}
						className={`w-full flex items-center justify-center p-3 rounded-full transition-all ${
							selectedGender === "prefer_not_to_say"
								? "bg-[#a9c795] text-white"
								: "bg-[#e9dfd5] text-[#5a4a42] hover:bg-[#e9dfd5]/70"
						}`}
					>
						<span>Prefer to skip, thanks</span>
						{selectedGender === "prefer_not_to_say" && (
							<X className="ml-2 h-4 w-4" />
						)}
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
