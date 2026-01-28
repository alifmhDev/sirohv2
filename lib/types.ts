export interface SearchResult {
    title: string
    year: string
    phase: string
    description: string
}

export interface Event {
    year: string
    title: string
    description: string
    image?: string
    quote?: {
        arabic: string
        translation: string
        source: string
    }
    hikmah?: string[]
    tokoh?: {
        name: string
        role: string
        initials: string
    }[]
    reflection?: string
}

export interface Period {
    title: string
    years: string
    events: Event[]
}

export interface Phase {
    id: string
    title: string
    subtitle: string
    period: string
    description: string
    // Using any for icon temporarily as it's a component
    icon: any
    color: string
    events: string[]
    periods?: Period[]
}

export interface PhaseDetail {
    title: string
    subtitle: string
    description: string
    periods: Period[]
}

export interface Hadith {
    id: number
    arabic: string
    translation: string
    narrator: string
    source: string
    phase: string
    category: string
    context: string
    lesson: string
    favorite: boolean
}

export interface WisdomQuote {
    id: number
    arabic: string
    translation: string
    phase: string
    category: string
}

export interface AudioRecitation {
    id: number
    title: string
    arabic: string
    translation: string
    phase: string
    duration: string
    audioUrl: string
    description: string
    cover?: string
}

export interface MapLocation {
    id: number
    name: string
    description: string
    coordinates: [number, number] // [lat, lng]
    type: "route" | "battle" | "place"
    year?: string
    result?: string
}
