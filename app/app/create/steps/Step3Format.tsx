'use client';

import { useState } from 'react';
import { useCreateFlow } from '@/lib/create-flow-context';
import { mockFormats, FormatData } from '@/lib/create-flow-types';
import { Sparkles, ArrowRight, ArrowLeft, Check, Play, FileText, BookOpen, Video, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

// 포맷별 상세 정보
const formatDetails: Record<string, {
  platformLogos: { name: string; icon: string; color: string }[];
  examplePreview: string;
  duration: string;
  mockupType: 'reels' | 'threads' | 'blog' | 'youtube';
}> = {
  shortform: {
    platformLogos: [
      { name: 'Instagram Reels', icon: '📷', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'TikTok', icon: '🎵', color: 'bg-black' },
      { name: 'YouTube Shorts', icon: '▶️', color: 'bg-red-500' },
    ],
    examplePreview: '15-60초 세로형 영상 콘텐츠',
    duration: '15초~60초',
    mockupType: 'reels',
  },
  shorttext: {
    platformLogos: [
      { name: 'Threads', icon: '@', color: 'bg-black' },
      { name: 'X (Twitter)', icon: '𝕏', color: 'bg-black' },
      { name: 'Instagram 캡션', icon: '📷', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    ],
    examplePreview: '3-5개 연결 글타래',
    duration: '읽는 시간 1-2분',
    mockupType: 'threads',
  },
  longtext: {
    platformLogos: [
      { name: 'Naver Blog', icon: 'N', color: 'bg-green-500' },
      { name: 'Tistory', icon: 'T', color: 'bg-orange-500' },
      { name: 'Brunch', icon: 'B', color: 'bg-stone-800' },
    ],
    examplePreview: '2000-3000자 SEO 최적화 글',
    duration: '읽는 시간 5-7분',
    mockupType: 'blog',
  },
  longform: {
    platformLogos: [
      { name: 'YouTube', icon: '▶️', color: 'bg-red-500' },
    ],
    examplePreview: '5-15분 가로형 영상 스크립트',
    duration: '5분~15분',
    mockupType: 'youtube',
  },
};

// 미니 목업 컴포넌트들
function MiniReelsMockup() {
  return (
    <div className="w-full aspect-[9/14] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Play className="w-5 h-5 text-white ml-0.5" />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 right-8">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 mb-1" />
        <div className="h-2 bg-white/30 rounded w-16 mb-1" />
        <div className="h-1.5 bg-white/20 rounded w-20" />
      </div>
      <div className="absolute right-2 bottom-2 flex flex-col gap-2">
        <Heart className="w-4 h-4 text-white/70" />
        <MessageCircle className="w-4 h-4 text-white/70" />
        <Share2 className="w-4 h-4 text-white/70" />
      </div>
    </div>
  );
}

function MiniThreadsMockup() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-2 space-y-2">
      <div className="flex gap-2">
        <div className="w-6 h-6 rounded-full bg-black flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="h-1.5 bg-gray-300 rounded w-12" />
          <div className="h-1.5 bg-gray-200 rounded w-full" />
          <div className="h-1.5 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
      <div className="border-l-2 border-gray-200 ml-3 pl-4 space-y-1">
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-2/3" />
      </div>
      <div className="flex gap-2 ml-8 pt-1">
        <Heart className="w-3 h-3 text-gray-400" />
        <MessageCircle className="w-3 h-3 text-gray-400" />
      </div>
    </div>
  );
}

function MiniBlogMockup() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="h-3 bg-green-500 flex items-center px-1.5">
        <span className="text-[6px] text-white font-bold">N</span>
      </div>
      <div className="p-2 space-y-1.5">
        <div className="h-2 bg-gray-800 rounded w-3/4" />
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-2/3" />
        <div className="h-8 bg-gray-100 rounded mt-2" />
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  );
}

function MiniYouTubeMockup() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
          <Play className="w-4 h-4 text-white ml-0.5" />
        </div>
        <div className="absolute bottom-1 right-1 text-[8px] text-white bg-black/70 px-1 rounded">
          10:24
        </div>
      </div>
      <div className="p-2 flex gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="h-1.5 bg-gray-800 rounded w-full" />
          <div className="h-1.5 bg-gray-300 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

const MockupByType = ({ type }: { type: string }) => {
  switch (type) {
    case 'reels': return <MiniReelsMockup />;
    case 'threads': return <MiniThreadsMockup />;
    case 'blog': return <MiniBlogMockup />;
    case 'youtube': return <MiniYouTubeMockup />;
    default: return null;
  }
};

export default function Step3Format() {
  const { state, setFormat, setStep } = useCreateFlow();
  const [selectedFormat, setSelectedFormat] = useState<FormatData | null>(null);

  const handleConfirm = () => {
    if (selectedFormat) {
      setFormat(selectedFormat);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Step 3
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          콘텐츠 포맷 선택
        </h1>
        <p className="text-gray-600">
          <span className="font-medium text-primary-600">"{state.topic?.title}"</span> 주제로 어떤 형식의 콘텐츠를 만들까요?
        </p>
      </div>

      {/* Format Selection - 2x2 Grid with Image Previews */}
      <div className="grid md:grid-cols-2 gap-5">
        {mockFormats.map((format) => {
          const details = formatDetails[format.id];
          return (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format)}
              className={`text-left rounded-2xl border-2 transition-all overflow-hidden ${
                selectedFormat?.id === format.id
                  ? 'border-primary-500 shadow-lg ring-2 ring-primary-200'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex">
                {/* 왼쪽: 미니 목업 */}
                <div className={`w-28 p-3 flex-shrink-0 ${
                  selectedFormat?.id === format.id ? 'bg-primary-50' : 'bg-gray-50'
                }`}>
                  <MockupByType type={details?.mockupType || ''} />
                </div>
                
                {/* 오른쪽: 정보 */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{format.name}</h3>
                      <p className="text-xs text-gray-500">{details?.duration}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        selectedFormat?.id === format.id
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedFormat?.id === format.id && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{format.description}</p>
                  
                  {/* 플랫폼 로고들 */}
                  <div className="flex items-center gap-1.5">
                    {details?.platformLogos.map((platform, idx) => (
                      <div
                        key={idx}
                        className={`w-6 h-6 rounded-md ${platform.color} flex items-center justify-center text-white text-xs font-bold`}
                        title={platform.name}
                      >
                        {platform.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Format Info */}
      {selectedFormat && (
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedFormat.icon}</span>
            <div>
              <h3 className="font-bold text-primary-900">
                {selectedFormat.name} 선택됨
              </h3>
              <p className="text-sm text-primary-700">
                {selectedFormat.platforms.join(', ')}에 최적화된 콘텐츠가 생성됩니다
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          이전
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedFormat}
          className="flex-1 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          다음 단계
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
