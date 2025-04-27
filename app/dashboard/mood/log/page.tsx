// app/dashboard/mood/log/page.tsx
"use client";

import { useState } from "react";
import { handleCreateMood } from "./actions";

export default function LogMoodPage() {
  const [intensity, setIntensity] = useState(3);
  const [factors, setFactors] = useState<string[]>([]);
  const allFactors = ["work", "family", "health", "social", "other"];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Log a New Mood</h1>

      <form action={handleCreateMood} className="space-y-6">
        {/* Mood text */}
        <div>
          <label htmlFor="mood" className="block font-medium">
            Mood
          </label>
          <input
            id="mood"
            name="mood"
            type="text"
            required
            className="mt-1 block w-full border rounded px-2 py-1"
            placeholder="e.g. Happy, Anxious…"
          />
        </div>

        {/* Intensity slider */}
        <div>
          <label htmlFor="intensity" className="block font-medium">
            Intensity: {intensity}
          </label>
          <input
            id="intensity"
            name="intensity"
            type="range"
            min="1"
            max="5"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>

        {/* Factors checkboxes */}
        <div>
          <span className="block font-medium">Factors (optional):</span>
          <div className="flex flex-wrap gap-3 mt-2">
            {allFactors.map((f) => (
              <label key={f} className="inline-flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="factors"
                  value={f}
                  checked={factors.includes(f)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFactors((prev) => [...prev, f]);
                    } else {
                      setFactors((prev) => prev.filter((x) => x !== f));
                    }
                  }}
                />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Optional note */}
        <div>
          <label htmlFor="note" className="block font-medium">
            Note
          </label>
          <textarea
            id="note"
            name="note"
            className="mt-1 block w-full border rounded px-2 py-1"
            placeholder="Anything you’d like to jot down…"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save Mood
        </button>
      </form>
    </div>
  );
}
