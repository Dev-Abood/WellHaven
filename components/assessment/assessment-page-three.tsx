"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

export default function AssessmentPageThree() {
  const router = useRouter()
  const [selectedAge, setSelectedAge] = useState(18)

  const handleContinue = () => {
    router.push("/assessment/4")
  }

  const handleAgeChange = (value: number[]) => {
    setSelectedAge(value[0])
  }

  return (
    <div className="min-h-screen bg-wellhaven-beige flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-wellhaven-green rounded-full flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-wellhaven-brown">Assessment</CardTitle>
            </div>
            <Badge variant="outline" className="bg-wellhaven-lightGray text-wellhaven-brown border-0 px-3 py-1">
              3 of 14
            </Badge>
          </div>

          <h2 className="text-2xl font-bold text-center text-wellhaven-brown mb-8">What's your age?</h2>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-6xl font-bold text-wellhaven-green">{selectedAge}</div>

            <div className="w-full px-4 py-6">
              <Slider
                defaultValue={[18]}
                max={100}
                min={13}
                step={1}
                onValueChange={handleAgeChange}
                className="w-full"
              />

              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>13</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-wellhaven-brown hover:bg-wellhaven-brown/90 text-white rounded-full py-6"
            size="lg"
          >
            <span className="mr-2">Continue</span>
            <ArrowRight size={20} />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
