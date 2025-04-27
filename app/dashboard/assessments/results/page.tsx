"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react"

export default function AssessmentResults() {
  const searchParams = useSearchParams()
  const assessmentType = searchParams.get("type") || "anxiety"
  const score = Number.parseInt(searchParams.get("score") || "0")

  // Determine result category based on score
  // For GAD-7 (anxiety):
  // 0-4: Minimal anxiety
  // 5-9: Mild anxiety
  // 10-14: Moderate anxiety
  // 15-21: Severe anxiety
  let resultCategory = ""
  let resultDescription = ""
  let resultColor = ""

  if (assessmentType === "anxiety") {
    if (score <= 4) {
      resultCategory = "Minimal Anxiety"
      resultDescription = "Your results suggest minimal levels of anxiety. Continue monitoring your mental health."
      resultColor = "bg-green-100 text-green-800"
    } else if (score <= 9) {
      resultCategory = "Mild Anxiety"
      resultDescription = "Your results suggest mild anxiety. Consider using some self-help resources."
      resultColor = "bg-yellow-100 text-yellow-800"
    } else if (score <= 14) {
      resultCategory = "Moderate Anxiety"
      resultDescription = "Your results suggest moderate anxiety. Consider speaking with a mental health professional."
      resultColor = "bg-orange-100 text-orange-800"
    } else {
      resultCategory = "Severe Anxiety"
      resultDescription = "Your results suggest severe anxiety. We recommend consulting with a healthcare provider."
      resultColor = "bg-red-100 text-red-800"
    }
  }

  // Get recommendations based on result
  const getRecommendations = () => {
    if (score <= 4) {
      return [
        "Continue practicing mindfulness and self-care",
        "Track your mood regularly to monitor any changes",
        "Maintain healthy sleep, exercise, and nutrition habits",
      ]
    } else if (score <= 9) {
      return [
        "Try our guided breathing exercises to manage anxiety",
        "Read our article on understanding anxiety triggers",
        "Consider establishing a regular mindfulness practice",
      ]
    } else if (score <= 14) {
      return [
        "Explore our cognitive behavioral therapy resources",
        "Consider speaking with a mental health professional",
        "Try our stress management techniques",
      ]
    } else {
      return [
        "We recommend consulting with a healthcare provider",
        "Explore our crisis resources and support options",
        "Consider our guided meditation for severe anxiety",
      ]
    }
  }

  const recommendations = getRecommendations()

  return (
    <div className="container p-4 md:p-6">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/dashboard/assessments">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Assessments</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Assessment Results</h1>
          <p className="text-gray-600">
            {assessmentType === "anxiety" ? "GAD-7 Anxiety Assessment" : "Assessment"} Results
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Completed on {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center p-6 border rounded-lg">
              <div className={`px-4 py-2 rounded-full mb-4 font-medium ${resultColor}`}>{resultCategory}</div>
              <div className="text-4xl font-bold mb-2">{score} / 21</div>
              <p className="text-center text-gray-600">{resultDescription}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">What This Means</h3>
              <p className="text-gray-600 mb-4">
                The GAD-7 is a screening tool for anxiety. It measures the severity of anxiety symptoms over the past
                two weeks.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-2">0-4</span>
                  <span>Minimal anxiety</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-2">5-9</span>
                  <span>Mild anxiety</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium mr-2">
                    10-14
                  </span>
                  <span>Moderate anxiety</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium mr-2">15-21</span>
                  <span>Severe anxiety</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" /> Download Results
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" /> Share with Provider
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Based on your assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
              <Link href="/dashboard/resources">Explore Resources</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Track Your Progress</CardTitle>
            <CardDescription>Your assessment history over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Assessment history chart would go here</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/assessments">Take Another Assessment</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
