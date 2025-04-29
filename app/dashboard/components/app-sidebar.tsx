import {
	Brain,
	Home,
	LineChart,
	PenSquare,
	Settings,
	SmilePlus,
	Book,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
	const menuItems = [
		{ title: "Dashboard", icon: Home, url: "/dashboard", isActive: true },
		{ title: "AI Therapy", icon: Brain, url: "/therapy" },
		{ title: "Journaling", icon: PenSquare, url: "/journal" },
		{ title: "Mood", icon: SmilePlus, url: "/dashboard/mood" },
		{ title: "Summary", icon: LineChart, url: "/dashboard/summary" },
		{ title: "Resources", icon: Book, url: "/dashboard/resources" },
		{ title: "Settings", icon: Settings, url: "/dashboard/settings" },
	];

	return (
		<Sidebar>
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
