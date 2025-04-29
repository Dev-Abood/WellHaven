import { AppSidebar } from "../components/app-sidebar";
import { SettingsContent } from "./components/settings-content";

export default function SettingsPage() {
	return (
		<main className="flex min-h-screen bg-gray-50">
			<AppSidebar />
			<div className="flex-1 flex flex-col">
				<div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
					<div className="max-w-4xl mx-auto">
						<SettingsContent />
					</div>
				</div>
			</div>
		</main>
	);
}
