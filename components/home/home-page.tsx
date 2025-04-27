"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, BarChart3, BookOpen, Settings, User, Calendar, Plus, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-wellhaven-beige flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-wellhaven-green" />
            <span className="text-xl font-bold text-wellhaven-brown">WellHaven</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-wellhaven-brown" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-wellhaven-brown">Welcome back, Alex</h1>
          <p className="text-wellhaven-gray">How are you feeling today?</p>
        </div>

        {/* Mood Tracker */}
        <Card className="mb-6 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-wellhaven-brown">Today's Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-wellhaven-lightGreen flex items-center justify-center mb-2">
                  <span className="text-xl">😊</span>
                </div>
                <span className="text-xs text-wellhaven-gray">Happy</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <span className="text-xl">😐</span>
                </div>
                <span className="text-xs text-wellhaven-gray">Neutral</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <span className="text-xl">😔</span>
                </div>
                <span className="text-xs text-wellhaven-gray">Sad</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <span className="text-xl">😡</span>
                </div>
                <span className="text-xs text-wellhaven-gray">Angry</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <span className="text-xl">😰</span>
                </div>
                <span className="text-xs text-wellhaven-gray">Anxious</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-wellhaven-lightGreen flex items-center justify-center mb-2">
                <Brain className="h-5 w-5 text-wellhaven-green" />
              </div>
              <h3 className="font-medium text-wellhaven-brown mb-1">AI Therapy</h3>
              <p className="text-xs text-wellhaven-gray mb-3">Talk to our AI therapist</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full border-wellhaven-green text-wellhaven-green"
              >
                Start Session
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-wellhaven-lightGreen flex items-center justify-center mb-2">
                <BarChart3 className="h-5 w-5 text-wellhaven-green" />
              </div>
              <h3 className="font-medium text-wellhaven-brown mb-1">Assessment</h3>
              <p className="text-xs text-wellhaven-gray mb-3">Take a mental health assessment</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full border-wellhaven-green text-wellhaven-green"
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Daily Tips */}
        <Card className="mb-6 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-wellhaven-brown">Daily Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-wellhaven-lightGreen/30 p-4 rounded-lg">
              <p className="text-wellhaven-brown">
                <span className="font-bold">Mindful Breathing:</span> Take 5 minutes today to practice deep breathing.
                Inhale for 4 counts, hold for 4, and exhale for 6.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Activities */}
        <Card className="mb-6 bg-white shadow-sm">
          <CardHeader className="pb-2 flex justify-between items-center">
            <CardTitle className="text-lg text-wellhaven-brown">Upcoming Activities</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4 text-wellhaven-brown" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wellhaven-lightGreen flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-wellhaven-green" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-wellhaven-brown">Meditation Session</h4>
                  <p className="text-xs text-wellhaven-gray">Today, 5:00 PM</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ArrowRight className="h-4 w-4 text-wellhaven-brown" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wellhaven-lightGreen flex items-center justify-center">
                  <Brain className="h-5 w-5 text-wellhaven-green" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-wellhaven-brown">Therapy Check-in</h4>
                  <p className="text-xs text-wellhaven-gray">Tomorrow, 10:00 AM</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ArrowRight className="h-4 w-4 text-wellhaven-brown" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white border-t border-gray-200 py-2">
        <div className="container mx-auto">
          <div className="flex justify-around items-center">
            <Button variant="ghost" className="flex flex-col items-center h-auto py-2">
              <Brain className="h-5 w-5 text-wellhaven-green" />
              <span className="text-xs mt-1 text-wellhaven-brown">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-auto py-2">
              <BarChart3 className="h-5 w-5 text-wellhaven-gray" />
              <span className="text-xs mt-1 text-wellhaven-gray">Progress</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-auto py-2">
              <BookOpen className="h-5 w-5 text-wellhaven-gray" />
              <span className="text-xs mt-1 text-wellhaven-gray">Resources</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-auto py-2">
              <Settings className="h-5 w-5 text-wellhaven-gray" />
              <span className="text-xs mt-1 text-wellhaven-gray">Settings</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
