import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Brain, BarChart3, BookOpen, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="border-b bg-white">
				<div className="container flex items-center justify-between py-4">
					<div className="flex items-center gap-2">
						<Heart className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">WellHaven</span>
					</div>
					<nav className="hidden md:flex items-center gap-6">
						<Link
							href="#features"
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Features
						</Link>
						<Link
							href="#how-it-works"
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							How It Works
						</Link>
						<Link
							href="#testimonials"
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Testimonials
						</Link>

						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</nav>
					<Button variant="outline" size="icon" className="md:hidden">
						<span className="sr-only">Toggle menu</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-6 w-6"
						>
							<line x1="4" x2="20" y1="12" y2="12" />
							<line x1="4" x2="20" y1="6" y2="6" />
							<line x1="4" x2="20" y1="18" y2="18" />
						</svg>
					</Button>
				</div>
			</header>
			<main>
				{/* Hero Section */}
				<section className="py-20 md:py-32 bg-gradient-to-b from-accent to-white">
					<div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
						<div className="flex-1 space-y-6">
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
								Your Mental Health Journey Starts Here
							</h1>
							<p className="text-lg md:text-xl text-muted-foreground">
								Track your mood, complete assessments, and access resources to
								improve your mental wellbeing.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<SignedOut>
									<Button asChild size="lg">
										<Link href="/sign-up">Get Started</Link>
									</Button>
								</SignedOut>
								<SignedIn>
									<Button asChild size="lg">
										<Link href="/dashboard">Go to Dashboard</Link>
									</Button>
								</SignedIn>
								<Button asChild size="lg" variant="outline">
									<Link href="#how-it-works">Learn More</Link>
								</Button>
							</div>
						</div>
						<div className="flex-1 flex justify-center">
							<div className="relative w-full max-w-md aspect-square">
								<div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow"></div>
								<div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse-slow [animation-delay:750ms]"></div>
								<div className="absolute inset-8 bg-primary/30 rounded-full animate-pulse-slow [animation-delay:1500ms]"></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<Heart className="h-24 w-24 text-primary" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-20 bg-white">
					<div className="container">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
							Features
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<Card className="flex flex-col items-center text-center p-6">
								<div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center mb-4">
									<BarChart3 className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-2">Mood Tracking</h3>
								<p className="text-muted-foreground">
									Track your daily mood and identify patterns to better
									understand your mental health.
								</p>
							</Card>
							<Card className="flex flex-col items-center text-center p-6">
								<div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center mb-4">
									<Brain className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-2">AI Therapy</h3>
								<p className="text-muted-foreground">
									Access our AI-powered therapy assistant for support whenever
									you need it.
								</p>
							</Card>
							<Card className="flex flex-col items-center text-center p-6">
								<div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center mb-4">
									<BookOpen className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-2">Resources</h3>
								<p className="text-muted-foreground">
									Access a library of articles, exercises, and tools to support
									your mental health journey.
								</p>
							</Card>
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section id="how-it-works" className="py-20 bg-accent/30">
					<div className="container">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
							How It Works
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="flex flex-col items-center text-center">
								<div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4 text-xl font-bold">
									1
								</div>
								<h3 className="text-xl font-bold mb-2">Create an Account</h3>
								<p className="text-muted-foreground">
									Sign up and complete your profile to personalize your
									experience.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4 text-xl font-bold">
									2
								</div>
								<h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
								<p className="text-muted-foreground">
									Log your mood daily and complete regular assessments to
									monitor your mental health.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4 text-xl font-bold">
									3
								</div>
								<h3 className="text-xl font-bold mb-2">Get Insights</h3>
								<p className="text-muted-foreground">
									Receive personalized insights and recommendations based on
									your data.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section id="testimonials" className="py-20 bg-white">
					<div className="container">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
							What Our Users Say
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<Card className="p-6">
								<div className="flex items-center mb-4">
									<div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
										<Users className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h4 className="font-bold">Sarah J.</h4>
										<p className="text-sm text-muted-foreground">
											User for 6 months
										</p>
									</div>
								</div>
								<p className="text-muted-foreground">
									"WellHaven has been a game-changer for my mental health
									journey. The mood tracking feature has helped me identify
									triggers and patterns I wasn't aware of before."
								</p>
							</Card>
							<Card className="p-6">
								<div className="flex items-center mb-4">
									<div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
										<Users className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h4 className="font-bold">Michael T.</h4>
										<p className="text-sm text-muted-foreground">
											User for 3 months
										</p>
									</div>
								</div>
								<p className="text-muted-foreground">
									"The assessments provided valuable insights into my anxiety
									levels, and the resources section gave me practical tools to
									manage it. Highly recommend!"
								</p>
							</Card>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 bg-primary text-white">
					<div className="container text-center">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							Ready to Start Your Mental Health Journey?
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Join thousands of users who have improved their mental wellbeing
							with WellHaven.
						</p>
						<SignedOut>
							<Button asChild size="lg" variant="secondary">
								<Link href="/sign-up">Get Started Now</Link>
							</Button>
						</SignedOut>
						<SignedIn>
							<Button asChild size="lg" variant="secondary">
								<Link href="/dashboard">Go to Dashboard</Link>
							</Button>
						</SignedIn>
					</div>
				</section>
			</main>
			<footer className="bg-gray-900 text-white py-12">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<Heart className="h-6 w-6 text-primary" />
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
										className="text-gray-400 hover:text-white transition-colors"
									>
										Features
									</Link>
								</li>
								<li>
									<Link
										href="#how-it-works"
										className="text-gray-400 hover:text-white transition-colors"
									>
										How It Works
									</Link>
								</li>
								<li>
									<Link
										href="#testimonials"
										className="text-gray-400 hover:text-white transition-colors"
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
										className="text-gray-400 hover:text-white transition-colors"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										FAQ
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
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
										className="text-gray-400 hover:text-white transition-colors"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
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
