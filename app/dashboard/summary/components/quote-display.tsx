"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const fallbackQuotes = [
	{
		text: "The journey of a thousand miles begins with one step.",
		author: "Lao Tzu",
	},
	{
		text: "Life is what happens when you're busy making other plans.",
		author: "John Lennon",
	},
	{
		text: "The only way to do great work is to love what you do.",
		author: "Steve Jobs",
	},
];

export function QuoteDisplay() {
	const [quote, setQuote] = useState(fallbackQuotes[0]);

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
		setQuote(fallbackQuotes[randomIndex]);
	}, []);

	return (
		<Card className="bg-amber-50 border-amber-200">
			<CardContent className="p-6">
				<blockquote className="text-center">
					<p className="text-xl md:text-2xl font-serif text-amber-900 mb-2">
						"{quote.text}"
					</p>
					<footer className="text-amber-700">- {quote.author}</footer>
				</blockquote>
			</CardContent>
		</Card>
	);
}
