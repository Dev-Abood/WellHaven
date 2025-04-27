import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// This endpoint handles Clerk webhooks to sync user data with our database
export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === "user.created") {
    // Create a new user in our database when a user is created in Clerk
    const { id, email_addresses, first_name, last_name } = evt.data

    try {
      await prisma.user.create({
        data: {
          id,
          email: email_addresses[0].email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
          password: "", // We don't need passwords with Clerk
          createdAt: new Date(),
        },
      })

      console.log(`User created: ${id}`)
    } catch (error) {
      console.error("Error creating user:", error)
    }
  } else if (eventType === "user.updated") {
    // Update user in our database when a user is updated in Clerk
    const { id, email_addresses, first_name, last_name } = evt.data

    try {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          email: email_addresses[0].email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
        },
      })

      console.log(`User updated: ${id}`)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  } else if (eventType === "user.deleted") {
    // Delete user from our database when a user is deleted in Clerk
    const { id } = evt.data

    try {
      await prisma.user.delete({
        where: {
          id,
        },
      })

      console.log(`User deleted: ${id}`)
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return NextResponse.json({ success: true })
}
