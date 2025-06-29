"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Lightbulb,
  BarChart3,
  Megaphone,
  Star,
  CheckCircle,
  Sparkles,
  FileText,
  Video,
  Camera,
  MessageCircle,
  Heart,
  Users,
  Zap,
  Copy,
  Download,
  Target,
  Clock,
  HelpCircle,
  Crown,
  Palette,
  Feather,
} from "lucide-react"

interface BusinessData {
  businessName: string
  industry: string
  targetAudience: string
  budget: string
  goals: string[]
  timeline: string
  currentChannels: string[]
  competitors: string
  uniqueValue: string
  businessDescription: string
}

interface MarketingStrategy {
  overview: string
  channels: {
    name: string
    icon: React.ReactNode
    description: string
    budget: string
    timeline: string
    tactics: string[]
  }[]
  timeline: {
    phase: string
    duration: string
    activities: string[]
  }[]
  kpis: string[]
  budget_breakdown: {
    channel: string
    percentage: number
    amount: string
  }[]
  recommendations: string[]
}

interface ContentData {
  brand: string
  industry: string
  targetAudience: string
  contentType: string
  platform: string
  tone: string
  framework: string
  topic: string
  callToAction: string
  hashtags: string
}

interface GeneratedContent {
  script: string
  caption: string
  hashtags: string[]
  tips: string[]
}

export default function DigitalMarketingTool() {
  const [activeTab, setActiveTab] = useState("strategy")
  const [step, setStep] = useState(1)
  const [businessData, setBusinessData] = useState<BusinessData>({
    businessName: "",
    industry: "",
    targetAudience: "",
    budget: "",
    goals: [],
    timeline: "",
    currentChannels: [],
    competitors: "",
    uniqueValue: "",
    businessDescription: "",
  })
  const [strategy, setStrategy] = useState<MarketingStrategy | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Content Generator States
  const [contentData, setContentData] = useState<ContentData>({
    brand: "",
    industry: "",
    targetAudience: "",
    contentType: "",
    platform: "",
    tone: "",
    framework: "",
    topic: "",
    callToAction: "",
    hashtags: "",
  })
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)

  const industries = [
    "E-commerce",
    "SaaS/Teknologi",
    "Kesehatan",
    "Pendidikan",
    "Keuangan",
    "Properti",
    "Makanan & Minuman",
    "Fashion",
    "Travel",
    "Fitness",
    "Konsultan",
    "Manufaktur",
    "Lainnya",
  ]

  const budgetRanges = [
    "< Rp 15.000.000/bulan",
    "Rp 15.000.000 - Rp 75.000.000/bulan",
    "Rp 75.000.000 - Rp 150.000.000/bulan",
    "Rp 150.000.000 - Rp 375.000.000/bulan",
    "Rp 375.000.000 - Rp 750.000.000/bulan",
    "> Rp 750.000.000/bulan",
  ]

  const marketingGoals = [
    "Meningkatkan Brand Awareness",
    "Menghasilkan Leads",
    "Meningkatkan Penjualan",
    "Meningkatkan Retensi Pelanggan",
    "Meluncurkan Produk Baru",
    "Memasuki Pasar Baru",
    "Meningkatkan Traffic Website",
    "Membangun Email List",
    "Meningkatkan Ranking SEO",
  ]

  const marketingChannels = [
    "Social Media Marketing",
    "Google Ads",
    "SEO",
    "Email Marketing",
    "Content Marketing",
    "Influencer Marketing",
    "Facebook Ads",
    "LinkedIn Ads",
    "YouTube Marketing",
    "Affiliate Marketing",
    "PR & Media",
    "Event & Webinar",
  ]

  // Content Generator Options
  const contentTypes = [
    { value: "educational", label: "Konten Edukasi", icon: <FileText className="h-4 w-4" /> },
    { value: "promotional", label: "Konten Promosi", icon: <Megaphone className="h-4 w-4" /> },
    { value: "entertainment", label: "Konten Hiburan", icon: <Heart className="h-4 w-4" /> },
    { value: "testimonial", label: "Testimoni", icon: <MessageCircle className="h-4 w-4" /> },
    { value: "behind-scenes", label: "Behind The Scenes", icon: <Camera className="h-4 w-4" /> },
    { value: "tutorial", label: "Tutorial/How-to", icon: <Video className="h-4 w-4" /> },
    { value: "trending", label: "Konten Trending", icon: <TrendingUp className="h-4 w-4" /> },
    { value: "user-generated", label: "User Generated Content", icon: <Users className="h-4 w-4" /> },
  ]

  const platforms = [
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "YouTube" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter/X" },
  ]

  const tones = [
    { value: "friendly", label: "Ramah & Santai" },
    { value: "professional", label: "Profesional" },
    { value: "energetic", label: "Energik & Antusias" },
    { value: "inspirational", label: "Inspiratif" },
    { value: "humorous", label: "Humoris" },
    { value: "authoritative", label: "Otoritatif" },
  ]

  const copywritingFrameworks = [
    {
      value: "aida",
      label: "AIDA",
      description: "Attention, Interest, Desire, Action",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      value: "pas",
      label: "PAS",
      description: "Problem, Agitate, Solution",
      icon: <Target className="h-4 w-4" />,
    },
    {
      value: "before-after-bridge",
      label: "Before-After-Bridge",
      description: "Situasi sekarang → Situasi ideal → Solusi",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      value: "storytelling",
      label: "Storytelling",
      description: "Cerita yang engaging dan relatable",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      value: "features-benefits",
      label: "Features-Benefits",
      description: "Fitur produk → Manfaat untuk customer",
      icon: <Star className="h-4 w-4" />,
    },
    {
      value: "social-proof",
      label: "Social Proof",
      description: "Testimoni, review, dan bukti sosial",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "scarcity-urgency",
      label: "Scarcity & Urgency",
      description: "Keterbatasan waktu/stok untuk mendorong aksi",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      value: "question-answer",
      label: "Question-Answer",
      description: "Mulai dengan pertanyaan, jawab dengan solusi",
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ]

  const generateStrategy = async () => {
    if (isGenerating) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      })

      if (!response.ok) {
        throw new Error("Gagal menghasilkan strategi")
      }

      const generatedStrategy = await response.json()
      setStrategy(generatedStrategy)
      setStep(3)
    } catch (error) {
      console.error("Error generating strategy:", error)
      // Fallback strategy implementation here...
    } finally {
      setIsGenerating(false)
    }
  }

  const generateContent = async () => {
    if (isGeneratingContent) return

    setIsGeneratingContent(true)

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      })

      if (!response.ok) {
        throw new Error("Gagal menghasilkan konten")
      }

      const content = await response.json()
      setGeneratedContent(content)
    } catch (error) {
      console.error("Error generating content:", error)
      // Fallback content
      const fallbackContent: GeneratedContent = {
        script: `Halo teman-teman! 👋

Hari ini kita akan membahas tentang ${contentData.topic} yang sangat penting untuk ${contentData.targetAudience}.

${
  contentData.contentType === "educational"
    ? "Mari kita pelajari bersama-sama langkah demi langkah..."
    : "Jangan sampai terlewat kesempatan emas ini!"
}

Swipe untuk melihat tips lengkapnya! ➡️

${contentData.callToAction || "Jangan lupa follow untuk tips menarik lainnya!"}`,

        caption: `${contentData.topic} - Tips penting untuk ${contentData.targetAudience}! 

${
  contentData.contentType === "promotional" ? "Promo spesial terbatas! " : "Informasi bermanfaat yang wajib kamu tahu! "
}

${contentData.callToAction || "Follow untuk konten menarik lainnya!"}`,

        hashtags: contentData.hashtags
          ? contentData.hashtags.split(",").map((tag) => tag.trim())
          : ["#tips", "#indonesia", "#viral", "#trending"],

        tips: [
          "Posting di waktu prime time (19:00-21:00 WIB)",
          "Gunakan visual yang menarik dan berkualitas tinggi",
          "Interaksi dengan audience melalui komentar",
          "Konsisten dengan brand voice dan tone",
          "Monitor performa dan analisis engagement",
        ],
      }
      setGeneratedContent(fallbackContent)
    } finally {
      setIsGeneratingContent(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleGoalToggle = (goal: string) => {
    setBusinessData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const handleChannelToggle = (channel: string) => {
    setBusinessData((prev) => ({
      ...prev,
      currentChannels: prev.currentChannels.includes(channel)
        ? prev.currentChannels.filter((c) => c !== channel)
        : [...prev.currentChannels, channel],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* Elegant Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-amber-200/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Crown className="h-10 w-10 text-amber-400" />
                <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-amber-300 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Digital Marketing <span className="text-amber-400">Atelier</span>
                </h1>
                <p className="text-slate-300 text-sm mt-1">Crafting Excellence in Digital Strategy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                <Feather className="h-3 w-3 mr-1" />
                Powered by Gemini AI
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex bg-white/80 backdrop-blur-sm shadow-lg border border-amber-200/50 rounded-2xl p-1 w-auto">
              <TabsTrigger
                value="strategy"
                className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap text-sm font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Strategi Marketing</span>
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 whitespace-nowrap text-sm font-medium"
              >
                <Palette className="h-4 w-4" />
                <span>Konten Kreatif</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Strategy Generator Tab */}
          <TabsContent value="strategy">
            {step === 1 && (
              <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-amber-500 rounded-xl">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    Informasi Bisnis Anda
                  </CardTitle>
                  <CardDescription className="text-slate-300 mt-2 text-lg">
                    Ceritakan tentang bisnis Anda untuk menciptakan strategi yang sempurna
                  </CardDescription>
                </div>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="businessName" className="text-slate-700 font-medium text-base">
                        Nama Bisnis
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="Masukkan nama bisnis Anda"
                        value={businessData.businessName}
                        onChange={(e) => setBusinessData((prev) => ({ ...prev, businessName: e.target.value }))}
                        className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="industry" className="text-slate-700 font-medium text-base">
                        Industri
                      </Label>
                      <Select
                        value={businessData.industry}
                        onValueChange={(value) => setBusinessData((prev) => ({ ...prev, industry: value }))}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base">
                          <SelectValue placeholder="Pilih industri Anda" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry} className="text-base">
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="businessDescription" className="text-slate-700 font-medium text-base">
                      Deskripsi Bisnis
                    </Label>
                    <Textarea
                      id="businessDescription"
                      placeholder="Jelaskan bisnis Anda, produk/layanan yang ditawarkan, dan apa yang membuatnya unik"
                      value={businessData.businessDescription}
                      onChange={(e) => setBusinessData((prev) => ({ ...prev, businessDescription: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl min-h-[120px] text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="targetAudience" className="text-slate-700 font-medium text-base">
                      Target Audience
                    </Label>
                    <Textarea
                      id="targetAudience"
                      placeholder="Deskripsikan customer ideal Anda (usia, minat, demografi, perilaku, dll.)"
                      value={businessData.targetAudience}
                      onChange={(e) => setBusinessData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl min-h-[100px] text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="budget" className="text-slate-700 font-medium text-base">
                        Budget Marketing Bulanan
                      </Label>
                      <Select
                        value={businessData.budget}
                        onValueChange={(value) => setBusinessData((prev) => ({ ...prev, budget: value }))}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base">
                          <SelectValue placeholder="Pilih range budget" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range} className="text-base">
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="timeline" className="text-slate-700 font-medium text-base">
                        Timeline Kampanye
                      </Label>
                      <Select
                        value={businessData.timeline}
                        onValueChange={(value) => setBusinessData((prev) => ({ ...prev, timeline: value }))}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base">
                          <SelectValue placeholder="Pilih timeline" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          <SelectItem value="3 bulan">3 bulan</SelectItem>
                          <SelectItem value="6 bulan">6 bulan</SelectItem>
                          <SelectItem value="12 bulan">12 bulan</SelectItem>
                          <SelectItem value="Berkelanjutan">Berkelanjutan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-slate-700 font-medium text-base">
                      Tujuan Marketing (Pilih semua yang sesuai)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {marketingGoals.map((goal) => (
                        <Badge
                          key={goal}
                          variant={businessData.goals.includes(goal) ? "default" : "outline"}
                          className={`cursor-pointer p-4 text-center justify-center text-sm font-medium rounded-xl transition-all duration-300 ${
                            businessData.goals.includes(goal)
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl"
                              : "border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                          onClick={() => handleGoalToggle(goal)}
                        >
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={
                      !businessData.businessName ||
                      !businessData.industry ||
                      !businessData.budget ||
                      !businessData.businessDescription ||
                      businessData.goals.length === 0
                    }
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Lanjut ke Pengaturan Lanjutan
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-amber-500 rounded-xl">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    Detail Tambahan
                  </CardTitle>
                  <CardDescription className="text-slate-300 mt-2 text-lg">
                    Informasi tambahan untuk menyempurnakan strategi Anda
                  </CardDescription>
                </div>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <Label className="text-slate-700 font-medium text-base">
                      Channel Marketing Saat Ini (Opsional)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {marketingChannels.map((channel) => (
                        <Badge
                          key={channel}
                          variant={businessData.currentChannels.includes(channel) ? "default" : "outline"}
                          className={`cursor-pointer p-4 text-center justify-center text-sm font-medium rounded-xl transition-all duration-300 ${
                            businessData.currentChannels.includes(channel)
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                              : "border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                          onClick={() => handleChannelToggle(channel)}
                        >
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="competitors" className="text-slate-700 font-medium text-base">
                      Kompetitor Utama (Opsional)
                    </Label>
                    <Textarea
                      id="competitors"
                      placeholder="Sebutkan kompetitor utama atau website kompetitor Anda"
                      value={businessData.competitors}
                      onChange={(e) => setBusinessData((prev) => ({ ...prev, competitors: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl min-h-[100px] text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="uniqueValue" className="text-slate-700 font-medium text-base">
                      Unique Value Proposition (Opsional)
                    </Label>
                    <Textarea
                      id="uniqueValue"
                      placeholder="Apa yang membuat bisnis Anda unik? Apa keunggulan kompetitif Anda?"
                      value={businessData.uniqueValue}
                      onChange={(e) => setBusinessData((prev) => ({ ...prev, uniqueValue: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl min-h-[100px] text-base"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-14 text-lg font-semibold border-2 border-slate-300 hover:border-amber-400 rounded-xl"
                      disabled={isGenerating}
                    >
                      Kembali
                    </Button>
                    <Button
                      onClick={generateStrategy}
                      className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sedang Generate...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Generate Strategi dengan AI
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {isGenerating && (
              <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
                <CardContent className="p-12 text-center">
                  <div className="mb-8">
                    <div className="relative">
                      <TrendingUp className="h-20 w-20 mx-auto text-amber-500 animate-pulse" />
                      <Sparkles className="h-8 w-8 absolute -top-2 -right-2 text-orange-400 animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">Gemini AI Sedang Menganalisis</h3>
                  <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                    AI kami sedang menganalisis data bisnis Anda dan menciptakan strategi marketing yang
                    dipersonalisasi...
                  </p>
                  <Progress value={66} className="mb-6 h-3 bg-slate-200" />
                  <p className="text-sm text-slate-500">Proses ini mungkin membutuhkan beberapa saat</p>
                </CardContent>
              </Card>
            )}

            {strategy && step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Crown className="h-8 w-8 text-amber-500" />
                    <h2 className="text-4xl font-bold text-slate-800">Strategi Digital Marketing Anda</h2>
                  </div>
                  <p className="text-slate-600 text-xl">
                    Strategi yang dipersonalisasi untuk {businessData.businessName}
                  </p>
                </div>

                <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8">
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <Star className="h-6 w-6" />
                      Ringkasan Strategi
                    </CardTitle>
                  </div>
                  <CardContent className="p-8">
                    <p className="text-slate-700 leading-relaxed text-lg">{strategy.overview}</p>
                  </CardContent>
                </Card>

                <div className="flex gap-6 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep(1)
                      setStrategy(null)
                    }}
                    className="px-8 py-4 text-lg font-semibold border-2 border-slate-300 hover:border-amber-400 rounded-xl"
                  >
                    Buat Strategi Baru
                  </Button>
                  <Button
                    onClick={() => window.print()}
                    className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Strategi
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Content Generator Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-amber-500 rounded-xl">
                      <Palette className="h-6 w-6" />
                    </div>
                    Generator Konten Kreatif
                  </CardTitle>
                  <CardDescription className="text-slate-300 mt-2 text-lg">
                    Ciptakan script dan caption yang memukau untuk berbagai platform
                  </CardDescription>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="brand" className="text-slate-700 font-medium text-base">
                        Nama Brand/Bisnis
                      </Label>
                      <Input
                        id="brand"
                        placeholder="Nama brand Anda"
                        value={contentData.brand}
                        onChange={(e) => setContentData((prev) => ({ ...prev, brand: e.target.value }))}
                        className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="contentIndustry" className="text-slate-700 font-medium text-base">
                        Industri
                      </Label>
                      <Select
                        value={contentData.industry}
                        onValueChange={(value) => setContentData((prev) => ({ ...prev, industry: value }))}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base">
                          <SelectValue placeholder="Pilih industri" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry} className="text-base">
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="contentTarget" className="text-slate-700 font-medium text-base">
                      Target Audience
                    </Label>
                    <Input
                      id="contentTarget"
                      placeholder="Misal: Wanita 25-35 tahun, pekerja kantoran"
                      value={contentData.targetAudience}
                      onChange={(e) => setContentData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-slate-700 font-medium text-base">Jenis Konten</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {contentTypes.map((type) => (
                        <Button
                          key={type.value}
                          variant={contentData.contentType === type.value ? "default" : "outline"}
                          className={`justify-start h-auto p-4 rounded-xl transition-all duration-300 ${
                            contentData.contentType === type.value
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                              : "border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                          onClick={() => setContentData((prev) => ({ ...prev, contentType: type.value }))}
                        >
                          <div className="flex items-center gap-3">
                            {type.icon}
                            <span className="text-sm font-medium">{type.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="platform" className="text-slate-700 font-medium text-base">
                        Platform
                      </Label>
                      <Select
                        value={contentData.platform}
                        onValueChange={(value) => setContentData((prev) => ({ ...prev, platform: value }))}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base">
                          <SelectValue placeholder="Pilih platform" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {platforms.map((platform) => (
                            <SelectItem key={platform.value} value={platform.value} className="text-base">
                              {platform.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="tone" className="text-slate-700 font-medium text-base">
                        Tone of Voice
                      </Label>
                      <Select
                        value={contentData.tone}
                        onValueChange={(value) => setContentData((prev) => ({ ...prev, tone: value }))}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base">
                          <SelectValue placeholder="Pilih tone" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-2">
                          {tones.map((tone) => (
                            <SelectItem key={tone.value} value={tone.value} className="text-base">
                              {tone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-slate-700 font-medium text-base">Framework Copywriting</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {copywritingFrameworks.map((framework) => (
                        <Button
                          key={framework.value}
                          variant={contentData.framework === framework.value ? "default" : "outline"}
                          className={`justify-start h-auto p-4 rounded-xl transition-all duration-300 ${
                            contentData.framework === framework.value
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                              : "border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                          onClick={() => setContentData((prev) => ({ ...prev, framework: framework.value }))}
                        >
                          <div className="flex items-start gap-4 text-left">
                            {framework.icon}
                            <div>
                              <div className="font-semibold text-base">{framework.label}</div>
                              <div className="text-sm opacity-80 mt-1">{framework.description}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="topic" className="text-slate-700 font-medium text-base">
                      Topik/Tema Konten
                    </Label>
                    <Input
                      id="topic"
                      placeholder="Misal: Tips hemat listrik, Promo akhir tahun"
                      value={contentData.topic}
                      onChange={(e) => setContentData((prev) => ({ ...prev, topic: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="cta" className="text-slate-700 font-medium text-base">
                      Call to Action
                    </Label>
                    <Input
                      id="cta"
                      placeholder="Misal: Kunjungi website kami, DM untuk info lebih lanjut"
                      value={contentData.callToAction}
                      onChange={(e) => setContentData((prev) => ({ ...prev, callToAction: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="hashtags" className="text-slate-700 font-medium text-base">
                      Hashtag (pisahkan dengan koma)
                    </Label>
                    <Input
                      id="hashtags"
                      placeholder="#tips, #hemat, #indonesia"
                      value={contentData.hashtags}
                      onChange={(e) => setContentData((prev) => ({ ...prev, hashtags: e.target.value }))}
                      className="border-2 border-slate-200 focus:border-amber-400 rounded-xl h-12 text-base"
                    />
                  </div>

                  <Button
                    onClick={generateContent}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={
                      isGeneratingContent ||
                      !contentData.brand ||
                      !contentData.contentType ||
                      !contentData.platform ||
                      !contentData.framework ||
                      !contentData.topic
                    }
                  >
                    {isGeneratingContent ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sedang Generate Konten...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Generate Konten dengan AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Content */}
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Sparkles className="h-6 w-6" />
                    Hasil Konten Kreatif
                  </CardTitle>
                </div>
                <CardContent className="p-8">
                  {isGeneratingContent ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-6"></div>
                      <p className="text-slate-600 text-lg">AI sedang menciptakan konten yang memukau untuk Anda...</p>
                    </div>
                  ) : generatedContent ? (
                    <div className="space-y-8">
                      {/* Script */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-700 font-bold text-lg">Script Konten</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generatedContent.script)}
                            className="border-2 border-amber-200 hover:border-amber-400 rounded-lg"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gradient-to-br from-slate-50 to-amber-50 p-6 rounded-2xl border-2 border-amber-100">
                          <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                            {generatedContent.script}
                          </pre>
                        </div>
                      </div>

                      {/* Caption */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-700 font-bold text-lg">Caption</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generatedContent.caption)}
                            className="border-2 border-amber-200 hover:border-amber-400 rounded-lg"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-gradient-to-br from-slate-50 to-amber-50 p-6 rounded-2xl border-2 border-amber-100">
                          <p className="text-slate-700 leading-relaxed">{generatedContent.caption}</p>
                        </div>
                      </div>

                      {/* Hashtags */}
                      <div className="space-y-4">
                        <Label className="text-slate-700 font-bold text-lg">Hashtag Rekomendasi</Label>
                        <div className="flex flex-wrap gap-3">
                          {generatedContent.hashtags.map((tag, index) => (
                            <Badge
                              key={index}
                              className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-2 border-amber-200 px-4 py-2 rounded-xl font-medium"
                            >
                              {tag.startsWith("#") ? tag : `#${tag}`}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="space-y-4">
                        <Label className="text-slate-700 font-bold text-lg">Tips Optimasi</Label>
                        <ul className="space-y-3">
                          {generatedContent.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />
                              <span className="text-slate-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full h-12 text-base font-semibold border-2 border-amber-300 hover:border-amber-400 hover:bg-amber-50 rounded-xl transition-all duration-300"
                        onClick={() => {
                          const fullContent = `SCRIPT:\n${generatedContent.script}\n\nCAPTION:\n${generatedContent.caption}\n\nHASHTAGS:\n${generatedContent.hashtags.join(" ")}`
                          copyToClipboard(fullContent)
                        }}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Copy Semua Konten
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-slate-500">
                      <Palette className="h-16 w-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">
                        Isi form di sebelah kiri dan klik "Generate Konten" untuk menciptakan script dan caption yang
                        memukau
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
