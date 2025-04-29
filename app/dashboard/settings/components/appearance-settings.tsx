"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function AppearanceSettings() {
	const [theme, setTheme] = useState("light");
	const [language, setLanguage] = useState("english");
	const [fontSize, setFontSize] = useState("medium");
	const [aiVolume, setAiVolume] = useState(40);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Color Theme</CardTitle>
					<CardDescription>
						Choose your preferred color theme for the application
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4">
						<Button
							variant={theme === "light" ? "default" : "outline"}
							className={
								theme === "light" ? "bg-amber-500 hover:bg-amber-600" : ""
							}
							onClick={() => setTheme("light")}
						>
							<Sun className="mr-2 h-4 w-4" />
							Light Mode
						</Button>
						<Button
							variant={theme === "dark" ? "default" : "outline"}
							className={
								theme === "dark"
									? "bg-gray-800 hover:bg-gray-900 text-white"
									: ""
							}
							onClick={() => setTheme("dark")}
						>
							<Moon className="mr-2 h-4 w-4" />
							Dark Mode
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Language</CardTitle>
					<CardDescription>Select your preferred language</CardDescription>
				</CardHeader>
				<CardContent>
					<Select value={language} onValueChange={setLanguage}>
						<SelectTrigger className="w-full md:w-[300px]">
							<SelectValue placeholder="Select language" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="english">English</SelectItem>
							<SelectItem value="arabic">العربية (Arabic)</SelectItem>
							<SelectItem value="spanish">Español (Spanish)</SelectItem>
							<SelectItem value="french">Français (French)</SelectItem>
							<SelectItem value="german">Deutsch (German)</SelectItem>
							<SelectItem value="chinese">中文 (Chinese)</SelectItem>
							<SelectItem value="japanese">日本語 (Japanese)</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Font Size</CardTitle>
					<CardDescription>
						Adjust the text size throughout the application
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RadioGroup
						value={fontSize}
						onValueChange={setFontSize}
						className="flex flex-col sm:flex-row gap-4 sm:items-center"
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="small" id="small" />
							<Label htmlFor="small" className="text-sm">
								Aa
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="medium" id="medium" />
							<Label htmlFor="medium" className="text-base">
								Aa
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="large" id="large" />
							<Label htmlFor="large" className="text-lg">
								Aa
							</Label>
						</div>
					</RadioGroup>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>AI Sound Volume</CardTitle>
					<CardDescription>
						Adjust the volume for AI voice interactions
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Slider
							value={[aiVolume]}
							max={100}
							step={1}
							onValueChange={(value) => setAiVolume(value[0])}
							className="w-full"
						/>
						<div className="flex justify-between items-center">
							<span className="text-sm text-muted-foreground">0%</span>
							<span className="text-sm font-medium">{aiVolume}%</span>
							<span className="text-sm text-muted-foreground">100%</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
