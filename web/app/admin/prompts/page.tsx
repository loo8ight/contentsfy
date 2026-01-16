'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockPrompts, mockFormats } from '@/lib/mock-data';
import { Prompt } from '@/types';
import { 
  Search,
  MessageSquare,
  CheckCircle,
  Archive,
  FileEdit,
  Eye,
  Copy,
  History,
  X,
  Code,
  ChevronRight
} from 'lucide-react';

const getStatusBadge = (status: Prompt['status']) => {
  switch (status) {
    case 'published':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
          <CheckCircle className="w-3.5 h-3.5" />
          배포됨
        </span>
      );
    case 'draft':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
          <FileEdit className="w-3.5 h-3.5" />
          초안
        </span>
      );
    case 'archived':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
          <Archive className="w-3.5 h-3.5" />
          보관됨
        </span>
      );
  }
};

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function PromptsPage() {
  const [prompts] = useState<Prompt[]>(mockPrompts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const getFormat = (formatId?: string) => {
    if (!formatId) return null;
    return mockFormats.find(f => f.format_id === formatId);
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || prompt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const publishedCount = prompts.filter(p => p.status === 'published').length;
  const draftCount = prompts.filter(p => p.status === 'draft').length;
  const archivedCount = prompts.filter(p => p.status === 'archived').length;

  // Group prompts by name for version history
  const getVersionHistory = (promptName: string) => {
    return prompts
      .filter(p => p.name === promptName)
      .sort((a, b) => b.version - a.version);
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="프롬프트 관리" 
        subtitle="콘텐츠 생성에 사용되는 프롬프트를 관리합니다"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">전체 프롬프트</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{prompts.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">배포됨</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{publishedCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">초안</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{draftCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">보관됨</p>
            <p className="text-2xl font-bold text-gray-400 mt-1">{archivedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="프롬프트 이름으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">모든 상태</option>
            <option value="published">배포됨</option>
            <option value="draft">초안</option>
            <option value="archived">보관됨</option>
          </select>
        </div>

        {/* Prompts Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    프롬프트
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    포맷
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    버전
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    배포일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrompts.map((prompt) => {
                  const format = getFormat(prompt.format_id);
                  const versions = getVersionHistory(prompt.name);

                  return (
                    <tr key={prompt.prompt_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{prompt.name}</p>
                            <p className="text-xs text-gray-500 font-mono">{prompt.prompt_id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {format ? (
                          <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {format.name}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 bg-blue-50 text-blue-700 text-sm font-medium rounded">
                            v{prompt.version}
                          </span>
                          {versions.length > 1 && (
                            <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                              <History className="w-3.5 h-3.5" />
                              {versions.length}개 버전
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(prompt.status)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{formatDate(prompt.published_at)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => setSelectedPrompt(prompt)}
                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredPrompts.length === 0 && (
            <div className="py-16 text-center">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedPrompt.name}</h2>
                  <p className="text-sm text-gray-500">v{selectedPrompt.version}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPrompt(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="flex items-center gap-3 mb-6">
                {getStatusBadge(selectedPrompt.status)}
                {getFormat(selectedPrompt.format_id) && (
                  <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {getFormat(selectedPrompt.format_id)?.name}
                  </span>
                )}
                <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  {selectedPrompt.scope}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-gray-500" />
                  <h4 className="text-sm font-semibold text-gray-700">프롬프트 텍스트</h4>
                </div>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto whitespace-pre-wrap font-mono">
                  {selectedPrompt.prompt_text}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">프롬프트 ID</p>
                  <p className="text-sm text-gray-900 mt-1 font-mono">{selectedPrompt.prompt_id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">워크스페이스 ID</p>
                  <p className="text-sm text-gray-900 mt-1 font-mono">{selectedPrompt.workspace_id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">생성일</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(selectedPrompt.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">배포일</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(selectedPrompt.published_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
