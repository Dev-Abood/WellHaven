// "use client";

// import React, { useState, useRef, useEffect, Suspense } from "react";
// import { Send } from "lucide-react";
// import ChatMessage from "./components/chat-message";
// import ChatHeader from "./components/chat-header";
// import Sidebar from "./components/sidebar";
// import { useRouter, useSearchParams } from "next/navigation";

// // Create a separate component for the part that uses useSearchParams
// function ChatContent() {
// 	const [messages, setMessages] = useState<any[]>([]);
// 	const [input, setInput] = useState("");
// 	const [isTyping, setIsTyping] = useState(false);
// 	const [activeChatId, setActiveChatId] = useState<string | null>(null);
// 	const messagesEndRef = useRef<HTMLDivElement>(null);
// 	const router = useRouter();
// 	const searchParams = useSearchParams();

// 	// Get the chat session ID from URL if available
// 	useEffect(() => {
// 		const sessionId = searchParams.get("session");
// 		if (sessionId) {
// 			setActiveChatId(sessionId);
// 			fetchChatSession(sessionId);
// 		}
// 	}, [searchParams]);

// 	// Scroll to bottom of chat when messages change
// 	useEffect(() => {
// 		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);

// 	// Fetch chat session messages
// 	const fetchChatSession = async (sessionId: string) => {
// 		try {
// 			const response = await fetch(`/api/chat/${sessionId}`);
// 			const data = await response.json();

// 			if (data.chatSession) {
// 				const formattedMessages = data.chatSession.messages.map((msg: any) => ({
// 					id: msg.id,
// 					role: msg.isFromUser ? "user" : "assistant",
// 					content: msg.content,
// 					timestamp: msg.createdAt,
// 				}));

// 				setMessages(formattedMessages);
// 				setActiveChatId(sessionId);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching chat session:", error);
// 		}
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (!input.trim()) return;

// 		// Add user message to UI immediately
// 		const userMessage = {
// 			id: Date.now().toString(),
// 			role: "user",
// 			content: input,
// 			timestamp: new Date().toISOString(),
// 		};

// 		setMessages((prev) => [...prev, userMessage]);
// 		setInput("");
// 		setIsTyping(true);

// 		try {
// 			// Send message to API
// 			const response = await fetch("/api/chat", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					content: input,
// 					chatSessionId: activeChatId,
// 				}),
// 			});

// 			const data = await response.json();

// 			// If this is a new chat session, update the URL
// 			if (data.chatSessionId && !activeChatId) {
// 				setActiveChatId(data.chatSessionId);
// 				router.push(`?session=${data.chatSessionId}`, { scroll: false });
// 			}

// 			// Add AI response to messages
// 			if (data.aiMessage) {
// 				const assistantMessage = {
// 					id: data.aiMessage.id,
// 					role: "assistant",
// 					content: data.aiMessage.content,
// 					timestamp: data.aiMessage.createdAt,
// 				};

// 				setMessages((prev) => [...prev, assistantMessage]);
// 			}
// 		} catch (error) {
// 			console.error("Error sending message:", error);
// 			// Add error message
// 			setMessages((prev) => [
// 				...prev,
// 				{
// 					id: Date.now().toString() + "-error",
// 					role: "assistant",
// 					content:
// 						"Sorry, there was an error processing your message. Please try again.",
// 					timestamp: new Date().toISOString(),
// 				},
// 			]);
// 		} finally {
// 			setIsTyping(false);
// 		}
// 	};

// 	const handleNewChat = () => {
// 		setMessages([]);
// 		setActiveChatId(null);
// 		router.push("/therapy", { scroll: false });
// 	};

// 	return (
// 		<div className="flex w-full mx-auto bg-zinc-800 overflow-hidden">
// 			{/* Sidebar */}
// 			<Sidebar
// 				activeChatId={activeChatId}
// 				onChatSelect={fetchChatSession}
// 				onNewChat={handleNewChat}
// 			/>

// 			{/* Chat Area */}
// 			<div className="flex-1 flex flex-col bg-white">
// 				<ChatHeader />

// 				<div className="flex-1 overflow-y-auto p-6">
// 					<div className="space-y-6 max-w-3xl mx-auto">
// 						{messages.length === 0 ? (
// 							<div className="text-center p-8 text-zinc-500">
// 								<p>Start a new conversation with WellHaven's AI therapist</p>
// 							</div>
// 						) : (
// 							messages.map((message) => (
// 								<ChatMessage key={message.id} message={message} />
// 							))
// 						)}
// 						{isTyping && (
// 							<div className="flex items-center text-sm text-gray-500 ml-12">
// 								<div className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
// 								<div
// 									className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"
// 									style={{ animationDelay: "0.2s" }}
// 								></div>
// 								<div
// 									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
// 									style={{ animationDelay: "0.4s" }}
// 								></div>
// 							</div>
// 						)}
// 						<div ref={messagesEndRef} />
// 					</div>
// 				</div>

// 				<div className="p-4 border-t bg-white">
// 					<form
// 						onSubmit={handleSubmit}
// 						className="flex items-center max-w-3xl mx-auto"
// 					>
// 						<input
// 							type="text"
// 							value={input}
// 							onChange={(e) => setInput(e.target.value)}
// 							placeholder="Send a message..."
// 							className="flex-1 p-4 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
// 							disabled={isTyping}
// 						/>
// 						<button
// 							type="submit"
// 							className={`ml-3 p-3 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors ${
// 								isTyping ? "opacity-50 cursor-not-allowed" : ""
// 							}`}
// 							disabled={isTyping}
// 						>
// 							<Send size={20} />
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default function Home() {
// 	return (
// 		<main className="flex min-h-screen bg-zinc-900">
// 			<Suspense fallback={<div>Loading...</div>}>
// 				<ChatContent />
// 			</Suspense>
// 		</main>
// 	);
// }
