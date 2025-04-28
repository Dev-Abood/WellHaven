import { currentUser } from "@clerk/nextjs/server";
import { AzureOpenAI } from "openai";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	try {
		// 1. Authenticate user with Clerk
		const user = await currentUser();
		if (!user) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		// 2. Parse the request body
		const body = await request.json();
		const { messages, chatId } = body;

		// 3. Find user in your database
		let dbUser = await prisma.user.findUnique({
			where: { id: user.id },
		});

		if (!dbUser) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		// 4. Get or create chat if chatId is provided
		let chat;
		if (chatId) {
			chat = await prisma.chatSession.findUnique({
				where: {
					id: chatId,
					userId: dbUser.id,
				},
			});

			if (!chat) {
				return new Response(JSON.stringify({ error: "Chat not found" }), {
					status: 404,
					headers: { "Content-Type": "application/json" },
				});
			}
		} else {
			// Create a new chat with a default name (can be updated later)
			const firstUserMessage =
				messages.find((msg: any) => msg.role === "user")?.content ||
				"New conversation";
			const chatName =
				firstUserMessage.length > 30
					? `${firstUserMessage.substring(0, 30)}...`
					: firstUserMessage;

			chat = await prisma.chatSession.create({
				data: {
					name: chatName,
					userId: dbUser.id,
				},
			});
		}

		// 5. Save user message to database
		const lastUserMessage = messages.findLast(
			(msg: any) => msg.role === "user",
		);
		if (lastUserMessage) {
			await prisma.chatMessage.create({
				data: {
					content: lastUserMessage.content,
					isFromUser: true,
					chatSessionId: chat.id,
				},
			});
		}

		const apiKey = process.env.AZURE_OPENAI_API_KEY;
		const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
		const deploymentName = "gpt-35-turbo";
		const apiVersion = "2024-10-21";

		const client = new AzureOpenAI({
			apiKey: new AzureKeyCredential(apiKey),
			endpoint,
			apiVersion,
			deployment: deploymentName,
		});

		// 7. Format messages for the API
		const formattedMessages = messages.map((msg: any) => ({
			role: msg.role,
			content: msg.content,
		}));

		// 8. Create a streaming response
		const stream = await client.chat.completions.create({
			model: deploymentName, // This is typically required but may be ignored when deployment is specified
			messages: formattedMessages,
			max_tokens: 1000,
			stream: true,
		});

		// For streaming, we need to construct a readable stream
		const encoder = new TextEncoder();

		// This will accumulate the complete response
		let fullResponse = "";

		const readableStream = new ReadableStream({
			async start(controller) {
				for await (const chunk of stream) {
					const content = chunk.choices[0]?.delta?.content || "";
					if (content) {
						controller.enqueue(encoder.encode(content));
						fullResponse += content;
					}
				}
				controller.close();

				// Save the complete response to database after streaming is done
				await prisma.chatMessage.create({
					data: {
						content: fullResponse,
						isFromUser: false,
						chatSessionId: chat.id,
					},
				});
			},
		});

		// Return the streaming response with chat ID in headers
		return new StreamingTextResponse(readableStream, {
			headers: { "X-Chat-Id": chat.id },
		});
	} catch (error: any) {
		console.error("Chat completion error:", error);
		return new Response(
			JSON.stringify({ error: error.message || "Internal server error" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
