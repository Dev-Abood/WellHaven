const { AzureOpenAI } = require("openai");  

// Create a client instance to use across the application
export const getOpenAIClient = () => {
	const apiKey = process.env.AZURE_OPENAI_API_KEY;
	const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
	const apiVersion = "2025-01-01-preview";
	const deployment = "gpt-35-turbo"; // This must match your deployment name
	return new AzureOpenAI({
		endpoint,
		apiKey,
		apiVersion,
		deployment,
	});
};

// Generate a response from Azure OpenAI
export async function generateChatResponse(
	messages: { role: string; content: string }[],
) {
	try {
		const client = getOpenAIClient();
		const response = await client.chat.completions.create({
			messages,
			max_tokens: 800,
			temperature: 0.7,
			top_p: 0.95,
			frequency_penalty: 0,
			presence_penalty: 0,
			stop: null,
		});

		return response.choices[0].message.content;
	} catch (error) {
		console.error("Error generating chat response:", error);
		throw error;
	}
}