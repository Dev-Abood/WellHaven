"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type Mood = "very_bad" | "bad" | "neutral" | "good" | "very_good";

interface MoodStepProps {
  value: Mood;
  onChangeAction: (value: Mood) => void;
  onNextAction: () => void;
}

const moodOptions: {
  value: Mood;
  color: string;
  label: string;
  emoji: string;
  percent: number;
}[] = [
  { value: "very_bad", color: "bg-red-500",    label: "I Feel Terrible.", emoji: "😢", percent: 10 },
  { value: "bad",      color: "bg-orange-400", label: "I Feel Bad.",    emoji: "🙁", percent: 30 },
  { value: "neutral",  color: "bg-yellow-400", label: "I Feel Okay.",   emoji: "😐", percent: 50 },
  { value: "good",     color: "bg-green-500",  label: "I Feel Good.",   emoji: "🙂", percent: 70 },
  { value: "very_good",color: "bg-purple-500",label: "I Feel Great!", emoji: "😃", percent: 90 },
];

export default function MoodStep({ value, onChangeAction, onNextAction }: MoodStepProps) {
  const [mood, setMood] = useState<Mood>(value);

  const handleMoodChange = (newMood: Mood) => {
    setMood(newMood);
    onChangeAction(newMood);
  };

  const currentOption = moodOptions.find((o) => o.value === mood)!;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#5a4a42]">
          How would you<br />describe your mood?
        </h1>
      </motion.div>

      <div className="w-full max-w-md mb-12 text-center">
        <div className="text-xl font-medium text-[#5a4a42] mb-2">
          {currentOption.label}
        </div>
      </div>

      <div className="w-full max-w-md relative h-32 mb-12">
        {/* Background segments */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex">
          {moodOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleMoodChange(opt.value)}
              className={`flex-1 ${opt.color} focus:outline-none`}
            />
          ))}
        </div>

        {/* Animated indicator */}
        <motion.div
          className="absolute bottom-0 w-4 h-4 bg-[#5a4a42]"
          style={{ borderRadius: "50% 50% 0 0", transform: "translateX(-50%)" }}
          animate={{ left: `${currentOption.percent}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* Animated emoji */}
        <motion.div
          className="absolute bottom-14 text-3xl"
          animate={{ left: `${currentOption.percent}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ transform: "translateX(-50%)" }}
        >
          {currentOption.emoji}
        </motion.div>
      </div>

      <Button
        onClick={onNextAction}
        className="bg-[#5a4a42] hover:bg-[#4a3a32] text-white rounded-full px-8 py-6 flex items-center gap-2"
      >
        Continue <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
