import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-accent/10 p-4">
			<SignIn
				appearance={{
					elements: {
						rootBox: "mx-auto",
						card: "shadow-lg rounded-lg border border-gray-200",
						headerTitle: "text-2xl font-bold text-center",
						headerSubtitle: "text-center",
						formButtonPrimary: "bg-primary hover:bg-primary/90",
					},
				}}
			/>
		</div>
	);
}
