"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, SmilePlus, ArrowDown, ArrowUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AssessmentPageOne() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/assessment/2")
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
              1 of 14
            </Badge>
          </div>

          <h2 className="text-2xl font-bold text-center text-wellhaven-brown mb-8">
            What's your health goal for today?
          </h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-4 rounded-full border shadow-sm hover:bg-gray-50"
            >
              <SmilePlus className="h-5 w-5 mr-3 text-wellhaven-brown" />
              <span className="font-medium text-wellhaven-brown">I wanna reduce stress</span>
            </Button>

            <Button className="w-full justify-start text-left h-auto py-4 px-4 rounded-full bg-wellhaven-green hover:bg-wellhaven-green/90 text-white">
              <ArrowDown className="h-5 w-5 mr-3" />
              <span className="font-medium">I wanna try AI Therapy</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-4 rounded-full border shadow-sm hover:bg-gray-50"
            >
              <ArrowUp className="h-5 w-5 mr-3 text-wellhaven-brown" />
              <span className="font-medium text-wellhaven-brown">I want to cope with trauma</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-4 rounded-full border shadow-sm hover:bg-gray-50"
            >
              <SmilePlus className="h-5 w-5 mr-3 text-wellhaven-brown" />
              <span className="font-medium text-wellhaven-brown">I want to be a better person</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-4 rounded-full border shadow-sm hover:bg-gray-50"
            >
              <SmilePlus className="h-5 w-5 mr-3 text-wellhaven-brown" />
              <span className="font-medium text-wellhaven-brown">Just trying out the app, mate!</span>
            </Button>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-wellhaven-brown hover:bg-wellhaven-brown/90 text-white rounded-full py-6 mt-8"
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
