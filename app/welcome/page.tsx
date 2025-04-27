import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Brain } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-wellhaven-beige flex flex-col">
      <div className="container flex-1 flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-wellhaven-brown rounded-full flex items-center justify-center">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-wellhaven-brown">Welcome to WellHaven</h1>
          <p className="text-wellhaven-gray mb-8">Your personal mental health companion</p>

          <Card className="mb-6 bg-white shadow-md">
            <CardContent className="p-6">
              <p className="text-wellhaven-gray mb-6">
                WellHaven helps you track your mood, complete assessments, and access resources to improve your mental
                wellbeing.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild className="bg-wellhaven-green hover:bg-wellhaven-green/90 text-white">
                  <Link href="/signup">Create Account</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-wellhaven-green text-wellhaven-green hover:bg-wellhaven-lightGreen"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-wellhaven-gray">
            By continuing, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
