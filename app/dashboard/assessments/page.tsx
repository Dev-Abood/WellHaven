// app/dashboard/assessments/page.tsx
import { getAssessments } from "@/lib/actions/assessment-actions";
import Link from "next/link";

export default async function AssessmentsPage() {
  const assessments = await getAssessments(); // returns Assessment[]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Your Assessments</h1>

      {assessments.length === 0 ? (
        <p className="text-gray-600">No assessments yet.</p>
      ) : (
        <ul className="space-y-4">
          {assessments.map((a) => (
            <li
              key={a.id}
              className="border p-4 rounded hover:shadow cursor-pointer"
            >
              <Link href={`/dashboard/assessments/${a.id}`} className="block">
                <div className="flex justify-between">
                  <span className="font-medium capitalize">{a.type}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm">Score: {a.score}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/assessment"
        className="inline-block mt-6 bg-primary text-white px-4 py-2 rounded"
      >
        Take New Assessment
      </Link>
    </div>
  );
}
