"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Star, Filter, Copy, Share2, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hadithData, wisdomQuotes } from "@/lib/data"
import { Hadith, WisdomQuote } from "@/lib/types"

export default function HadithPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPhase, setSelectedPhase] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredHadith, setFilteredHadith] = useState<Hadith[]>(hadithData)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleSearch = () => {
    let filtered = hadithData

    if (searchQuery) {
      filtered = filtered.filter(
        (hadith) =>
          hadith.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hadith.arabic.includes(searchQuery) ||
          hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hadith.lesson.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedPhase !== "all") {
      filtered = filtered.filter((hadith) => hadith.phase === selectedPhase)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((hadith) => hadith.category === selectedCategory)
    }

    setFilteredHadith(filtered)
  }

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleShare = async (hadith: Hadith) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hadits Pilihan',
          text: `"${hadith.translation}" - ${hadith.narrator} (${hadith.source})\n\n${hadith.arabic}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback for desktop: Copy to clipboard
      handleCopy(`"${hadith.translation}" - ${hadith.narrator} (${hadith.source})\n\n${hadith.arabic}`, hadith.id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Galeri Hadits & Hikmah</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Kumpulan hadits dan hikmah dari perjalanan hidup Rasulullah ﷺ
          </p>
        </div>

        <Tabs defaultValue="hadith" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 h-auto p-2">
            <TabsTrigger value="hadith" className="flex items-center p-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Hadits Pilihan
            </TabsTrigger>
            <TabsTrigger value="wisdom" className="flex items-center p-4">
              <Star className="w-4 h-4 mr-2" />
              Hikmah & Nasihat
            </TabsTrigger>
          </TabsList>

          {/* Hadith Collection */}
          <TabsContent value="hadith">
            {/* Search and Filter */}
            <Card className="mb-8 border-none shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Filter className="w-5 h-5 mr-2 text-green-600" />
                  Cari & Filter Hadits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Cari hadits..."
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
                      <SelectItem value="Akhlak">Akhlak</SelectItem>
                      <SelectItem value="Iman">Iman</SelectItem>
                      <SelectItem value="Adab">Adab</SelectItem>
                      <SelectItem value="Dakwah">Dakwah</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700 transition-colors">
                    Cari Hadits
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Hadith Cards - Mansonry-like using columns for large screens */}
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {filteredHadith.map((hadith) => (
                <div key={hadith.id} className="break-inside-avoid">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-t-4 border-t-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">{hadith.phase}</Badge>
                          <Badge variant="outline" className="border-gray-300">{hadith.category}</Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-green-600" onClick={() => handleCopy(hadith.arabic + "\n" + hadith.translation, hadith.id)}>
                            {copiedId === hadith.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600" onClick={() => handleShare(hadith)}>
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Arabic Text */}
                      <div className="bg-green-50/50 dark:bg-green-900/20 p-5 rounded-xl border border-green-100 dark:border-green-800/30">
                        <p className="text-right text-2xl font-arabic leading-loose text-gray-800 dark:text-gray-100">
                          {hadith.arabic}
                        </p>
                      </div>

                      {/* Translation */}
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">"{hadith.translation}"</p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800"></div>

                      {/* Details */}
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-500">Perawi:</span>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{hadith.narrator}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-500">Sumber:</span>
                          <span className="text-gray-700 dark:text-gray-300">{hadith.source}</span>
                        </div>
                      </div>

                      {/* Lesson */}
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-400">
                        <h4 className="font-semibold text-sm text-amber-800 dark:text-amber-200 mb-1 flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" />
                          Hikmah:
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{hadith.lesson}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            {filteredHadith.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada hadits yang ditemukan.</p>
              </div>
            )}
          </TabsContent>

          {/* Wisdom Quotes */}
          <TabsContent value="wisdom">
            <div className="grid md:grid-cols-3 gap-6">
              {wisdomQuotes.map((quote) => (
                <Card key={quote.id} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="mb-4">
                        <p className="text-center text-xl font-arabic text-gray-800 dark:text-gray-100 mb-3">
                          {quote.arabic}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 italic text-sm">"{quote.translation}"</p>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <Badge variant="secondary" className="text-xs">{quote.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
