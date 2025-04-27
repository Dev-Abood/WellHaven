"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import AssessmentService from "@/lib/assessment-service"
import ProtectedRoute from "@/components/protected-route"
import { Skeleton } from "@/components/ui/skeleton"

export default function AssessmentResults() {
  const { toast } = useToast()
  const [assessment, setAssessment] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const latestAssessment = await AssessmentService.getLatestAssessment()
        setAssessment(latestAssessment)
      } catch (error) {
        console.error("Error fetching assessment:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load assessment results. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssessment()
  }, [toast])

  // Determine result category based on score
  const getResultCategory = (score: number) => {
    if (score >= 80) return { category: "Excellent", color: "bg-green-100 text-green-800" }
    if (score >= 70) return { category: "Good", color: "bg-blue-100 text-blue-800" }
    if (score >= 60) return { category: "Fair", color: "bg-yellow-100 text-yellow-800" }
    if (score >= 50) return { category: "Needs Attention", color: "bg-orange-100 text-orange-800" }
    return { category: "Concerning", color: "bg-red-100 text-red-800" }
  }

  const resultInfo = assessment?.score ? getResultCategory(assessment.score) : { category: "", color: "" }

  return (
    <ProtectedRoute>
      <div className="container p-4 md:p-6">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Assessment Results</h1>
            <p className="text-muted-foreground">
              {assessment?.type === "initial" ? "Initial Assessment" : "Assessment"} Results
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
              <CardDescription>
                Completed on {assessment ? new Date(assessment.createdAt).toLocaleDateString() : "..."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <>
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-24 w-full" />
                </>
              ) : assessment ? (
                <>
                  <div className="flex flex-col items-center p-6 border rounded-lg">
                    <div className={`px-4 py-2 rounded-full mb-4 font-medium ${resultInfo.color}`}>
                      {resultInfo.category}
                    </div>
                    <div className="text-4xl font-bold mb-2">{assessment.score} / 100</div>
                    <p className="text-center text-muted-foreground">{assessment.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Your Responses</h3>
                    <div className="space-y-4">
                      {assessment.questions.map((item: any, index: number) => (
                        <div key={index} className="border rounded-md p-4">
                          <p className="font-medium">{item.question}</p>
                          <p className="text-muted-foreground mt-1">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <p>No assessment results found. Please complete an assessment first.</p>
                  <Button asChild className="mt-4">
                    <Link href="/assessment">Take Assessment</Link>
                  </Button>
                </div>
              )}
            </CardContent>
            {assessment && (
              <CardFooter className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" /> Download Results
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share with Provider
                </Button>
              </CardFooter>
            )}
          </Card>

          {assessment && (
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Based on your assessment results</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-32 w-full" />
                ) : (
                  <ul className="space-y-4">
                    {assessment.recommendations?.map((recommendation: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/dashboard/resources">Explore Resources</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
