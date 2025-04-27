"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun, Laptop } from "lucide-react"

export default function Settings() {
  const [theme, setTheme] = useState("system")
  const [fontSize, setFontSize] = useState(16)

  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Customize your app experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Theme</Label>
              <RadioGroup value={theme} onValueChange={setTheme} className="flex space-x-2">
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`
                    flex items-center justify-center rounded-md border-2 p-4 cursor-pointer
                    ${theme === "light" ? "border-teal-600" : "border-gray-200"}
                  `}
                  >
                    <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                    <Sun className="h-6 w-6" />
                  </div>
                  <Label htmlFor="theme-light" className="cursor-pointer">
                    Light
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`
                    flex items-center justify-center rounded-md border-2 p-4 cursor-pointer
                    ${theme === "dark" ? "border-teal-600" : "border-gray-200"}
                  `}
                  >
                    <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                    <Moon className="h-6 w-6" />
                  </div>
                  <Label htmlFor="theme-dark" className="cursor-pointer">
                    Dark
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`
                    flex items-center justify-center rounded-md border-2 p-4 cursor-pointer
                    ${theme === "system" ? "border-teal-600" : "border-gray-200"}
                  `}
                  >
                    <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                    <Laptop className="h-6 w-6" />
                  </div>
                  <Label htmlFor="theme-system" className="cursor-pointer">
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Font Size</Label>
                <span className="text-sm text-gray-500">{fontSize}px</span>
              </div>
              <Slider value={[fontSize]} min={12} max={24} step={1} onValueChange={(value) => setFontSize(value[0])} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reduce-motion">Reduce Motion</Label>
                <p className="text-sm text-gray-500">Minimize animations</p>
              </div>
              <Switch id="reduce-motion" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-contrast">High Contrast</Label>
                <p className="text-sm text-gray-500">Increase color contrast</p>
              </div>
              <Switch id="high-contrast" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-teal-600 hover:bg-teal-700">Save Preferences</Button>
          </CardFooter>
        </Card>

        <Card></Card>
      </div>
    </div>
  )
}
