"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function TherapyPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI therapy assistant. How are you feeling today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, you would make an API call to your AI service
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sample responses based on user input
      let response = "I understand how you feel. Could you tell me more about that?"

      if (input.toLowerCase().includes("anxious") || input.toLowerCase().includes("anxiety")) {
        response =
          "It sounds like you're experiencing anxiety. Remember that anxiety is a normal response to stress. Have you tried any breathing exercises or mindfulness techniques?"
      } else if (input.toLowerCase().includes("sad") || input.toLowerCase().includes("depressed")) {
        response =
          "I'm sorry to hear you're feeling down. Depression and sadness are common emotions. Would you like to talk more about what might be contributing to these feelings?"
      } else if (input.toLowerCase().includes("stress") || input.toLowerCase().includes("stressed")) {
        response =
          "Stress can be challenging to manage. What specific situations are causing you stress right now? Identifying triggers can be a helpful first step."
      } else if (input.toLowerCase().includes("happy") || input.toLowerCase().includes("good")) {
        response =
          "I'm glad to hear you're feeling positive! What things have been contributing to your good mood lately?"
      }

      // Add assistant response
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="container p-4 md:p-6">
      <Card className="h-[calc(100vh-8rem)]">
        <CardHeader>
          <CardTitle>AI Therapy Session</CardTitle>
          <CardDescription>Chat with our AI therapist for support and guidance</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={message.role === "assistant" ? "bg-primary" : "bg-gray-200"}>
                    <AvatarFallback>
                      {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "assistant"
                          ? "bg-accent text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
