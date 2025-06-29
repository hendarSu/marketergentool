import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"

const strategySchema = z.object({
  overview: z.string().describe("Ringkasan strategi marketing yang komprehensif"),
  channels: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      budget: z.string(),
      timeline: z.string(),
      tactics: z.array(z.string()),
    }),
  ),
  timeline: z.array(
    z.object({
      phase: z.string(),
      duration: z.string(),
      activities: z.array(z.string()),
    }),
  ),
  kpis: z.array(z.string()),
  budget_breakdown: z.array(
    z.object({
      channel: z.string(),
      percentage: z.number(),
      amount: z.string(),
    }),
  ),
  recommendations: z.array(z.string()).describe("Rekomendasi khusus dari AI berdasarkan analisis bisnis"),
})

export async function POST(request: Request) {
  try {
    const businessData = await request.json()

    const prompt = `
  Sebagai ahli digital marketing berpengalaman, buatlah strategi digital marketing yang komprehensif dan dipersonalisasi untuk bisnis berikut:

  INFORMASI BISNIS:
  - Nama Bisnis: ${businessData.businessName}
  - Industri: ${businessData.industry}
  - Deskripsi Bisnis: ${businessData.businessDescription}
  - Target Audience: ${businessData.targetAudience}
  - Budget Bulanan: ${businessData.budget}
  - Timeline: ${businessData.timeline}
  - Tujuan Marketing: ${businessData.goals.join(", ")}
  - Channel Saat Ini: ${businessData.currentChannels.join(", ") || "Belum ada"}
  - Kompetitor: ${businessData.competitors || "Tidak disebutkan"}
  - Unique Value Proposition: ${businessData.uniqueValue || "Tidak disebutkan"}

  INSTRUKSI:
  1. Buat strategi yang SANGAT SPESIFIK untuk bisnis ini, bukan template umum
  2. Pertimbangkan industri, target audience, dan budget yang tersedia
  3. Berikan rekomendasi channel yang paling efektif untuk bisnis ini
  4. Sertakan taktik konkret yang bisa langsung diimplementasikan
  5. Berikan timeline yang realistis berdasarkan budget dan tujuan
  6. Fokus pada ROI dan hasil yang terukur
  7. Berikan insight khusus berdasarkan analisis mendalam tentang bisnis ini
  8. Gunakan bahasa Indonesia yang profesional dan mudah dipahami

  Pastikan semua rekomendasi praktis, actionable, dan sesuai dengan kondisi pasar Indonesia.
  `

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      prompt,
      schema: strategySchema,
    })

    // Add icons to channels
    const channelsWithIcons = object.channels.map((channel) => ({
      ...channel,
      icon: null, // Icons will be added in the frontend
    }))

    return Response.json({
      ...object,
      channels: channelsWithIcons,
    })
  } catch (error) {
    console.error("Error generating strategy:", error)
    return Response.json({ error: "Gagal menghasilkan strategi" }, { status: 500 })
  }
}
