"use client";

import {
	Brain,
	Home,
	LineChart,
	PenSquare,
	Settings,
	SmilePlus,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
	const menuItems = [
		{ title: "Dashboard", icon: Home, url: "/", isActive: true },
		{ title: "AI Therapy", icon: Brain, url: "/therapy" },
		{ title: "Journaling", icon: PenSquare, url: "/journal" },
		{ title: "Mood", icon: SmilePlus, url: "dashboard/mood" },
		{ title: "Summary", icon: LineChart, url: "/summary" },
		{ title: "Settings", icon: Settings, url: "/settings" },
	];

	return (
		<Sidebar>
			<SidebarHeader className="p-4">
				<div className="flex flex-col items-center gap-2 py-4">
					<Avatar className="h-16 w-16 border-2 border-sidebar-border">
						<AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-center text-center">
						<span className="text-sm font-medium">Alex Johnson</span>
					</div>
					<Button variant="outline" size="sm" className="mt-2 w-full">
						View Profile
					</Button>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={item.isActive}
										tooltip={item.title}
									>
										<a href={item.url}>
											<item.icon className="h-5 w-5" />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="p-4">
				<div className="flex justify-between items-center px-2 text-xs text-muted-foreground">
					<span>v1.2.0</span>
					<a href="#" className="hover:underline">
						Help
					</a>
				</div>
			</SidebarFooter>
			<SidebarRail />
			<SidebarTrigger className="absolute left-4 top-4 md:hidden" />
		</Sidebar>
	);
}
