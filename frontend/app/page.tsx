import { BrutalButton } from '@/components/ui/BrutalButton'
import { BrutalCard } from '@/components/ui/BrutalCard'
import RssGenerator from '@/components/RssGenerator'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네오 브루탈리즘 헤더 */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-3xl md:text-4xl font-black text-black">
                🍵 TeaBoard RSS
              </h1>
            </Link>
            <div className="flex gap-3">
              <BrutalButton variant="secondary" size="sm">
                로그인
              </BrutalButton>
              <BrutalButton variant="primary" size="sm">
                회원가입
              </BrutalButton>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 영웅 섹션 */}
      <section className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight">
            RSS를 더 쉽게,
            <br />
            <span className="bg-yellow-300 px-4 py-2 rotate-slight inline-block mt-2">
              더 아름답게!
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            RSS를 지원하지 않는 웹사이트도 클릭 몇 번으로
            <br className="hidden md:block" />
            RSS 피드로 만들 수 있는 한국어 최적화 서비스
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BrutalButton variant="primary" size="lg">
              🚀 지금 바로 시작하기
            </BrutalButton>
            <BrutalButton variant="secondary" size="lg">
              📖 사용 방법 보기
            </BrutalButton>
          </div>
        </div>
      </section>

      {/* RSS 생성기 섹션 */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-black mb-4">
              ⚡ 4단계로 RSS 피드 만들기
            </h3>
            <p className="text-xl text-gray-700">
              복잡한 설정 없이 간단하게 RSS 피드를 생성하세요
            </p>
          </div>
          <RssGenerator />
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container-custom">
          <h3 className="text-4xl md:text-5xl font-black text-center mb-16">
            ✨ 주요 기능
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <BrutalCard variant="white" hover className="h-full">
              <h4 className="text-2xl font-black mb-4">📱 RSS 리더</h4>
              <p className="text-gray-800 leading-relaxed">
                직관적인 대시보드에서 실시간 RSS 피드 동기화, 스마트 검색 및
                카테고리별 정리 기능 제공
              </p>
            </BrutalCard>
            <BrutalCard variant="white" hover className="h-full">
              <h4 className="text-2xl font-black mb-4">🔄 동적 피드 생성</h4>
              <p className="text-gray-800 leading-relaxed">
                AI 기반 웹사이트 자동 분석, 시각적 CSS 선택자 생성, 실시간
                RSS 미리보기
              </p>
            </BrutalCard>
            <BrutalCard variant="white" hover className="h-full">
              <h4 className="text-2xl font-black mb-4">🎨 네오 브루탈리즘</h4>
              <p className="text-gray-800 leading-relaxed">
                대담한 블랙/화이트 대비, 두꺼운 테두리와 그림자 효과로 강렬한
                인상
              </p>
            </BrutalCard>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-100 border-t-4 border-black py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-black text-xl mb-2">🍵 TeaBoard RSS</p>
              <p className="text-gray-700 text-sm">
                © 2024 Moon-Jung Kim. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="https://www.youtube.com/@배움의달인-p5v"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrutalButton variant="secondary" size="md">
                  📺 유튜브 배움의달인
                </BrutalButton>
              </a>
              <a
                href="https://open.kakao.com/o/gubGYQ7g"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrutalButton variant="primary" size="md">
                  💬 개발자 연락하기
                </BrutalButton>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
