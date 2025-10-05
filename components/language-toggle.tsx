"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">{language === "es" ? "EN" : "ES"}</span>
    </Button>
  )
}
