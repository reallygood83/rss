'use client'

import React, { useState } from 'react'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { BrutalCard } from '@/components/ui/BrutalCard'
import { cn } from '@/lib/utils'

type Step = 1 | 2 | 3 | 4

interface RssGeneratorProps {
  className?: string
}

export default function RssGenerator({ className }: RssGeneratorProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    url: '',
    feedName: '',
    selector: '',
    feedUrl: '',
  })

  const steps = [
    { number: 1, title: '웹사이트 URL 입력', emoji: '🌐' },
    { number: 2, title: '피드 정보 설정', emoji: '⚙️' },
    { number: 3, title: 'CSS 선택자 설정', emoji: '🎯' },
    { number: 4, title: 'RSS 피드 생성', emoji: '🎉' },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = () => {
    // RSS 피드 생성 로직
    console.log('RSS Feed Generated:', formData)
    alert('RSS 피드가 생성되었습니다!')
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* 진행 단계 표시 */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-16 h-16 rounded-full brutal-border flex items-center justify-center text-2xl font-black transition-all',
                    currentStep === step.number
                      ? 'bg-yellow-300 scale-110'
                      : currentStep > step.number
                      ? 'bg-green-400'
                      : 'bg-white'
                  )}
                >
                  {step.emoji}
                </div>
                <p className="mt-2 text-sm font-bold text-center">
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-2 mx-4 brutal-border',
                    currentStep > step.number ? 'bg-green-400' : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 단계별 컨텐츠 */}
      <BrutalCard className="min-h-[400px]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black">🌐 웹사이트 URL 입력</h2>
            <p className="text-gray-700">
              RSS 피드로 만들고 싶은 웹사이트의 URL을 입력해주세요.
            </p>
            <div>
              <label className="block mb-2 font-bold">웹사이트 URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://example.com"
                className="w-full px-4 py-3 brutal-border bg-white focus:outline-none focus:ring-4 focus:ring-yellow-300"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <BrutalButton
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={!formData.url}
                className="flex-1"
              >
                다음 단계 →
              </BrutalButton>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black">⚙️ 피드 정보 설정</h2>
            <p className="text-gray-700">
              RSS 피드의 이름과 설명을 입력해주세요.
            </p>
            <div>
              <label className="block mb-2 font-bold">피드 이름</label>
              <input
                type="text"
                value={formData.feedName}
                onChange={(e) =>
                  setFormData({ ...formData, feedName: e.target.value })
                }
                placeholder="내 블로그 RSS"
                className="w-full px-4 py-3 brutal-border bg-white focus:outline-none focus:ring-4 focus:ring-yellow-300"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <BrutalButton
                variant="secondary"
                size="lg"
                onClick={handlePrev}
                className="flex-1"
              >
                ← 이전
              </BrutalButton>
              <BrutalButton
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={!formData.feedName}
                className="flex-1"
              >
                다음 단계 →
              </BrutalButton>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black">🎯 CSS 선택자 설정</h2>
            <p className="text-gray-700">
              콘텐츠를 추출할 CSS 선택자를 입력해주세요.
            </p>
            <div>
              <label className="block mb-2 font-bold">CSS 선택자</label>
              <input
                type="text"
                value={formData.selector}
                onChange={(e) =>
                  setFormData({ ...formData, selector: e.target.value })
                }
                placeholder=".article-list > article"
                className="w-full px-4 py-3 brutal-border bg-white font-mono focus:outline-none focus:ring-4 focus:ring-yellow-300"
              />
              <p className="mt-2 text-sm text-gray-600">
                💡 예시: .post-list article, #content .item
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <BrutalButton
                variant="secondary"
                size="lg"
                onClick={handlePrev}
                className="flex-1"
              >
                ← 이전
              </BrutalButton>
              <BrutalButton
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={!formData.selector}
                className="flex-1"
              >
                다음 단계 →
              </BrutalButton>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black">🎉 RSS 피드 생성</h2>
            <p className="text-gray-700">
              모든 설정이 완료되었습니다. RSS 피드를 생성하세요!
            </p>
            <BrutalCard variant="yellow" className="space-y-2">
              <p className="font-bold">📊 설정 요약</p>
              <div className="space-y-1 text-sm">
                <p>• URL: {formData.url}</p>
                <p>• 피드 이름: {formData.feedName}</p>
                <p>• CSS 선택자: {formData.selector}</p>
              </div>
            </BrutalCard>
            <div className="flex gap-4 pt-4">
              <BrutalButton
                variant="secondary"
                size="lg"
                onClick={handlePrev}
                className="flex-1"
              >
                ← 이전
              </BrutalButton>
              <BrutalButton
                variant="success"
                size="lg"
                onClick={handleSubmit}
                className="flex-1"
              >
                ✨ RSS 피드 생성하기
              </BrutalButton>
            </div>
          </div>
        )}
      </BrutalCard>
    </div>
  )
}
