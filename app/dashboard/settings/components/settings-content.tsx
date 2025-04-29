"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpSupport } from "./help-support";
import { AccountSettings } from "./account-settings";
import { PrivacySettings } from "./privacy-settings";
import { NotificationSettings } from "./notification-settings";
import { AppearanceSettings } from "./appearance-settings";

export function SettingsContent() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Settings</h1>
					<p className="text-muted-foreground">
						Manage your app preferences and account settings
					</p>
				</div>
			</div>

			<Tabs defaultValue="appearance" className="w-full">
				<TabsList className="grid grid-cols-5 mb-6">
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
					<TabsTrigger value="privacy">Privacy</TabsTrigger>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="help">Help & Support</TabsTrigger>
				</TabsList>
				<TabsContent value="appearance">
					<AppearanceSettings />
				</TabsContent>
				<TabsContent value="notifications">
					<NotificationSettings />
				</TabsContent>
				<TabsContent value="privacy">
					<PrivacySettings />
				</TabsContent>
				<TabsContent value="account">
					<AccountSettings />
				</TabsContent>
				<TabsContent value="help">
					<HelpSupport />
				</TabsContent>
			</Tabs>
		</div>
	);
}
