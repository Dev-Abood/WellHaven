import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const chatSessions = await prisma.chatSession.findMany({
			where: { userId },
			orderBy: { updatedAt: "desc" },
			include: {
				messages: {
					take: 1,
					orderBy: { createdAt: "desc" },
				},
			},
		});

		return NextResponse.json({ chatSessions });
	} catch (error) {
		console.error("Error fetching chat sessions:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
