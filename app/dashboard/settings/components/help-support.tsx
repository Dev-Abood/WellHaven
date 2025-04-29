"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";

export function HelpSupport() {
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Frequently Asked Questions</CardTitle>
					<CardDescription>
						Find answers to common questions about the app
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>How do I track my mood?</AccordionTrigger>
							<AccordionContent>
								You can track your mood by navigating to the Mood page from the
								sidebar. Click on any date in the calendar and select your mood
								and sleep quality for that day. Your entries will be saved
								automatically.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>
								How does the AI therapy feature work?
							</AccordionTrigger>
							<AccordionContent>
								The AI therapy feature uses advanced natural language processing
								to provide supportive conversations. It's not a replacement for
								professional therapy but can offer guidance and reflection
								exercises. Access it from the AI Therapy section in the sidebar.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Can I export my mood data?</AccordionTrigger>
							<AccordionContent>
								Yes, you can export your mood data by going to the Summary page
								and clicking on the export button. You can choose to export as
								CSV or PDF format for your records or to share with your
								healthcare provider.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger>
								Is my data private and secure?
							</AccordionTrigger>
							<AccordionContent>
								Yes, we take your privacy seriously. All your data is encrypted
								and stored securely. We never share your personal information
								with third parties without your explicit consent. You can review
								our privacy policy for more details.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5">
							<AccordionTrigger>
								How do I cancel my subscription?
							</AccordionTrigger>
							<AccordionContent>
								To cancel your subscription, go to Account Settings and select
								"Manage Subscription." From there, you can cancel your current
								plan. Your access will continue until the end of your current
								billing period.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Contact Support</CardTitle>
					<CardDescription>Get help from our support team</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6">
						<div className="grid gap-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name">Your Name</Label>
									<Input id="name" placeholder="Enter your name" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="subject">Subject</Label>
								<Input id="subject" placeholder="What is your inquiry about?" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="message">Message</Label>
								<Textarea
									id="message"
									placeholder="Please describe your issue or question in detail"
									className="min-h-[120px]"
								/>
							</div>
							<Button className="w-full md:w-auto">Submit Request</Button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
							<Card>
								<CardContent className="p-4 flex flex-col items-center text-center">
									<Mail className="h-8 w-8 text-primary mb-2" />
									<h3 className="font-medium">Email Support</h3>
									<p className="text-sm text-muted-foreground">
										support@mentalhealth.app
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										Response within 24 hours
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4 flex flex-col items-center text-center">
									<MessageSquare className="h-8 w-8 text-primary mb-2" />
									<h3 className="font-medium">Live Chat</h3>
									<p className="text-sm text-muted-foreground">
										Available 9am-5pm ET
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										Chat with our support team
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4 flex flex-col items-center text-center">
									<Phone className="h-8 w-8 text-primary mb-2" />
									<h3 className="font-medium">Phone Support</h3>
									<p className="text-sm text-muted-foreground">
										1-800-123-4567
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										Mon-Fri, 9am-5pm ET
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Resources</CardTitle>
					<CardDescription>Helpful guides and documentation</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button variant="outline" className="h-auto p-4 justify-start">
							<div className="flex items-start gap-4">
								<BookOpen className="h-6 w-6 text-primary" />
								<div className="text-left">
									<h3 className="font-medium">User Guide</h3>
									<p className="text-sm text-muted-foreground">
										Learn how to use all features of the app
									</p>
								</div>
							</div>
						</Button>
						<Button variant="outline" className="h-auto p-4 justify-start">
							<div className="flex items-start gap-4">
								<HelpCircle className="h-6 w-6 text-primary" />
								<div className="text-left">
									<h3 className="font-medium">Tutorial Videos</h3>
									<p className="text-sm text-muted-foreground">
										Watch step-by-step guides for using the app
									</p>
								</div>
							</div>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
