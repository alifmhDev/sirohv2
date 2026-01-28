"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Navigation, Sword, Mountain, Info } from "lucide-react"
import dynamic from "next/dynamic"
import { mapLocations } from "@/lib/data"
import { MapLocation } from "@/lib/types"

// Dynamically import MapComponent to avoid SSR issues
const Map = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
})

export default function MapsPage() {
  const [activeTab, setActiveTab] = useState("hijrah")
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)

  const filteredLocations = useMemo(() => {
    switch (activeTab) {
      case "hijrah":
        return mapLocations.filter(loc => loc.type === "route")
      case "battles":
        return mapLocations.filter(loc => loc.type === "battle")
      case "places":
        return mapLocations.filter(loc => loc.type === "place")
      default:
        return mapLocations
    }
  }, [activeTab])

  const mapCenter: [number, number] = activeTab === "battles"
    ? [24.4672, 39.6108] // Center on Madinah for battles
    : [22.8859, 39.1925] // General center

  const mapZoom = activeTab === "places" ? 11 : 7

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Peta Interaktif</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jelajahi lokasi-lokasi penting dalam perjalanan hidup Rasulullah ﷺ secara interaktif
          </p>
        </div>

        <Tabs defaultValue="hijrah" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 h-auto p-2">
            <TabsTrigger value="hijrah" className="flex items-center p-4">
              <Navigation className="w-4 h-4 mr-2" />
              Rute Hijrah
            </TabsTrigger>
            <TabsTrigger value="battles" className="flex items-center p-4">
              <Sword className="w-4 h-4 mr-2" />
              Perang-Perang
            </TabsTrigger>
            <TabsTrigger value="places" className="flex items-center p-4">
              <Mountain className="w-4 h-4 mr-2" />
              Tempat Suci
            </TabsTrigger>
          </TabsList>

          {/* Map Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar List */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="h-full max-h-[600px] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    Lokasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedLocation?.id === location.id
                            ? "bg-green-50 dark:bg-green-900/40 border-green-500"
                            : "bg-white dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                          }`}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{location.name}</h4>
                          {location.year && <Badge variant="secondary" className="text-xs">{location.year}</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{location.description}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <MapPin className="w-3 h-3 mr-1" />
                          {location.coordinates.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map View */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] overflow-hidden shadow-xl border-green-100 dark:border-green-900">
                <CardContent className="p-0 h-full relative">
                  <Map
                    locations={filteredLocations}
                    center={mapCenter}
                    zoom={mapZoom}
                    onLocationSelect={setSelectedLocation}
                    showRoute={activeTab === "hijrah"}
                  />

                  {/* Floating Info Card */}
                  {selectedLocation && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 z-[1000] animation-fade-in md:w-80">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                          <Badge className="mt-1 mb-2 bg-green-100 text-green-800">{selectedLocation.type}</Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedLocation(null)}>X</Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedLocation.description}</p>
                      {selectedLocation.result && (
                        <div className="mt-2 text-xs font-semibold text-green-600 flex items-center">
                          <Info className="w-3 h-3 mr-1" />
                          Hasil: {selectedLocation.result}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
