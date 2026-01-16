'use client';

import { useState } from 'react';
import { useCreateFlow } from '@/lib/create-flow-context';
import { Sparkles, AlertCircle, ArrowRight, Loader2, Plus, User, Calendar, Check } from 'lucide-react';
import { PersonaData } from '@/lib/create-flow-types';

// Mock 저장된 페르소나들
const mockSavedPersonas: PersonaData[] = [
  {
    id: 'persona_saved_1',
    name: '감성 카페지기',
    brandName: '감성카페',
    industry: '카페/음료',
    targetAudience: '20-30대 직장인 및 대학생',
    toneStyle: '따뜻하고 친근한 동네 친구 같은 톤',
    keywords: ['홈카페', '라떼아트', '휴식', '힐링'],
    isMedicalAd: false,
  },
  {
    id: 'persona_saved_2',
    name: '성장하는 크리에이터',
    brandName: '최고수준33',
    industry: '교육/자기계발',
    targetAudience: '20-30대 직장인, 창업 준비생',
    toneStyle: '동기부여, 진정성 있는 멘토 톤',
    keywords: ['자기계발', '성장', '도전', '인스타그램'],
    isMedicalAd: false,
  },
];

type ViewMode = 'storage' | 'create' | 'result';

export default function Step1Persona() {
  const { setPersona } = useCreateFlow();
  const [savedPersonas] = useState<PersonaData[]>(mockSavedPersonas);
  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(savedPersonas.length > 0 ? 'storage' : 'create');
  
  // Create mode states
  const [interviewText, setInterviewText] = useState('');
  const [isMedicalAd, setIsMedicalAd] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedPersona, setGeneratedPersona] = useState<PersonaData | null>(null);

  const sampleInterview = `브랜드명: 감성카페
업종: 카페/음료
주요 고객: 20-30대 직장인, 대학생
브랜드 특징: 아늑한 분위기, 시그니처 라떼가 유명
톤앤매너: 따뜻하고 친근한, 동네 친구같은 느낌
주요 키워드: 홈카페, 라떼아트, 휴식, 힐링`;

  const handleAnalyze = async () => {
    if (!interviewText.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPersona: PersonaData = {
      id: 'persona_' + Date.now(),
      name: '감성 카페지기',
      brandName: '감성카페',
      industry: '카페/음료',
      targetAudience: '20-30대 직장인 및 대학생',
      toneStyle: '따뜻하고 친근한 동네 친구 같은 톤',
      keywords: ['홈카페', '라떼아트', '휴식', '힐링', '카페일상'],
      isMedicalAd: isMedicalAd,
    };
    
    setGeneratedPersona(mockPersona);
    setIsAnalyzing(false);
    setViewMode('result');
  };

  const handleSelectSavedPersona = () => {
    if (selectedPersona) {
      setPersona(selectedPersona);
    }
  };

  const handleConfirmNewPersona = () => {
    if (generatedPersona) {
      setPersona(generatedPersona);
    }
  };

  // 보관함 뷰
  if (viewMode === 'storage') {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Step 1
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            페르소나 선택
          </h1>
          <p className="text-gray-600">
            저장된 페르소나를 선택하거나 새로 만들어보세요
          </p>
        </div>

        {/* Saved Personas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" />
              내 페르소나 보관함
              <span className="text-sm font-normal text-gray-500">({savedPersonas.length}/10)</span>
            </h2>
          </div>

          <div className="space-y-3">
            {savedPersonas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedPersona?.id === persona.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {persona.industry.includes('카페') ? '☕' : 
                     persona.industry.includes('교육') ? '📚' : '💼'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{persona.name}</h3>
                      {selectedPersona?.id === persona.id && (
                        <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{persona.brandName} • {persona.industry}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {persona.keywords.slice(0, 4).map((keyword, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    최근 사용
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* New Persona Button */}
        <button
          onClick={() => setViewMode('create')}
          className="w-full p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">새 페르소나 만들기</span>
        </button>

        {/* Continue Button */}
        <button
          onClick={handleSelectSavedPersona}
          disabled={!selectedPersona}
          className="w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          선택한 페르소나로 진행
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // 생성 뷰
  if (viewMode === 'create') {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Step 1
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            브랜드 페르소나 생성
          </h1>
          <p className="text-gray-600">
            브랜드 정보를 입력하면 AI가 콘텐츠 페르소나를 만들어드립니다
          </p>
        </div>

        {/* Back to storage */}
        {savedPersonas.length > 0 && (
          <button
            onClick={() => setViewMode('storage')}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            ← 보관함으로 돌아가기
          </button>
        )}

        {/* Interview Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-semibold text-gray-900">
              브랜드 인터뷰지 <span className="text-red-500">*</span>
            </label>
            <button
              onClick={() => setInterviewText(sampleInterview)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              예시 불러오기
            </button>
          </div>
          <textarea
            value={interviewText}
            onChange={(e) => setInterviewText(e.target.value)}
            placeholder="브랜드명, 업종, 타겟 고객, 브랜드 특징, 원하는 톤앤매너 등을 자유롭게 작성해주세요..."
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none text-gray-900"
          />
          <p className="mt-2 text-sm text-gray-500">
            상세하게 작성할수록 더 정확한 페르소나가 생성됩니다
          </p>
        </div>

        {/* Medical Ad Checkbox */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isMedicalAd}
              onChange={(e) => setIsMedicalAd(e.target.checked)}
              className="w-5 h-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500 mt-0.5"
            />
            <div>
              <span className="font-semibold text-orange-800">의료/광고 민감군 적용</span>
              <p className="text-sm text-orange-700 mt-1">
                의료, 건강기능식품, 화장품 등 광고 규제가 있는 업종의 경우 체크해주세요.
              </p>
            </div>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleAnalyze}
          disabled={!interviewText.trim() || isAnalyzing}
          className="w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI 분석 중...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              페르소나 생성하기
            </>
          )}
        </button>
      </div>
    );
  }

  // 결과 뷰
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
          <Check className="w-4 h-4" />
          생성 완료
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          페르소나가 생성되었습니다!
        </h1>
      </div>

      {/* Generated Persona Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            생성된 페르소나
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          {generatedPersona && (
            <>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-3xl">
                  ☕
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{generatedPersona.name}</h3>
                  <p className="text-gray-500">{generatedPersona.brandName}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <InfoCard label="업종" value={generatedPersona.industry} />
                <InfoCard label="타겟 고객" value={generatedPersona.targetAudience} />
                <InfoCard label="톤앤매너" value={generatedPersona.toneStyle} className="md:col-span-2" />
              </div>
              
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-500">핵심 키워드</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {generatedPersona.keywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>

              {generatedPersona.isMedicalAd && (
                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 text-orange-700">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">의료/광고 민감군 적용됨</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setViewMode('create')}
          className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-colors"
        >
          다시 작성하기
        </button>
        <button
          onClick={handleConfirmNewPersona}
          className="flex-1 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          이 페르소나로 진행
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function InfoCard({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`bg-gray-50 rounded-xl p-4 ${className}`}>
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-gray-900 font-medium mt-1">{value}</p>
    </div>
  );
}
