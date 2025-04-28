"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatMessage from "./components/chat-message";
import ChatHeader from "./components/chat-header";
import Sidebar from "./components/sidebar";

// Default chat data to simulate conversation
const defaultMessages = [
	{
		id: 1,
		role: "assistant",
		content: "Hello You. How are you feeling today?",
		timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
	},
	{
		id: 2,
		role: "user",
		content: "I've been feeling a bit anxious lately, especially about work.",
		timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
	},
	{
		id: 3,
		role: "assistant",
		content:
			"I understand. Work anxiety can be challenging. Could you tell me more about what specific aspects of work are causing you anxiety?",
		timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
	},
	{
		id: 4,
		role: "user",
		content:
			"I have a big presentation coming up next week and I'm worried I won't be prepared enough.",
		timestamp: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
	},
	{
		id: 5,
		role: "assistant",
		content:
			"That's a common concern. Presentations can definitely trigger anxiety. Have you started preparing for it yet? Sometimes breaking down the preparation into smaller steps can make it feel more manageable.",
		timestamp: new Date(Date.now() - 1000 * 60 * 26).toISOString(),
	},
	{
		id: 6,
		role: "user",
		content:
			"I've started, but I feel like I'm not making enough progress. I'm worried about forgetting what to say during the actual presentation.",
		timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
	},
	{
		id: 7,
		role: "assistant",
		content:
			"That's understandable. Public speaking can be nerve-wracking. Would it help to practice the presentation with someone you trust? Or perhaps record yourself practicing to review later?",
		timestamp: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
	},
];

export default function Home() {
	const [messages, setMessages] = useState(defaultMessages);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom of chat when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!input.trim()) return;

		// Add user message
		const userMessage = {
			id: messages.length + 1,
			role: "user",
			content: input,
			timestamp: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");

		// Simulate AI response
		setIsTyping(true);

		setTimeout(() => {
			const responses = [
				"I understand how you're feeling. Would you like to talk more about that?",
				"Thank you for sharing. How long have you been feeling this way?",
				"That's interesting. Could you tell me more about what might be causing these feelings?",
				"I'm here to listen. What would help you feel better right now?",
				"It sounds like you're going through a lot. Let's explore some coping strategies together.",
				"Have you tried any relaxation techniques that have helped you in the past?",
				"Sometimes, breaking down big tasks into smaller steps can help reduce anxiety. Would that approach work for you?",
			];

			const randomResponse =
				responses[Math.floor(Math.random() * responses.length)];

			const assistantMessage = {
				id: messages.length + 2,
				role: "assistant",
				content: randomResponse,
				timestamp: new Date().toISOString(),
			};

			setMessages((prev) => [...prev, assistantMessage]);
			setIsTyping(false);
		}, 1500);
	};

	return (
		<main className="flex min-h-screen bg-zinc-900">
			<div className="flex w-full mx-auto bg-zinc-800 overflow-hidden">
				{/* Sidebar */}
				<Sidebar />

				{/* Chat Area */}
				<div className="flex-1 flex flex-col bg-white">
					<ChatHeader />

					<div className="flex-1 overflow-y-auto p-6">
						<div className="space-y-6 max-w-3xl mx-auto">
							{messages.map((message) => (
								<ChatMessage key={message.id} message={message} />
							))}
							{isTyping && (
								<div className="flex items-center text-sm text-gray-500 ml-12">
									<div className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
									<div
										className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"
										style={{ animationDelay: "0.2s" }}
									></div>
									<div
										className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
										style={{ animationDelay: "0.4s" }}
									></div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>
					</div>

					<div className="p-4 border-t bg-white">
						<form
							onSubmit={handleSubmit}
							className="flex items-center max-w-3xl mx-auto"
						>
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Send a message..."
								className="flex-1 p-4 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
							/>
							<button
								type="submit"
								className="ml-3 p-3 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
							>
								<Send size={20} />
							</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
