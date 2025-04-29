import Link from "next/link";
import {
	Heart,
	Brain,
	BarChart3,
	BookOpen,
	Users,
	Moon,
	Sun,
	Calendar,
	ArrowRight,
	MessageSquare,
	Sparkles,
	Activity,
	Clock,
	ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
	const currentDate = new Date();
	const formattedDate = currentDate.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-gradient-to-r">
							<Image
								src="/logo.jpg"
								alt="Logo"
								width={80}
								height={80}
								className="rounded-full"
							/>
						</div>
						<span className="text-xl font-bold text-slate-800">WellHaven</span>
					</div>

					<nav className="hidden md:flex items-center gap-8">
						<Link
							href="#features"
							className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
						>
							Features
						</Link>
						<Link
							href="#how-it-works"
							className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
						>
							How It Works
						</Link>
						<Link
							href="#testimonials"
							className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
						>
							Testimonials
						</Link>
						<Link
							href="#resources"
							className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
						>
							Resources
						</Link>
					</nav>

					<div className="flex items-center gap-4">
							<SignedOut>
					<SignInButton />
					</SignedOut>
					<SignedIn>
					<UserButton />
					</SignedIn>
					</div>
				</div>
			</header>

			<main>
				{/* Hero Section */}
				<section className="relative overflow-hidden">
					{/* Background Elements */}
					<div className="absolute inset-0 -z-10">
						<div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"></div>
						<div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl"></div>
					</div>

					<div className="container py-20 md:py-32">
						<div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
							<div className="space-y-8">
								<div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-medium text-blue-600">
									<span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
									<span>Your wellness journey begins here</span>
								</div>

								<div className="space-y-4">
									<h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
										Your Mental Health Companion
									</h1>
									<p className="text-lg text-slate-600 md:text-xl max-w-md">
										Track your mood, journal your thoughts, and access AI
										therapy to improve your mental wellbeing.
									</p>
								</div>

								<div className="flex flex-col sm:flex-row gap-4">
									<SignedOut>
										<Button
											asChild
											size="lg"
											className="bg-blue-600 hover:bg-blue-700 text-white"
										>
											<Link href="/sign-up">Start Your Journey</Link>
										</Button>
									</SignedOut>
									<SignedIn>
										<Button
											asChild
											size="lg"
											className="bg-blue-600 hover:bg-blue-700 text-white"
										>
											<Link href="/dashboard">Go to Dashboard</Link>
										</Button>
									</SignedIn>
									<Button
										asChild
										size="lg"
										variant="outline"
										className="border-slate-200 text-slate-700 hover:bg-slate-100"
									>
										<Link href="#how-it-works">
											Learn More
											<ChevronRight className="ml-1 h-4 w-4" />
										</Link>
									</Button>
								</div>
							</div>

							<div className="relative mx-auto lg:ml-auto">
								<div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
									<div className="flex items-center gap-4 mb-6">
										<div className="h-12 w-12 overflow-hidden rounded-full bg-blue-100">
											<div className="flex h-full w-full items-center justify-center">
												<Heart className="h-6 w-6 text-blue-600" />
											</div>
										</div>
										<div>
											<h2 className="text-xl font-bold text-slate-900">
												Hello, You.
											</h2>
											<p className="text-sm text-slate-500">{formattedDate}</p>
										</div>
										<div className="ml-auto rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
											Happy
										</div>
									</div>

									<h3 className="mb-4 text-lg font-semibold text-slate-900">
										Wellbeing Tracker
									</h3>

									<div className="grid gap-4 sm:grid-cols-2 mb-6">
										<div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
											<div className="flex items-start gap-3">
												<div className="rounded-full bg-green-100 p-2">
													<Activity className="h-5 w-5 text-green-600" />
												</div>
												<div>
													<h4 className="font-medium text-slate-900">
														Stress Level
													</h4>
													<p className="text-sm text-slate-500">
														Level 2 (Relaxed)
													</p>
												</div>
											</div>
										</div>

										<div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
											<div className="flex items-start gap-3">
												<div className="rounded-full bg-purple-100 p-2">
													<Moon className="h-5 w-5 text-purple-600" />
												</div>
												<div>
													<h4 className="font-medium text-slate-900">
														Sleep Quality
													</h4>
													<p className="text-sm text-slate-500">
														Insomnia (~3hr Avg)
													</p>
												</div>
											</div>
										</div>
									</div>

									<h3 className="mb-4 text-lg font-semibold text-slate-900">
										Mood Tracker
									</h3>

									<div className="flex flex-wrap gap-2 mb-6">
										<Button
											variant="outline"
											className="rounded-full border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
										>
											Sad
										</Button>
										<Button
											variant="outline"
											className="rounded-full border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
										>
											Happy
										</Button>
										<Button
											variant="outline"
											className="rounded-full border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-700"
										>
											Neutral
										</Button>
									</div>

									<div className="space-y-3">
										<h3 className="text-lg font-semibold text-slate-900">
											Quick Actions
										</h3>
										<div className="grid gap-2">
											<Button
												variant="outline"
												className="justify-start border-slate-200 text-slate-700 hover:bg-slate-100"
											>
												<MessageSquare className="mr-2 h-4 w-4" />
												New Journal Entry
											</Button>
											<Button
												variant="outline"
												className="justify-start border-slate-200 text-slate-700 hover:bg-slate-100"
											>
												<Brain className="mr-2 h-4 w-4" />
												Start AI Therapy Session
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-20 bg-white">
					<div className="container">
						<div className="mx-auto max-w-2xl text-center mb-12">
							<div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
								<Sparkles className="mr-2 h-4 w-4" />
								Features
							</div>
							<h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
								Everything you need for your mental wellbeing
							</h2>
							<p className="mt-4 text-lg text-slate-600">
								Our comprehensive tools help you track, understand, and improve
								your mental health.
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							<Card className="overflow-hidden border-slate-200">
								<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6">
									<div className="rounded-full bg-white p-3 w-fit">
										<BarChart3 className="h-6 w-6 text-blue-600" />
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-slate-900 mb-2">
										Mood Tracking
									</h3>
									<p className="text-slate-600">
										Track your daily mood and identify patterns to better
										understand your mental health.
									</p>
								</div>
							</Card>

							<Card className="overflow-hidden border-slate-200">
								<div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6">
									<div className="rounded-full bg-white p-3 w-fit">
										<Brain className="h-6 w-6 text-teal-600" />
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-slate-900 mb-2">
										AI Therapy
									</h3>
									<p className="text-slate-600">
										Access our AI-powered therapy assistant for support whenever
										you need it.
									</p>
								</div>
							</Card>

							<Card className="overflow-hidden border-slate-200">
								<div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6">
									<div className="rounded-full bg-white p-3 w-fit">
										<MessageSquare className="h-6 w-6 text-purple-600" />
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-slate-900 mb-2">
										Journaling
									</h3>
									<p className="text-slate-600">
										Express your thoughts and feelings through guided journaling
										prompts.
									</p>
								</div>
							</Card>

							<Card className="overflow-hidden border-slate-200">
								<div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
									<div className="rounded-full bg-white p-3 w-fit">
										<BookOpen className="h-6 w-6 text-indigo-600" />
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-slate-900 mb-2">
										Resources
									</h3>
									<p className="text-slate-600">
										Access a library of articles, exercises, and tools to
										support your mental health journey.
									</p>
								</div>
							</Card>

							<Card className="overflow-hidden border-slate-200">
								<div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6">
									<div className="rounded-full bg-white p-3 w-fit">
										<Activity className="h-6 w-6 text-cyan-600" />
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-slate-900 mb-2">
										Insights & Analytics
									</h3>
									<p className="text-slate-600">
										Gain valuable insights into your mental health patterns with
										detailed analytics.
									</p>
								</div>
							</Card>

							<Card className="overflow-hidden border-slate-200">
								<div className="bg-gradient-to-br from-sky-50 to-sky-100 p-6">
									<div className="rounded-full bg-white p-3 w-fit">
										<Calendar className="h-6 w-6 text-sky-600" />
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-slate-900 mb-2">
										Scheduled Sessions
									</h3>
									<p className="text-slate-600">
										Set reminders for therapy sessions, journaling, and other
										wellness activities.
									</p>
								</div>
							</Card>
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section id="how-it-works" className="py-20 bg-slate-50">
					<div className="container">
						<div className="mx-auto max-w-2xl text-center mb-12">
							<div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
								<Clock className="mr-2 h-4 w-4" />
								How It Works
							</div>
							<h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
								Your journey to better mental health
							</h2>
							<p className="mt-4 text-lg text-slate-600">
								Follow these simple steps to start improving your wellbeing
								today.
							</p>
						</div>

						<div className="relative">
							{/* Connecting Line */}
							<div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-blue-200 hidden md:block"></div>

							<div className="grid gap-12 md:gap-16">
								<div className="relative grid gap-8 md:grid-cols-2">
									<div className="md:text-right px-8">
										<div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2">
											1
										</div>
										<div className="mt-6 md:mt-0">
											<h3 className="text-xl font-bold text-slate-900 mb-2">
												Create an Account
											</h3>
											<p className="text-slate-600">
												Sign up and complete your profile to personalize your
												experience.
											</p>
										</div>
									</div>
									<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
										<div className="flex items-center gap-4 mb-4">
											<div className="h-10 w-10 overflow-hidden rounded-full bg-blue-100">
												<div className="flex h-full w-full items-center justify-center">
													<Users className="h-5 w-5 text-blue-600" />
												</div>
											</div>
											<div>
												<h4 className="font-medium text-slate-900">
													Profile Setup
												</h4>
												<p className="text-sm text-slate-500">
													Personalize your experience
												</p>
											</div>
										</div>
										<div className="space-y-2">
											<div className="h-2 w-full rounded-full bg-slate-100">
												<div className="h-full w-3/4 rounded-full bg-blue-500"></div>
											</div>
											<div className="flex justify-between text-xs text-slate-500">
												<span>Profile: 75% complete</span>
												<span>3/4 steps</span>
											</div>
										</div>
									</div>
								</div>

								<div className="relative grid gap-8 md:grid-cols-2">
									<div className="md:order-2">
										<div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2">
											2
										</div>
										<div className="mt-6 md:mt-0">
											<h3 className="text-xl font-bold text-slate-900 mb-2">
												Track Your Progress
											</h3>
											<p className="text-slate-600">
												Log your mood daily and complete regular assessments to
												monitor your mental health.
											</p>
										</div>
									</div>
									<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:order-1">
										<h4 className="font-medium text-slate-900 mb-4">
											Weekly Mood Report
										</h4>
										<div className="grid grid-cols-7 gap-2 mb-4">
											{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
												(day, i) => (
													<div key={day} className="text-center">
														<div
															className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
																i === 1
																	? "bg-green-100 text-green-600"
																	: i === 3
																		? "bg-red-100 text-red-600"
																		: "bg-slate-100 text-slate-600"
															}`}
														>
															{i === 1 ? "😊" : i === 3 ? "😔" : "😐"}
														</div>
														<span className="text-xs text-slate-600">
															{day}
														</span>
													</div>
												),
											)}
										</div>
										<div className="text-sm text-slate-600">
											<span className="font-medium">Insight:</span> Your mood
											tends to improve on weekends.
										</div>
									</div>
								</div>

								<div className="relative grid gap-8 md:grid-cols-2">
									<div className="md:text-right">
										<div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2">
											3
										</div>
										<div className="mt-6 md:mt-0">
											<h3 className="text-xl font-bold text-slate-900 mb-2">
												Get Insights
											</h3>
											<p className="text-slate-600">
												Receive personalized insights and recommendations based
												on your data.
											</p>
										</div>
									</div>
									<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
										<h4 className="font-medium text-slate-900 mb-4">
											Your Personalized Insights
										</h4>
										<div className="space-y-4">
											<div className="rounded-lg bg-blue-50 p-3">
												<div className="flex items-start gap-3">
													<div className="rounded-full bg-blue-100 p-1.5 mt-0.5">
														<Sun className="h-4 w-4 text-blue-600" />
													</div>
													<div>
														<h5 className="text-sm font-medium text-slate-900">
															Morning Routine Impact
														</h5>
														<p className="text-xs text-slate-600">
															Days when you journal in the morning show a 32%
															improvement in overall mood.
														</p>
													</div>
												</div>
											</div>
											<div className="rounded-lg bg-purple-50 p-3">
												<div className="flex items-start gap-3">
													<div className="rounded-full bg-purple-100 p-1.5 mt-0.5">
														<Moon className="h-4 w-4 text-purple-600" />
													</div>
													<div>
														<h5 className="text-sm font-medium text-slate-900">
															Sleep Correlation
														</h5>
														<p className="text-xs text-slate-600">
															There appears to be a strong correlation between
															your sleep quality and mood.
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section id="testimonials" className="py-20 bg-white">
					<div className="container">
						<div className="mx-auto max-w-2xl text-center mb-12">
							<div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
								<Users className="mr-2 h-4 w-4" />
								Testimonials
							</div>
							<h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
								What Our Users Say
							</h2>
							<p className="mt-4 text-lg text-slate-600">
								Join thousands who have improved their mental wellbeing with
								WellHaven.
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							<Card className="border-slate-200 p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="h-12 w-12 overflow-hidden rounded-full bg-blue-100">
										<div className="flex h-full w-full items-center justify-center">
											<Users className="h-6 w-6 text-blue-600" />
										</div>
									</div>
									<div>
										<h4 className="font-bold text-slate-900">Sarah J.</h4>
										<p className="text-sm text-slate-500">User for 6 months</p>
									</div>
								</div>
								<div className="mb-4">
									<div className="flex text-blue-400">
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-5 w-5"
											>
												<path
													fillRule="evenodd"
													d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
													clipRule="evenodd"
												/>
											</svg>
										))}
									</div>
								</div>
								<p className="text-slate-600">
									"WellHaven has been a game-changer for my mental health
									journey. The mood tracking feature has helped me identify
									triggers and patterns I wasn't aware of before."
								</p>
							</Card>

							<Card className="border-slate-200 p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="h-12 w-12 overflow-hidden rounded-full bg-blue-100">
										<div className="flex h-full w-full items-center justify-center">
											<Users className="h-6 w-6 text-blue-600" />
										</div>
									</div>
									<div>
										<h4 className="font-bold text-slate-900">Michael T.</h4>
										<p className="text-sm text-slate-500">User for 3 months</p>
									</div>
								</div>
								<div className="mb-4">
									<div className="flex text-blue-400">
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-5 w-5"
											>
												<path
													fillRule="evenodd"
													d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
													clipRule="evenodd"
												/>
											</svg>
										))}
									</div>
								</div>
								<p className="text-slate-600">
									"The assessments provided valuable insights into my anxiety
									levels, and the resources section gave me practical tools to
									manage it. Highly recommend!"
								</p>
							</Card>

							<Card className="border-slate-200 p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="h-12 w-12 overflow-hidden rounded-full bg-blue-100">
										<div className="flex h-full w-full items-center justify-center">
											<Users className="h-6 w-6 text-blue-600" />
										</div>
									</div>
									<div>
										<h4 className="font-bold text-slate-900">Jessica R.</h4>
										<p className="text-sm text-slate-500">User for 1 year</p>
									</div>
								</div>
								<div className="mb-4">
									<div className="flex text-blue-400">
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-5 w-5"
											>
												<path
													fillRule="evenodd"
													d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
													clipRule="evenodd"
												/>
											</svg>
										))}
									</div>
								</div>
								<p className="text-slate-600">
									"I've tried several wellness apps, but WellHaven stands out
									with its AI therapy feature. It's like having a therapist in
									your pocket whenever you need support."
								</p>
							</Card>
						</div>
					</div>
				</section>

				{/* Resources Section */}
				<section id="resources" className="py-20 bg-slate-50">
					<div className="container">
						<div className="mx-auto max-w-2xl text-center mb-12">
							<div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
								<BookOpen className="mr-2 h-4 w-4" />
								Resources
							</div>
							<h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
								Helpful Resources for Your Journey
							</h2>
							<p className="mt-4 text-lg text-slate-600">
								Access our curated collection of articles, guides, and tools.
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{[
								{
									title: "Understanding Anxiety",
									description:
										"Learn about the different types of anxiety and effective coping strategies.",
									category: "Mental Health",
								},
								{
									title: "Mindfulness Practices",
									description:
										"Simple mindfulness exercises you can incorporate into your daily routine.",
									category: "Wellness",
								},
								{
									title: "Sleep Improvement Guide",
									description:
										"Tips and techniques for better sleep quality and establishing healthy sleep patterns.",
									category: "Sleep",
								},
							].map((resource, i) => (
								<Card key={i} className="overflow-hidden border-slate-200">
									<div className="h-40 bg-gradient-to-br from-blue-100 to-teal-100 p-6">
										<div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-600">
											{resource.category}
										</div>
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold text-slate-900 mb-2">
											{resource.title}
										</h3>
										<p className="text-slate-600 mb-4">
											{resource.description}
										</p>
										<Button
											variant="outline"
											className="w-full justify-center border-slate-200 text-blue-600 hover:bg-blue-50"
										>
											Read More
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</div>
								</Card>
							))}
						</div>

						<div className="mt-12 text-center">
							<Button
								asChild
								className="bg-blue-600 hover:bg-blue-700 text-white"
							>
								<Link href="#">View All Resources</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
					<div className="container">
						<div className="mx-auto max-w-3xl text-center">
							<h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
								Ready to Start Your Mental Health Journey?
							</h2>
							<p className="text-xl mb-8 text-blue-100">
								Join thousands of users who have improved their mental wellbeing
								with WellHaven.
							</p>
							<div className="flex flex-col sm:flex-row justify-center gap-4">
								<SignedOut>
									<Button
										asChild
										size="lg"
										className="bg-white text-blue-700 hover:bg-blue-50"
									>
										<Link href="/sign-up">Get Started Now</Link>
									</Button>
								</SignedOut>
								<SignedIn>
									<Button
										asChild
										size="lg"
										className="bg-white text-blue-700 hover:bg-blue-50"
									>
										<Link href="/dashboard">Go to Dashboard</Link>
									</Button>
								</SignedIn>
								<Button
									asChild
									size="lg"
									className="border-white text-white hover:bg-blue-500"
								>
									<Link href="#features">Learn More</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<div className="rounded-full bg-gradient-to-r">
									<Image
										src="/logo.jpg"
										alt="Logo"
										width={80}
										height={80}
										className="rounded-full"
									/>
								</div>
								<span className="text-xl font-bold">WellHaven</span>
							</div>
							<p className="text-gray-400">
								Your personal mental health companion for tracking, assessment,
								and resources.
							</p>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-4">Quick Links</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#features"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Features
									</Link>
								</li>
								<li>
									<Link
										href="#how-it-works"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										How It Works
									</Link>
								</li>
								<li>
									<Link
										href="#testimonials"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Testimonials
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-4">Resources</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										FAQ
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Support
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-4">Legal</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Cookie Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>
							&copy; {new Date().getFullYear()} WellHaven. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
