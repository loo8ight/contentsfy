// User Types
export interface User {
  user_id: string;
  workspace_id: string;
  role: 'admin' | 'member' | 'viewer';
  plan: 'free' | 'pro' | 'business';
  usage_remaining: number;
  usage_total: number;
  admin_topup_count: number;
  memo?: string;
  display_name: string;
  email?: string;
  created_at: string;
  is_active: boolean;
  avatar?: string;
}

// Workspace Types
export interface Workspace {
  workspace_id: string;
  name: string;
  plan: 'mvp_free' | 'starter' | 'pro' | 'enterprise';
  created_at: string;
}

// Client Types
export interface Client {
  client_id: string;
  workspace_id: string;
  name: string;
  industry: string;
  is_medical: boolean;
  created_at: string;
  notes?: string;
}

// Content Types
export interface Content {
  content_id: string;
  workspace_id: string;
  client_id: string;
  user_id: string;
  persona_id: string;
  raw_id: string;
  format_id: string;
  title: string;
  draft_text: string;
  final_text: string;
  compliance_mode: string;
  qc_status: 'PASS' | 'FAIL' | 'WARN' | 'PENDING';
  qc_notes?: string;
  created_at: string;
  updated_at: string;
}

// Format Types
export interface Format {
  format_id: string;
  name: string;
  channel_primary: string;
  length_class: 'short' | 'medium' | 'long';
  is_mvp_enabled: boolean;
  created_at: string;
}

// Prompt Types
export interface Prompt {
  prompt_id: string;
  workspace_id: string;
  scope: 'global' | 'workspace';
  format_id?: string;
  name: string;
  version: number;
  status: 'draft' | 'published' | 'archived';
  prompt_text: string;
  created_at: string;
  published_at?: string;
  rolled_back_from?: string;
}

// Reference Types
export interface Reference {
  ref_id: string;
  workspace_id: string;
  client_id: string;
  format_id?: string;
  ref_type: string;
  title: string;
  content: string;
  version: number;
  status: 'draft' | 'published' | 'archived';
  is_active: boolean;
  created_at: string;
  published_at?: string;
}

// Compliance Rule Types
export interface ComplianceRule {
  rule_id: string;
  workspace_id: string;
  domain: string;
  severity: 'block' | 'warn' | 'info';
  pattern: string;
  message: string;
  is_active: boolean;
  created_at: string;
}

// Job Types
export interface Job {
  job_id: string;
  workspace_id: string;
  user_id: string;
  client_id: string;
  persona_id: string;
  format_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  request_json: string;
  result_content_id?: string;
  error_message?: string;
  created_at: string;
  started_at?: string;
  finished_at?: string;
}

// Persona Types
export interface Persona {
  persona_id: string;
  workspace_id: string;
  client_id: string;
  raw_id: string;
  name: string;
  tone: string;
  target_audience: string;
  key_benefits: string;
  constraints_json: string;
  created_at: string;
}

// Audit Log Types
export interface AuditLog {
  audit_id: string;
  workspace_id: string;
  actor_user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  before_json?: string;
  after_json?: string;
  created_at: string;
}

// API Log Types
export interface ApiLog {
  log_id: string;
  workspace_id: string;
  user_id: string;
  model_marketing_name: string;
  model_id: string;
  tokens_in: number;
  tokens_out: number;
  latency_ms: number;
  qc_status: 'PASS' | 'FAIL' | 'WARN';
  created_at: string;
}

// Announcement Types (for admin notices)
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'notice' | 'update' | 'maintenance' | 'event';
  is_published: boolean;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  weeklyContents: number;
  weeklyContentsChange: number;
  activeClients: number;
  activeClientsChange: number;
  compliancePassRate: number;
  compliancePassRateChange: number;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon: string;
  children?: NavItem[];
}
