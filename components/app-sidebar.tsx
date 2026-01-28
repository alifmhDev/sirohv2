"use client"
import { Clock, Home, MapPin, Heart, Star, BookOpen, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const navigationItems = [
  {
    title: "Beranda",
    url: "/",
    icon: Home,
  },
  {
    title: "Fase Kehidupan",
    url: "/phases",
    icon: BookOpen,
  },
  {
    title: "Timeline Lengkap",
    url: "/timeline",
    icon: Clock,
  },
  {
    title: "Peta Interaktif",
    url: "/maps",
    icon: MapPin,
  },
  {
    title: "Galeri Hadits",
    url: "/hadith",
    icon: Heart,
  },
  {
    title: "Audio Recitations",
    url: "/audio",
    icon: Heart,
  },
]

const phaseItems = [
  {
    title: "Fase Awalan",
    subtitle: "Sebelum Kenabian",
    period: "0-40 Tahun",
    url: "/phase/pre-prophethood",
    icon: Star,
    color: "text-amber-600",
    bgColor: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
  },
  {
    title: "Fase Makkah",
    subtitle: "Periode Dakwah",
    period: "13 Tahun",
    url: "/phase/makkah",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "hover:bg-green-50 dark:hover:bg-green-900/20",
  },
  {
    title: "Fase Madinah",
    subtitle: "Pembentukan Negara",
    period: "10 Tahun",
    url: "/phase/madinah",
    icon: Users,
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-green-200 dark:border-green-800">
      <SidebarHeader className="border-b border-green-200 dark:border-green-800 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg"></div>
          <div>
            <h2 className="font-bold text-lg">سيرة نبوية</h2>
            <p className="text-xs text-muted-foreground">Siroh Nabawiyah</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigasi Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-green-200 dark:border-green-800 p-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">"وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ"</p>
          <p className="text-xs text-muted-foreground">
            Dan tidaklah Kami mengutus kamu, melainkan untuk (menjadi) rahmat bagi semesta alam
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
