"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TimePickerDemo() {
	const [time, setTime] = React.useState("09:00");

	return (
		<div className="flex items-center space-x-2">
			<div className="grid gap-1.5 grow">
				<div className="relative">
					<Input
						id="time"
						type="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						className="pl-8"
					/>
					<Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				</div>
			</div>
		</div>
	);
}
