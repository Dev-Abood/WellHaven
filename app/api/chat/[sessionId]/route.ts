import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { sessionId: string } },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const chatSession = await prisma.chatSession.findUnique({
			where: { id: params.sessionId },
			include: {
				messages: {
					orderBy: { createdAt: "asc" },
				},
			},
		});

		if (!chatSession || chatSession.userId !== userId) {
			return NextResponse.json(
				{ error: "Chat session not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ chatSession });
	} catch (error) {
		console.error("Error fetching chat session:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
