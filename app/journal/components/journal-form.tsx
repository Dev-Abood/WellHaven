"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

// Import the server action and types
import { z } from "zod";
import { createJournal, JournalFormValues, updateJournal } from "../actions";
import { Mood } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";

// Define the form schema with Zod
const journalFormSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be less than 100 characters"),
	content: z.string().min(1, "Journal entry is required"),
	stressLevel: z.number().min(1).max(5),
	mood: z.enum(["overjoyed", "happy", "neutral", "sad", "depressed"]),
});

// Define the mood options
const moodOptions = [
	{ value: "overjoyed", icon: "😊", color: "bg-green-200" },
	{ value: "happy", icon: "😃", color: "bg-yellow-200" },
	{ value: "neutral", icon: "😐", color: "bg-neutral-200" },
	{ value: "sad", icon: "😢", color: "bg-orange-200" },
	{ value: "depressed", icon: "😠", color: "bg-purple-200" },
];

interface JournalFormProps {
	journalData?: {
		title: string;
		id: string;
		content: string;
		userId: string;
		createdAt: Date;
		updatedAt: Date;
		stressLevel: number;
		mood: Mood;
	} | null;
}

export function JournalForm({ journalData }: JournalFormProps = {}) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isEditing = !!journalData;

	// Initialize the form with default values or existing journal data
	const form = useForm<JournalFormValues>({
		resolver: zodResolver(journalFormSchema),
		defaultValues: {
			title: journalData?.title || "",
			content: journalData?.content || "",
			stressLevel: journalData?.stressLevel || 3,
			mood: (journalData?.mood?.toLowerCase() as any) || "neutral",
		},
	});

	async function onSubmit(data: JournalFormValues) {
		console.log(data);
		setIsSubmitting(true);

		try {
			let response;

			if (isEditing && journalData?.id) {
				response = await updateJournal(journalData.id, data);
			} else {
				response = await createJournal(data);
			}

			if (response.success) {
				toast({
					title: isEditing
						? "Journal updated successfully"
						: "Journal created successfully",
					variant: "default",
				});
				router.push("/journal");
				router.refresh();
			} else {
				toast({
					title: "Something went wrong. Please try again.",
					variant: "destructive",
				});
				console.log(response.error);
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="max-w-2xl mx-auto">
			<div className="mb-6">
				<Link href="/journal">
					<Button
						variant="ghost"
						size="icon"
						className="h-10 w-10 rounded-full"
					>
						<ArrowLeft className="h-6 w-6" />
						<span className="sr-only">Back to journals</span>
					</Button>
				</Link>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg font-medium">
									Journal Title
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Write your Title..."
										className="h-12 rounded-full border-2 px-4"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg font-medium">
									Write Your Entry
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Write your feelings..."
										className="min-h-[200px] rounded-xl border-2 p-4 resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="stressLevel"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg font-medium">
									Stress Level
								</FormLabel>
								<div className="pt-4 pb-2">
									<FormControl>
										<Slider
											min={1}
											max={5}
											step={1}
											defaultValue={[field.value]}
											onValueChange={(value) => field.onChange(value[0])}
											className="bg-green-100"
										/>
									</FormControl>
								</div>
								<div className="flex justify-between px-2 text-sm text-muted-foreground">
									<span>1</span>
									<span>2</span>
									<span>3</span>
									<span>4</span>
									<span>5</span>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="mood"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg font-medium">
									Select Your Mood
								</FormLabel>
								<div className="flex justify-between mt-2">
									{moodOptions.map((option) => (
										<div
											key={option.value}
											className="flex flex-col items-center gap-1"
										>
											<FormControl>
												<Button
													type="button"
													variant="outline"
													className={`h-16 w-16 rounded-full ${option.color} border-2 ${
														field.value === option.value
															? "border-primary ring-2 ring-primary"
															: "border-transparent"
													}`}
													onClick={() => field.onChange(option.value)}
												>
													<span className="text-3xl">{option.icon}</span>
												</Button>
											</FormControl>
											<span className="text-xs font-medium capitalize">
												{option.value}
											</span>
										</div>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-center pt-6">
						<Button
							type="submit"
							className="h-12 px-8 rounded-full bg-[#5D4037] hover:bg-[#4E342E]"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									{isEditing ? "Updating..." : "Creating..."}
								</>
							) : (
								<>
									<Check className="mr-2 h-5 w-5" />
									{isEditing ? "Update Journal" : "Create Journal"}
								</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
