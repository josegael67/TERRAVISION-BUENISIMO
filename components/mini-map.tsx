"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { MapPin, Navigation, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface MiniMapProps {
  origin?: string
  destination?: string
  originCoords?: { lat: number; lng: number }
  destinationCoords?: { lat: number; lng: number }
}

export function MiniMap({ origin, destination, originCoords, destinationCoords }: MiniMapProps) {
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Card className="relative overflow-hidden border-slate-200 shadow-md">
      {/* Map background with grid pattern */}
      <div
        className="h-32 bg-gradient-to-br from-sky-100 via-emerald-50 to-sky-50 relative cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 transition-transform duration-200"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
          }}
        />

        {/* Route visualization */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <div className="relative w-full max-w-[200px] h-16">
            {/* Origin marker */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              {origin && (
                <div className="mt-1 text-[10px] font-semibold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                  Origen
                </div>
              )}
            </div>

            {/* Route line */}
            <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-sky-600 via-emerald-500 to-emerald-600 rounded-full shadow-sm">
              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
            </div>

            {/* Destination marker */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                <Navigation className="w-4 h-4 text-white" />
              </div>
              {destination && (
                <div className="mt-1 text-[10px] font-semibold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                  Destino
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Location labels */}
        {(origin || destination) && (
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-slate-600">
            <span className="bg-white/80 px-2 py-1 rounded shadow-sm max-w-[45%] truncate">{origin || "Origen"}</span>
            <span className="bg-white/80 px-2 py-1 rounded shadow-sm max-w-[45%] truncate">
              {destination || "Destino"}
            </span>
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            size="icon"
            variant="secondary"
            className="h-7 w-7 bg-white/90 hover:bg-white shadow-md"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-7 w-7 bg-white/90 hover:bg-white shadow-md"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-7 w-7 bg-white/90 hover:bg-white shadow-md"
            onClick={handleReset}
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
