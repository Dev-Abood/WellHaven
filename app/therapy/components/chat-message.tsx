import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

type Message = {
	id: number;
	role: string;
	content: string;
	timestamp: string;
};

export default function ChatMessage({ message }: { message: Message }) {
	const isAssistant = message.role === "assistant";
	const formattedTime = formatDistanceToNow(new Date(message.timestamp), {
		addSuffix: true,
	});

	return (
		<div
			className={`flex ${isAssistant ? "justify-start" : "justify-end"} group`}
		>
			{isAssistant && (
				<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
					<Image
						src="/placeholder.svg?height=40&width=40"
						alt="Assistant"
						width={24}
						height={24}
						className="rounded-full"
					/>
				</div>
			)}
			<div className="max-w-[70%]">
				<div
					className={`p-4 rounded-2xl ${
						isAssistant
							? "bg-green-50 text-zinc-800 border border-green-100"
							: "bg-blue-500 text-white"
					}`}
				>
					{message.content}
				</div>
				<div className="text-xs text-zinc-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
					{formattedTime}
				</div>
			</div>
			{!isAssistant && (
				<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ml-3 flex-shrink-0">
					<Image
						src="/placeholder.svg?height=40&width=40"
						alt="User"
						width={24}
						height={24}
						className="rounded-full"
					/>
				</div>
			)}
		</div>
	);
}
