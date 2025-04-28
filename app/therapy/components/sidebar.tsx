"use client";

import { useState } from "react";
import { ChevronLeft, MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
	const [activeChat, setActiveChat] = useState(0);

	const chatHistory = [
		{ id: 0, name: "Current Session", date: "Today", active: true },
		{ id: 1, name: "Anxiety Discussion", date: "Yesterday", active: false },
		{ id: 2, name: "Work Stress", date: "May 2", active: false },
		{ id: 3, name: "Sleep Issues", date: "Apr 28", active: false },
	];

	return (
		<div className="w-80 bg-zinc-100 border-r border-zinc-200 flex flex-col">
			<div className="p-4 border-b border-zinc-200">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Button
							variant="ghost"
							asChild
							size="icon"
							className="text-[#5a4a42] hover:bg-[#5a4a42]/10 rounded-full w-10 h-10"
						>
							<Link href="/chat">
								<ChevronLeft className="h-5 w-5" />
							</Link>
						</Button>
					</div>
				</div>
			</div>

			<div className="p-4">
				<button className="w-full flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
					<PlusCircle size={18} />
					<span>New Conversation</span>
				</button>
			</div>

			<div className="flex-1 overflow-y-auto">
				<div className="px-3 py-2">
					<h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3">
						Recent Chats
					</h3>
				</div>

				<div className="space-y-1 px-3">
					{chatHistory.map((chat) => (
						<button
							key={chat.id}
							className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
								chat.id === activeChat
									? "bg-green-100 text-green-800"
									: "text-zinc-700 hover:bg-zinc-200"
							}`}
							onClick={() => setActiveChat(chat.id)}
						>
							<MessageSquare
								size={18}
								className={
									chat.id === activeChat ? "text-green-600" : "text-zinc-500"
								}
							/>
							<div className="ml-3 flex-1 truncate">
								<p className="font-medium">{chat.name}</p>
								<p className="text-xs text-zinc-500">{chat.date}</p>
							</div>
						</button>
					))}
				</div>
			</div>

			<div className="p-4 border-t border-zinc-200">
				<div className="flex items-center justify-between">
					<div className="text-sm text-zinc-500">
						<p>WellHaven v1.2.0</p>
					</div>
					<button className="text-xs text-green-600 hover:text-green-700">
						Help & Support
					</button>
				</div>
			</div>
		</div>
	);
}
