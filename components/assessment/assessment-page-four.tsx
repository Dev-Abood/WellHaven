"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function AssessmentPageFour() {
  const router = useRouter()
  const [unit, setUnit] = useState("kg")
  const [weight, setWeight] = useState("")

  const handleContinue = () => {
    router.push("/assessment/5")
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
              4 of 14
            </Badge>
          </div>

          <h2 className="text-2xl font-bold text-center text-wellhaven-brown mb-8">What's your weight?</h2>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs defaultValue="kg" className="w-full" onValueChange={setUnit}>
            <TabsList className="w-full rounded-full">
              <TabsTrigger value="kg" className="flex-1 rounded-full">
                kg
              </TabsTrigger>
              <TabsTrigger value="lbs" className="flex-1 rounded-full">
                lbs
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center justify-center space-x-4">
            <Input
              type="number"
              placeholder="_"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-center text-3xl h-16 border-b-2 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-wellhaven-green"
            />
            <span className="text-2xl text-wellhaven-gray font-medium">{unit}</span>
          </div>

          <div className="flex items-end justify-center space-x-1 h-24">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`${i === 10 ? "bg-wellhaven-green w-3 h-full" : "w-1 h-6 bg-wellhaven-lightGray"} rounded-full`}
              ></div>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={handleContinue}
              className="w-full bg-wellhaven-brown hover:bg-wellhaven-brown/90 text-white rounded-full py-6"
              size="lg"
            >
              <span className="mr-2">Continue</span>
              <ArrowRight size={20} />
            </Button>

            <Button
              variant="outline"
              className="w-full bg-wellhaven-lightGreen hover:bg-wellhaven-lightGreen/80 text-wellhaven-green border-0 rounded-full py-6"
              size="lg"
            >
              <span className="mr-2">Prefer to skip, thanks</span>
              <X size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
