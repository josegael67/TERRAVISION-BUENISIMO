"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Droplets, AlertTriangle, Clock, TrendingUp, Download, Volume2, Share2 } from "lucide-react"
import { MiniMap } from "@/components/mini-map"
import { useLanguage } from "@/contexts/language-context"

interface ClimateResultsProps {
  origin: string
  destination: string
  date: string
  arrivalTime: string
  transport: string
  onBack: () => void
}

// Simulated NASA data analysis
const getClimateData = (transport: string, location: string, t: any) => {
  if (transport === "bicycle") {
    return {
      discomfortLevel: t.high,
      discomfortColor: "red",
      probability: 70,
      mainCondition: t.rain,
      conditions: [
        { name: t.floodedStreets, severity: "high" },
        { name: t.lowVisibility, severity: "high" },
        { name: t.slipperyPavement, severity: "medium" },
      ],
      peakHours: "4 p.m. - 7 p.m.",
      recommendation: t.avoidPeakHours,
      historicalNote: t.juneHighRainProbability,
      alternatives: [
        "Considera usar transporte público cubierto",
        "Si es necesario, usa equipo impermeable completo",
        "Planifica tu ruta evitando zonas propensas a inundación",
      ],
    }
  }

  return {
    discomfortLevel: t.medium,
    discomfortColor: "amber",
    probability: 45,
    mainCondition: t.moderateRain,
    conditions: [
      { name: t.slowTraffic, severity: "medium" },
      { name: t.reducedVisibility, severity: "low" },
    ],
    peakHours: "5 p.m. - 8 p.m.",
    recommendation: t.planExtraTime,
    historicalNote: t.typicalConditions,
    alternatives: [],
  }
}

export function ClimateResults({ origin, destination, date, arrivalTime, transport, onBack }: ClimateResultsProps) {
  const { t, language } = useLanguage()

  const data = getClimateData(transport, origin, t)

  const formattedDate = new Date(date).toLocaleDateString(language === "es" ? "es-MX" : "en-US", {
    day: "numeric",
    month: "long",
  })

  const transportNames: Record<string, string> = {
    car: t.car,
    motorcycle: t.motorcycle,
    truck: t.truck,
    train: t.train,
    bicycle: t.bicycle,
    walking: t.walking,
    wheelchair: t.wheelchair,
  }

  const speakResults = () => {
    const text = `${t.discomfortLevel}: ${data.discomfortLevel}. ${t.historicallyProbability} ${data.probability}% ${t.probability} ${t.mainCondition}. ${data.recommendation}`
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === "es" ? "es-MX" : "en-US"
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="animate-slide-up pb-20">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.changeTransport}
      </Button>

      <div className="mb-4">
        <MiniMap origin={origin} destination={destination} />
      </div>

      <Card className="p-4 mb-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white border-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <span>{t.from}</span>
            <span className="font-semibold">{origin}</span>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <span>{t.to}</span>
            <span className="font-semibold">{destination}</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-90 pt-1 border-t border-white/20">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{transportNames[transport]}</span>
            <span>•</span>
            <span>
              {t.arrival}: {arrivalTime}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-4 shadow-xl border-2 border-slate-200">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-4 shadow-lg">
            <Droplets className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">{t.discomfortLevel}</h3>
          <div className="text-4xl font-bold text-red-600 mb-2">{data.discomfortLevel}</div>
          <Badge variant="destructive" className="text-base px-4 py-1">
            {data.probability}% {t.probability}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-slate-900 mb-1">
                {t.mainCondition}: {data.mainCondition}
              </p>
              <p className="text-sm text-slate-700">
                {t.historicallyProbability} {data.probability}
                {t.ofProbability}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sky-600" />
          {t.expectedConditions}
        </h4>
        <div className="space-y-2">
          {data.conditions.map((condition, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-700">{condition.name}</span>
              <Badge
                variant={
                  condition.severity === "high"
                    ? "destructive"
                    : condition.severity === "medium"
                      ? "default"
                      : "secondary"
                }
              >
                {condition.severity === "high" ? t.high : condition.severity === "medium" ? t.medium : t.low}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 mb-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">{t.peakRiskHours}</h4>
            <p className="text-slate-700 mb-2">{data.peakHours}</p>
            <p className="text-sm text-slate-600">{data.recommendation}</p>
          </div>
        </div>
      </Card>

      {data.alternatives.length > 0 && (
        <Card className="p-5 mb-4">
          <h4 className="font-semibold text-slate-900 mb-3">{t.alternativeRecommendations}</h4>
          <ul className="space-y-2">
            {data.alternatives.map((alt, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{alt}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-4 mb-4 bg-sky-50 border-sky-200">
        <p className="text-sm text-slate-700">
          <span className="font-semibold">{t.historicalNote}</span> {data.historicalNote}
        </p>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="flex flex-col items-center gap-1 h-auto py-3 bg-transparent"
          onClick={speakResults}
        >
          <Volume2 className="w-5 h-5" />
          <span className="text-xs">{t.listen}</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3 bg-transparent">
          <Share2 className="w-5 h-5" />
          <span className="text-xs">{t.share}</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3 bg-transparent">
          <Download className="w-5 h-5" />
          <span className="text-xs">{t.download}</span>
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500">{t.dataProvidedBy}</p>
        <p className="text-xs text-slate-400 mt-1">{t.basedOnHistorical}</p>
      </div>
    </div>
  )
}
