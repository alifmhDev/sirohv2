"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Users, BookOpen, Search, Filter } from "lucide-react"

const timelineData = [
  // Pre-Prophethood
  {
    year: "570",
    title: "Dalam Kandungan & Wafat Ayahanda",
    phase: "Awalan",
    category: "Keluarga",
    description:
      "Saat beliau masih berada dalam kandungan ibunda tercinta Aminah, bertepatan dengan wafatnya Ayahanda tercinta Abdullah",
  },
  {
    year: "571",
    title: "Kelahiran di Tahun Gajah",
    phase: "Awalan",
    category: "Kelahiran",
    description:
      "Beliau dilahirkan pada 12 Rabiul Awwal bertepatan dengan penyerangan Ka'bah oleh pasukan bergajah Abrahah",
  },
  {
    year: "571",
    title: "Hari ke-7: Khitan",
    phase: "Awalan",
    category: "Ritual",
    description: "Pada hari ke-7 setelah dilahirkan, beliau dikhitan seperti kebiasaan orang Arab",
  },
  {
    year: "573",
    title: "Kembali dari Halimah",
    phase: "Awalan",
    category: "Keluarga",
    description: "Saat usia dua tahun, beliau dikembalikan oleh Halimah As-Sa'diyah kepada ibunda",
  },
  {
    year: "575",
    title: "Peristiwa Pembelahan Dada",
    phase: "Awalan",
    category: "Mukjizat",
    description: "Halimah mengembalikan beliau setelah mendengar kejadian pembelahan dada oleh Malaikat Jibril",
  },
  {
    year: "577",
    title: "Wafat Ibunda Aminah",
    phase: "Awalan",
    category: "Keluarga",
    description: "Ibunda Aminah wafat di Abwa saat perjalanan pulang ke Makkah",
  },
  {
    year: "579",
    title: "Wafat Abdul Muthalib",
    phase: "Awalan",
    category: "Keluarga",
    description: "Abdul Muthalib wafat saat beliau berusia 8 tahun 2 bulan 10 hari",
  },
  {
    year: "583",
    title: "Perjalanan Dagang ke Syam Pertama",
    phase: "Awalan",
    category: "Perjalanan",
    description: "Beliau ikut Abu Thalib berdagang ke Syam dan bertemu Rahib Bahira",
  },
  {
    year: "586",
    title: "Ikut Perang Fijar",
    phase: "Awalan",
    category: "Perang",
    description: "Beliau ikut Perang Fijar dengan tugas mengumpulkan anak panah",
  },
  {
    year: "595",
    title: "Menikah dengan Khadijah",
    phase: "Awalan",
    category: "Pernikahan",
    description: "Beliau menikah dengan Khadijah binti Khuwailid yang berusia 40 tahun",
  },
  {
    year: "605",
    title: "Arbitrase Hajar Aswad",
    phase: "Awalan",
    category: "Kepemimpinan",
    description: "Menyelesaikan sengketa penempatan Hajar Aswad dengan bijaksana",
  },

  // Makkah Period
  {
    year: "610",
    title: "Wahyu Pertama",
    phase: "Makkah",
    category: "Wahyu",
    description: "Turunnya wahyu pertama di Gua Hira",
  },
  {
    year: "613",
    title: "Dakwah Terbuka",
    phase: "Makkah",
    category: "Dakwah",
    description: "Mulai berdakwah secara terbuka",
  },
  {
    year: "615",
    title: "Hijrah ke Habasyah",
    phase: "Makkah",
    category: "Hijrah",
    description: "Hijrah pertama ke Habasyah",
  },
  {
    year: "619",
    title: "Tahun Duka",
    phase: "Makkah",
    category: "Keluarga",
    description: "Wafat Abu Thalib dan Khadijah",
  },
  {
    year: "621",
    title: "Isra Mi'raj",
    phase: "Makkah",
    category: "Mukjizat",
    description: "Perjalanan malam dan naik ke langit",
  },

  // Madinah Period
  {
    year: "622",
    title: "Hijrah ke Madinah",
    phase: "Madinah",
    category: "Hijrah",
    description: "Perpindahan dari Makkah ke Madinah",
  },
  {
    year: "623",
    title: "Piagam Madinah",
    phase: "Madinah",
    category: "Politik",
    description: "Konstitusi pertama dalam Islam",
  },
  {
    year: "624",
    title: "Perang Badr",
    phase: "Madinah",
    category: "Perang",
    description: "Kemenangan pertama kaum muslim",
  },
  {
    year: "625",
    title: "Perang Uhud",
    phase: "Madinah",
    category: "Perang",
    description: "Ujian berat bagi kaum muslim",
  },
  {
    year: "627",
    title: "Perang Khandaq",
    phase: "Madinah",
    category: "Perang",
    description: "Pertahanan Madinah dari serangan koalisi",
  },
  {
    year: "628",
    title: "Perjanjian Hudaibiyah",
    phase: "Madinah",
    category: "Politik",
    description: "Perjanjian damai dengan Makkah",
  },
  {
    year: "630",
    title: "Fathu Makkah",
    phase: "Madinah",
    category: "Kemenangan",
    description: "Pembebasan Makkah tanpa pertumpahan darah",
  },
  {
    year: "632",
    title: "Haji Wada'",
    phase: "Madinah",
    category: "Ibadah",
    description: "Haji perpisahan dan khutbah terakhir",
  },
  {
    year: "632",
    title: "Wafat Rasulullah ﷺ",
    phase: "Madinah",
    category: "Wafat",
    description: "Wafat pada usia 63 tahun",
  },
]

export default function TimelinePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPhase, setSelectedPhase] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredData, setFilteredData] = useState(timelineData)

  useEffect(() => {
    handleFilter()
  }, [searchQuery, selectedPhase, selectedCategory])

  const handleFilter = () => {
    let filtered = timelineData

    try {
      if (searchQuery && searchQuery.length > 0) {
        filtered = filtered.filter(
          (item) =>
            item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.year?.includes(searchQuery),
        )
      }

      if (selectedPhase !== "all") {
        filtered = filtered.filter((item) => item?.phase === selectedPhase)
      }

      if (selectedCategory !== "all") {
        filtered = filtered.filter((item) => item?.category === selectedCategory)
      }

      setFilteredData(filtered)
    } catch (error) {
      console.error("Error filtering data:", error)
      setFilteredData(timelineData)
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Awalan":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "Makkah":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Madinah":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Perang":
        return <MapPin className="w-4 h-4" />
      case "Dakwah":
        return <BookOpen className="w-4 h-4" />
      case "Keluarga":
        return <Users className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Timeline Lengkap</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jelajahi perjalanan hidup Rasulullah ﷺ secara kronologis dari kelahiran hingga wafat
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari peristiwa..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Fase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Fase</SelectItem>
                  <SelectItem value="Awalan">Fase Awalan</SelectItem>
                  <SelectItem value="Makkah">Fase Makkah</SelectItem>
                  <SelectItem value="Madinah">Fase Madinah</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Kelahiran">Kelahiran</SelectItem>
                  <SelectItem value="Keluarga">Keluarga</SelectItem>
                  <SelectItem value="Dakwah">Dakwah</SelectItem>
                  <SelectItem value="Perang">Perang</SelectItem>
                  <SelectItem value="Politik">Politik</SelectItem>
                  <SelectItem value="Mukjizat">Mukjizat</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleFilter} className="bg-green-600 hover:bg-green-700">
                Terapkan Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-300 dark:bg-green-700"></div>

          <div className="space-y-8">
            {filteredData.length > 0 ? (
              filteredData.map((event, index) => (
                <div key={`${event.year}-${index}`} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-green-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>

                  {/* Content */}
                  <div className="ml-16 flex-1">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-600 text-white font-bold">
                            {event.year || "Tidak diketahui"} M
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPhaseColor(event.phase)}>{event.phase || "Unknown"}</Badge>
                            <div className="flex items-center text-gray-500">
                              {getCategoryIcon(event.category)}
                              <span className="ml-1 text-sm">{event.category || "Lainnya"}</span>
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{event.title || "Peristiwa"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">
                          {event.description || "Deskripsi tidak tersedia."}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <h3 className="text-xl font-semibold mb-2">Tidak Ada Hasil</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tidak ditemukan peristiwa yang sesuai dengan filter yang dipilih.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Stats */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{filteredData.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Peristiwa</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredData.filter((e) => e.phase === "Awalan").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fase Awalan</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredData.filter((e) => e.phase === "Makkah").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fase Makkah</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredData.filter((e) => e.phase === "Madinah").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fase Madinah</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
