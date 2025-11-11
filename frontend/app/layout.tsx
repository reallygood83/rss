import type { Metadata } from 'next'
import { Pretendard } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'TeaBoard RSS - 한국어 최적화 RSS 서비스',
  description: 'RSS를 지원하지 않는 웹사이트도 RSS 피드로 만들 수 있는 한국어 사용자 친화적 RSS 서비스',
  keywords: ['RSS', '피드', '한국어', 'TeaBoard', 'RSSHub'],
  authors: [{ name: 'Moon-Jung Kim', url: 'https://www.youtube.com/@배움의달인-p5v' }],
  openGraph: {
    title: 'TeaBoard RSS - 한국어 최적화 RSS 서비스',
    description: 'RSS를 지원하지 않는 웹사이트도 클릭 몇 번으로 RSS 피드로 만들기',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className={Pretendard.className}>
        {children}
      </body>
    </html>
  )
}
