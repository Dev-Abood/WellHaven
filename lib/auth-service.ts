import apiClient from "./api-client"
import jwtEncode from "jwt-encode"

// Types
export type User = {
  id: number
  email: string
  name: string
  createdAt: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  name: string
  email: string
  password: string
}

// For demo purposes, we'll create a simple JWT
const createToken = (user: User) => {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    iat: Date.now() / 1000,
    exp: Date.now() / 1000 + 7 * 24 * 60 * 60, // 7 days
  }

  // In a real app, you'd use a proper secret key
  return jwtEncode(payload, "wellhaven_secret_key")
}

// Auth service
const AuthService = {
  // Login user
  async login(credentials: LoginCredentials) {
    try {
      // In a real app, you'd send credentials to a server endpoint
      // For JSON Server, we'll query users with matching email
      const response = await apiClient.get(`/users?email=${credentials.email}`)

      if (response.data.length === 0) {
        throw new Error("User not found")
      }

      const user = response.data[0]

      // Simple password check (in a real app, you'd use proper hashing)
      if (user.password !== credentials.password) {
        throw new Error("Invalid password")
      }

      // Create a token
      const token = createToken({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      })

      // Store token and user in localStorage
      localStorage.setItem("wellhaven_token", token)
      localStorage.setItem(
        "wellhaven_user",
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      )

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Register user
  async register(credentials: RegisterCredentials) {
    try {
      // Check if user already exists
      const existingUsers = await apiClient.get(`/users?email=${credentials.email}`)

      if (existingUsers.data.length > 0) {
        throw new Error("User already exists")
      }

      // Create new user
      const newUser = {
        email: credentials.email,
        password: credentials.password, // In a real app, you'd hash this
        name: credentials.name,
        createdAt: new Date().toISOString(),
      }

      const response = await apiClient.post("/users", newUser)
      const user = response.data

      // Create a default profile for the user
      await apiClient.post("/profiles", {
        userId: user.id,
        name: user.name,
        bio: "",
        goals: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      // Create default settings for the user
      await apiClient.post("/settings", {
        userId: user.id,
        theme: "light",
        notifications: {
          dailyReminders: true,
          weeklyReports: true,
          assessmentReminders: true,
          tips: true,
          emailNotifications: false,
        },
        privacy: {
          dataSharing: false,
        },
        updatedAt: new Date().toISOString(),
      })

      // Create token
      const token = createToken({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      })

      // Store token and user in localStorage
      localStorage.setItem("wellhaven_token", token)
      localStorage.setItem(
        "wellhaven_user",
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      )

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      }
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("wellhaven_token")
    localStorage.removeItem("wellhaven_user")
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem("wellhaven_user")
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch (error) {
      console.error("Error parsing user:", error)
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("wellhaven_token")
  },
}

export default AuthService
