"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Search, Heart, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Search data moved to lib/data.ts

import { searchData } from "@/lib/data"
import { SearchResult } from "@/lib/types"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const [showDonationModal, setShowDonationModal] = useState(false)

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const results = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.year.includes(query),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 dark:border-green-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-900/60">
      <div className="flex h-16 items-center px-4 gap-4 w-full">
        <SidebarTrigger />

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-bold text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Siroh Nabawiyah
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search - moved more to the left and made wider */}
            <div className="relative hidden md:block mr-4" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                placeholder="Cari peristiwa, tokoh, atau tahun..."
                className="pl-10 w-80 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowResults(true)}
              />
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                  {searchResults.slice(0, 5).map((result, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                    >
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{result.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between mt-1">
                        <span>{result.year}</span>
                        <Badge variant="outline" className="text-xs">
                          {result.phase}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Donation Button - Opens donation modal */}
            <Dialog open={showDonationModal} onOpenChange={setShowDonationModal}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 rounded-lg p-2"
                  title="Dukung Siroh Nabawiyah"
                >
                  <Heart className="h-4 w-4 transition-all duration-300 text-red-500 hover:text-red-600" />
                  <span className="sr-only">Donasi</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Dukung Siroh Nabawiyah
                  </DialogTitle>
                  <DialogDescription>
                    Bantu kami mengembangkan website edukasi Islam ini agar lebih bermanfaat
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ
                      <br />
                      <span className="italic mt-1 block">
                        "Apabila anak Adam meninggal dunia, maka terputuslah seluruh amalnya kecuali tiga: sedekah
                        jariyah, ilmu yang bermanfaat, dan anak shalih yang mendoakannya."
                        <br />
                        (HR. Muslim No. 1631)
                      </span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Cara Donasi:</h4>

                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <h5 className="font-medium text-sm text-blue-800 dark:text-blue-200 mb-1">Transfer</h5>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Seabank: 9018 8796 0287
                        <br />
                        a.n. M******* A*** H*********
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <a
                    href="https://trakteer.id/JajanAdmin/tip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      Donasi via Trakteer
                    </Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 rounded-lg p-2"
              title="Toggle Dark Mode"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
