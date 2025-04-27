"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthService, { type User, type LoginCredentials, type RegisterCredentials } from "@/lib/auth-service"

// Types
type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = AuthService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error("Auth check error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const { user } = await AuthService.login(credentials)
      setUser(user)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      const { user } = await AuthService.register(credentials)
      setUser(user)
      router.push("/onboarding")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    AuthService.logout()
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
