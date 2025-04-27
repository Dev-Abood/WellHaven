import prisma from "./prisma"
import type { Resource } from "@prisma/client"

// Resource service for managing resources with Prisma
const ResourceService = {
  // Get all resources
  async getResources() {
    return prisma.resource.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  },

  // Get resources by category
  async getResourcesByCategory(category: string) {
    return prisma.resource.findMany({
      where: {
        category,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  },

  // Get resources by type
  async getResourcesByType(type: string) {
    return prisma.resource.findMany({
      where: {
        type,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  },

  // Get resource by ID
  async getResourceById(id: string) {
    return prisma.resource.findUnique({
      where: {
        id,
      },
    })
  },

  // Search resources
  async searchResources(query: string) {
    // Basic search implementation
    // In a real app, you might want to use a more sophisticated search solution
    return prisma.resource.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    })
  },

  // Create a resource (admin function)
  async createResource(resourceData: Omit<Resource, "id" | "createdAt">) {
    return prisma.resource.create({
      data: {
        ...resourceData,
        createdAt: new Date(),
      },
    })
  },
}

export default ResourceService
