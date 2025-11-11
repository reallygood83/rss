import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>TeaBoard RSS - 한국어 최적화 RSS 서비스</title>
        <meta name="description" content="RSS를 지원하지 않는 웹사이트도 RSS 피드로 만들 수 있는 한국어 사용자 친화적 RSS 서비스" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 네오 브루탈리즘 헤더 */}
      <header className="border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black text-black">
              🍵 TeaBoard RSS
            </h1>
            <div className="flex gap-4">
              <button className="brutal-button">
                로그인
              </button>
              <button className="brutal-button">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 영웅 섹션 */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
            RSS를 더 쉽게,
            <br />
            <span className="bg-yellow-300 px-4 py-2 -rotate-2 inline-block">더 아름답게!</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            RSS를 지원하지 않는 웹사이트도 클릭 몇 번으로
            <br />
            RSS 피드로 만들 수 있는 한국어 최적화 서비스
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="brutal-button-primary">
              🚀 지금 바로 시작하기
            </button>
            <button className="brutal-button-secondary">
              📖 사용 방법 보기
            </button>
          </div>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-black text-center mb-12">
            ✨ 주요 기능
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="brutal-card-white">
              <h4 className="text-xl font-black mb-4">📱 RSS 리더</h4>
              <p className="text-gray-800">
                직관적인 대시보드에서 실시간 RSS 피드 동기화,
                스마트 검색 및 카테고리별 정리 기능 제공
              </p>
            </div>
            <div className="brutal-card-white">
              <h4 className="text-xl font-black mb-4">🔄 동적 피드 생성</h4>
              <p className="text-gray-800">
                AI 기반 웹사이트 자동 분석,
                시각적 CSS 선택자 생성, 실시간 RSS 미리보기
              </p>
            </div>
            <div className="brutal-card-white">
              <h4 className="text-xl font-black mb-4">🎨 네오 브루탈리즘</h4>
              <p className="text-gray-800">
                대담한 블랙/화이트 대비,
                두꺼운 테두리와 그림자 효과
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-100 border-t-4 border-black mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-black text-lg">
                © 2024 Moon-Jung Kim
              </p>
            </div>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="https://www.youtube.com/@배움의달인-p5v"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-button"
              >
                📺 유튜브 배움의달인
              </a>
              <a
                href="https://open.kakao.com/o/gubGYQ7g"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-button"
              >
                💬 개발자 연락하기
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 스타일 */}
      <style jsx>{`
        .brutal-button {
          background: white;
          border: 4px solid black;
          box-shadow: 4px 4px 0px black;
          padding: 12px 24px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.1s ease;
          text-decoration: none;
          display: inline-block;
        }

        .brutal-button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px black;
        }

        .brutal-button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px black;
        }

        .brutal-button-primary {
          background: #FFD100;
          border-color: #000;
        }

        .brutal-button-secondary {
          background: white;
          border-color: #000;
        }

        .brutal-card-white {
          background: white;
          border: 4px solid black;
          box-shadow: 8px 8px 0px black;
          padding: 24px;
          min-height: 150px;
        }

        .container {
          max-width: 1200px;
        }

        @media (max-width: 768px) {
          .brutal-button {
            font-size: 14px;
            padding: 10px 20px;
          }
        }
      `}</style>
    </div>
  );
}