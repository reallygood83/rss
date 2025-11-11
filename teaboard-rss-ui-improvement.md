# TeaBoard RSS - UI/UX 개선 구현 방안

## 🎨 디자인 시스템: 네오 브루탈리즘 + shadcn/ui 하이브리드

### 핵심 디자인 원칙
- **대비 극대화**: 블랙/화이트 기반 with 네온 컬러 액센트
- **국경선 강조**: 두꺼운 테두리 (4-8px)와 그림자 효과
- **깔끔한 컴포넌트**: shadcn/ui의 정제된 인터랙션 유지
- **타이포그래피**: Mono/Sans 폰트 혼합, 대비 강조

### 컬러 시스템
```css
/* 네오 브루탈리즘 컬러 팔레트 */
:root {
  /* 기본 shadcn/ui 색상 유지 */
  --background: 250 250 250;
  --foreground: 240 240 240;

  /* 네오 브루탈 컬러 */
  --neo-black: 0 0 0;
  --neo-white: 255 255 255;
  --neo-blue: 59 130 246;   /* 파란색 네온 */
  --neo-pink: 236 72 153;   /* 핑크 네온 */
  --neo-green: 34 197 94;   /* 그린 네온 */
  --neo-yellow: 250 204 21; /* 옐로우 네온 */

  /* 브루탈 테두리/그림자 */
  --border-thick: 4px;
  --shadow-brutal: 8px 8px 0px rgba(0, 0, 0, 0.8);
  --shadow-neon: 0 0 20px rgba(59, 130, 246, 0.5);
}
```

## 🏠 메인 레이아웃 구조

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-white font-mono">
        <div className="relative min-h-screen">
          {/* 배경 패턴 */}
          <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50 z-0" />

          {/* 메인 컨텐츠 */}
          <div className="relative z-10">
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>

          {/* 데코레이티브 요소들 */}
          <div className="fixed top-20 right-10 w-20 h-20 bg-neo-blue border-4 border-black shadow-brutal rotate-12 z-0" />
          <div className="fixed bottom-20 left-10 w-16 h-16 bg-neo-pink border-4 border-black shadow-brutal -rotate-6 z-0" />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
```

## 🧩 핵심 컴포넌트 구현

### 1. 브루탈 버튼 컴포넌트
```tsx
// components/ui/brutal-button.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const brutalButtonVariants = cva(
  // 기본 스타일
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-none border-4 font-bold text-base transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-black text-white border-black hover:bg-white hover:text-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1',
        secondary: 'bg-white text-black border-black hover:bg-black hover:text-white shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1',
        neon: 'bg-neo-blue text-white border-black hover:bg-neo-pink shadow-brutal shadow-neon hover:shadow-none',
        outline: 'bg-transparent text-black border-black hover:bg-black hover:text-white',
        ghost: 'bg-transparent text-black border-transparent hover:bg-black hover:text-white',
      },
      size: {
        default: 'h-14 px-8 text-lg',
        sm: 'h-10 px-6 text-sm',
        lg: 'h-16 px-12 text-xl',
        xl: 'h-20 px-16 text-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BrutalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brutalButtonVariants> {
  asChild?: boolean
}

const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(brutalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
BrutalButton.displayName = 'BrutalButton'

export { BrutalButton, brutalButtonVariants }
```

### 2. 브루탈 카드 컴포넌트
```tsx
// components/ui/brutal-card.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const BrutalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative bg-white border-4 border-black shadow-brutal transition-all duration-200 hover:shadow-none hover:translate-x-1 hover:translate-y-1',
      className
    )}
    {...props}
  />
))
BrutalCard.displayName = 'BrutalCard'

const BrutalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 border-b-4 border-black', className)} {...props} />
))
BrutalCardHeader.displayName = 'BrutalCardHeader'

const BrutalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-black font-mono', className)}
    {...props}
  />
))
BrutalCardTitle.displayName = 'BrutalCardTitle'

const BrutalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-base text-gray-700 font-sans', className)}
    {...props}
  />
))
BrutalCardDescription.displayName = 'BrutalCardDescription'

const BrutalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
))
BrutalCardContent.displayName = 'BrutalCardContent'

const BrutalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 border-t-4 border-black', className)} {...props} />
))
BrutalCardFooter.displayName = 'BrutalCardFooter'

export { BrutalCard, BrutalCardHeader, BrutalCardFooter, BrutalCardTitle, BrutalCardDescription, BrutalCardContent }
```

### 3. RSS 생성기 메인 인터페이스
```tsx
// components/RssGenerator.tsx
'use client'

import React, { useState } from 'react'
import { BrutalCard, BrutalCardHeader, BrutalCardTitle, BrutalCardContent } from '@/components/ui/brutal-card'
import { BrutalButton } from '@/components/ui/brutal-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Globe,
  Code,
  Eye,
  Wand2,
  CheckCircle,
  AlertCircle,
  Download,
  Copy,
  Share2
} from 'lucide-react'

interface RssConfig {
  url: string
  title: string
  description: string
  selector: string
  itemSelector: string
  titleSelector: string
  linkSelector: string
  dateSelector: string
}

export function RssGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<RssConfig>({
    url: '',
    title: '',
    description: '',
    selector: '',
    itemSelector: '',
    titleSelector: '',
    linkSelector: '',
    dateSelector: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRss, setGeneratedRss] = useState('')

  const steps = [
    { id: 1, title: '웹사이트 분석', icon: Globe, description: 'RSS 피드를 생성할 웹사이트를 분석합니다' },
    { id: 2, title: '선택자 설정', icon: Code, description: 'CSS 선택자를 자동으로 생성하고 편집합니다' },
    { id: 3, title: '미리보기', icon: Eye, description: '생성될 RSS 피드를 미리 확인합니다' },
    { id: 4, title: '완료', icon: CheckCircle, description: 'RSS 피드를 생성하고 배포합니다' }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* 헤더 섹션 */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black font-mono bg-gradient-to-r from-neo-blue via-neo-pink to-neo-green bg-clip-text text-transparent">
          TeaBoard RSS
        </h1>
        <p className="text-xl text-gray-700 font-sans">
          어떤 웹사이트든 RSS 피드로 변환하는 가장 쉬운 방법
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary" className="bg-neo-blue text-white border-2 border-black px-4 py-2">
            🚀 No-Code
          </Badge>
          <Badge variant="secondary" className="bg-neo-pink text-white border-2 border-black px-4 py-2">
            🎨 Beautiful UI
          </Badge>
          <Badge variant="secondary" className="bg-neo-green text-white border-2 border-black px-4 py-2">
            ⚡ Real-time
          </Badge>
        </div>
      </div>

      {/* 스텝 인디케이터 */}
      <div className="relative">
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                currentStep >= step.id ? 'opacity-100' : 'opacity-40'
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              <div className={`w-16 h-16 rounded-none border-4 flex items-center justify-center transition-all duration-300 ${
                currentStep === step.id
                  ? 'bg-neo-blue text-black border-black shadow-brutal shadow-neon'
                  : currentStep > step.id
                  ? 'bg-neo-green text-white border-black'
                  : 'bg-gray-200 text-gray-500 border-black'
              }`}>
                <step.icon className="w-8 h-8" />
              </div>
              <span className="mt-2 text-sm font-bold text-center font-mono">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* 진행 바 */}
        <Progress
          value={(currentStep / steps.length) * 100}
          className="h-2 border-4 border-black"
        />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* 왼쪽: 입력 폼 */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={`step-${currentStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-16 border-4 border-black">
              {steps.map((step) => (
                <TabsTrigger
                  key={step.id}
                  value={`step-${step.id}`}
                  className="text-base font-bold data-[state=active]:bg-neo-blue data-[state=active]:text-white"
                >
                  <step.icon className="w-5 h-5 mr-2" />
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Step 1: 웹사이트 분석 */}
            <TabsContent value="step-1" className="space-y-6">
              <BrutalCard>
                <BrutalCardHeader>
                  <BrutalCardTitle>🌐 웹사이트 분석</BrutalCardTitle>
                </BrutalCardHeader>
                <BrutalCardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-lg font-bold font-mono">웹사이트 URL</label>
                    <Input
                      placeholder="https://example.com"
                      value={config.url}
                      onChange={(e) => setConfig({ ...config, url: e.target.value })}
                      className="h-14 text-base border-2 border-black focus:border-neo-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-lg font-bold font-mono">RSS 피드 제목</label>
                    <Input
                      placeholder="예: 블로그 RSS 피드"
                      value={config.title}
                      onChange={(e) => setConfig({ ...config, title: e.target.value })}
                      className="h-14 text-base border-2 border-black focus:border-neo-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-lg font-bold font-mono">설명</label>
                    <Textarea
                      placeholder="RSS 피드에 대한 설명을 입력하세요"
                      value={config.description}
                      onChange={(e) => setConfig({ ...config, description: e.target.value })}
                      className="min-h-[120px] text-base border-2 border-black focus:border-neo-blue"
                    />
                  </div>

                  <BrutalButton
                    className="w-full"
                    onClick={() => {
                      if (config.url) {
                        setCurrentStep(2)
                      }
                    }}
                  >
                    <Wand2 className="w-5 h-5 mr-2" />
                    웹사이트 분석 시작
                  </BrutalButton>
                </BrutalCardContent>
              </BrutalCard>
            </TabsContent>

            {/* Step 2: CSS 선택자 설정 */}
            <TabsContent value="step-2" className="space-y-6">
              <BrutalCard>
                <BrutalCardHeader>
                  <BrutalCardTitle>🎯 CSS 선택자 설정</BrutalCardTitle>
                </BrutalCardHeader>
                <BrutalCardContent className="space-y-6">
                  <Alert className="border-4 border-black bg-neo-yellow">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      자동으로 분석된 CSS 선택자입니다. 필요에 따라 수정할 수 있습니다.
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-lg font-bold font-mono">아이템 선택자</label>
                      <Input
                        placeholder=".article, .post"
                        value={config.itemSelector}
                        onChange={(e) => setConfig({ ...config, itemSelector: e.target.value })}
                        className="h-14 text-base border-2 border-black font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-lg font-bold font-mono">제목 선택자</label>
                      <Input
                        placeholder="h1, .title"
                        value={config.titleSelector}
                        onChange={(e) => setConfig({ ...config, titleSelector: e.target.value })}
                        className="h-14 text-base border-2 border-black font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-lg font-bold font-mono">링크 선택자</label>
                      <Input
                        placeholder="a, .link"
                        value={config.linkSelector}
                        onChange={(e) => setConfig({ ...config, linkSelector: e.target.value })}
                        className="h-14 text-base border-2 border-black font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-lg font-bold font-mono">날짜 선택자</label>
                      <Input
                        placeholder=".date, .timestamp"
                        value={config.dateSelector}
                        onChange={(e) => setConfig({ ...config, dateSelector: e.target.value })}
                        className="h-14 text-base border-2 border-black font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <BrutalButton
                      className="flex-1"
                      variant="secondary"
                      onClick={() => setCurrentStep(1)}
                    >
                      이전 단계
                    </BrutalButton>
                    <BrutalButton
                      className="flex-1"
                      onClick={() => setCurrentStep(3)}
                    >
                      미리보기
                    </BrutalButton>
                  </div>
                </BrutalCardContent>
              </BrutalCard>
            </TabsContent>

            {/* Step 3: 미리보기 */}
            <TabsContent value="step-3" className="space-y-6">
              <BrutalCard>
                <BrutalCardHeader>
                  <BrutalCardTitle>👁️ RSS 피드 미리보기</BrutalCardTitle>
                </BrutalCardHeader>
                <BrutalCardContent className="space-y-6">
                  <div className="bg-gray-50 border-4 border-black p-6 font-mono text-sm">
                    <div className="space-y-2">
                      <div className="text-green-600">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</div>
                      <div className="text-green-600">&lt;rss version="2.0"&gt;</div>
                      <div className="ml-4 text-green-600">&lt;channel&gt;</div>
                      <div className="ml-8">
                        <div className="text-blue-600">&lt;title&gt;{config.title || 'RSS Feed Title'}&lt;/title&gt;</div>
                        <div className="text-blue-600">&lt;description&gt;{config.description || 'RSS Feed Description'}&lt;/description&gt;</div>
                        <div className="text-blue-600">&lt;link&gt;{config.url || 'https://example.com'}&lt;/link&gt;</div>
                      </div>
                      <div className="ml-8 text-gray-500">
                        {/* 예시 아이템 */}
                        <div className="text-green-600">&lt;item&gt;</div>
                        <div className="ml-4 text-blue-600">&lt;title&gt;예시 게시물 제목&lt;/title&gt;</div>
                        <div className="ml-4 text-blue-600">&lt;link&gt;https://example.com/post/1&lt;/link&gt;</div>
                        <div className="ml-4 text-blue-600">&lt;pubDate&gt;Mon, 01 Jan 2024 00:00:00 GMT&lt;/pubDate&gt;</div>
                        <div className="ml-4 text-blue-600">&lt;description&gt;게시물 요약 내용...&lt;/description&gt;</div>
                        <div className="text-green-600">&lt;/item&gt;</div>
                      </div>
                      <div className="ml-4 text-green-600">&lt;/channel&gt;</div>
                      <div className="text-green-600">&lt;/rss&gt;</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <BrutalButton
                      className="flex-1"
                      variant="secondary"
                      onClick={() => setCurrentStep(2)}
                    >
                      선택자 수정
                    </BrutalButton>
                    <BrutalButton
                      className="flex-1"
                      onClick={() => {
                        setIsGenerating(true)
                        setTimeout(() => {
                          setCurrentStep(4)
                          setIsGenerating(false)
                          setGeneratedRss('generated-rss-content')
                        }, 2000)
                      }}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-5 h-5 mr-2">⚙️</div>
                          생성 중...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          RSS 피드 생성
                        </>
                      )}
                    </BrutalButton>
                  </div>
                </BrutalCardContent>
              </BrutalCard>
            </TabsContent>

            {/* Step 4: 완료 */}
            <TabsContent value="step-4" className="space-y-6">
              <BrutalCard>
                <BrutalCardHeader>
                  <BrutalCardTitle>🎉 RSS 피드 생성 완료!</BrutalCardTitle>
                </BrutalCardHeader>
                <BrutalCardContent className="space-y-6">
                  <Alert className="border-4 border-black bg-neo-green">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      성공적으로 RSS 피드가 생성되었습니다! 아래 링크를 사용하세요.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="bg-gray-50 border-4 border-black p-4">
                      <label className="text-lg font-bold font-mono block mb-2">RSS 피드 URL</label>
                      <div className="flex gap-2">
                        <Input
                          value={`https://teaboard-rss.com/feed/${generatedRss}`}
                          readOnly
                          className="flex-1 h-12 font-mono text-sm border-2 border-black"
                        />
                        <BrutalButton variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </BrutalButton>
                      </div>
                    </div>

                    <div className="bg-gray-50 border-4 border-black p-4">
                      <label className="text-lg font-bold font-mono block mb-2">다운로드 링크</label>
                      <div className="flex gap-2">
                        <Input
                          value={`https://teaboard-rss.com/download/${generatedRss}`}
                          readOnly
                          className="flex-1 h-12 font-mono text-sm border-2 border-black"
                        />
                        <BrutalButton variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </BrutalButton>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <BrutalButton className="w-full">
                      <Share2 className="w-5 h-5 mr-2" />
                      공유하기
                    </BrutalButton>
                    <BrutalButton
                      className="w-full"
                      variant="secondary"
                      onClick={() => {
                        setCurrentStep(1)
                        setConfig({
                          url: '',
                          title: '',
                          description: '',
                          selector: '',
                          itemSelector: '',
                          titleSelector: '',
                          linkSelector: '',
                          dateSelector: ''
                        })
                        setGeneratedRss('')
                      }}
                    >
                      새 RSS 피드 생성
                    </BrutalButton>
                  </div>
                </BrutalCardContent>
              </BrutalCard>
            </TabsContent>
          </Tabs>
        </div>

        {/* 오른쪽: 템플릿 라이브러리 */}
        <div className="space-y-6">
          <BrutalCard>
            <BrutalCardHeader>
              <BrutalCardTitle>📚 템플릿 라이브러리</BrutalCardTitle>
            </BrutalCardHeader>
            <BrutalCardContent className="space-y-4">
              {[
                { name: '네이버 블로그', category: '블로그', popular: true },
                { name: '다음 카페', category: '커뮤니티', popular: false },
                { name: 'YouTube 채널', category: '동영상', popular: true },
                { name: '뉴스 사이트', category: '뉴스', popular: false },
                { name: '쇼핑몰', category: '쇼핑', popular: true },
                { name: '포털 사이트', category: '포털', popular: false }
              ].map((template, index) => (
                <div
                  key={index}
                  className="border-4 border-black p-4 cursor-pointer transition-all duration-200 hover:bg-neo-yellow hover:translate-x-1 hover:translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold font-mono text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.category}</p>
                    </div>
                    {template.popular && (
                      <Badge className="bg-neo-pink text-white border-2 border-black">
                        인기
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </BrutalCardContent>
          </BrutalCard>

          <BrutalCard>
            <BrutalCardHeader>
              <BrutalCardTitle>💡 팁</BrutalCardTitle>
            </BrutalCardHeader>
            <BrutalCardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-bold font-mono">CSS 선택자 찾는 법</h4>
                <p className="text-sm text-gray-600">
                  브라우저 개발자 도구(F12)를 열고 원하는 요소를 우클릭한 후
                  '검사'를 선택하면 CSS 선택자를 쉽게 찾을 수 있습니다.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold font-mono">자주 사용하는 선택자</h4>
                <div className="text-sm text-gray-600 space-y-1 font-mono">
                  <div>• .article, .post - 게시물</div>
                  <div>• h1, h2, h3 - 제목</div>
                  <div>• .title, .heading - 제목</div>
                  <div>• .date, .time - 날짜</div>
                  <div>• a, .link - 링크</div>
                </div>
              </div>
            </BrutalCardContent>
          </BrutalCard>
        </div>
      </div>
    </div>
  )
}
```

### 4. 푸터 컴포넌트
```tsx
// components/layout/Footer.tsx
'use client'

import React from 'react'
import { BrutalCard } from '@/components/ui/brutal-card'
import { BrutalButton } from '@/components/ui/brutal-button'
import { Github, Youtube, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div className="space-y-4">
            <h3 className="text-3xl font-black font-mono bg-gradient-to-r from-neo-blue via-neo-pink to-neo-green bg-clip-text text-transparent">
              TeaBoard RSS
            </h3>
            <p className="text-gray-300 font-sans">
              어떤 웹사이트든 RSS 피드로 변환하는 가장 쉬운 방법
            </p>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-neo-blue border-2 border-white" />
              <div className="w-8 h-8 bg-neo-pink border-2 border-white" />
              <div className="w-8 h-8 bg-neo-green border-2 border-white" />
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="space-y-4">
            <h4 className="text-xl font-black font-mono">빠른 링크</h4>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  RSS 생성기
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  템플릿 라이브러리
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  사용 가이드
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  API 문서
                </a>
              </li>
            </ul>
          </div>

          {/* 리소스 */}
          <div className="space-y-4">
            <h4 className="text-xl font-black font-mono">리소스</h4>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  RSS 튜토리얼
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  CSS 선택자 가이드
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  지원 센터
                </a>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="space-y-4">
            <h4 className="text-xl font-black font-mono">연결하기</h4>
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/@배움의달인-p5v"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrutalButton
                  variant="secondary"
                  className="w-full justify-start gap-2 border-white text-white hover:bg-white hover:text-black"
                >
                  <Youtube className="w-5 h-5" />
                  유튜브 채널
                </BrutalButton>
              </a>

              <a
                href="https://open.kakao.com/o/gubGYQ7g"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrutalButton
                  variant="secondary"
                  className="w-full justify-start gap-2 border-white text-white hover:bg-white hover:text-black"
                >
                  <MessageCircle className="w-5 h-5" />
                  개발자 연락하기
                </BrutalButton>
              </a>

              <a
                href="https://github.com/teaboard-rss"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrutalButton
                  variant="secondary"
                  className="w-full justify-start gap-2 border-white text-white hover:bg-white hover:text-black"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </BrutalButton>
              </a>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t-4 border-white mt-12 pt-8 text-center">
          <p className="text-gray-300 font-sans">
            © 2024 Moon-Jung Kim. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 font-sans mt-2">
            TeaBoard RSS - Making Everything RSSible
          </p>
        </div>
      </div>
    </footer>
  )
}
```

## 🎯 사용자 플로우 최적화

### 1. 온보딩 튜토리얼
```tsx
// components/OnboardingTutorial.tsx
'use client'

import React, { useState } from 'react'
import { BrutalCard } from '@/components/ui/brutal-card'
import { BrutalButton } from '@/components/ui/brutal-button'
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'

export function OnboardingTutorial() {
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialSteps = [
    {
      title: 'TeaBoard RSS에 오신 것을 환영합니다!',
      description: '3단계 만에 어떤 웹사이트든 RSS 피드로 변환해보세요.',
      content: '🚀',
    },
    {
      title: '웹사이트 URL을 입력하세요',
      description: 'RSS 피드를 만들 웹사이트 주소를 복사해서 붙여넣기만 하면 됩니다.',
      content: '🌐',
    },
    {
      title: 'CSS 선택자를 설정하세요',
      description: '자동으로 분석된 선택자를 확인하거나 직접 수정할 수 있습니다.',
      content: '🎯',
    },
    {
      title: 'RSS 피드를 생성하세요!',
      description: '미리보기로 확인한 후 원클릭으로 RSS 피드를 완성하세요.',
      content: '✨',
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-8 border-black max-w-md w-full">
        <div className="p-8 space-y-6">
          {/* 스텝 인디케이터 */}
          <div className="flex justify-center gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 border-2 border-black ${
                  index === currentStep ? 'bg-neo-blue' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* 콘텐츠 */}
          <div className="text-center space-y-4">
            <div className="text-6xl">{tutorialSteps[currentStep].content}</div>
            <h2 className="text-2xl font-black font-mono">
              {tutorialSteps[currentStep].title}
            </h2>
            <p className="text-gray-700 font-sans">
              {tutorialSteps[currentStep].description}
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <BrutalButton
                variant="secondary"
                className="flex-1"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                이전
              </BrutalButton>
            )}

            {currentStep < tutorialSteps.length - 1 ? (
              <BrutalButton
                className="flex-1"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                다음
                <ChevronRight className="w-4 h-4 ml-2" />
              </BrutalButton>
            ) : (
              <BrutalButton
                className="flex-1"
                onClick={() => {
                  // 튜토리얼 종료 처리
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                시작하기
              </BrutalButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 2. 드래그 앤 드롭 URL 입력
```tsx
// components/DragDropUrl.tsx
'use client'

import React, { useState, useCallback } from 'react'
import { BrutalCard } from '@/components/ui/brutal-card'
import { Upload, Link, CheckCircle } from 'lucide-react'

interface DragDropUrlProps {
  onUrlSubmit: (url: string) => void
}

export function DragDropUrl({ onUrlSubmit }: DragDropUrlProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [url, setUrl] = useState('')
  const [isValid, setIsValid] = useState(false)

  const validateUrl = (inputUrl: string) => {
    try {
      const urlObj = new URL(inputUrl)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const text = e.dataTransfer.getData('text')
    if (validateUrl(text)) {
      setUrl(text)
      setIsValid(true)
      onUrlSubmit(text)
    }
  }, [onUrlSubmit])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value
    setUrl(inputUrl)
    setIsValid(validateUrl(inputUrl))
  }

  return (
    <BrutalCard className={`${isDragging ? 'bg-neo-yellow scale-105' : ''} transition-all duration-200`}>
      <div className="p-8">
        <div
          className={`border-4 border-dashed ${
            isDragging ? 'border-black bg-neo-yellow' : 'border-gray-400'
          } rounded-none p-8 text-center transition-all duration-200`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isDragging ? (
            <div className="space-y-4">
              <Upload className="w-16 h-16 mx-auto text-neo-blue" />
              <p className="text-lg font-bold font-mono">여기에 드롭하세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Link className="w-16 h-16 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-bold font-mono mb-2">
                  웹사이트 URL을 드래그하거나 붙여넣으세요
                </p>
                <input
                  type="url"
                  value={url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border-2 border-black text-base font-mono focus:border-neo-blue focus:outline-none"
                />
              </div>

              {url && (
                <div className="flex items-center justify-center gap-2">
                  {isValid ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-neo-green" />
                      <span className="text-neo-green font-bold">유효한 URL입니다</span>
                    </>
                  ) : (
                    <span className="text-red-500 font-bold">유효하지 않은 URL입니다</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </BrutalCard>
  )
}
```

## 🎨 CSS 스타일 정의

### globals.css
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* shadcn/ui 기본 색상 */
    --background: 0 0% 100%;
    --foreground: 240 240 240;
    --card: 0 0% 100%;
    --card-foreground: 240 240 240;
    --popover: 0 0% 100%;
    --popover-foreground: 240 240 240;
    --primary: 0 0% 0%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 0%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 0%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 0 0% 0%;
    --radius: 0;

    /* 네오 브루탈 컬러 */
    --neo-black: 0 0 0;
    --neo-white: 255 255 255;
    --neo-blue: 59 130 246;
    --neo-pink: 236 72 153;
    --neo-green: 34 197 94;
    --neo-yellow: 250 204 21;
    --neo-purple: 147 51 234;
  }

  .dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --popover: 0 0% 0%;
    --popover-foreground: 0 0% 100%;
    --primary: 0 0% 100%;
    --primary-foreground: 0 0% 0%;
    --secondary: 0 0% 10%;
    --secondary-foreground: 0 0% 100%;
    --muted: 0 0% 10%;
    --muted-foreground: 0 0% 64%;
    --accent: 0 0% 10%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 62% 30%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 0 0% 100%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  /* 네오 브루탈 유틸리티 클래스 */
  .shadow-brutal {
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.8);
  }

  .shadow-brutal-sm {
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.6);
  }

  .shadow-brutal-lg {
    box-shadow: 12px 12px 0px rgba(0, 0, 0, 1);
  }

  .shadow-neon {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }

  .shadow-neon-pink {
    box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
  }

  .shadow-neon-green {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
  }

  .border-thick {
    border-width: 4px;
  }

  .border-thick-2 {
    border-width: 8px;
  }

  /* 네오 브루탈 배경 */
  .bg-neo-blue {
    background-color: rgb(59 130 246);
  }

  .bg-neo-pink {
    background-color: rgb(236 72 153);
  }

  .bg-neo-green {
    background-color: rgb(34 197 94);
  }

  .bg-neo-yellow {
    background-color: rgb(250 204 21);
  }

  .bg-neo-purple {
    background-color: rgb(147 51 234);
  }

  /* 애니메이션 */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse-brutal {
    0%, 100% {
      transform: scale(1);
      box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.8);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.9);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pulse-brutal {
    animation: pulse-brutal 2s ease-in-out infinite;
  }

  /* 커스텀 스크롤바 */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border: 2px solid black;
  }

  ::-webkit-scrollbar-thumb {
    background: #000;
    border: 2px solid white;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #374151;
  }
}
```

## 📱 반응형 디자인

### 미디어 쿼리 최적화
```css
/* 모바일 최적화 */
@media (max-width: 768px) {
  .brutal-button {
    @apply h-12 px-6 text-sm;
  }

  .brutal-card {
    @apply shadow-brutal-sm;
  }

  .text-6xl {
    @apply text-4xl;
  }

  .grid-cols-4 {
    @apply grid-cols-2;
  }
}

/* 태블릿 최적화 */
@media (min-width: 769px) and (max-width: 1024px) {
  .brutal-button {
    @apply h-14 px-8 text-base;
  }

  .grid-cols-4 {
    @apply grid-cols-3;
  }
}
```

## 🚀 성능 최적화

### 1. 코드 스플리팅
```tsx
// 동적 임포트로 성능 최적화
const RssGenerator = dynamic(() => import('@/components/RssGenerator'), {
  loading: () => <div>Loading...</div>,
})

const TemplateLibrary = dynamic(() => import('@/components/TemplateLibrary'), {
  loading: () => <div>Loading templates...</div>,
})
```

### 2. 이미지 최적화
```tsx
// Next.js Image 컴포넌트 활용
import Image from 'next/image'

export function OptimizedImage({ src, alt, ...props }) {
  return (
    <div className="relative overflow-hidden border-4 border-black">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  )
}
```

## 🎯 최종 메인 페이지
```tsx
// app/page.tsx
import { RssGenerator } from '@/components/RssGenerator'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <RssGenerator />
    </div>
  )
}
```

이 디자인 시스템은 네오 브루탈리즘의 강렬한 시각적 특성과 shadcn/ui의 정제된 상호작용을 완벽하게 결합하여, TeaBoard RSS 프로젝트에 독특하고 기억에 남는 사용자 경험을 제공할 것입니다.