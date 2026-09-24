"use client"

import { useEffect } from "react"

export function ThemeToggle() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("dark")
    root.style.colorScheme = "light"
  }, [])

  return null
}
