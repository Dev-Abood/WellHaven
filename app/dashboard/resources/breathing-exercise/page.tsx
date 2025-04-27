"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState("ready")
  const [timer, setTimer] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  // Breathing cycle configuration
  const phases = {
    inhale: { duration: 4, instruction: "Breathe in slowly through your nose" },
    hold: { duration: 4, instruction: "Hold your breath" },
    exhale: { duration: 6, instruction: "Exhale slowly through your mouth" },
    rest: { duration: 2, instruction: "Rest" },
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1
          setTotalTime((prev) => prev + 1)

          // Determine current phase based on timer
          const cycleTime =
            phases.inhale.duration + phases.hold.duration + phases.exhale.duration + phases.rest.duration
          const cyclePosition = newTimer % cycleTime

          if (cyclePosition < phases.inhale.duration) {
            setCurrentPhase("inhale")
          } else if (cyclePosition < phases.inhale.duration + phases.hold.duration) {
            setCurrentPhase("hold")
          } else if (cyclePosition < phases.inhale.duration + phases.hold.duration + phases.exhale.duration) {
            setCurrentPhase("exhale")
          } else {
            setCurrentPhase("rest")
          }

          return newTimer
        })
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  const toggleExercise = () => {
    setIsActive(!isActive)
    if (!isActive && currentPhase === "ready") {
      setCurrentPhase("inhale")
    }
  }

  const resetExercise = () => {
    setIsActive(false)
    setCurrentPhase("ready")
    setTimer(0)
    setTotalTime(0)
  }

  // Get the current instruction text
  const getInstruction = () => {
    if (currentPhase === "ready") return "Get comfortable and press start when ready"
    return phases[currentPhase as keyof typeof phases].instruction
  }

  // Calculate total exercise time in minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Determine the animation class based on current phase
  const getAnimationClass = () => {
    if (!isActive) return ""

    switch (currentPhase) {
      case "inhale":
        return "animate-expand"
      case "hold":
        return "animate-hold"
      case "exhale":
        return "animate-contract"
      case "rest":
        return ""
      default:
        return ""
    }
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/dashboard/resources">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Resources</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">5-Minute Breathing Exercise</h1>
          <p className="text-muted-foreground">A simple exercise to help reduce stress and anxiety</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Guided Breathing</CardTitle>
            <CardDescription>Follow the animation and instructions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="mb-8 text-center">
              <p className="text-xl font-medium mb-2">{getInstruction()}</p>
              <p className="text-muted-foreground">Total time: {formatTime(totalTime)}</p>
            </div>

            <div className="relative mb-8">
              <div
                className={`
                  w-40 h-40 rounded-full border-8 border-primary/20 flex items-center justify-center
                  ${getAnimationClass()}
                `}
              >
                <div
                  className={`
                    w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold
                    ${getAnimationClass()}
                  `}
                >
                  {currentPhase !== "ready" ? currentPhase : "ready"}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={toggleExercise}>
                {isActive ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> {timer > 0 ? "Resume" : "Start"}
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={resetExercise} disabled={timer === 0}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About This Exercise</CardTitle>
            <CardDescription>Benefits and instructions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This breathing exercise uses the 4-4-6-2 technique, which can help:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reduce stress and anxiety</li>
              <li>Lower heart rate and blood pressure</li>
              <li>Improve focus and concentration</li>
              <li>Promote relaxation and calmness</li>
            </ul>

            <div className="pt-4">
              <h3 className="font-medium mb-2">How to practice:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Find a comfortable position</li>
                <li>Inhale through your nose for 4 seconds</li>
                <li>Hold your breath for 4 seconds</li>
                <li>Exhale slowly through your mouth for 6 seconds</li>
                <li>Rest for 2 seconds before repeating</li>
              </ol>
            </div>

            <p className="pt-4">For best results, practice this exercise for at least 5 minutes daily.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
