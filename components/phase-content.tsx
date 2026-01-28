"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Clock, Users, BookOpen, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

import { PhaseDetail, Period, Event } from "@/lib/types"

interface PhaseContentProps {
  phase: PhaseDetail
}

export function PhaseContent({ phase }: PhaseContentProps) {
  const [currentPeriod, setCurrentPeriod] = useState(0)
  const [currentEvent, setCurrentEvent] = useState(0)

  // Safety checks for data integrity
  const safePeriods = phase?.periods || []
  const currentPeriodData = safePeriods[currentPeriod] || { title: "", years: "", events: [] }
  const currentEventData = currentPeriodData.events[currentEvent] || { year: "", title: "", description: "" }

  // Reset currentEvent when changing periods
  useEffect(() => {
    setCurrentEvent(0)
  }, [currentPeriod])

  // Ensure currentPeriod and currentEvent are within bounds
  useEffect(() => {
    if (currentPeriod >= safePeriods.length) {
      setCurrentPeriod(0)
    }
    if (currentEvent >= currentPeriodData.events.length) {
      setCurrentEvent(0)
    }
  }, [currentPeriod, currentEvent, safePeriods.length, currentPeriodData.events.length])

  const nextEvent = () => {
    if (currentEvent < currentPeriodData.events.length - 1) {
      setCurrentEvent(currentEvent + 1)
    } else if (currentPeriod < safePeriods.length - 1) {
      setCurrentPeriod(currentPeriod + 1)
      setCurrentEvent(0)
    }
  }

  const prevEvent = () => {
    if (currentEvent > 0) {
      setCurrentEvent(currentEvent - 1)
    } else if (currentPeriod > 0) {
      const prevPeriod = currentPeriod - 1
      setCurrentPeriod(prevPeriod)
      const prevPeriodData = safePeriods[prevPeriod]
      if (prevPeriodData && prevPeriodData.events.length > 0) {
        setCurrentEvent(prevPeriodData.events.length - 1)
      }
    }
  }

  const totalEvents = safePeriods.reduce((sum, period) => sum + (period?.events?.length || 0), 0)
  const currentEventIndex =
    safePeriods.slice(0, currentPeriod).reduce((sum, period) => sum + (period?.events?.length || 0), 0) + currentEvent
  const progress = totalEvents > 0 ? ((currentEventIndex + 1) / totalEvents) * 100 : 0

  // Safety check for phase data
  if (!phase || !safePeriods.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold mb-2">Data Tidak Tersedia</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Maaf, data untuk fase ini sedang tidak tersedia. Silakan coba lagi nanti.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {phase.title || "Fase Kehidupan"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {phase.subtitle || "Periode Kehidupan Rasulullah ﷺ"}
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {phase.description || "Mempelajari perjalanan hidup Rasulullah ﷺ"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Peristiwa {currentEventIndex + 1} dari {totalEvents}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% selesai</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={currentPeriod.toString()}
          onValueChange={(value) => {
            const newPeriod = Number.parseInt(value)
            if (newPeriod >= 0 && newPeriod < safePeriods.length) {
              setCurrentPeriod(newPeriod)
              setCurrentEvent(0)
            }
          }}
        >
          {/* Period Tabs */}
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 h-auto p-2 bg-green-50 dark:bg-gray-800">
            {safePeriods.map((period, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="flex flex-col items-center p-4 h-auto data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <div className="font-semibold text-sm mb-1">{period?.title || `Periode ${index + 1}`}</div>
                <Badge variant="secondary" className="text-xs">
                  {period?.years || "Tidak diketahui"}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Period Content */}
          {safePeriods.map((period, periodIndex) => (
            <TabsContent key={periodIndex} value={periodIndex.toString()} className="mt-8">
              <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Timeline */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-green-600" />
                        Timeline Peristiwa
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(period?.events || []).map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${eventIndex === currentEvent
                              ? "bg-green-100 dark:bg-green-900 border-l-4 border-l-green-500"
                              : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            onClick={() => setCurrentEvent(eventIndex)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                {event?.year || "Tidak diketahui"}
                              </Badge>
                              {eventIndex === currentEvent && <Star className="w-4 h-4 text-green-600" />}
                            </div>
                            <h4 className="font-semibold text-sm">{event?.title || "Peristiwa"}</h4>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 xl:col-span-3">
                  <Card className="h-full overflow-hidden border-none shadow-lg">
                    {/* Hero Image Section */}
                    <div className="relative w-full h-[300px] md:h-[400px]">
                      {currentEventData.image ? (
                        <img
                          src={currentEventData.image}
                          alt={currentEventData.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-green-800 to-emerald-900" />
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-3 py-1">
                            {currentEventData.year || "TAHUN"}
                          </Badge>
                          <Badge variant="outline" className="text-white border-white/50 bg-black/20 backdrop-blur-sm">
                            {phase.title}
                          </Badge>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                          {currentEventData.title}
                        </h2>
                      </div>
                    </div>

                    <CardContent className="p-6 md:p-8">
                      <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column: Main Description */}
                        <div className="md:col-span-2 space-y-8">
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                              {currentEventData.description || "Deskripsi tidak tersedia."}
                            </p>
                          </div>

                          {/* Quran Quote Box - Conditionally Rendered */}
                          {currentEventData.quote && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-8 border-l-4 border-amber-400">
                              <div className="text-center space-y-4">
                                <p className="text-2xl font-arabic text-gray-800 dark:text-gray-200 leading-loose">
                                  {currentEventData.quote.arabic}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 italic font-medium">
                                  "{currentEventData.quote.translation}"
                                </p>
                                <p className="text-xs text-uppercase tracking-wider text-amber-600 font-bold mt-2">
                                  ({currentEventData.quote.source})
                                </p>
                              </div>
                            </div>
                          )}

                          {currentEventData.reflection && (
                            <div className="prose dark:prose-invert max-w-none">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                {currentEventData.reflection}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="space-y-6">
                          {/* Hikmah Card */}
                          {/* Hikmah Card */}
                          {currentEventData.hikmah && currentEventData.hikmah.length > 0 && (
                            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/50 shadow-lg">
                              <h3 className="flex items-center text-emerald-800 dark:text-emerald-400 font-bold mb-4">
                                <BookOpen className="w-5 h-5 mr-2" />
                                Hikmah & Pelajaran
                              </h3>
                              <ul className="space-y-4">
                                {currentEventData.hikmah.map((item, idx) => (
                                  <li key={idx} className="flex items-start group">
                                    <div className="mt-1 min-w-[20px]">
                                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                                        <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                      </div>
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                      {item}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tokoh Terkait Card */}
                          {currentEventData.tokoh && currentEventData.tokoh.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-lg">
                              <h3 className="flex items-center text-gray-800 dark:text-blue-400 font-bold mb-4">
                                <Users className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                Tokoh Terkait
                              </h3>
                              <div className="space-y-4">
                                {currentEventData.tokoh.map((tokoh, idx) => (
                                  <div key={idx} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-default">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${idx % 2 === 0 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                      {tokoh.initials}
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tokoh.name}</p>
                                      <p className="text-xs text-gray-500">{tokoh.role}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {/* Phase Navigation - Improved UI/UX */}
      <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
        <div className="container mx-auto">
          <h3 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
            Lanjutkan Perjalanan Belajar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Previous Phase */}
            <div className="text-center md:text-left">
              {phase.title === "Fase Makkah" && (
                <Link href="/phase/pre-prophethood">
                  <Button
                    variant="outline"
                    className="w-full md:w-auto group hover:bg-amber-50 dark:hover:bg-amber-900 border-amber-300 hover:border-amber-400 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Sebelumnya</div>
                      <div className="font-medium">Fase Awalan</div>
                    </div>
                  </Button>
                </Link>
              )}
              {phase.title === "Fase Madinah" && (
                <Link href="/phase/makkah">
                  <Button
                    variant="outline"
                    className="w-full md:w-auto group hover:bg-green-50 dark:hover:bg-green-900 border-green-300 hover:border-green-400 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Sebelumnya</div>
                      <div className="font-medium">Fase Makkah</div>
                    </div>
                  </Button>
                </Link>
              )}
              {phase.title === "Fase Awalan" && (
                <div className="text-center text-gray-400 dark:text-gray-600 text-sm italic">
                  ✨ Ini adalah fase pertama
                </div>
              )}
            </div>

            {/* Home Button */}
            <div className="text-center">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="group hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all duration-300 px-6 py-3"
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-500 group-hover:text-green-600">Kembali ke</div>
                    <div className="font-medium text-green-600 group-hover:text-green-700">🏠 Beranda</div>
                  </div>
                </Button>
              </Link>
            </div>

            {/* Next Phase */}
            <div className="text-center md:text-right">
              {phase.title === "Fase Awalan" && (
                <Link href="/phase/makkah">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 group shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-right mr-2">
                      <div className="text-xs text-green-100">Selanjutnya</div>
                      <div className="font-medium">Fase Makkah</div>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              {phase.title === "Fase Makkah" && (
                <Link href="/phase/madinah">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-right mr-2">
                      <div className="text-xs text-blue-100">Selanjutnya</div>
                      <div className="font-medium">Fase Madinah</div>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              {phase.title === "Fase Madinah" && (
                <div className="text-center text-gray-400 dark:text-gray-600 text-sm italic">
                  🎯 Ini adalah fase terakhir
                </div>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${phase.title === "Fase Awalan" ? "bg-amber-500" : "bg-gray-300"}`}
            ></div>
            <div
              className={`w-3 h-3 rounded-full ${phase.title === "Fase Makkah" ? "bg-green-500" : "bg-gray-300"}`}
            ></div>
            <div
              className={`w-3 h-3 rounded-full ${phase.title === "Fase Madinah" ? "bg-blue-500" : "bg-gray-300"}`}
            ></div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {phase.title === "Fase Awalan" && "Fase 1 dari 3 - Persiapan Kenabian"}
              {phase.title === "Fase Makkah" && "Fase 2 dari 3 - Dakwah dan Perjuangan"}
              {phase.title === "Fase Madinah" && "Fase 3 dari 3 - Pembentukan Negara"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
