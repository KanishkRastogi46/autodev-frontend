'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Simulating fetching user data
    // Replace this with your actual user data fetching logic
    const fetchUser = async () => {
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUser({ name: 'John Doe' }) // Replace with actual user data
      } catch (error) {
        console.error('Failed to fetch user data', error)
        router.push('/login')
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      // Simulating logout API call
      // Replace this with your actual logout logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Logged out successfully')
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-0">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome Home</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg">
            Hello, {user.name}! You're successfully logged in.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}