'use client';

import { useEffect, useState } from 'react';
import { useCreateFlow } from '@/lib/create-flow-context';
import { 
  Sparkles, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  MoreHorizontal,
  Play,
  ThumbsUp,
  Check,
  X,
  Copy
} from 'lucide-react';

// 간단한 마크다운 렌더링 함수
function renderMarkdown(text: string) {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  
  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-lg font-bold text-gray-800 mt-4 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.trim() === '---') {
      elements.push(<hr key={index} className="my-6 border-gray-200" />);
    } else if (line.includes('**')) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={index} className="text-gray-700 leading-relaxed mb-2">
          {parts.map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
          )}
        </p>
      );
    } else if (line.trim()) {
      elements.push(
        <p key={index} className="text-gray-700 leading-relaxed mb-2">{line}</p>
      );
    } else {
      elements.push(<div key={index} className="h-2" />);
    }
  });
  
  return <div className="prose-content">{elements}</div>;
}

// 저장 완료 모달
function SaveCompleteModal({ 
  isOpen, 
  onClose, 
  onCreateNew, 
  onConvertFormat 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onCreateNew: () => void;
  onConvertFormat: () => void;
}) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fadeIn">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">저장 완료!</h2>
          <p className="text-gray-500 mb-8">콘텐츠가 성공적으로 저장되었습니다.</p>
          
          <div className="space-y-3">
            <button
              onClick={onConvertFormat}
              className="w-full py-4 bg-primary-100 text-primary-700 rounded-xl font-semibold hover:bg-primary-200 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              다른 포맷으로도 만들어볼까요?
            </button>
            
            <button
              onClick={onCreateNew}
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              새 콘텐츠 만들기
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 text-gray-500 hover:text-gray-700 font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Step6Result() {
  const { state, setStep, reset } = useCreateFlow();
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const format = state.format;
  const result = state.result;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  if (!result || !format) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setShowSaveModal(true);
  };

  const handleRegenerate = () => {
    alert('재생성 기능 준비중');
  };

  const handleRemix = () => {
    setShowSaveModal(false);
    setStep(3);
  };

  return (
    <div className="animate-fadeIn pb-8">
      {/* 저장 완료 모달 */}
      <SaveCompleteModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onCreateNew={() => {
          setShowSaveModal(false);
          reset();
        }}
        onConvertFormat={handleRemix}
      />

      {/* 상단 바 - 최소화 */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>{format.icon} {format.name}</span>
        <span>•</span>
        <span>{result.platform}</span>
      </div>

      {/* Compliance Status - 필요시만 */}
      {result.complianceStatus !== 'PASS' && result.complianceIssues && result.complianceIssues.length > 0 && (
        <div className={`rounded-xl p-3 mb-4 ${
          result.complianceStatus === 'WARN' 
            ? 'bg-yellow-50 border border-yellow-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start gap-2">
            <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
              result.complianceStatus === 'WARN' ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <div className="text-sm">
              {result.complianceIssues.map((issue: string, index: number) => (
                <span key={index}>{issue}{index < (result.complianceIssues?.length ?? 0) - 1 && ', '}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 - 플랫폼별 미리보기 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {format.id === 'shortform' && <ShortformPreview result={result} />}
        {format.id === 'shorttext' && <ShorttextPreview result={result} />}
        {format.id === 'longtext' && <LongtextPreview result={result} />}
        {format.id === 'longform' && <LongformPreview result={result} />}
      </div>

      {/* 하단 액션 버튼 */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleRegenerate}
          className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          재생성
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          저장하기
        </button>
      </div>
    </div>
  );
}

// 숏폼 (릴스) 미리보기
function ShortformPreview({ result }: { result: any }) {
  const [activeTab, setActiveTab] = useState<'preview' | 'script'>('preview');
  
  return (
    <div className="flex flex-col lg:flex-row">
      {/* 왼쪽: 릴스 화면 + 스크립트 */}
      <div className="w-full lg:w-[340px] shrink-0 bg-black">
        {/* 탭 버튼 - 더 눈에 띄게 */}
        <div className="flex border-b-2 border-gray-700">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'preview' 
                ? 'bg-gray-800 text-white border-b-2 border-primary-500 -mb-0.5' 
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            <Play className="w-4 h-4" />
            미리보기
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'script' 
                ? 'bg-gray-800 text-white border-b-2 border-primary-500 -mb-0.5' 
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            <Copy className="w-4 h-4" />
            스크립트
          </button>
        </div>
        
        {/* 콘텐츠 영역 */}
        <div className="aspect-[9/16] bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          {activeTab === 'preview' ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <p className="text-white text-lg font-bold drop-shadow-lg leading-tight max-w-[220px]">
                  {result.scenes?.[0]?.narration?.slice(0, 50)}...
                </p>
              </div>
              
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-[10px] mt-0.5">1.2K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-[10px] mt-0.5">234</span>
                </div>
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-3 left-3 right-12 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[1.5px]">
                  <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-xs">☕</div>
                </div>
                <p className="text-white font-bold text-xs">contentsfy_official</p>
              </div>
            </>
          ) : (
            <div className="h-full overflow-y-auto p-4 space-y-3">
              <h3 className="text-white font-bold text-sm text-center mb-4">{result.title}</h3>
              
              {result.scenes?.map((scene: any) => (
                <div 
                  key={scene.id} 
                  className={`p-3 rounded-xl ${
                    scene.type === 'HOOK' ? 'bg-indigo-500/30 border border-indigo-400/50' :
                    scene.type === 'CTA' ? 'bg-red-500/30 border border-red-400/50' : 
                    'bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      scene.type === 'HOOK' ? 'bg-indigo-500 text-white' :
                      scene.type === 'CTA' ? 'bg-red-500 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {scene.timeRange}
                    </span>
                  </div>
                  <p className="text-white text-xs leading-relaxed">{scene.narration}</p>
                  <p className="text-white/40 text-[10px] mt-1.5">📹 {scene.visualDescription}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 캡션 */}
      <div className="flex-1 p-5 lg:p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-lg">☕</div>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">contentsfy_official</p>
            <p className="text-xs text-gray-500">인스타그램 캡션</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="font-bold text-gray-900 text-lg mb-3">{result.title}</p>
            <div className="text-gray-700 text-sm leading-relaxed space-y-3">
              <p>{result.scenes?.[0]?.narration}</p>
              <p>{result.scenes?.[1]?.narration || ''}</p>
              <p className="text-gray-500">💡 {result.scenes?.[2]?.narration?.slice(0, 80) || ''}</p>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm">👇 더 자세한 내용은 프로필 링크에서!</p>
          
          <div className="flex flex-wrap gap-1.5">
            {['릴스', '쇼츠', '콘텐츠마케팅', '크리에이터', '인스타그램', '바이럴'].map((tag, idx) => (
              <span key={idx} className="text-primary-600 text-sm">#{tag}</span>
            ))}
          </div>
          
          {result.scenes?.find((s: any) => s.type === 'CTA') && (
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
              <p className="text-primary-800 text-sm font-medium">
                🔥 {result.scenes.find((s: any) => s.type === 'CTA')?.narration}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-gray-700" />
            <MessageCircle className="w-6 h-6 text-gray-700" />
            <Send className="w-6 h-6 text-gray-700" />
          </div>
          <Bookmark className="w-6 h-6 text-gray-700" />
        </div>
        <p className="text-sm font-bold text-gray-900 mt-2">좋아요 1,234개</p>
      </div>
    </div>
  );
}

// 숏글 (스레드) 미리보기
function ShorttextPreview({ result }: { result: any }) {
  const threads = result.content.split('---').map((t: string) => t.trim()).filter(Boolean);

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
        <div className="h-12 flex justify-center items-center border-b border-gray-100">
          <span className="text-xl font-bold">@</span>
        </div>

        <div className="relative">
          {threads.map((thread: string, index: number) => (
            <div key={index} className="p-4 relative">
              {index < threads.length - 1 && (
                <div className="absolute left-[34px] top-[52px] bottom-0 w-0.5 bg-gray-200 z-0" />
              )}
              <div className="flex gap-3 relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm">
                    ☕
                  </div>
                </div>
                <div className={`flex-1 ${index < threads.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-black">cafe_log</span>
                    <span className="text-gray-400 text-xs">방금</span>
                  </div>
                  <div className="text-[15px] leading-snug text-black mb-3">
                    {renderMarkdown(thread)}
                  </div>
                  <div className="flex gap-4 text-black">
                    <Heart className="w-5 h-5" />
                    <MessageCircle className="w-5 h-5" />
                    <RefreshCw className="w-5 h-5" />
                    <Send className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 롱글 (블로그) 미리보기
function LongtextPreview({ result }: { result: any }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white min-h-[500px]">
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6">
          <div className="text-green-600 font-bold text-base">N blog</div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        <div className="px-8 py-10 md:px-12">
          <div className="mb-6">
            <p className="text-green-600 text-xs font-bold mb-2">☕️ 홈카페 레시피</p>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
              {result.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-bold text-gray-600">감성카페지기</span>
              <span>• 2026. 1. 16.</span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            {renderMarkdown(result.content)}
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-50">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-600 font-bold">공감 14</span>
            </div>
            <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-50">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600 font-bold">댓글 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 롱폼 (유튜브) 미리보기
function LongformPreview({ result }: { result: any }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="aspect-video bg-black rounded-xl mb-4 relative overflow-hidden">
        <div className="absolute top-3 left-3 flex items-center gap-2 text-white/80 text-xs">
          <Play className="w-4 h-4 text-red-600" />
          <span className="font-bold">스크립트 내용</span>
        </div>

        <div className="absolute inset-0 pt-10 px-4 pb-4 overflow-y-auto text-white text-sm">
          <h2 className="font-bold text-lg mb-3">{result.title}</h2>
          <div className="space-y-3 text-white/90 leading-relaxed">
            {result.scenes?.map((scene: any) => (
              <p key={scene.id}>
                <span className="text-white/60">{scene.timeRange.split(' - ')[0]}</span>{' '}
                {scene.narration}
              </p>
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-3">{result.title}</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">☕</div>
          <div>
            <div className="font-bold text-sm text-gray-900">감성 카페 사장</div>
            <div className="text-xs text-gray-500">구독자 1.2만명</div>
          </div>
          <button className="ml-4 px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
            구독
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full text-sm font-medium">
            <ThumbsUp className="w-4 h-4" /> 1.2천
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full text-sm font-medium">
            <Share2 className="w-4 h-4" /> 공유
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl p-4 text-sm">
        <p className="font-bold text-gray-800 mb-1">조회수 12만회 • 방금 전</p>
        <div className="mt-3 border-t border-gray-200 pt-3">
          <p className="font-bold text-gray-900 mb-1">설명</p>
          <div className="text-gray-700 leading-relaxed">
            {renderMarkdown(result.content?.slice(0, 300) + '...')}
          </div>
        </div>
      </div>
    </div>
  );
}
