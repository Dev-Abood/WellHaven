const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Seed resources
  const resourcesCount = await prisma.resource.count()

  if (resourcesCount === 0) {
    console.log("Seeding resources...")
    await prisma.resource.createMany({
      data: [
        {
          title: "Understanding Anxiety Triggers",
          type: "article",
          category: "Anxiety",
          description:
            "Learn how to identify and manage common triggers that can cause anxiety in everyday situations.",
          content:
            "Anxiety triggers are external events or circumstances that provoke uncomfortable anxiety-related symptoms. Common triggers include work stress, financial worries, conflict, and health concerns. Identifying your personal triggers is the first step to managing anxiety effectively...",
          duration: "5 min read",
          createdAt: new Date(),
        },
        {
          title: "5-Minute Breathing Exercise",
          type: "exercise",
          category: "Stress Management",
          description: "A quick breathing exercise to help reduce stress and anxiety in the moment.",
          content:
            "This breathing exercise uses the 4-4-6-2 technique, which can help reduce stress and anxiety, lower heart rate and blood pressure, improve focus and concentration, and promote relaxation and calmness...",
          duration: "5 min",
          createdAt: new Date(),
        },
        {
          title: "Mindfulness Basics",
          type: "article",
          category: "Mindfulness",
          description: "Learn the fundamentals of mindfulness and how to incorporate it into your daily routine.",
          content:
            "Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It involves being aware of your thoughts, feelings, bodily sensations, and surrounding environment...",
          duration: "7 min read",
          createdAt: new Date(),
        },
      ],
    })
    console.log("Resources seeded successfully")
  } else {
    console.log("Resources already exist, skipping seed")
  }

  console.log("Database seeding completed")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
