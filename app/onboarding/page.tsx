"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RegularStepData, WelcomeStepData } from "./types/types";
import { OnboardingStep } from "./_components/onboarding-step";
import { OnboardingWelcome } from "./_components/onboarding-welcome";
import { z } from "zod";
import AssessmentLayout from "./_components/assessment-layout";
import HealthGoalStep from "./_components/assessment/health-goal-step";
import GenderStep from "./_components/assessment/gender-step";
import AgeStep from "./_components/assessment/age-step";
import WeightStep from "./_components/assessment/weight-step";
import ProfessionalHelpStep from "./_components/assessment/professional-help-step";
import { useRouter } from "next/navigation";
import MentalHealthSymptomsStep from "./_components/assessment/mental-health-symptoms-step";
import PhysicalDistressStep from "./_components/assessment/physical-distress-step";
import CompletionStep from "./_components/assessment/completion-step";
import MoodStep from "./_components/assessment/mood-step";
import StressLevelStep from "./_components/assessment/stress-level-step";
import SelfDescriptionStep from "./_components/assessment/self-description-step";
import SleepQualityStep from "./_components/assessment/sleep-quality-step";
import { createUser } from "./actions";

type StepData = WelcomeStepData | RegularStepData;

const medicationReminderSchema = z.object({
	medicationName: z.string(),
	days: z.array(z.enum(["M", "T", "W", "T", "F", "S", "S"])),
	time: z.object({
		hour: z.number().min(1).max(12),
		minute: z.number().min(0).max(59),
		period: z.enum(["AM", "PM"]),
	}),
	frequency: z.enum(["once", "daily"]),
});

// Define the assessment schema with Zod
const assessmentSchema = z.object({
	healthGoal: z.enum([
		"reduce_stress",
		"ai_therapy",
		"cope_with_trauma",
		"better_person",
		"trying_out",
	]),
	gender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
	age: z.number().min(13).max(100),
	weight: z
		.object({
			value: z.number().optional(),
			unit: z.enum(["kg", "lbs"]),
		})
		.optional(),
	professionalHelp: z.boolean(),
	physicalDistress: z.boolean(),
	medications: z.array(z.string()).optional(),
	medicationReminder: z.boolean(),
	medicationReminders: z.array(medicationReminderSchema).optional(),
	mentalHealthSymptoms: z.array(z.string()).optional(),
	selfDescriptions: z.array(z.string()).optional(),
	stressLevel: z.number().min(1).max(5),
	sleepQuality: z.enum(["excellent", "good", "fair", "poor", "worst"]),
	mood: z.enum(["very_good", "good", "neutral", "bad", "very_bad"]),
});

export type AssessmentData = z.infer<typeof assessmentSchema>;

export default function Home() {
	const [currentStep, setCurrentStep] = useState(0);
	const router = useRouter();

	// Track whether we're in introduction or assessment phase
	const [phase, setPhase] = useState<"intro" | "assessment">("intro");

	// Assessment steps state
	const [currentAssessmentStep, setCurrentAssessmentStep] = useState(1);
	const totalAssessmentSteps = 12; // Total assessment steps as shown in the design

	// Function to save user data to database
	const saveUserData = async () => {
		try {
			console.log("Saving user data:", assessmentData);

			// Use the server action to create the user
			await createUser(assessmentData);

			// Navigate to dashboard
			router.push("/dashboard");
		} catch (error) {
			console.error("Error saving user data:", error);
			// You might want to show an error notification here
		}
	};

	// Assessment data state
	const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>(
		{
			healthGoal: undefined,
			gender: undefined,
			age: 18,
			weight: { value: 60, unit: "kg" },
			professionalHelp: false,
			physicalDistress: false,
			medications: [],
			medicationReminder: false,
			medicationReminders: [],
			mentalHealthSymptoms: [],
			selfDescriptions: [],
			stressLevel: 3,
			sleepQuality: "good",
			mood: "good",
		},
	);

	// Define all steps with proper type annotations
	const steps: StepData[] = [
		{
			type: "welcome",
			title: "Hello, You. Welcome to",
			titleHighlight: "WellHaven!",
			description: "A calming space to reflect, plan, and grow 🌱",
			image: "/welcome.jpg",
		},
		{
			type: "step",
			step: "One",
			title: "Personalize Your Mental",
			titleHighlight: "Health State",
			titleEnd: "With AI",
			bgColor: "bg-[#f0f5e9]",
			textColor: "text-[#5a4a42]",
			highlightColor: "text-[#8aad7a]",
			progressColor: "bg-[#8aad7a]",
			image: "/step1.jpg",
		},
		{
			type: "step",
			step: "Two",
			title: "Intelligent",
			titleHighlight: "Mood Tracking",
			titleEnd: "& AI Emotion Insights",
			bgColor: "bg-[#ffecd9]",
			textColor: "text-[#5a4a42]",
			highlightColor: "text-[#f5a05c]",
			progressColor: "bg-[#f5a05c]",
			image: "/step2.jpg",
		},
		{
			type: "step",
			step: "Three",
			title: "AI Mental Journaling &",
			titleHighlight: "AI Therapy Chatbot",
			bgColor: "bg-[#f0f0f0]",
			textColor: "text-[#5a4a42]",
			highlightColor: "text-[#8d6e63]",
			progressColor: "bg-[#8d6e63]",
			image: "/step3.jpg",
		},
		{
			type: "step",
			step: "Four",
			title: "Healthy Habits Start with",
			titleHighlight: "Smart Planning",
			bgColor: "bg-[#fff5e0]",
			textColor: "text-[#5a4a42]",
			highlightColor: "text-[#f5c242]",
			progressColor: "bg-[#f5c242]",
			image: "/step4.jpg",
		},
		{
			type: "step",
			step: "Five",
			title: "Loving & Supportive",
			titleHighlight: "Community",
			titleEnd: "& Earn Wellness Rewards",
			bgColor: "bg-[#f0e6ff]",
			textColor: "text-[#5a4a42]",
			highlightColor: "text-[#b39ddb]",
			progressColor: "bg-[#b39ddb]",
			image: "/step5.jpg",
		},
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			// Transition to assessment phase after completing intro
			setPhase("assessment");
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		setCurrentStep(steps.length - 1);
	};

	const updateAssessmentData = (field: keyof AssessmentData, value: any) => {
		setAssessmentData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleAssessmentNext = () => {
		// Save data to database or context here
		console.log("Current assessment data:", assessmentData);

		if (currentAssessmentStep < totalAssessmentSteps) {
			setCurrentAssessmentStep(currentAssessmentStep + 1);
		} else {
			// Navigate to the dashboard or next section after assessment
			console.log("Assessment completed:", assessmentData);
			// For now, we'll just log the data
			// In a real app, you would save this data and navigate to the next section
		}
	};

	const handleAssessmentBack = () => {
		if (currentAssessmentStep > 1) {
			setCurrentAssessmentStep(currentAssessmentStep - 1);
		} else {
			// Go back to the last intro step
			setPhase("intro");
			setCurrentStep(steps.length - 1);
		}
	};

	// Get the current step data
	const currentStepData = steps[currentStep];

	// Calculate total steps excluding the welcome step
	const totalRegularSteps = steps.filter((step) => step.type === "step").length;

	return (
		<main className="min-h-screen flex items-center justify-center bg-[#f8f8f8] p-4">
			<div className="w-full max-w-6xl">
				<AnimatePresence mode="wait">
					{phase === "intro" ? (
						<motion.div
							key={currentStep}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.5 }}
							className="w-full"
						>
							{currentStepData.type === "welcome" ? (
								<OnboardingWelcome data={currentStepData} onNext={handleNext} />
							) : (
								<OnboardingStep
									data={currentStepData}
									currentStep={currentStep}
									totalSteps={totalRegularSteps}
									onNext={handleNext}
									onBack={handleBack}
									onSkip={handleSkip}
								/>
							)}
						</motion.div>
					) : (
						<motion.div
							key={`assessment-${currentAssessmentStep}`}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.5 }}
							className="w-full"
						>
							<AssessmentLayout
								currentStep={currentAssessmentStep}
								totalSteps={totalAssessmentSteps}
								onBack={handleAssessmentBack}
							>
								{currentAssessmentStep === 1 && (
									<HealthGoalStep
										value={assessmentData.healthGoal}
										onChangeAction={(value) =>
											updateAssessmentData("healthGoal", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 2 && (
									<GenderStep
										value={assessmentData.gender}
										onChangeAction={(value) =>
											updateAssessmentData("gender", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 3 && (
									<AgeStep
										value={assessmentData.age}
										onChangeAction={(value) =>
											updateAssessmentData("age", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 4 && (
									<WeightStep
										value={assessmentData.weight}
										onChangeAction={(value) =>
											updateAssessmentData("weight", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 5 && (
									<ProfessionalHelpStep
										value={assessmentData.professionalHelp!}
										onChangeAction={(value) =>
											updateAssessmentData("professionalHelp", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 6 && (
									<PhysicalDistressStep
										value={assessmentData.physicalDistress!}
										onChangeAction={(value) =>
											updateAssessmentData("physicalDistress", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 7 && (
									<MentalHealthSymptomsStep
										value={assessmentData.mentalHealthSymptoms}
										onChangeAction={(value) =>
											updateAssessmentData("mentalHealthSymptoms", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 8 && (
									<SelfDescriptionStep
										value={assessmentData.selfDescriptions}
										onChangeAction={(value) =>
											updateAssessmentData("selfDescriptions", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 9 && (
									<StressLevelStep
										value={assessmentData.stressLevel!}
										onChangeAction={(value) =>
											updateAssessmentData("stressLevel", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 10 && (
									<SleepQualityStep
										value={assessmentData.sleepQuality!}
										onChangeAction={(value) =>
											updateAssessmentData("sleepQuality", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 11 && (
									<MoodStep
										value={assessmentData.mood!}
										onChangeAction={(value) =>
											updateAssessmentData("mood", value)
										}
										onNextAction={handleAssessmentNext}
									/>
								)}
								{currentAssessmentStep === 12 && (
									<CompletionStep onComplete={saveUserData} />
								)}
							</AssessmentLayout>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</main>
	);
}
