'use client';

import Link from 'next/link';
import { 
  Sparkles, 
  FileText, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  Check,
  ArrowRight,
  MessageSquare,
  PenTool,
  Video,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Contentsfy</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">기능</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">요금제</Link>
              <Link href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">로그인</Link>
              <Link href="/signup" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors">무료로 시작하기</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI 기반 콘텐츠 자동 생성
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              콘텐츠 제작,<br />
              <span className="text-primary-600">AI가 대신합니다</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              블로그, SNS, 마케팅 콘텐츠까지.<br />
              원하는 스타일과 톤으로 고품질 콘텐츠를 자동 생성하세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/app/create" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold text-lg transition-all shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 flex items-center justify-center gap-2">
                지금 바로 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#features" className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                기능 알아보기
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div><div className="text-3xl md:text-4xl font-bold text-gray-900">10K+</div><div className="text-gray-500 text-sm mt-1">생성된 콘텐츠</div></div>
              <div><div className="text-3xl md:text-4xl font-bold text-gray-900">500+</div><div className="text-gray-500 text-sm mt-1">활성 사용자</div></div>
              <div><div className="text-3xl md:text-4xl font-bold text-gray-900">98%</div><div className="text-gray-500 text-sm mt-1">만족도</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">다양한 콘텐츠 형식 지원</h2>
            <p className="text-gray-600">원하는 형태로 콘텐츠를 생성하세요</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <ContentTypeCard icon={<MessageSquare className="w-8 h-8" />} title="숏폼" description="릴스, 틱톡, 숏츠 스크립트" color="bg-blue-500" />
            <ContentTypeCard icon={<PenTool className="w-8 h-8" />} title="숏글" description="SNS 피드, 스레드" color="bg-green-500" />
            <ContentTypeCard icon={<FileText className="w-8 h-8" />} title="롱글" description="블로그, 네이버 포스트" color="bg-purple-500" />
            <ContentTypeCard icon={<Video className="w-8 h-8" />} title="롱폼" description="유튜브 스크립트" color="bg-orange-500" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">왜 Contentsfy인가요?</h2>
            <p className="text-gray-600 text-lg">콘텐츠 제작의 모든 과정을 혁신합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<Zap className="w-6 h-6" />} title="빠른 생성 속도" description="몇 분 안에 고품질 콘텐츠를 생성합니다. 키워드와 스타일만 입력하면 끝." />
            <FeatureCard icon={<Users className="w-6 h-6" />} title="페르소나 맞춤" description="브랜드 톤앤매너에 맞는 페르소나를 설정하고 일관된 콘텐츠를 유지하세요." />
            <FeatureCard icon={<Shield className="w-6 h-6" />} title="컴플라이언스 체크" description="금칙어, 법적 표현 등을 자동으로 검사하여 안전한 콘텐츠를 보장합니다." />
            <FeatureCard icon={<FileText className="w-6 h-6" />} title="다양한 포맷" description="블로그, SNS, 뉴스레터, 영상 스크립트 등 다양한 형식으로 출력합니다." />
            <FeatureCard icon={<TrendingUp className="w-6 h-6" />} title="SEO 최적화" description="검색엔진 최적화된 콘텐츠로 더 많은 노출을 확보하세요." />
            <FeatureCard icon={<Sparkles className="w-6 h-6" />} title="레퍼런스 학습" description="참고 자료를 업로드하면 스타일과 톤을 학습해 적용합니다." />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">합리적인 요금제</h2>
            <p className="text-gray-600 text-lg">필요한 만큼만 사용하세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard name="Free" price="0" description="시작하기 좋은 무료 플랜" features={['월 10회 콘텐츠 생성', '기본 포맷 지원', '이메일 지원']} buttonText="무료로 시작" buttonVariant="secondary" />
            <PricingCard name="Pro" price="29,000" description="개인 크리에이터를 위한 플랜" features={['월 100회 콘텐츠 생성', '모든 포맷 지원', '페르소나 설정', '레퍼런스 업로드', '우선 지원']} buttonText="Pro 시작하기" buttonVariant="primary" popular />
            <PricingCard name="Business" price="99,000" description="팀과 기업을 위한 플랜" features={['무제한 콘텐츠 생성', '모든 Pro 기능 포함', '팀 워크스페이스', 'API 액세스', '전담 매니저']} buttonText="문의하기" buttonVariant="secondary" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
          </div>
          <div className="space-y-4">
            <FAQItem question="생성된 콘텐츠의 저작권은 누구에게 있나요?" answer="생성된 모든 콘텐츠의 저작권은 사용자에게 있습니다. 자유롭게 상업적 용도로 사용하실 수 있습니다." />
            <FAQItem question="어떤 AI 모델을 사용하나요?" answer="GPT-4, Claude 등 최신 AI 모델을 사용하여 고품질 콘텐츠를 생성합니다. 모델은 지속적으로 업데이트됩니다." />
            <FAQItem question="환불 정책은 어떻게 되나요?" answer="결제 후 7일 이내 사용량이 10% 미만인 경우 전액 환불이 가능합니다. 자세한 내용은 이용약관을 참고해주세요." />
            <FAQItem question="팀원과 함께 사용할 수 있나요?" answer="Business 플랜에서는 팀 워크스페이스 기능을 제공합니다. 팀원을 초대하고 함께 콘텐츠를 관리하세요." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
          <p className="text-primary-100 text-lg mb-8">무료로 가입하고 AI 콘텐츠 생성의 힘을 경험해보세요.</p>
          <Link href="/app/create" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-gray-100 font-semibold text-lg transition-colors">
            무료로 시작하기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Contentsfy</span>
            </div>
            <p className="text-gray-400 text-sm">© 2026 Contentsfy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContentTypeCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string; }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard({ name, price, description, features, buttonText, buttonVariant, popular }: { name: string; price: string; description: string; features: string[]; buttonText: string; buttonVariant: 'primary' | 'secondary'; popular?: boolean; }) {
  return (
    <div className={`bg-white rounded-2xl p-8 ${popular ? 'ring-2 ring-primary-500 shadow-xl relative' : 'border border-gray-200'}`}>
      {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">인기</div>}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-gray-900">₩{price}</span>
          <span className="text-gray-500">/월</span>
        </div>
        <p className="text-gray-500 text-sm mt-2">{description}</p>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-600">
            <Check className="w-5 h-5 text-primary-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/signup" className={`block w-full py-3 rounded-lg font-medium text-center transition-colors ${buttonVariant === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
        {buttonText}
      </Link>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string; }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-4 text-gray-600">{answer}</div>}
    </div>
  );
}
