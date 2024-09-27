"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Testing = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/about")
  }

  return (
    <div>
      <h1>Welcome to about</h1>
      <Link href="/about">about</Link>
      <button onClick={handleClick}>Go to About</button>
    </div>
  )
}

export default Testing
