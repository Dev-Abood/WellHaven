import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Plus } from "lucide-react"

export default function MoodTracker() {
  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Mood Tracker</h1>
          <p className="text-gray-600">Track and analyze your mood patterns</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Log New Entry
        </Button>
      </div>

      <Tabs defaultValue="chart" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">Chart View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Mood Over Time</CardTitle>
              <CardDescription>Your mood patterns for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Mood chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Mood Calendar</CardTitle>
              <CardDescription>View your mood entries by date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Calendar view would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Mood Entries</CardTitle>
              <CardDescription>All your mood entries in chronological order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Today", mood: "Happy", note: "Had a great day at work" },
                  { date: "Yesterday", mood: "Calm", note: "Relaxing weekend" },
                  { date: "2 days ago", mood: "Anxious", note: "Worried about upcoming presentation" },
                  { date: "3 days ago", mood: "Tired", note: "Didn't sleep well" },
                  { date: "4 days ago", mood: "Happy", note: "Went out with friends" },
                ].map((entry, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{entry.date}</h3>
                        <p className="text-sm text-gray-500">{entry.mood}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                    <p className="mt-2 text-sm">{entry.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <h2 className="text-xl font-bold mb-4">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Mood Patterns</CardTitle>
            <CardDescription>Based on your recent entries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your mood tends to be more positive in the mornings. Consider scheduling important tasks during this time
              when you're feeling your best.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Potential Triggers</CardTitle>
            <CardDescription>Factors that may affect your mood</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We've noticed that your mood often dips after work meetings. Consider adding a short relaxation break
              after meetings to reset.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Recommended Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Your Emotions</CardTitle>
            <CardDescription>Educational article</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Learn how to identify and process different emotions in a healthy way.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/resources/understanding-emotions">
                Read Article <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood Boosting Activities</CardTitle>
            <CardDescription>Practical exercises</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Simple activities you can do to improve your mood when you're feeling down.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/resources/mood-boosting">
                Explore Activities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
