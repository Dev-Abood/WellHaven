"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!userId) {
    return null
  }

  return <>{children}</>
}
