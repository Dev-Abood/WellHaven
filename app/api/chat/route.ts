import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { generateChatResponse } from "./azure-openai";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { content, chatSessionId } = await req.json();

		// Find or create a chat session
		let chatSession;
		if (chatSessionId) {
			chatSession = await prisma.chatSession.findUnique({
				where: { id: chatSessionId },
				include: { messages: true },
			});

			if (!chatSession || chatSession.userId !== userId) {
				return NextResponse.json(
					{ error: "Chat session not found" },
					{ status: 404 },
				);
			}
		} else {
			// Create a new chat session
			chatSession = await prisma.chatSession.create({
				data: {
					name: "New Conversation",
					userId,
					messages: {
						create: [],
					},
				},
				include: { messages: true },
			});
		}

		// Add the user message to the database
		const userMessage = await prisma.chatMessage.create({
			data: {
				content,
				isFromUser: true,
				chatSessionId: chatSession.id,
			},
		});

		// Get all messages in the conversation to maintain context
		const allMessages = await prisma.chatMessage.findMany({
			where: { chatSessionId: chatSession.id },
			orderBy: { createdAt: "asc" },
		});

		// Format messages for the OpenAI API
		const formattedMessages = allMessages.map((msg) => ({
			role: msg.isFromUser ? "user" : "assistant",
			content: msg.content,
		}));

		// Generate AI response
		const aiResponseContent = await generateChatResponse(formattedMessages);

		// Save AI response to database
		const aiMessage = await prisma.chatMessage.create({
			data: {
				content:
					aiResponseContent || "I'm sorry, I couldn't generate a response.",
				isFromUser: false,
				chatSessionId: chatSession.id,
			},
		});

		return NextResponse.json({
			userMessage,
			aiMessage,
			chatSessionId: chatSession.id,
		});
	} catch (error) {
		console.error("Error processing chat:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
