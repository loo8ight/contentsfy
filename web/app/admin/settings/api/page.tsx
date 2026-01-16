'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { 
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ArrowDownUp
} from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  provider: string;
  models: string;
  key: string;
  created_at: string;
  last_used?: string;
  status: 'active' | 'standby' | 'disabled';
  rotation_order: number;
}

const mockApiKeys: ApiKey[] = [
  {
    id: 'key_001',
    name: 'Production API Key',
    provider: 'Google Gemini',
    models: 'gemini-3-flash-preview, gemini-3-pro',
    key: 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    created_at: '2026-01-10T10:00:00',
    last_used: '2026-01-15T14:30:00',
    status: 'active',
    rotation_order: 1
  },
  {
    id: 'key_002',
    name: 'Development API Key',
    provider: 'Anthropic Claude',
    models: 'claude-3.5-sonnet, claude-3-opus',
    key: 'sk_test_yyyyyyyyyyyyyyyyyyyyyyyyyyyy',
    created_at: '2026-01-12T09:00:00',
    status: 'standby',
    rotation_order: 2
  }
];

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function ApiSettingsPage() {
  const [apiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleShowKey = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="API 설정" 
        subtitle="API 키와 모델을 한 번에 관리합니다"
      />

      <div className="p-6 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">API 키를 안전하게 보관하세요</p>
              <p className="text-sm text-yellow-700 mt-1">
                API 키는 절대 공개 저장소나 클라이언트 사이드 코드에 노출되어서는 안 됩니다.
              </p>
            </div>
          </div>

          {/* API Keys */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">API 키 & 모델</h3>
                <p className="text-sm text-gray-500">키 하나에 제공사/모델을 함께 설정합니다</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                새 키 생성
              </button>
            </div>

            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">현재 활성 키</p>
                <p className="font-semibold text-gray-900">
                  {apiKeys.find(k => k.status === 'active')?.name || '없음'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ArrowDownUp className="w-4 h-4" />
                키 순환 구조 활성
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Key className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{apiKey.name}</p>
                        <p className="text-xs text-gray-500">생성일: {formatDate(apiKey.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {apiKey.status === 'active' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          활성
                        </span>
                      )}
                      {apiKey.status === 'standby' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          순환 대기
                        </span>
                      )}
                      {apiKey.status === 'disabled' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          비활성
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">제공사</p>
                      <p className="text-sm text-gray-900">{apiKey.provider}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 mb-1">모델</p>
                      <p className="text-sm text-gray-900 truncate">{apiKey.models}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg font-mono text-sm text-gray-600 overflow-hidden">
                      {showKeys[apiKey.id] ? apiKey.key : apiKey.key.replace(/./g, '•').slice(0, 40) + '...'}
                    </div>
                    <button 
                      onClick={() => toggleShowKey(apiKey.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
                    >
                      <Copy className="w-4 h-4" />
                      {copiedKey === apiKey.id && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded">
                          복사됨!
                        </span>
                      )}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>순환 순서: {apiKey.rotation_order}</span>
                    {apiKey.last_used && <span>마지막 사용: {formatDate(apiKey.last_used)}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">새 API 키 생성</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  키 이름
                </label>
                <input
                  type="text"
                  placeholder="예: Production API Key"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제공사
                </label>
                <input
                  type="text"
                  placeholder="예: Google Gemini, Anthropic Claude"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  모델 (직접 입력)
                </label>
                <input
                  type="text"
                  placeholder="예: gemini-3-flash-preview, claude-3.5-sonnet"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API 키
                </label>
                <input
                  type="password"
                  placeholder="API Key"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
