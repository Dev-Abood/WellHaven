"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera, LogOut, Save, User } from "lucide-react";

export function AccountSettings() {
	const [name, setName] = useState("Alex Johnson");
	const [email, setEmail] = useState("alex@example.com");
	const [phone, setPhone] = useState("+1 (555) 123-4567");

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Profile Information</CardTitle>
					<CardDescription>
						Update your account details and profile picture
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
							<Avatar className="w-24 h-24 border-2 border-muted">
								<AvatarImage
									src="/placeholder.svg?height=96&width=96"
									alt="Profile"
								/>
								<AvatarFallback className="text-2xl">AJ</AvatarFallback>
							</Avatar>
							<div className="space-y-2">
								<h3 className="font-medium">Profile Picture</h3>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										className="flex items-center gap-2"
									>
										<Camera className="h-4 w-4" />
										Upload New
									</Button>
									<Button variant="ghost" size="sm">
										Remove
									</Button>
								</div>
							</div>
						</div>

						<Separator />

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">Phone Number</Label>
								<Input
									id="phone"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="ghost">Cancel</Button>
					<Button className="flex items-center gap-2">
						<Save className="h-4 w-4" />
						Save Changes
					</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Password & Security</CardTitle>
					<CardDescription>
						Manage your password and security settings
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="current-password">Current Password</Label>
								<Input id="current-password" type="password" />
							</div>
						</div>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="new-password">New Password</Label>
								<Input id="new-password" type="password" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirm-password">Confirm New Password</Label>
								<Input id="confirm-password" type="password" />
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button>Update Password</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Account Actions</CardTitle>
					<CardDescription>Manage your account status</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Button
							variant="outline"
							className="w-full sm:w-auto flex items-center gap-2 text-amber-600 border-amber-300 hover:bg-amber-50"
						>
							<User className="h-4 w-4" />
							Upgrade to Premium
						</Button>
						<Button
							variant="outline"
							className="w-full sm:w-auto flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
						>
							<LogOut className="h-4 w-4" />
							Sign Out
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
