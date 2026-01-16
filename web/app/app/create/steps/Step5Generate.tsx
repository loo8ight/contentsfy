'use client';

import { useEffect, useState } from 'react';
import { useCreateFlow } from '@/lib/create-flow-context';
import { ContentResult, SceneData } from '@/lib/create-flow-types';
import { Sparkles, Loader2, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

const loadingSteps = [
  { id: 1, text: '페르소나 분석 중...', duration: 800 },
  { id: 2, text: '주제에 맞는 구조 설계 중...', duration: 1000 },
  { id: 3, text: '후킹 요소 적용 중...', duration: 600 },
  { id: 4, text: '콘텐츠 생성 중...', duration: 2000 },
  { id: 5, text: '컴플라이언스 검사 중...', duration: 1000 },
  { id: 6, text: '최종 검토 중...', duration: 500 },
];

export default function Step5Generate() {
  const { state, setResult } = useCreateFlow();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalTime = 0;
    const timeouts: NodeJS.Timeout[] = [];

    loadingSteps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index);
        setCompletedSteps(prev => [...prev, index]);
        setProgress(((index + 1) / loadingSteps.length) * 100);
      }, totalTime);
      
      timeouts.push(timeout);
      totalTime += step.duration;
    });

    // 완료 후 결과 페이지로
    const finalTimeout = setTimeout(() => {
      const result = generateMockResult();
      setResult(result);
    }, totalTime + 500);
    
    timeouts.push(finalTimeout);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [setResult]);

  const generateMockResult = (): ContentResult => {
    const format = state.format!;
    const isMedical = state.persona?.isMedicalAd;
    
    // 포맷에 따른 콘텐츠 생성
    if (format.id === 'shortform') {
      return {
        id: 'content_' + Date.now(),
        title: state.hook?.previewTitle || '1년 동안 인스타그램에 미쳐보니 23살에 생긴 변화',
        content: '',
        format: format,
        platform: 'Instagram Reels',
        scenes: generateMockScenes(),
        complianceStatus: isMedical ? 'WARN' : 'PASS',
        complianceIssues: isMedical ? ['일부 효능 표현 검토 필요'] : [],
      };
    } else if (format.id === 'shorttext') {
      return {
        id: 'content_' + Date.now(),
        title: state.hook?.previewTitle || '카페 사장 되면 우아하게 커피 내릴 줄 알았지?',
        content: `카페 사장 되면 우아하게 커피 내릴 줄 알았지? ☕️
현실은 하루 종일 설거지 + 마감 청소 엔딩임.

근데 오늘 손님이 컵 홀더에 남겨준 쪽지 보고 울 뻔... 😭

---

"사장님 커피가 제일 맛있어요"

이 한 마디 때문에 내일도 문 연다 진짜.
자영업자 동료들 다들 파이팅하자! 💪`,
        format: format,
        platform: 'Threads',
        complianceStatus: 'PASS',
        complianceIssues: [],
      };
    } else if (format.id === 'longtext') {
      return {
        id: 'content_' + Date.now(),
        title: state.hook?.previewTitle || '집에서 즐기는 홈카페, 똥손도 가능한 라떼아트 꿀팁 3가지',
        content: generateBlogContent(),
        format: format,
        platform: '네이버 블로그',
        complianceStatus: 'PASS',
        complianceIssues: [],
      };
    } else {
      return {
        id: 'content_' + Date.now(),
        title: state.hook?.previewTitle || '망해가는 카페 심폐소생술, 딱 3가지만 바꿨습니다',
        content: generateYouTubeScript(),
        format: format,
        platform: 'YouTube',
        scenes: generateYouTubeScenes(),
        complianceStatus: isMedical ? 'WARN' : 'PASS',
        complianceIssues: isMedical ? ['건강기능식품 관련 표현 검토 필요'] : [],
      };
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fadeIn">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-primary-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          콘텐츠 생성 중
        </h1>
        <p className="text-gray-600 mb-8">
          AI가 최적의 콘텐츠를 만들고 있어요
        </p>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <div 
            className="bg-primary-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-left">
          {loadingSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 py-2 transition-all ${
                index === currentStep ? 'opacity-100' : 
                completedSteps.includes(index) ? 'opacity-60' : 'opacity-30'
              }`}
            >
              {completedSteps.includes(index) && index !== currentStep ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : index === currentStep ? (
                <Loader2 className="w-5 h-5 text-primary-500 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
              )}
              <span className={`text-sm ${
                index === currentStep ? 'text-gray-900 font-medium' : 'text-gray-600'
              }`}>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>컴플라이언스 검사가 자동으로 수행됩니다</span>
        </div>
      </div>
    </div>
  );
}

function generateMockScenes(): SceneData[] {
  return [
    {
      id: '1',
      number: 1,
      timeRange: '00:00 - 00:05',
      type: 'HOOK',
      visualDescription: '지하 주차장을 걸어가며 책을 읽는 뒷모습. 화면 중앙에 큰 텍스트: "2023 vs 2024"',
      narration: '처음 인스타그램을 했을 때 모두가 이상하게 생각했다. 😳',
    },
    {
      id: '2',
      number: 2,
      timeRange: '00:05 - 00:20',
      type: 'BODY',
      visualDescription: '빠른 컷 편집: 책 읽는 모습, 블로그 글 쓰는 노트북 화면, 조롱받는 듯한 DM 캡쳐 화면 스쳐지나감.',
      narration: '블로그 글 쓸 땐 설명충이라 놀리고, 책 읽을 땐 허세라고 비웃었죠. 하지만...',
    },
    {
      id: '3',
      number: 3,
      timeRange: '00:20 - 00:40',
      type: 'BODY',
      visualDescription: '테슬라 하이랜드 차량 앞에서 자신감 있게 포즈를 취하는 모습.',
      narration: '미친듯이 몰입한 결과, 1년 만에 제 삶은 완전히 달라졌습니다. 테슬라 일시불 Flex 🔥',
    },
    {
      id: '4',
      number: 4,
      timeRange: '00:40 - End',
      type: 'CTA',
      visualDescription: '화면을 손가락으로 가리키며 텍스트 등장: "무료 특방 초대"',
      narration: '저처럼 성장하고 싶다면? 댓글에 "함께"라고 남겨주세요! 챌린지 초대권 보냅니다.',
    },
  ];
}

function generateYouTubeScenes(): SceneData[] {
  return [
    {
      id: '1',
      number: 1,
      timeRange: '00:00 - 00:30',
      type: 'HOOK',
      visualDescription: '어두운 카페 내부, 손님 없이 텅 빈 모습. 매출 기록 5만원 클로즈업.',
      narration: '오픈 3개월 차, 하루 매출 5만 원... 진짜 가게 접으려고 했습니다.',
    },
    {
      id: '2',
      number: 2,
      timeRange: '00:30 - 03:00',
      type: 'BODY',
      visualDescription: '메뉴판 before/after 비교. 50개 메뉴 -> 3개 시그니처로 변화.',
      narration: '메뉴가 50개? 다 지우세요. 저는 시그니처 3개에만 집중했습니다.',
    },
    {
      id: '3',
      number: 3,
      timeRange: '03:00 - 05:30',
      type: 'BODY',
      visualDescription: '조명 색온도 비교 시연. 노란빛 vs 흰빛 분위기 차이.',
      narration: '조명은 밝기보다 색온도가 핵심입니다. 분위기가 완전히 달라져요.',
    },
    {
      id: '4',
      number: 4,
      timeRange: '05:30 - 07:30',
      type: 'BODY',
      visualDescription: '음악 볼륨/템포 설정 화면. 체류 시간 그래프.',
      narration: '음악 볼륨과 템포만 맞춰도 손님 체류 시간이 달라집니다.',
    },
    {
      id: '5',
      number: 5,
      timeRange: '07:30 - End',
      type: 'CTA',
      visualDescription: '체크리스트 PDF 다운로드 안내. 구독/좋아요 요청.',
      narration: '오늘 내용 그대로 적용할 수 있는 체크리스트 무료로 공유합니다. 설명란에서 다운받으세요!',
    },
  ];
}

function generateBlogContent(): string {
  return `안녕하세요! 감성 카페지기입니다. 😊

주말 아침, 카페 가기는 귀찮고 맛있는 라떼는 먹고 싶을 때 있으시죠?

오늘은 다이소 전동 거품기 하나로 스타벅스 부럽지 않은 라떼 만드는 법을 공유할게요.

## 1. 우유 온도가 생명이다

많은 분들이 실수하는 게 우유를 펄펄 끓이는 건데요.
우유 단백질은 65도가 넘어가면 비린내가 나기 시작합니다.
**전자레인지에 딱 1분 30초!** 이것만 기억하세요.

> 💡 멸균우유보다는 일반 우유가 거품이 더 쫀쫀하게 납니다!

## 2. 거품기 각도의 비밀

이제 거품기를 45도 각도로 기울여서 공기를 주입해주세요.
수직으로 세우면 거품이 잘 안 나요.

## 3. 에스프레소가 없다면?

인스턴트 커피도 OK! 물을 조금만 넣어서 진하게 타주세요.

---

어떠세요? 생각보다 쉽죠?
주말에 한번 도전해보시고, 결과물 댓글로 보여주세요! ☕✨`;
}

function generateYouTubeScript(): string {
  return `[인트로]
오픈 3개월 차, 하루 매출 5만 원... 진짜 가게 접으려고 했습니다.
하지만 메뉴판, 조명, 음악. 딱 이 3가지를 바꾸고 매출이 10배 뛰었습니다.

[본문 1: 메뉴판의 비밀]
메뉴가 50개? 다 지우세요.
저는 시그니처 3개에만 집중했습니다.
선택지가 너무 많으면 손님은 오히려 결정을 못합니다.

[본문 2: 조명의 마법]
조명은 '밝기'보다 '색온도'가 핵심입니다.
3000K 정도의 따뜻한 빛으로 바꾸니까 분위기가 완전히 달라졌어요.

[본문 3: 음악의 힘]
음악 볼륨과 템포만 맞춰도 체류 시간이 달라집니다.
낮에는 빠른 템포, 저녁에는 잔잔한 음악으로 바꿔보세요.

[아웃트로]
오늘 내용 그대로 적용하면 '돈 드는 공사' 없이도 바뀝니다.
체크리스트 설명란에 공유해뒀으니 꼭 다운받으세요!`;
}
