import { notFound } from "next/navigation"
import { PhaseContent } from "@/components/phase-content"


import { phasesData } from "@/lib/data"

export default async function PhasePage({ params }: { params: Promise<{ phase: string }> }) {
  const { phase: phaseId } = await params
  const phase = phasesData[phaseId as keyof typeof phasesData]

  if (!phase) {
    notFound()
  }

  return <PhaseContent phase={phase} />
}
