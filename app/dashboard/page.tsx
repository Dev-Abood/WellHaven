"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, BarChart3, TrendingUp, Calendar, MessageSquare } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  // Get current date for greeting
  const currentHour = new Date().getHours()
  let greeting = "Good morning"
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon"
  } else if (currentHour >= 18) {
    greeting = "Good evening"
  }

  useEffect(() => {
    // Simulate data loading
    if (isLoaded) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [isLoaded])

  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {greeting}, {user?.firstName || "User"}
          </h1>
          <p className="text-muted-foreground">Here's your mental health overview</p>
        </div>
        <Button className="mt-4 md:mt-0" asChild>
          <Link href="/dashboard/mood/log">Log Today's Mood</Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Streak</CardDescription>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <CardTitle className="text-3xl flex items-center">
                0 days <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
              </CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Start logging your mood daily to build a streak.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Mood This Week</CardDescription>
            {isLoading ? <Skeleton className="h-8 w-24" /> : <CardTitle className="text-3xl">No data</CardTitle>}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent mood data available.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Assessment</CardDescription>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <CardTitle className="text-3xl flex items-center">
                Now <Calendar className="ml-2 h-5 w-5 text-primary" />
              </CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Initial assessment recommended</p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mood Trends</CardTitle>
          <CardDescription>Your mood patterns over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div className="h-64 flex flex-col items-center justify-center bg-accent/20 rounded-md">
              <p className="text-muted-foreground mb-4">No mood data available yet</p>
              <Button asChild>
                <Link href="/dashboard/mood/log">Log Your First Mood</Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link href="/dashboard/mood">
              View Full History <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Log Your Mood</CardTitle>
            <CardDescription>Track how you're feeling today</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/mood/log">
                Start <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mb-2">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>AI Therapy Session</CardTitle>
            <CardDescription>Talk to our AI therapist</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/therapy">
                Start Chat <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Explore Resources</CardTitle>
            <CardDescription>Find helpful articles and exercises</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/resources">
                Browse <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recommended Resources */}
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Understanding Anxiety</CardTitle>
                <CardDescription>Educational article</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn about the causes, symptoms, and management strategies for anxiety.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/resources/anxiety">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>5-Minute Breathing Exercise</CardTitle>
                <CardDescription>Relaxation technique</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A simple breathing exercise to help reduce stress and anxiety in the moment.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/resources/breathing-exercise">
                    Start Exercise <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
