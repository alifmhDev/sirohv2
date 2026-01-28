import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, MapPin, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PhasesPage() {
  const phases = [
    {
      id: "pre-prophethood",
      title: "Fase Awalan",
      subtitle: "Sebelum Kenabian",
      period: "0-40 Tahun",
      description: "Kelahiran, masa kanak-kanak, remaja, dan dewasa muda hingga diangkat menjadi Rasul",
      icon: Star,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      events: ["Kelahiran di Makkah", "Masa dengan Halimah", "Pernikahan dengan Khadijah", "Peristiwa Gua Hira"],
    },
    {
      id: "makkah",
      title: "Fase Makkah",
      subtitle: "Periode Dakwah Awal",
      period: "13 Tahun",
      description: "Masa dakwah di Makkah dengan berbagai tantangan dan perjuangan",
      icon: BookOpen,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      events: ["Wahyu Pertama", "Dakwah Sirr", "Dakwah Jahr", "Hijrah ke Habasyah", "Isra Mi'raj"],
    },
    {
      id: "madinah",
      title: "Fase Madinah",
      subtitle: "Periode Pembentukan Negara",
      period: "10 Tahun",
      description: "Masa pembentukan masyarakat Islam dan penyebaran dakwah",
      icon: MapPin,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      events: ["Hijrah ke Madinah", "Piagam Madinah", "Perang Badr", "Fathu Makkah", "Haji Wada'"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          Jelajahi Fase Kehidupan Rasulullah ﷺ
        </h3>

        <div className="grid lg:grid-cols-3 gap-8">
          {phases.map((phase, index) => {
            const IconComponent = phase.icon
            return (
              <Card key={phase.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{phase.title}</CardTitle>
                  <CardDescription className="text-lg font-medium">{phase.subtitle}</CardDescription>
                  <Badge className={`${phase.color} text-sm font-medium`}>{phase.period}</Badge>
                </CardHeader>

                <CardContent className="space-y-4 flex flex-col flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-center">{phase.description}</p>

                  <div className="space-y-2 flex-1">
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Peristiwa Penting:</h4>
                    <ul className="space-y-1">
                      {phase.events.map((event, eventIndex) => (
                        <li key={eventIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-2 text-green-500" />
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={`/phase/${phase.id}`} className="block mt-auto pt-4">
                    <Button className="w-full group-hover:bg-green-600 transition-colors">
                      Jelajahi Fase Ini
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
