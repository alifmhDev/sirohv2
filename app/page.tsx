import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, MapPin, Users, ArrowRight, Star, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent mb-4">
              سيرة نبوية
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Siroh Nabawiyah
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Perjalanan Hidup Rasulullah Muhammad ﷺ
            </p>
          </div>

          {/* Opening Quote */}
          <Card className="max-w-4xl mx-auto mb-12 border-l-4 border-l-green-500">
            <CardContent className="p-8">
              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic text-center">
                "لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ"
              </blockquote>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-4 text-center">
                "Sesungguhnya pada diri Rasulullah terdapat suri teladan yang baik bagimu"
                <br />
                <span className="text-sm">(QS. Al-Ahzab: 21)</span>
              </p>
            </CardContent>
          </Card>

          {/* Purpose Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle className="text-lg">Belajar Sejarah</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Memahami perjalanan hidup Nabi Muhammad ﷺ secara kronologis dan mendalam
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <CardTitle className="text-lg">Meneladani Akhlak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Mengambil hikmah dan pelajaran dari setiap fase kehidupan Rasulullah ﷺ
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle className="text-lg">Membangun Karakter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Menerapkan nilai-nilai Islam dalam kehidupan sehari-hari
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Phases Navigation */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
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
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-green-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">63</div>
              <div className="text-gray-600 dark:text-gray-400">Tahun Kehidupan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">23</div>
              <div className="text-gray-600 dark:text-gray-400">Tahun Kenabian</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">13</div>
              <div className="text-gray-600 dark:text-gray-400">Tahun di Makkah</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10</div>
              <div className="text-gray-600 dark:text-gray-400">Tahun di Madinah</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Mulai Perjalanan Belajar Anda</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Ikuti timeline kehidupan Rasulullah ﷺ secara interaktif dan dapatkan hikmah dari setiap fase perjalanan
            beliau
          </p>
          <Link href="/phase/pre-prophethood">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Mulai dari Fase Awalan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
