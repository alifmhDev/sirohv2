import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Fitur Tidak Tersedia</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fitur bookmark telah dihapus. Silakan jelajahi konten langsung melalui timeline dan fase kehidupan.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
