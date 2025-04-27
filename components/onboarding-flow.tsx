"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const steps = [
    {
      title: "Personalize Your Mental Health State With AI",
      description: "WellHaven uses AI to understand your unique mental health needs and provide personalized support.",
      color: "#E5EAD6",
      image: "/placeholder.svg?height=300&width=300",
      progress: 20,
    },
    {
      title: "Intelligent Mood Tracking & AI Emotion Insights",
      description: "Track your moods and emotions with our intelligent system that provides insights and patterns.",
      color: "#FFC89E",
      image: "/placeholder.svg?height=300&width=300",
      progress: 40,
    },
    {
      title: "AI Mental Journaling & AI Therapy Chatbot",
      description: "Express your thoughts in our AI-powered journal and get support from our therapy chatbot.",
      color: "#E1E0E0",
      image: "/placeholder.svg?height=300&width=300",
      progress: 60,
    },
    {
      title: "Healthy Habits Start with Smart Planning",
      description: "Build better mental health habits with our smart planning tools and reminders.",
      color: "#FFEAC1",
      image: "/placeholder.svg?height=300&width=300",
      progress: 80,
    },
    {
      title: "Loving & Supportive Community & Earn Wellness Rewards",
      description: "Join our supportive community and earn rewards for your wellness journey.",
      color: "#DDD1FF",
      image: "/placeholder.svg?height=300&width=300",
      progress: 100,
    },
  ]

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/assessment")
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: currentStepData.color }}
    >
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <span className="inline-block px-4 py-1 rounded-full border border-[#4E3321] text-[#4E3321] text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <div className="mb-8 flex justify-center">
            <Image
              src={currentStepData.image || "/placeholder.svg"}
              alt={`Step ${currentStep + 1} illustration`}
              width={300}
              height={300}
              className="w-full max-w-[250px] h-auto"
            />
          </div>

          <Progress value={currentStepData.progress} className="h-2 mb-6" />

          <h2 className="text-2xl font-bold text-center text-[#4E3321] mb-4">{currentStepData.title}</h2>

          <p className="text-[#736A66] text-center mb-8">{currentStepData.description}</p>

          <div className="flex justify-center">
            <Button
              onClick={goToNextStep}
              className="w-14 h-14 rounded-full bg-[#4E3321] hover:bg-[#3a261a] flex items-center justify-center"
              size="icon"
            >
              <ArrowRight size={24} className="text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
