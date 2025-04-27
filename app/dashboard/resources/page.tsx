import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Video, Headphones, Activity } from "lucide-react"

export default function Resources() {
  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Resources</h1>
          <p className="text-gray-600">Articles, exercises, and tools to support your mental health</p>
        </div>
        <div className="mt-4 md:mt-0 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search resources..." className="pl-10 w-full md:w-64" />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Featured Resource */}
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2 bg-teal-100 text-teal-800 hover:bg-teal-100">Featured</Badge>
                    <CardTitle>Understanding and Managing Anxiety</CardTitle>
                    <CardDescription>Comprehensive guide</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This comprehensive guide explains what anxiety is, common triggers, and effective strategies to manage
                  anxiety symptoms in your daily life.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-teal-600 hover:bg-teal-700">Read Guide</Button>
              </CardFooter>
            </Card>

            {/* Articles */}
            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle>Mindfulness Basics</CardTitle>
                <CardDescription>Article • 5 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn the fundamentals of mindfulness and how to incorporate it into your daily routine.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/mindfulness-basics">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <CardTitle>5-Minute Breathing Exercise</CardTitle>
                <CardDescription>Exercise • 5 min</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A quick breathing exercise to help reduce stress and anxiety in the moment.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/breathing-exercise">Start Exercise</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <Video className="h-4 w-4 text-purple-600" />
                </div>
                <CardTitle>Stress Management Techniques</CardTitle>
                <CardDescription>Video • 8 min</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Learn practical techniques to manage stress in your daily life.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/stress-management-video">Watch Video</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <Headphones className="h-4 w-4 text-amber-600" />
                </div>
                <CardTitle>Guided Sleep Meditation</CardTitle>
                <CardDescription>Audio • 15 min</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A calming meditation to help you relax and fall asleep more easily.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/sleep-meditation">Listen Now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle>Building Healthy Relationships</CardTitle>
                <CardDescription>Article • 7 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tips for developing and maintaining healthy relationships in your life.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/healthy-relationships">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <CardTitle>Progressive Muscle Relaxation</CardTitle>
                <CardDescription>Exercise • 10 min</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A step-by-step guide to relax your body and reduce physical tension.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/muscle-relaxation">Start Exercise</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Articles content would go here */}
            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle>Mindfulness Basics</CardTitle>
                <CardDescription>Article • 5 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn the fundamentals of mindfulness and how to incorporate it into your daily routine.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/mindfulness-basics">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle>Building Healthy Relationships</CardTitle>
                <CardDescription>Article • 7 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tips for developing and maintaining healthy relationships in your life.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/healthy-relationships">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="exercises">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Exercises content */}
            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <CardTitle>5-Minute Breathing Exercise</CardTitle>
                <CardDescription>Exercise • 5 min</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A quick breathing exercise to help reduce stress and anxiety in the moment.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/breathing-exercise">Start Exercise</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <CardTitle>Progressive Muscle Relaxation</CardTitle>
                <CardDescription>Exercise • 10 min</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A step-by-step guide to relax your body and reduce physical tension.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resources/muscle-relaxation">Start Exercise</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { name: "Anxiety", count: 12 },
          { name: "Depression", count: 8 },
          { name: "Stress", count: 15 },
          { name: "Sleep", count: 6 },
          { name: "Mindfulness", count: 10 },
          { name: "Relationships", count: 7 },
          { name: "Self-Care", count: 9 },
          { name: "Work-Life Balance", count: 5 },
        ].map((category, index) => (
          <Button key={index} variant="outline" className="h-auto py-4 justify-between" asChild>
            <Link href={`/dashboard/resources/category/${category.name.toLowerCase()}`}>
              <span>{category.name}</span>
              <Badge variant="secondary">{category.count}</Badge>
            </Link>
          </Button>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle>Understanding Anxiety Triggers</CardTitle>
            <CardDescription>Article • 6 min read</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Learn how to identify and manage common triggers that can cause anxiety.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/resources/anxiety-triggers">Continue Reading</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mb-2">
              <Headphones className="h-4 w-4 text-amber-600" />
            </div>
            <CardTitle>Calming Meditation</CardTitle>
            <CardDescription>Audio • 10 min</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">A guided meditation to help you find calm during stressful moments.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/resources/calming-meditation">Listen Again</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
