import { User, Workspace, Client, Content, Format, Prompt, ComplianceRule, Job, Announcement, DashboardStats, AuditLog, Reference } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    user_id: 'usr_demo_admin',
    workspace_id: 'ws_demo_001',
    role: 'admin',
    plan: 'business',
    usage_remaining: 1200,
    usage_total: 2000,
    admin_topup_count: 300,
    memo: 'VIP 관리자 계정. 월간 리포트 확인 필요.',
    display_name: 'Admin',
    email: 'admin@contentsfy.com',
    created_at: '2026-01-15T12:00:00',
    is_active: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  },
  {
    user_id: 'usr_demo_user1',
    workspace_id: 'ws_demo_001',
    role: 'member',
    plan: 'pro',
    usage_remaining: 320,
    usage_total: 500,
    admin_topup_count: 50,
    memo: '광고주 캠페인 진행 중',
    display_name: 'User One',
    email: 'user1@contentsfy.com',
    created_at: '2026-01-15T12:00:00',
    is_active: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User1'
  },
  {
    user_id: 'usr_demo_user2',
    workspace_id: 'ws_demo_001',
    role: 'member',
    plan: 'free',
    usage_remaining: 40,
    usage_total: 100,
    admin_topup_count: 0,
    memo: '체험 후 업그레이드 검토',
    display_name: 'Kim Marketing',
    email: 'kim@marketing.com',
    created_at: '2026-01-10T09:00:00',
    is_active: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kim'
  },
  {
    user_id: 'usr_demo_user3',
    workspace_id: 'ws_demo_001',
    role: 'viewer',
    plan: 'free',
    usage_remaining: 0,
    usage_total: 50,
    admin_topup_count: 0,
    memo: '휴면 사용자',
    display_name: 'Lee Viewer',
    email: 'lee@viewer.com',
    created_at: '2026-01-08T14:00:00',
    is_active: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lee'
  },
];

// Mock Workspaces
export const mockWorkspaces: Workspace[] = [
  {
    workspace_id: 'ws_demo_001',
    name: 'ContentPie Demo',
    plan: 'mvp_free',
    created_at: '2026-01-15T12:00:00'
  },
  {
    workspace_id: 'ws_demo_002',
    name: 'Marketing Agency',
    plan: 'pro',
    created_at: '2026-01-10T09:00:00'
  },
];

// Mock Clients
export const mockClients: Client[] = [
  {
    client_id: 'cl_demo_001',
    workspace_id: 'ws_demo_001',
    name: '디유에스테틱',
    industry: 'aesthetic_clinic',
    is_medical: true,
    created_at: '2026-01-15T12:00:00',
    notes: '의료/광고 민감군: 컴플라이언스 게이트 강제'
  },
  {
    client_id: 'cl_demo_002',
    workspace_id: 'ws_demo_001',
    name: '카페로그',
    industry: 'food_beverage',
    is_medical: false,
    created_at: '2026-01-12T10:00:00',
    notes: '카페 브랜드 마케팅'
  },
  {
    client_id: 'cl_demo_003',
    workspace_id: 'ws_demo_001',
    name: '스마트테크',
    industry: 'technology',
    is_medical: false,
    created_at: '2026-01-14T15:00:00',
    notes: 'IT 솔루션 기업'
  },
];

// Mock Contents
export const mockContents: Content[] = [
  {
    content_id: 'cnt_demo_001',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_001',
    user_id: 'usr_demo_user1',
    persona_id: 'per_demo_001',
    raw_id: 'raw_demo_001',
    format_id: 'fmt_shortform',
    title: '3D 분석으로 시작하는 관리',
    draft_text: '프리뷰 초안...',
    final_text: '최종본...',
    compliance_mode: 'medical_on',
    qc_status: 'PASS',
    created_at: '2026-01-15T12:00:00',
    updated_at: '2026-01-15T12:00:00'
  },
  {
    content_id: 'cnt_demo_002',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_002',
    user_id: 'usr_demo_user1',
    persona_id: 'per_demo_002',
    raw_id: 'raw_demo_002',
    format_id: 'fmt_blog',
    title: '홈카페 라떼아트 꿀팁',
    draft_text: '카페 사장 되면...',
    final_text: '집에서 즐기는 홈카페...',
    compliance_mode: 'general',
    qc_status: 'PASS',
    created_at: '2026-01-14T10:30:00',
    updated_at: '2026-01-14T11:00:00'
  },
  {
    content_id: 'cnt_demo_003',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_001',
    user_id: 'usr_demo_user2',
    persona_id: 'per_demo_001',
    raw_id: 'raw_demo_003',
    format_id: 'fmt_ad_copy',
    title: '겨울철 피부관리 광고문구',
    draft_text: '겨울철 건조한 피부...',
    final_text: '촉촉하고 건강한 피부를 위한...',
    compliance_mode: 'medical_on',
    qc_status: 'WARN',
    qc_notes: '전후비교 문구 수정 필요',
    created_at: '2026-01-13T14:00:00',
    updated_at: '2026-01-13T14:30:00'
  },
  {
    content_id: 'cnt_demo_004',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_003',
    user_id: 'usr_demo_user1',
    persona_id: 'per_demo_003',
    raw_id: 'raw_demo_004',
    format_id: 'fmt_blog',
    title: 'AI 기반 업무 자동화 가이드',
    draft_text: 'AI 자동화란...',
    final_text: 'AI를 활용한 업무 효율화...',
    compliance_mode: 'general',
    qc_status: 'PASS',
    created_at: '2026-01-12T09:00:00',
    updated_at: '2026-01-12T10:00:00'
  },
  {
    content_id: 'cnt_demo_005',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_001',
    user_id: 'usr_demo_user2',
    persona_id: 'per_demo_001',
    raw_id: 'raw_demo_005',
    format_id: 'fmt_shortform',
    title: '100% 효과 보장 시술',
    draft_text: '100% 효과 보장...',
    final_text: '',
    compliance_mode: 'medical_on',
    qc_status: 'FAIL',
    qc_notes: '과장/효능 단정 가능성 높음: 문구 수정 필요',
    created_at: '2026-01-11T16:00:00',
    updated_at: '2026-01-11T16:00:00'
  },
];

// Mock Formats
export const mockFormats: Format[] = [
  {
    format_id: 'fmt_shortform',
    name: '쇼츠/릴스 스크립트',
    channel_primary: 'shorts',
    length_class: 'short',
    is_mvp_enabled: true,
    created_at: '2026-01-15T12:00:00'
  },
  {
    format_id: 'fmt_blog',
    name: '블로그 포스팅',
    channel_primary: 'blog',
    length_class: 'long',
    is_mvp_enabled: true,
    created_at: '2026-01-15T12:00:00'
  },
  {
    format_id: 'fmt_ad_copy',
    name: '광고 문구',
    channel_primary: 'ads',
    length_class: 'short',
    is_mvp_enabled: true,
    created_at: '2026-01-15T12:00:00'
  },
];

// Mock Prompts
export const mockPrompts: Prompt[] = [
  {
    prompt_id: 'prm_shortform_v1',
    workspace_id: 'ws_demo_001',
    scope: 'workspace',
    format_id: 'fmt_shortform',
    name: 'shortform_prompt',
    version: 1,
    status: 'published',
    prompt_text: '[SYSTEM]\n당신은 전문 콘텐츠 크리에이터입니다...\n[USER]\n{{brand_context}}',
    created_at: '2026-01-15T12:00:00',
    published_at: '2026-01-15T12:00:00'
  },
  {
    prompt_id: 'prm_qualitycheck_v1',
    workspace_id: 'ws_demo_001',
    scope: 'workspace',
    name: 'quality_check_prompt',
    version: 1,
    status: 'published',
    prompt_text: '다음 문구가 의료광고법/과장광고/후기형식/효능단정에 해당하는지 판단하고 수정안을 제시하라.\n입력: {{draft}}',
    created_at: '2026-01-15T12:00:00',
    published_at: '2026-01-15T12:00:00'
  },
  {
    prompt_id: 'prm_blog_v1',
    workspace_id: 'ws_demo_001',
    scope: 'workspace',
    format_id: 'fmt_blog',
    name: 'blog_prompt',
    version: 2,
    status: 'published',
    prompt_text: '[SYSTEM]\n블로그 콘텐츠 전문가입니다...',
    created_at: '2026-01-14T10:00:00',
    published_at: '2026-01-14T11:00:00'
  },
  {
    prompt_id: 'prm_blog_v0',
    workspace_id: 'ws_demo_001',
    scope: 'workspace',
    format_id: 'fmt_blog',
    name: 'blog_prompt',
    version: 1,
    status: 'archived',
    prompt_text: '[SYSTEM]\n블로그 작성자입니다...',
    created_at: '2026-01-10T10:00:00',
    published_at: '2026-01-10T11:00:00'
  },
];

// Mock References
export const mockReferences: Reference[] = [
  {
    ref_id: 'ref_demo_001',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_001',
    format_id: 'fmt_shortform',
    ref_type: 'hook_patterns',
    title: '후킹 패턴 5종',
    content: '1) 문제제기 2) 반전 3) 숫자 4) 비교 5) 금지-허용',
    version: 1,
    status: 'published',
    is_active: true,
    created_at: '2026-01-15T12:00:00',
    published_at: '2026-01-15T12:00:00'
  },
  {
    ref_id: 'ref_demo_002',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_002',
    format_id: 'fmt_blog',
    ref_type: 'tone_guide',
    title: '블로그 톤 가이드',
    content: '친근하지만 전문적인 톤, 과장 표현 지양, 1,000자 이상 권장',
    version: 2,
    status: 'published',
    is_active: true,
    created_at: '2026-01-14T09:30:00',
    published_at: '2026-01-14T10:00:00'
  },
  {
    ref_id: 'ref_demo_003',
    workspace_id: 'ws_demo_001',
    client_id: 'cl_demo_003',
    format_id: 'fmt_ad_copy',
    ref_type: 'banned_phrases',
    title: '광고 금지 표현',
    content: '100% 보장, 즉시 효과, 완치, 부작용 없음 등',
    version: 1,
    status: 'draft',
    is_active: false,
    created_at: '2026-01-13T16:00:00'
  }
];

// Mock Compliance Rules
export const mockComplianceRules: ComplianceRule[] = [
  {
    rule_id: 'cr_001',
    workspace_id: 'ws_demo_001',
    domain: 'medical_ad',
    severity: 'block',
    pattern: '(100%|완치|즉시효과|부작용\\s*없음)',
    message: '과장/효능 단정 가능성 높음: 문구 수정 필요',
    is_active: true,
    created_at: '2026-01-15T12:00:00'
  },
  {
    rule_id: 'cr_002',
    workspace_id: 'ws_demo_001',
    domain: 'medical_ad',
    severity: 'warn',
    pattern: '(전후\\s*비교|Before\\s*-\\s*After|후기\\s*인증)',
    message: '전후비교/후기형식은 제한될 수 있음',
    is_active: true,
    created_at: '2026-01-15T12:00:00'
  },
  {
    rule_id: 'cr_003',
    workspace_id: 'ws_demo_001',
    domain: 'general',
    severity: 'info',
    pattern: '(최저가|가장\\s*저렴)',
    message: '가격 비교 표현은 근거 필요',
    is_active: true,
    created_at: '2026-01-14T10:00:00'
  },
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    job_id: 'job_demo_001',
    workspace_id: 'ws_demo_001',
    user_id: 'usr_demo_user1',
    client_id: 'cl_demo_001',
    persona_id: 'per_demo_001',
    format_id: 'fmt_blog',
    status: 'completed',
    request_json: '{"mode":"full_generate","stream":true}',
    result_content_id: 'cnt_demo_001',
    created_at: '2026-01-15T12:00:00',
    started_at: '2026-01-15T12:00:05',
    finished_at: '2026-01-15T12:01:30'
  },
  {
    job_id: 'job_demo_002',
    workspace_id: 'ws_demo_001',
    user_id: 'usr_demo_user2',
    client_id: 'cl_demo_002',
    persona_id: 'per_demo_002',
    format_id: 'fmt_shortform',
    status: 'running',
    request_json: '{"mode":"quick_generate"}',
    created_at: '2026-01-15T14:30:00',
    started_at: '2026-01-15T14:30:02'
  },
  {
    job_id: 'job_demo_003',
    workspace_id: 'ws_demo_001',
    user_id: 'usr_demo_user1',
    client_id: 'cl_demo_003',
    persona_id: 'per_demo_003',
    format_id: 'fmt_ad_copy',
    status: 'queued',
    request_json: '{"mode":"full_generate"}',
    created_at: '2026-01-15T14:35:00'
  },
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann_001',
    title: '새로운 컴플라이언스 규칙 업데이트',
    content: '의료광고법 개정에 따라 컴플라이언스 규칙이 업데이트되었습니다. 자세한 내용은 규칙 관리 페이지를 확인해주세요.',
    type: 'update',
    is_published: true,
    is_pinned: true,
    created_at: '2026-01-15T09:00:00',
    updated_at: '2026-01-15T09:00:00',
    author_id: 'usr_demo_admin'
  },
  {
    id: 'ann_002',
    title: '시스템 정기 점검 안내',
    content: '1월 20일 새벽 2시~4시 시스템 정기 점검이 예정되어 있습니다.',
    type: 'maintenance',
    is_published: true,
    is_pinned: false,
    created_at: '2026-01-14T15:00:00',
    updated_at: '2026-01-14T15:00:00',
    author_id: 'usr_demo_admin'
  },
  {
    id: 'ann_003',
    title: 'Pro 요금제 오픈 이벤트',
    content: '2월 한 달간 Pro 요금제 50% 할인 이벤트를 진행합니다.',
    type: 'event',
    is_published: false,
    is_pinned: false,
    created_at: '2026-01-13T10:00:00',
    updated_at: '2026-01-13T10:00:00',
    author_id: 'usr_demo_admin'
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  weeklyContents: 47,
  weeklyContentsChange: 12.5,
  activeClients: 12,
  activeClientsChange: 8.3,
  compliancePassRate: 94.2,
  compliancePassRateChange: 2.1
};

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    audit_id: 'aud_001',
    workspace_id: 'ws_demo_001',
    actor_user_id: 'usr_demo_admin',
    action: 'PROMPT_PUBLISH',
    entity_type: 'prompts',
    entity_id: 'prm_shortform_v1',
    before_json: '{}',
    after_json: '{"status":"published"}',
    created_at: '2026-01-15T12:00:00'
  },
  {
    audit_id: 'aud_002',
    workspace_id: 'ws_demo_001',
    actor_user_id: 'usr_demo_user1',
    action: 'CONTENT_CREATE',
    entity_type: 'contents',
    entity_id: 'cnt_demo_001',
    created_at: '2026-01-15T11:30:00'
  },
  {
    audit_id: 'aud_003',
    workspace_id: 'ws_demo_001',
    actor_user_id: 'usr_demo_admin',
    action: 'USER_DEACTIVATE',
    entity_type: 'users',
    entity_id: 'usr_demo_user3',
    before_json: '{"is_active":true}',
    after_json: '{"is_active":false}',
    created_at: '2026-01-14T16:00:00'
  },
];

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(u => u.user_id === userId);
};

// Helper function to get client by ID
export const getClientById = (clientId: string): Client | undefined => {
  return mockClients.find(c => c.client_id === clientId);
};

// Helper function to get format by ID
export const getFormatById = (formatId: string): Format | undefined => {
  return mockFormats.find(f => f.format_id === formatId);
};

// Content stats by user
export const getContentsByUser = (): { user: User; count: number }[] => {
  const countMap: { [key: string]: number } = {};
  mockContents.forEach(c => {
    countMap[c.user_id] = (countMap[c.user_id] || 0) + 1;
  });
  
  return Object.entries(countMap).map(([userId, count]) => ({
    user: getUserById(userId)!,
    count
  })).filter(item => item.user);
};
