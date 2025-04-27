"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F7F4F2] flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col items-center p-6 pt-8">
            <div className="w-16 h-16 bg-[#9BB067] rounded-full flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6C10 6 8 7 8 10C8 13 10 14 12 14C14 14 16 13 16 10C16 7 14 6 12 6Z" fill="white" />
                <path
                  d="M6 10C6 10 8 12 12 12C16 12 18 10 18 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M4 8C4 8 8 10 12 10C16 10 20 8 20 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M4 12C4 12 8 14 12 14C16 14 20 12 20 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-center mb-4">
              <span className="text-[#4E3321]">Hello, You. Welcome to </span>
              <span className="text-[#9BB067]">WellHaven!</span>
            </h1>

            <p className="text-[#736A66] text-lg font-medium text-center mb-8">
              A calming space to reflect, plan, and grow 🍃
            </p>

            <div className="w-full max-w-sm mb-8">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Welcome illustration"
                width={400}
                height={300}
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <Button
              onClick={() => router.push("/onboarding")}
              className="w-full bg-[#4E3321] hover:bg-[#3a261a] text-white rounded-full py-6 mb-6"
              size="lg"
            >
              <span className="mr-2">Get Started</span>
              <ArrowRight size={20} />
            </Button>

            <p className="text-[#736A66] text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#EC7D1C] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
