'use server';

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Delete a chat session by ID
 * This is a server action that can be imported into client components
 */
export async function deleteChatSession(chatSessionId: string) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Delete the chat session and all associated messages (cascading delete through Prisma)
    await prisma.chatSession.delete({
      where: {
        id: chatSessionId,
        userId: userId,
      },
    });

    // Revalidate the chats path to update the UI
    revalidatePath('/chat');
    
    return { success: true };
  } catch (error) {
    console.error("[DELETE_CHAT_SESSION]", error);
    throw new Error("Failed to delete chat session");
  }
}

/**
 * Update a chat session's name
 * This is a server action that can be imported into client components
 */
export async function updateChatSessionName(chatSessionId: string, name: string) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!name || typeof name !== "string") {
      throw new Error("Invalid name");
    }

    // Update the chat session name
    const updatedSession = await prisma.chatSession.update({
      where: {
        id: chatSessionId,
        userId: userId,
      },
      data: {
        name,
      },
    });

    // Revalidate the chats path to update the UI
    revalidatePath('/chat');
    
    return updatedSession;
  } catch (error) {
    console.error("[UPDATE_CHAT_SESSION_NAME]", error);
    throw new Error("Failed to update chat session name");
  }
}