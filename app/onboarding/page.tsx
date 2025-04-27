// app/onboarding/page.tsx
"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import { handleOnboarding } from "./actions";
import type { OnboardingValues } from "./actions";
import { redirect } from "next/navigation"; // you don’t actually need redirect here
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center bg-accent/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {step === 1 ? "Welcome to WellHaven" : "Almost There"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 1
                ? "Let's get to know you better"
                : "Tell us about your wellness goals"}
            </CardDescription>
            <Progress value={step === 1 ? 50 : 100} className="mt-2" />
          </CardHeader>

          <CardContent>
            {/* point form at your external server action */}
            <form action={handleOnboarding}>
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup name="gender" className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-binary" id="non-binary" />
                        <Label htmlFor="non-binary">Non-binary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                        <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goals">Wellness Goals</Label>
                    <Textarea
                      id="goals"
                      name="goals"
                      placeholder="e.g., reduce stress, improve sleep"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                </div>
              )}

              <CardFooter className="flex justify-between">
                {step === 1 ? (
                  <Button type="button" className="w-full" onClick={() => setStep(2)}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="submit">
                      Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
