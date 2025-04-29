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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, Shield, Trash2 } from "lucide-react";

export function PrivacySettings() {
	const [dataCollection, setDataCollection] = useState(true);
	const [anonymousAnalytics, setAnonymousAnalytics] = useState(true);
	const [locationTracking, setLocationTracking] = useState(false);
	const [biometricAuth, setBiometricAuth] = useState(false);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Privacy Settings</CardTitle>
					<CardDescription>
						Control how your data is collected and used
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="data-collection"
									className="text-base font-medium"
								>
									Data Collection
								</Label>
								<p className="text-sm text-muted-foreground">
									Allow app to collect usage data to improve your experience
								</p>
							</div>
							<Switch
								id="data-collection"
								checked={dataCollection}
								onCheckedChange={setDataCollection}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="anonymous-analytics"
									className="text-base font-medium"
								>
									Anonymous Analytics
								</Label>
								<p className="text-sm text-muted-foreground">
									Share anonymous usage data for app improvement
								</p>
							</div>
							<Switch
								id="anonymous-analytics"
								checked={anonymousAnalytics}
								onCheckedChange={setAnonymousAnalytics}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="location-tracking"
									className="text-base font-medium"
								>
									Location Tracking
								</Label>
								<p className="text-sm text-muted-foreground">
									Allow app to access your location data
								</p>
							</div>
							<Switch
								id="location-tracking"
								checked={locationTracking}
								onCheckedChange={setLocationTracking}
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="biometric-auth"
									className="text-base font-medium"
								>
									Biometric Authentication
								</Label>
								<p className="text-sm text-muted-foreground">
									Use fingerprint or face recognition to unlock the app
								</p>
							</div>
							<Switch
								id="biometric-auth"
								checked={biometricAuth}
								onCheckedChange={setBiometricAuth}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Data Management</CardTitle>
					<CardDescription>
						Manage your personal data stored in the app
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row gap-4">
							<Button variant="outline" className="flex items-center gap-2">
								<Download className="h-4 w-4" />
								Export My Data
							</Button>

							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="destructive"
										className="flex items-center gap-2"
									>
										<Trash2 className="h-4 w-4" />
										Delete All My Data
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											all your data including mood logs, journal entries, and
											personal settings.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction className="bg-destructive text-destructive-foreground">
											Delete All Data
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>

						<div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
							<Shield className="h-5 w-5 text-amber-600 mt-0.5" />
							<div>
								<h4 className="font-medium text-amber-800">
									Privacy Commitment
								</h4>
								<p className="text-sm text-amber-700">
									We take your privacy seriously. Your personal data is
									encrypted and never shared with third parties without your
									explicit consent.
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
