'use client';

import { useState, useEffect } from 'react';
import { useCreateFlow } from '@/lib/create-flow-context';
import { mockTopics, TopicData } from '@/lib/create-flow-types';
import { Sparkles, Star, ArrowRight, ArrowLeft, Loader2, RefreshCw, Wand2 } from 'lucide-react';

export default function Step2Topic() {
  const { state, setTopic, setStep } = useCreateFlow();
  const [topics, setTopics] = useState<TopicData[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 페이지 진입 시 AI 주제 생성 시뮬레이션
  useEffect(() => {
    const generateTopics = async () => {
      setIsInitialLoading(true);
      setLoadingProgress(0);
      
      // 프로그레스 애니메이션
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 15, 90));
      }, 300);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      await new Promise(resolve => setTimeout(resolve, 200));
      setTopics(mockTopics);
      setIsInitialLoading(false);
    };
    
    generateTopics();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // 같은 주제를 순서만 섞어서 보여줌 (Mock)
    setTopics([...mockTopics].sort(() => Math.random() - 0.5));
    setSelectedTopic(null);
    setIsRefreshing(false);
  };

  const handleConfirm = () => {
    if (selectedTopic) {
      setTopic(selectedTopic);
    } else if (customTopic.trim()) {
      setTopic({
        id: 'custom_' + Date.now(),
        title: customTopic,
        description: '사용자 직접 입력',
      });
    }
  };

  const canProceed = selectedTopic !== null || customTopic.trim() !== '';

  // 초기 로딩 화면
  if (isInitialLoading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Step 2
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            콘텐츠 주제 생성 중
          </h1>
          <p className="text-gray-600">
            <span className="font-medium text-primary-600">{state.persona?.name}</span> 페르소나를 분석하고 있습니다
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                <Wand2 className="w-10 h-10 text-primary-600 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI가 주제를 추천하고 있어요</h3>
            <p className="text-gray-500 text-sm mb-6">페르소나와 업종을 분석 중...</p>
            
            {/* Progress Bar */}
            <div className="w-full max-w-xs">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">{loadingProgress}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Step 2
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          콘텐츠 주제 선택
        </h1>
        <p className="text-gray-600">
          <span className="font-medium text-primary-600">{state.persona?.name}</span> 페르소나에 맞는 주제를 선택해주세요
        </p>
      </div>

      {/* AI Recommended Topics */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            AI 추천 주제
          </h2>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            다른 주제 보기
          </button>
        </div>

        {isRefreshing ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setCustomTopic('');
                }}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedTopic?.id === topic.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedTopic?.id === topic.id
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedTopic?.id === topic.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      {topic.recommended && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                          추천
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom Topic */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          직접 입력하기
        </h2>
        <input
          type="text"
          value={customTopic}
          onChange={(e) => {
            setCustomTopic(e.target.value);
            setSelectedTopic(null);
          }}
          placeholder="원하는 주제를 직접 입력하세요..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          이전
        </button>
        <button
          onClick={handleConfirm}
          disabled={!canProceed}
          className="flex-1 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          다음 단계
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
