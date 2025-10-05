"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Navigation, Clock, Loader2 } from "lucide-react"
import { MiniMap } from "@/components/mini-map"
import { useLanguage } from "@/contexts/language-context"

interface LocationSelectorProps {
  onSubmit: (origin: string, destination: string, date: string, arrivalTime: string) => void
}

export function LocationSelector({ onSubmit }: LocationSelectorProps) {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState("")

  const { t, language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (origin && destination && date && arrivalTime) {
      onSubmit(origin, destination, date, arrivalTime)
    }
  }

  const useCurrentLocation = async () => {
    setIsLoadingLocation(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError(t.browserNoGeolocation)
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${language}`,
          )
          const data = await response.json()

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.municipality ||
            "Ubicación actual"

          const state = data.address?.state || ""
          const locationName = state ? `${city}, ${state}` : city

          setOrigin(locationName)
          setIsLoadingLocation(false)
        } catch (error) {
          console.error("[v0] Geocoding error:", error)
          setOrigin(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
          setIsLoadingLocation(false)
        }
      },
      (error) => {
        console.error("[v0] Geolocation error:", error)
        let errorMessage = t.couldNotGetLocation

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = t.permissionDenied
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = t.locationUnavailable
            break
          case error.TIMEOUT:
            errorMessage = t.timeout
            break
        }

        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.planYourTrip}</h2>
        <p className="text-slate-600">{t.knowHistoricalConditions}</p>
      </div>

      <div className="mb-4">
        <MiniMap origin={origin} destination={destination} />
      </div>

      <Card className="p-6 shadow-lg border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="origin" className="text-slate-700 font-medium">
              {t.origin}
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-600" />
              <Input
                id="origin"
                type="text"
                placeholder="Ciudad de México"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="pl-11 h-12 text-base"
                required
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={useCurrentLocation}
              disabled={isLoadingLocation}
              className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 disabled:opacity-50"
            >
              {isLoadingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.gettingLocation}
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 mr-2" />
                  {t.useCurrentLocation}
                </>
              )}
            </Button>
            {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="text-slate-700 font-medium">
              {t.destination}
            </Label>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
              <Input
                id="destination"
                type="text"
                placeholder="Polanco, CDMX"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-11 h-12 text-base"
                required
              />
            </div>
          </div>

          {/* Date input */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-slate-700 font-medium">
              {t.travelDate}
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-11 h-12 text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrivalTime" className="text-slate-700 font-medium">
              {t.desiredArrivalTime}
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="arrivalTime"
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="pl-11 h-12 text-base"
                required
              />
            </div>
            <p className="text-xs text-slate-500">{t.analyzeConditions}</p>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700"
            disabled={!origin || !destination || !date || !arrivalTime}
          >
            {t.continue}
          </Button>
        </form>
      </Card>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Card className="p-3 text-center border-sky-200 bg-sky-50/50">
          <div className="text-2xl font-bold text-sky-700">20+</div>
          <div className="text-xs text-slate-600">{t.yearsOfData}</div>
        </Card>
        <Card className="p-3 text-center border-emerald-200 bg-emerald-50/50">
          <div className="text-2xl font-bold text-emerald-700">7</div>
          <div className="text-xs text-slate-600">{t.transports}</div>
        </Card>
        <Card className="p-3 text-center border-amber-200 bg-amber-50/50">
          <div className="text-2xl font-bold text-amber-700">NASA</div>
          <div className="text-xs text-slate-600">{t.officialData}</div>
        </Card>
      </div>
    </div>
  )
}
