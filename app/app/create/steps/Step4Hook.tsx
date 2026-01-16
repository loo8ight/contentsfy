'use client';

import { useState } from 'react';
import { useCreateFlow } from '@/lib/create-flow-context';
import { HookData } from '@/lib/create-flow-types';
import { Sparkles, ArrowRight, ArrowLeft, Loader2, Zap, Play, Eye, Check, ChevronDown } from 'lucide-react';

// 후킹 스타일 데이터 (톤앤매너 통일 - 차분한 컬러)
const hookStyles = [
  {
    id: 'curiosity',
    name: '궁금증 유발',
    description: '호기심을 자극하는 질문이나 힌트',
    emoji: '🔍',
    example: { title: '이거 모르면 진짜 손해입니다', opening: '99%가 놓치는 핵심 포인트...', creator: '@viral_tips', views: '150만' },
  },
  {
    id: 'empathy',
    name: '공감 스토리',
    description: '나도 그랬어요, 함께하는 느낌',
    emoji: '💭',
    example: { title: '처음엔 저도 막막했어요', opening: '뭐부터 시작해야 할지 몰랐는데...', creator: '@growth_story', views: '67만' },
  },
  {
    id: 'shock',
    name: '충격/반전',
    description: '예상을 뒤엎는 반전 포인트',
    emoji: '⚡',
    example: { title: '이렇게 하면 망합니다', opening: '대부분이 하는 실수 TOP 3', creator: '@truth_bomb', views: '230만' },
  },
  {
    id: 'story',
    name: '스토리텔링',
    description: '이야기로 시작하는 자연스러운 전개',
    emoji: '📖',
    example: { title: '3년 전 그날의 이야기', opening: '모든 것이 바뀌기 시작한 순간', creator: '@life_story', views: '120만' },
  },
  {
    id: 'question',
    name: '질문형',
    description: '직접적인 질문으로 참여 유도',
    emoji: '❓',
    example: { title: '혹시 이거 알고 계셨나요?', opening: '한번 생각해보세요', creator: '@ask_why', views: '78만' },
  },
  {
    id: 'result',
    name: '결과 먼저',
    description: '성과/결과를 먼저 보여주는 방식',
    emoji: '📈',
    example: { title: '3개월 만에 매출 300% 달성', opening: '결과부터 보여드릴게요', creator: '@result_first', views: '340만' },
  },
];

export default function Step4Hook() {
  const { state, setHook, setStep } = useCreateFlow();
  const [selectedHookType, setSelectedHookType] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<{ title: string; opening: string } | null>(null);

  // 프리뷰 생성 (선택사항)
  const generatePreview = async () => {
    if (!selectedHookType) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const style = hookStyles.find(s => s.id === selectedHookType);
    const topic = state.topic?.title || '';
    
    setGeneratedPreview({
      title: `${topic}${selectedHookType === 'curiosity' ? '의 비밀' : selectedHookType === 'shock' ? ', 이렇게 하면 망합니다' : selectedHookType === 'result' ? '로 성과 300% 달성' : ''}`,
      opening: style?.example.opening || '',
    });
    setIsGenerating(false);
  };

  const handleConfirm = () => {
    if (selectedHookType) {
      const style = hookStyles.find(s => s.id === selectedHookType);
      const hook: HookData = {
        id: 'hook_' + Date.now(),
        type: selectedHookType,
        previewTitle: generatedPreview?.title || style?.example.title || '',
        previewOpening: generatedPreview?.opening || style?.example.opening || '',
      };
      setHook(hook);
    }
  };

  const selectedStyle = selectedHookType ? hookStyles.find(s => s.id === selectedHookType) : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header - 간결하게 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
          <Sparkles className="w-4 h-4" />
          Step 4
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          후킹 스타일 선택
        </h1>
        <p className="text-gray-500 text-sm">
          어떤 스타일로 시선을 사로잡을까요?
        </p>
      </div>

      {/* Hook Style Cards - 2x3 Grid, 큰 플레이스홀더 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {hookStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => {
              setSelectedHookType(style.id);
              setGeneratedPreview(null);
              setShowPreview(false);
            }}
            className={`relative rounded-2xl border-2 overflow-hidden transition-all text-left ${
              selectedHookType === style.id
                ? 'border-primary-500 shadow-lg bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
            }`}
          >
            {/* 이미지 플레이스홀더 - 크게 */}
            <div className={`aspect-[4/3] flex items-center justify-center relative ${
              selectedHookType === style.id ? 'bg-primary-100' : 'bg-gray-100'
            }`}>
              <span className="text-5xl">{style.emoji}</span>
              
              {/* 선택 표시 */}
              {selectedHookType === style.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              {/* 예시 콘텐츠 오버레이 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-xs font-medium line-clamp-1">"{style.example.title}"</p>
                <p className="text-white/70 text-[10px] mt-0.5">{style.example.views} 조회</p>
              </div>
            </div>
            
            {/* 텍스트 정보 */}
            <div className="p-3">
              <h3 className="font-bold text-gray-900 text-sm">{style.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{style.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 선택된 스타일 상세 */}
      {selectedHookType && selectedStyle && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedStyle.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900">{selectedStyle.name} 스타일</h3>
                <p className="text-sm text-gray-500">{selectedStyle.description}</p>
              </div>
            </div>
          </div>
          
          {/* 프리뷰 토글 (선택사항) */}
          <button
            onClick={() => {
              setShowPreview(!showPreview);
              if (!showPreview && !generatedPreview) {
                generatePreview();
              }
            }}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              프리뷰 미리보기 (선택사항)
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showPreview ? 'rotate-180' : ''}`} />
          </button>
          
          {/* 프리뷰 영역 (접히는) */}
          {showPreview && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              {isGenerating ? (
                <div className="text-center py-6">
                  <Loader2 className="w-6 h-6 text-primary-500 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-gray-500">프리뷰 생성 중...</p>
                </div>
              ) : generatedPreview ? (
                <div>
                  <p className="text-xs text-gray-400 mb-2">예상 콘텐츠 오프닝</p>
                  <h4 className="font-bold text-gray-900 mb-1">{generatedPreview.title}</h4>
                  <p className="text-sm text-gray-600">{generatedPreview.opening}</p>
                  <button
                    onClick={generatePreview}
                    className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    다시 생성
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setStep(3)}
          className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          이전
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedHookType}
          className="flex-1 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          콘텐츠 생성하기
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
