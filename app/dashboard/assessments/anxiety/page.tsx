"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"

// GAD-7 Anxiety Assessment Questions
const questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
]

const answerOptions = [
  { value: "0", label: "Not at all", description: "0 points" },
  { value: "1", label: "Several days", description: "1 point" },
  { value: "2", label: "More than half the days", description: "2 points" },
  { value: "3", label: "Nearly every day", description: "3 points" },
]

export default function AnxietyAssessment() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Calculate score
      const score = answers.reduce((total, answer) => total + Number.parseInt(answer || "0"), 0)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to results page (would pass score as query param or state in a real app)
      router.push("/dashboard/assessments/results?type=anxiety&score=" + score)
    } catch (error) {
      console.error("Error submitting assessment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="container p-4 md:p-6">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/assessments")} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to Assessments</span>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Anxiety Assessment</h1>
          <p className="text-gray-600">GAD-7 Questionnaire</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="mb-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <CardTitle>Over the last 2 weeks, how often have you been bothered by:</CardTitle>
          <CardDescription>{questions[currentQuestion]}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer} className="space-y-4">
            {answerOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || isSubmitting}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {currentQuestion === questions.length - 1 ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
            {currentQuestion < questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
