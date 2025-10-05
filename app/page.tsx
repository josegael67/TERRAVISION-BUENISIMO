"use client"

import { useState } from "react"
import { LocationSelector } from "@/components/location-selector"
import { TransportSelector } from "@/components/transport-selector"
import { ClimateResults } from "@/components/climate-results"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Cloud, Droplets, Wind, Sun, Snowflake } from "lucide-react"

export default function Home() {
  const [step, setStep] = useState<"location" | "transport" | "results">("location")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [transport, setTransport] = useState("")

  const { t } = useLanguage()

  const handleLocationSubmit = (org: string, dest: string, dt: string, time: string) => {
    setOrigin(org)
    setDestination(dest)
    setDate(dt)
    setArrivalTime(time)
    setStep("transport")
  }

  const handleTransportSelect = (mode: string) => {
    setTransport(mode)
    setStep("results")
  }

  const handleBack = () => {
    if (step === "results") {
      setStep("transport")
    } else if (step === "transport") {
      setStep("location")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-background to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">{t.appName}</h1>
              <p className="text-xs text-slate-600">{t.appSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <div className="flex items-center gap-2 text-xs text-slate-600">
              {/* <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                { <span className="text-white font-bold text-[10px]">NASA</span> }
              </div> */}
              <span className="hidden sm:inline">{t.poweredBy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Floating weather indicators */}
      <div className="fixed top-24 right-4 flex flex-col gap-2 opacity-20 pointer-events-none">
        <Droplets className="w-8 h-8 text-sky-500" />
        <Wind className="w-8 h-8 text-emerald-500" />
        <Sun className="w-8 h-8 text-amber-500" />
        <Snowflake className="w-8 h-8 text-sky-400" />
      </div>

      {/* Main content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {step === "location" && <LocationSelector onSubmit={handleLocationSubmit} />}

        {step === "transport" && (
          <TransportSelector
            origin={origin}
            destination={destination}
            date={date}
            arrivalTime={arrivalTime}
            onSelect={handleTransportSelect}
            onBack={handleBack}
          />
        )}

        {step === "results" && (
          <ClimateResults
            origin={origin}
            destination={destination}
            date={date}
            arrivalTime={arrivalTime}
            transport={transport}
            onBack={handleBack}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 py-3 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between text-xs text-slate-600">
          <span>{t.historicalNASAData}</span>
          <div className="flex gap-4">
            <button className="hover:text-sky-600 transition-colors">{t.help}</button>
            <button className="hover:text-sky-600 transition-colors">{t.accessibility}</button>
          </div>
        </div>
      </footer>
    </main>
  )
}
