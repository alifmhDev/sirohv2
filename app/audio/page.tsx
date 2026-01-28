"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Pause, Volume2, Search, Filter, ListMusic, Music2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { audioRecitations } from "@/lib/data"
import { AudioRecitation } from "@/lib/types"

export default function AudioPage() {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAudio, setFilteredAudio] = useState<AudioRecitation[]>(audioRecitations)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (searchQuery) {
      const filtered = audioRecitations.filter(
        (audio) =>
          audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          audio.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          audio.phase.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredAudio(filtered)
    } else {
      setFilteredAudio(audioRecitations)
    }
  }, [searchQuery])

  // Auto-select first track on load
  useEffect(() => {
    if (audioRecitations.length > 0 && currentPlaying === null) {
      setCurrentPlaying(audioRecitations[0].id)
      // Note: We don't auto-play to avoid browser policy issues, just set the state
      if (audioRef.current) {
        audioRef.current.src = audioRecitations[0].audioUrl
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const handlePlay = (id: number, url: string) => {
    if (currentPlaying === id) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    } else {
      if (audioRef.current) {
        audioRef.current.src = url
        audioRef.current.play()
        setCurrentPlaying(id)
        setIsPlaying(true)
      }
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Makkah":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Madinah":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Hijrah":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const currentAudio = audioRecitations.find(a => a.id === currentPlaying)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Audio Recitations</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dengarkan lantunan ayat suci dan doa pilihan dari perjalanan Nabi ﷺ
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Playlist Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="flex items-center text-xl">
                    <ListMusic className="w-5 h-5 mr-2 text-green-600" />
                    Daftar Putar
                  </CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Cari surat atau doa..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredAudio.map((audio) => (
                    <div
                      key={audio.id}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group ${currentPlaying === audio.id ? "bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500" : ""}`}
                      onClick={() => handlePlay(audio.id, audio.audioUrl)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          {currentPlaying === audio.id && isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5 ml-1" />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${currentPlaying === audio.id ? "text-green-700 dark:text-green-400" : ""}`}>
                            {audio.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px] md:max-w-xs">{audio.translation}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getPhaseColor(audio.phase)} hidden md:inline-flex`}>{audio.phase}</Badge>
                        <span className="text-sm text-gray-400">{audio.duration}</span>
                      </div>
                    </div>
                  ))}
                  {filteredAudio.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada audio yang ditemukan.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Now Playing Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-green-100 dark:border-green-900 shadow-xl overflow-hidden">
              <div className="h-64 relative bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                {currentAudio?.cover ? (
                  <img
                    src={currentAudio.cover}
                    alt={currentAudio.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <Music2 className="w-20 h-20 text-white/50" />
                )}
              </div>
              <CardContent className="pt-6 text-center space-y-6">
                {currentPlaying ? (
                  <>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{currentAudio?.title}</h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{currentAudio?.phase}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
                      <p className="font-arabic text-xl leading-loose text-center text-gray-700 dark:text-gray-200">
                        {currentAudio?.arabic}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0:00</span>
                        <span>{currentAudio?.duration}</span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button
                        size="lg"
                        className="rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20"
                        onClick={() => currentAudio && handlePlay(currentAudio.id, currentAudio.audioUrl)}
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-gray-400">
                    <p>Pilih audio dari daftar untuk mulai mendengarkan</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Note */}
            <Card className="mt-6 border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Volume2 className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Catatan</h3>
                    <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
                      Audio player ini adalah demonstrasi. File audio yang diputar mungkin placeholder atau tidak tersedia di server lokal Anda.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} className="hidden" onError={() => setIsPlaying(false)} />
      </div>
    </div>
  )
}
