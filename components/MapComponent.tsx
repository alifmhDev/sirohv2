"use client"

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { MapLocation } from "@/lib/types"
import L from "leaflet"
import { useEffect } from "react"

// Fix for Leaflet marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png"
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

const defaultIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = defaultIcon

interface MapProps {
    locations: MapLocation[]
    center?: [number, number]
    zoom?: number
    onLocationSelect?: (location: MapLocation) => void
    showRoute?: boolean
}

export default function MapComponent({
    locations,
    center = [23.8859, 39.1925], // Default center between Makkah and Madinah
    zoom = 7,
    onLocationSelect,
    showRoute = false
}: MapProps) {

    // Custom icons based on type
    const getIcon = (type: string) => {
        return defaultIcon // Simplified for now, can be customized later
    }

    const routeCoordinates = locations
        .filter(loc => loc.type === "route")
        .map(loc => loc.coordinates)

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            className="w-full h-full rounded-lg z-0"
            style={{ minHeight: "400px", height: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={location.coordinates}
                    eventHandlers={{
                        click: () => onLocationSelect && onLocationSelect(location),
                    }}
                >
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold text-lg">{location.name}</h3>
                            <p className="text-sm">{location.description}</p>
                            {location.year && <span className="text-xs bg-gray-100 rounded px-1">{location.year}</span>}
                        </div>
                    </Popup>
                </Marker>
            ))}

            {showRoute && routeCoordinates.length > 1 && (
                <Polyline
                    positions={routeCoordinates}
                    color="green"
                    weight={4}
                    opacity={0.7}
                    dashArray="10, 10"
                />
            )}
        </MapContainer>
    )
}
