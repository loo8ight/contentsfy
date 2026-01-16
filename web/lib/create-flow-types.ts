// 콘텐츠 생성 플로우 공유 상태
export interface PersonaData {
  id: string;
  name: string;
  brandName: string;
  industry: string;
  targetAudience: string;
  toneStyle: string;
  keywords: string[];
  isMedicalAd: boolean;
}

export interface TopicData {
  id: string;
  title: string;
  description: string;
  recommended?: boolean;
}

export interface FormatData {
  id: 'shortform' | 'shorttext' | 'longtext' | 'longform';
  name: string;
  description: string;
  platforms: string[];
  icon: string;
}

export interface HookData {
  id: string;
  type: string;
  previewTitle: string;
  previewOpening: string;
}

export interface ContentResult {
  id: string;
  title: string;
  content: string;
  format: FormatData;
  platform: string;
  scenes?: SceneData[];
  complianceStatus: 'PASS' | 'WARN' | 'BLOCK';
  complianceIssues?: string[];
}

export interface SceneData {
  id: string;
  number: number;
  timeRange: string;
  type: 'HOOK' | 'BODY' | 'CTA';
  visualDescription: string;
  narration: string;
}

export interface CreateFlowState {
  step: number;
  persona: PersonaData | null;
  topic: TopicData | null;
  format: FormatData | null;
  hook: HookData | null;
  result: ContentResult | null;
}

// Mock 데이터
export const mockTopics: TopicData[] = [
  { id: '1', title: '자영업자 생존기', description: '힘든 현실 속에서도 버티는 자영업자의 이야기', recommended: true },
  { id: '2', title: '하루 매출 10배 올리기', description: '작은 변화로 큰 매출 상승을 이끈 비결', recommended: true },
  { id: '3', title: '손님이 다시 오게 만드는 비밀', description: '재방문율을 높이는 실전 노하우' },
  { id: '4', title: '인스타그램으로 동네 맛집 되기', description: 'SNS 마케팅으로 입소문 내는 방법' },
  { id: '5', title: '1인 사장의 시간 관리법', description: '혼자서도 효율적으로 운영하는 팁' },
  { id: '6', title: '단골 만드는 대화법', description: '손님과의 소통으로 관계 쌓기' },
  { id: '7', title: '메뉴 줄이고 매출 올리기', description: '시그니처 메뉴 집중 전략' },
  { id: '8', title: '가게 분위기 바꾸기', description: '인테리어 없이 분위기 업그레이드' },
  { id: '9', title: '리뷰 관리 완벽 가이드', description: '좋은 리뷰 늘리고 악성 리뷰 대응하기' },
  { id: '10', title: '시즌별 이벤트 아이디어', description: '계절마다 고객을 끌어모으는 기획' },
];

export const mockFormats: FormatData[] = [
  {
    id: 'shortform',
    name: '숏폼',
    description: '릴스, 틱톡, 숏츠용 세로형 영상 스크립트',
    platforms: ['Instagram Reels', 'TikTok', 'YouTube Shorts'],
    icon: '🎬',
  },
  {
    id: 'shorttext',
    name: '숏글',
    description: 'SNS 피드, 스레드용 짧은 텍스트 콘텐츠',
    platforms: ['Instagram', 'Threads', 'Twitter/X'],
    icon: '✍️',
  },
  {
    id: 'longtext',
    name: '롱글',
    description: '블로그, 네이버 포스트용 긴 텍스트 콘텐츠',
    platforms: ['네이버 블로그', '티스토리', '브런치'],
    icon: '📝',
  },
  {
    id: 'longform',
    name: '롱폼',
    description: '유튜브 영상용 긴 형식 스크립트',
    platforms: ['YouTube'],
    icon: '🎥',
  },
];

export const mockHookTypes = [
  { id: 'curiosity', name: '호기심 유발', description: '궁금증을 자극하는 오프닝' },
  { id: 'empathy', name: '공감형', description: '독자의 상황에 공감하는 시작' },
  { id: 'shock', name: '충격/반전', description: '예상치 못한 사실로 시작' },
  { id: 'story', name: '스토리텔링', description: '이야기로 자연스럽게 시작' },
  { id: 'question', name: '질문형', description: '독자에게 직접 질문하기' },
  { id: 'result', name: '결과 먼저', description: '결과/변화를 먼저 보여주기' },
];
