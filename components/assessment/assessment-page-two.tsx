"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function AssessmentPageTwo() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/assessment/3")
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
              2 of 14
            </Badge>
          </div>

          <h2 className="text-2xl font-bold text-center text-wellhaven-brown mb-8">What's your gender?</h2>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center mb-4">
            <div className="relative w-64 h-64">
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0"
              >
                <circle cx="150" cy="100" r="50" fill="#E5EAD6" />
                <path d="M100 200C100 150 125 120 150 120C175 120 200 150 200 200" stroke="#4F3422" strokeWidth="2" />
                <path d="M150 150V250" stroke="#4F3422" strokeWidth="2" />
                <path d="M120 280L150 250L180 280" stroke="#4F3422" strokeWidth="2" />
              </svg>

              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0"
              >
                <circle cx="150" cy="100" r="50" fill="#FFC89E" />
                <path d="M100 180C100 130 125 120 150 120C175 120 200 130 200 180" stroke="#4F3422" strokeWidth="2" />
                <path d="M150 180L150 250" stroke="#4F3422" strokeWidth="2" />
                <path d="M120 220H180" stroke="#4F3422" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <RadioGroup defaultValue="female" className="space-y-3">
            <div className="flex items-center space-x-2 border rounded-full p-4">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="font-medium text-wellhaven-gray">
                I am Male
              </Label>
            </div>

            <div className="flex items-center space-x-2 bg-wellhaven-green rounded-full p-4 text-white">
              <RadioGroupItem value="female" id="female" className="text-white border-white" />
              <Label htmlFor="female" className="font-medium text-white">
                I am Female
              </Label>
            </div>
          </RadioGroup>

          <Button
            variant="outline"
            className="w-full bg-wellhaven-lightGreen hover:bg-wellhaven-lightGreen/80 text-wellhaven-green border-0 rounded-full py-6"
            size="lg"
          >
            <span className="mr-2">Prefer to skip, thanks</span>
            <X size={20} />
          </Button>

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
