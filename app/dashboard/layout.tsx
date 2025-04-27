"use client"

import type React from "react"
import Link from "next/link"
import { Heart, LayoutDashboard, BarChart3, BookOpen, Settings, Menu, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import { UserButton } from "@clerk/nextjs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex flex-col w-64 border-r bg-white">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">WellHaven</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard")
                  ? "bg-accent text-primary font-medium"
                  : "text-gray-600 hover:bg-accent/50 transition-colors"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/mood"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/mood")
                  ? "bg-accent text-primary font-medium"
                  : "text-gray-600 hover:bg-accent/50 transition-colors"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              Mood Tracker
            </Link>
            <Link
              href="/dashboard/therapy"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/therapy")
                  ? "bg-accent text-primary font-medium"
                  : "text-gray-600 hover:bg-accent/50 transition-colors"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              AI Therapy
            </Link>
            <Link
              href="/dashboard/resources"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/resources")
                  ? "bg-accent text-primary font-medium"
                  : "text-gray-600 hover:bg-accent/50 transition-colors"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Resources
            </Link>
          </nav>
          <div className="p-4 border-t">
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/profile")
                  ? "bg-accent text-primary font-medium"
                  : "text-gray-600 hover:bg-accent/50 transition-colors"
              }`}
            >
              <UserButton />
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/settings")
                  ? "bg-accent text-primary font-medium"
                  : "text-gray-600 hover:bg-accent/50 transition-colors"
              }`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>
        </aside>

        {/* Mobile header */}
        <header className="md:hidden border-b bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">WellHaven</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="py-4">
                  <Link href="/" className="flex items-center gap-2 mb-6">
                    <Heart className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">WellHaven</span>
                  </Link>
                  <nav className="space-y-2">
                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive("/dashboard")
                          ? "bg-accent text-primary font-medium"
                          : "text-gray-600 hover:bg-accent/50 transition-colors"
                      }`}
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/mood"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive("/dashboard/mood")
                          ? "bg-accent text-primary font-medium"
                          : "text-gray-600 hover:bg-accent/50 transition-colors"
                      }`}
                    >
                      <BarChart3 className="h-5 w-5" />
                      Mood Tracker
                    </Link>
                    <Link
                      href="/dashboard/therapy"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive("/dashboard/therapy")
                          ? "bg-accent text-primary font-medium"
                          : "text-gray-600 hover:bg-accent/50 transition-colors"
                      }`}
                    >
                      <MessageSquare className="h-5 w-5" />
                      AI Therapy
                    </Link>
                    <Link
                      href="/dashboard/resources"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive("/dashboard/resources")
                          ? "bg-accent text-primary font-medium"
                          : "text-gray-600 hover:bg-accent/50 transition-colors"
                      }`}
                    >
                      <BookOpen className="h-5 w-5" />
                      Resources
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive("/dashboard/profile")
                          ? "bg-accent text-primary font-medium"
                          : "text-gray-600 hover:bg-accent/50 transition-colors"
                      }`}
                    >
                      <UserButton />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive("/dashboard/settings")
                          ? "bg-accent text-primary font-medium"
                          : "text-gray-600 hover:bg-accent/50 transition-colors"
                      }`}
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
