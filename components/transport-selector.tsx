"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Car, Bike, Train, Truck, Footprints, Accessibility } from "lucide-react"
import { PowerCircleIcon as MotorcycleIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface TransportSelectorProps {
  origin: string
  destination: string
  date: string
  arrivalTime: string
  onSelect: (transport: string) => void
  onBack: () => void
}

export function TransportSelector({
  origin,
  destination,
  date,
  arrivalTime,
  onSelect,
  onBack,
}: TransportSelectorProps) {
  const { t, language } = useLanguage()

  const transports = [
    { id: "car", name: t.car, icon: Car, color: "sky" },
    { id: "motorcycle", name: t.motorcycle, icon: MotorcycleIcon, color: "emerald" },
    { id: "truck", name: t.truck, icon: Truck, color: "amber" },
    { id: "train", name: t.train, icon: Train, color: "sky" },
    { id: "bicycle", name: t.bicycle, icon: Bike, color: "emerald" },
    { id: "walking", name: t.walking, icon: Footprints, color: "amber" },
    { id: "wheelchair", name: t.wheelchair, icon: Accessibility, color: "sky" },
  ]

  const formattedDate = new Date(date).toLocaleDateString(language === "es" ? "es-MX" : "en-US", {
    day: "numeric",
    month: "long",
  })

  return (
    <div className="animate-slide-up">
      {/* Back button */}
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.back}
      </Button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.selectTransport}</h2>
        <p className="text-slate-600">
          {origin} → {destination}
        </p>
        <p className="text-sm text-slate-500">
          {formattedDate} • {t.arrival}: {arrivalTime}
        </p>
      </div>

      {/* Transport grid */}
      <div className="grid grid-cols-2 gap-4">
        {transports.map((transport) => {
          const Icon = transport.icon
          return (
            <Card
              key={transport.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-transparent hover:border-sky-300"
              onClick={() => onSelect(transport.id)}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br from-${transport.color}-500 to-${transport.color}-600 flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="font-semibold text-slate-900 text-center">{transport.name}</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Info message */}
      <Card className="mt-6 p-4 bg-sky-50 border-sky-200">
        <p className="text-sm text-slate-700 text-center">💡 {t.analyzeNASAData}</p>
      </Card>
    </div>
  )
}
