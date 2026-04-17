// hooks/useTheme.ts
"use client"
import { useState, useEffect } from "react"

export function useTheme() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute("data-theme")
            setIsDark(theme === "dark") 
        })

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })

        // Set initial value
        const theme = document.documentElement.getAttribute("data-theme")
        setIsDark(theme === "dark")

        return () => observer.disconnect()
    }, [])

    return isDark
}