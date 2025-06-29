import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"

const contentSchema = z.object({
  script: z.string().describe("Script konten yang engaging dan sesuai dengan platform"),
  caption: z.string().describe("Caption yang menarik dengan hook yang kuat"),
  hashtags: z.array(z.string()).describe("Hashtag yang relevan dan trending"),
  tips: z.array(z.string()).describe("Tips optimasi untuk meningkatkan engagement"),
})

export async function POST(request: Request) {
  try {
    const contentData = await request.json()

    const prompt = `
Sebagai content creator dan social media expert, buatlah konten yang engaging untuk platform ${contentData.platform} dengan detail berikut:

INFORMASI BRAND:
- Brand: ${contentData.brand}
- Industri: ${contentData.industry}
- Target Audience: ${contentData.targetAudience}
- Jenis Konten: ${contentData.contentType}
- Platform: ${contentData.platform}
- Tone of Voice: ${contentData.tone}
- Framework Copywriting: ${contentData.framework}
- Topik: ${contentData.topic}
- Call to Action: ${contentData.callToAction}
- Hashtag yang diinginkan: ${contentData.hashtags}

FRAMEWORK COPYWRITING YANG HARUS DIGUNAKAN:
${getFrameworkInstructions(contentData.framework)}

INSTRUKSI:
1. WAJIB menggunakan framework copywriting ${contentData.framework} dalam struktur konten
2. Buat script yang engaging dan sesuai dengan karakteristik platform ${contentData.platform}
3. Script harus mengikuti struktur framework yang dipilih secara konsisten
4. Sesuaikan panjang konten dengan platform (Instagram: 125-150 kata, TikTok: 100-125 kata, dll)
5. Gunakan tone ${contentData.tone} yang konsisten
6. Sertakan call to action yang natural dan sesuai dengan framework
7. Buat caption yang berbeda dari script, lebih ringkas tapi tetap mengikuti framework
8. Berikan hashtag yang trending dan relevan dengan topik
9. Sertakan tips praktis untuk optimasi engagement

FOKUS PADA:
- Implementasi framework copywriting yang tepat dan efektif
- Konten yang autentik dan relatable untuk audience Indonesia
- Penggunaan bahasa yang sesuai dengan target audience
- Struktur yang mudah dibaca dan engaging sesuai framework
- Call to action yang jelas dan actionable
- Hashtag yang mix antara populer dan niche
`

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      prompt,
      schema: contentSchema,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Error generating content:", error)
    return Response.json({ error: "Gagal menghasilkan konten" }, { status: 500 })
  }
}

function getFrameworkInstructions(framework: string): string {
  const instructions = {
    aida: `
    AIDA Framework:
    - ATTENTION: Buka dengan hook yang menarik perhatian
    - INTEREST: Bangun minat dengan informasi menarik/relevan
    - DESIRE: Ciptakan keinginan dengan manfaat/solusi
    - ACTION: Ajak untuk melakukan tindakan spesifik
    `,
    pas: `
    PAS Framework:
    - PROBLEM: Identifikasi masalah yang dialami target audience
    - AGITATE: Perbesar rasa sakit/frustrasi dari masalah tersebut
    - SOLUTION: Tawarkan solusi yang tepat dan efektif
    `,
    "before-after-bridge": `
    Before-After-Bridge Framework:
    - BEFORE: Gambarkan situasi saat ini yang tidak ideal
    - AFTER: Visualisasikan situasi ideal yang diinginkan
    - BRIDGE: Tunjukkan cara/solusi untuk mencapai situasi ideal
    `,
    storytelling: `
    Storytelling Framework:
    - Mulai dengan cerita personal/relatable
    - Bangun emosi dan koneksi dengan audience
    - Sertakan konflik atau tantangan
    - Berikan resolusi dan pembelajaran
    - Hubungkan dengan pesan/produk
    `,
    "features-benefits": `
    Features-Benefits Framework:
    - Sebutkan fitur produk/layanan
    - Jelaskan manfaat spesifik dari setiap fitur
    - Fokus pada "what's in it for me" untuk audience
    - Hubungkan dengan kebutuhan target audience
    `,
    "social-proof": `
    Social Proof Framework:
    - Mulai dengan testimoni/review positif
    - Sertakan angka/statistik yang mengesankan
    - Tunjukkan popularitas atau kepercayaan orang lain
    - Ajak audience untuk bergabung dengan yang lain
    `,
    "scarcity-urgency": `
    Scarcity & Urgency Framework:
    - Tunjukkan keterbatasan (waktu/stok/kesempatan)
    - Ciptakan rasa takut kehilangan (FOMO)
    - Berikan deadline atau batas waktu yang jelas
    - Dorong untuk bertindak sekarang juga
    `,
    "question-answer": `
    Question-Answer Framework:
    - Mulai dengan pertanyaan yang relevan/menggugah
    - Buat audience berpikir dan relate dengan pertanyaan
    - Berikan jawaban yang komprehensif
    - Ajak untuk tindakan berdasarkan jawaban tersebut
    `,
  }

  return instructions[framework as keyof typeof instructions] || instructions.aida
}
