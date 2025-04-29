"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TimePickerDemo } from "./time-picker";

export function NotificationSettings() {
	const [enableNotifications, setEnableNotifications] = useState(true);
	const [moodReminders, setMoodReminders] = useState(true);
	const [journalReminders, setJournalReminders] = useState(true);
	const [therapyReminders, setTherapyReminders] = useState(true);
	const [emailNotifications, setEmailNotifications] = useState(false);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Notification Preferences</CardTitle>
					<CardDescription>
						Control how and when you receive notifications
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="enable-notifications"
									className="text-base font-medium"
								>
									Enable Notifications
								</Label>
								<p className="text-sm text-muted-foreground">
									Master toggle for all app notifications
								</p>
							</div>
							<Switch
								id="enable-notifications"
								checked={enableNotifications}
								onCheckedChange={setEnableNotifications}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="mood-reminders"
									className="text-base font-medium"
								>
									Mood Check-in Reminders
								</Label>
								<p className="text-sm text-muted-foreground">
									Daily reminders to log your mood
								</p>
							</div>
							<Switch
								id="mood-reminders"
								checked={moodReminders && enableNotifications}
								onCheckedChange={setMoodReminders}
								disabled={!enableNotifications}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="journal-reminders"
									className="text-base font-medium"
								>
									Journal Reminders
								</Label>
								<p className="text-sm text-muted-foreground">
									Reminders to write in your journal
								</p>
							</div>
							<Switch
								id="journal-reminders"
								checked={journalReminders && enableNotifications}
								onCheckedChange={setJournalReminders}
								disabled={!enableNotifications}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="therapy-reminders"
									className="text-base font-medium"
								>
									Therapy Session Reminders
								</Label>
								<p className="text-sm text-muted-foreground">
									Reminders for upcoming therapy sessions
								</p>
							</div>
							<Switch
								id="therapy-reminders"
								checked={therapyReminders && enableNotifications}
								onCheckedChange={setTherapyReminders}
								disabled={!enableNotifications}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="email-notifications"
									className="text-base font-medium"
								>
									Email Notifications
								</Label>
								<p className="text-sm text-muted-foreground">
									Receive notifications via email
								</p>
							</div>
							<Switch
								id="email-notifications"
								checked={emailNotifications && enableNotifications}
								onCheckedChange={setEmailNotifications}
								disabled={!enableNotifications}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Reminder Schedule</CardTitle>
					<CardDescription>
						Set when you want to receive daily reminders
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="mood-time">Mood Check-in Time</Label>
								<TimePickerDemo />
							</div>
							<div className="space-y-2">
								<Label htmlFor="journal-time">Journal Reminder Time</Label>
								<TimePickerDemo />
							</div>
						</div>
						<div className="space-y-2">
							<Label>Reminder Frequency</Label>
							<Select defaultValue="daily">
								<SelectTrigger className="w-full md:w-[300px]">
									<SelectValue placeholder="Select frequency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="daily">Daily</SelectItem>
									<SelectItem value="weekdays">Weekdays only</SelectItem>
									<SelectItem value="weekends">Weekends only</SelectItem>
									<SelectItem value="custom">Custom schedule</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
