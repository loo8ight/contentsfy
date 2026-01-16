'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockReferences, mockFormats, mockClients } from '@/lib/mock-data';
import { Reference } from '@/types';
import {
  BookOpen,
  Search,
  Filter,
  FileText,
  CheckCircle,
  Archive,
  Eye,
  Tag,
  Building2,
  X,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const getStatusBadge = (status: Reference['status']) => {
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
          <FileText className="w-3.5 h-3.5" />
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

export default function ReferencesPage() {
  const [references, setReferences] = useState<Reference[]>(mockReferences);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);

  const getFormat = (formatId?: string) => {
    if (!formatId) return null;
    return mockFormats.find(f => f.format_id === formatId);
  };

  const getClient = (clientId: string) => {
    return mockClients.find(c => c.client_id === clientId);
  };

  const filteredReferences = references.filter(ref => {
    const matchesSearch = ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ref.status === filterStatus;
    const matchesFormat = filterFormat === 'all' || ref.format_id === filterFormat;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  const publishedCount = references.filter(r => r.status === 'published').length;
  const draftCount = references.filter(r => r.status === 'draft').length;
  const archivedCount = references.filter(r => r.status === 'archived').length;

  const toggleReferenceActive = (refId: string) => {
    setReferences(prev => prev.map(ref =>
      ref.ref_id === refId ? { ...ref, is_active: !ref.is_active } : ref
    ));
  };

  return (
    <div className="min-h-screen">
      <Header
        title="레퍼런스 관리"
        subtitle="포맷별 레퍼런스를 관리합니다"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">전체 레퍼런스</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{references.length}</p>
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
              placeholder="레퍼런스 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">모든 포맷</option>
            {mockFormats.map(format => (
              <option key={format.format_id} value={format.format_id}>
                {format.name}
              </option>
            ))}
          </select>

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

        {/* References Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    활성
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    레퍼런스
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    포맷
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    클라이언트
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    버전
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReferences.map((reference) => {
                  const format = getFormat(reference.format_id);
                  const client = getClient(reference.client_id);

                  return (
                    <tr key={reference.ref_id} className={`hover:bg-gray-50 transition-colors ${!reference.is_active ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleReferenceActive(reference.ref_id)}
                          className="text-2xl"
                        >
                          {reference.is_active ? (
                            <ToggleRight className="w-8 h-8 text-green-600" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{reference.title}</p>
                            <p className="text-xs text-gray-500 font-mono">{reference.ref_id}</p>
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
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{client?.name || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(reference.status)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 bg-blue-50 text-blue-700 text-sm font-medium rounded">
                          v{reference.version}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedReference(reference)}
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredReferences.length === 0 && (
            <div className="py-16 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reference Detail Modal */}
      {selectedReference && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">레퍼런스 상세</h2>
                <p className="text-sm text-gray-500">{selectedReference.ref_id}</p>
              </div>
              <button
                onClick={() => setSelectedReference(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="flex items-center gap-3 mb-4">
                {getStatusBadge(selectedReference.status)}
                {getFormat(selectedReference.format_id) && (
                  <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {getFormat(selectedReference.format_id)?.name}
                  </span>
                )}
                <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  {selectedReference.ref_type}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedReference.title}</h3>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                {selectedReference.content}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">클라이언트</p>
                  <p className="text-sm text-gray-900 mt-1">{getClient(selectedReference.client_id)?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">버전</p>
                  <p className="text-sm text-gray-900 mt-1">v{selectedReference.version}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">생성일</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(selectedReference.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">배포일</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(selectedReference.published_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
