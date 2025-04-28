// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, MessageSquare, PlusCircle } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";

// type ChatSession = {
// 	id: string;
// 	name: string;
// 	updatedAt: string;
// 	messages: any[];
// };

// export default function Sidebar({
// 	activeChatId,
// 	onChatSelect,
// 	onNewChat,
// }: {
// 	activeChatId: string | null;
// 	onChatSelect: (id: string) => void;
// 	onNewChat: () => void;
// }) {
// 	const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		fetchChatSessions();
// 	}, [activeChatId]);

// 	const fetchChatSessions = async () => {
// 		try {
// 			setIsLoading(true);
// 			const response = await fetch("/api/chat/sessions");
// 			const data = await response.json();

// 			if (data.chatSessions) {
// 				setChatSessions(data.chatSessions);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching chat sessions:", error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const formatDate = (dateString: string) => {
// 		const date = new Date(dateString);
// 		const today = new Date();
// 		const yesterday = new Date(today);
// 		yesterday.setDate(yesterday.getDate() - 1);

// 		if (date.toDateString() === today.toDateString()) {
// 			return "Today";
// 		} else if (date.toDateString() === yesterday.toDateString()) {
// 			return "Yesterday";
// 		} else {
// 			return format(date, "MMM d");
// 		}
// 	};

// 	return (
// 		<div className="w-80 bg-zinc-100 border-r border-zinc-200 flex flex-col">
// 			<div className="p-4 border-b border-zinc-200">
// 				<div className="flex items-center justify-between">
// 					<div className="flex items-center">
// 						<Button
// 							variant="ghost"
// 							asChild
// 							size="icon"
// 							className="text-[#5a4a42] hover:bg-[#5a4a42]/10 rounded-full w-10 h-10"
// 						>
// 							<Link href="/dashboard">
// 								<ChevronLeft className="h-5 w-5" />
// 							</Link>
// 						</Button>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="p-4">
// 				<button
// 					className="w-full flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// 					onClick={onNewChat}
// 				>
// 					<PlusCircle size={18} />
// 					<span>New Conversation</span>
// 				</button>
// 			</div>
// 			<div className="flex-1 overflow-y-auto">
// 				<div className="px-3 py-2">
// 					<h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3">
// 						Recent Chats
// 					</h3>
// 				</div>
// 				<div className="space-y-1 px-3">
// 					{isLoading ? (
// 						<div className="p-4 text-center text-zinc-500">Loading...</div>
// 					) : chatSessions.length === 0 ? (
// 						<div className="p-4 text-center text-zinc-500">
// 							No chat history yet
// 						</div>
// 					) : (
// 						chatSessions.map((chat) => (
// 							<button
// 								key={chat.id}
// 								className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
// 									chat.id === activeChatId
// 										? "bg-green-100 text-green-800"
// 										: "text-zinc-700 hover:bg-zinc-200"
// 								}`}
// 								onClick={() => onChatSelect(chat.id)}
// 							>
// 								<MessageSquare
// 									size={18}
// 									className={
// 										chat.id === activeChatId
// 											? "text-green-600"
// 											: "text-zinc-500"
// 									}
// 								/>
// 								<div className="ml-3 flex-1 truncate">
// 									<p className="font-medium">{chat.name}</p>
// 									<p className="text-xs text-zinc-500">
// 										{formatDate(chat.updatedAt)}
// 									</p>
// 								</div>
// 							</button>
// 						))
// 					)}
// 				</div>
// 			</div>
// 			<div className="p-4 border-t border-zinc-200">
// 				<div className="flex items-center justify-between">
// 					<div className="text-sm text-zinc-500">
// 						<p>WellHaven v1.2.0</p>
// 					</div>
// 					<button className="text-xs text-green-600 hover:text-green-700">
// 						Help & Support
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
