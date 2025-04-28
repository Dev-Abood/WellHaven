const { AzureOpenAI } = require("openai");

// Create a client instance to use across the application
const getOpenAIClient = () => {
	return new AzureOpenAI({
		endpoint,
		apiKey,
		apiVersion,
		deployment,
	});
};

// Generate a response from Azure OpenAI
async function generateChatResponse(
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

generateChatResponse([{ role: "user", content: "Hello, how are you?" }]);
