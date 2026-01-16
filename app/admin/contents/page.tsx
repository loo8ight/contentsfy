'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockContents, mockUsers, mockClients, mockFormats } from '@/lib/mock-data';
import { Content } from '@/types';
import { 
  Search,
  Filter,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  User,
  Building2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const getStatusBadge = (status: Content['qc_status']) => {
  switch (status) {
    case 'PASS':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
          <CheckCircle className="w-3.5 h-3.5" />
          통과
        </span>
      );
    case 'FAIL':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
          <XCircle className="w-3.5 h-3.5" />
          실패
        </span>
      );
    case 'WARN':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
          <AlertTriangle className="w-3.5 h-3.5" />
          경고
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
          <Clock className="w-3.5 h-3.5" />
          대기중
        </span>
      );
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function ContentsPage() {
  const [contents] = useState<Content[]>(mockContents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const getUser = (userId: string) => mockUsers.find(u => u.user_id === userId);
  const getClient = (clientId: string) => mockClients.find(c => c.client_id === clientId);
  const getFormat = (formatId: string) => mockFormats.find(f => f.format_id === formatId);

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || content.qc_status === filterStatus;
    const matchesFormat = filterFormat === 'all' || content.format_id === filterFormat;
    return matchesSearch && matchesStatus && matchesFormat;
  });

  // Stats
  const passCount = contents.filter(c => c.qc_status === 'PASS').length;
  const failCount = contents.filter(c => c.qc_status === 'FAIL').length;
  const warnCount = contents.filter(c => c.qc_status === 'WARN').length;

  return (
    <div className="min-h-screen">
      <Header 
        title="콘텐츠 관리" 
        subtitle="생성된 콘텐츠를 모니터링합니다 (보기 전용)"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">전체 콘텐츠</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{contents.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">QC 통과</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{passCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">경고</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{warnCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">실패</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{failCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="콘텐츠 제목으로 검색..."
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
            <option value="PASS">통과</option>
            <option value="WARN">경고</option>
            <option value="FAIL">실패</option>
            <option value="PENDING">대기중</option>
          </select>

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
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContents.map(content => {
            const user = getUser(content.user_id);
            const client = getClient(content.client_id);
            const format = getFormat(content.format_id);

            return (
              <div 
                key={content.content_id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedContent(content)}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {format?.name}
                  </span>
                  {getStatusBadge(content.qc_status)}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{content.title}</h3>
                
                {content.qc_notes && (
                  <p className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mb-3">
                    {content.qc_notes}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-3 mt-3">
                  <div className="flex items-center gap-1.5">
                    <img 
                      src={user?.avatar} 
                      alt={user?.display_name}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{user?.display_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    <span className="truncate max-w-[100px]">{client?.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(content.created_at)}
                </div>
              </div>
            );
          })}
        </div>

        {filteredContents.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            총 {filteredContents.length}개의 콘텐츠
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">1</span>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Detail Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">콘텐츠 상세</h2>
                <p className="text-sm text-gray-500">{selectedContent.content_id}</p>
              </div>
              <button 
                onClick={() => setSelectedContent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                  {getFormat(selectedContent.format_id)?.name}
                </span>
                {getStatusBadge(selectedContent.qc_status)}
                {selectedContent.compliance_mode !== 'general' && (
                  <span className="inline-flex px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">
                    {selectedContent.compliance_mode}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedContent.title}</h3>

              {selectedContent.qc_notes && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-orange-800 font-medium mb-1">QC 노트</p>
                  <p className="text-sm text-orange-700">{selectedContent.qc_notes}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">초안 (Draft)</h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedContent.draft_text || '(초안 없음)'}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">최종본 (Final)</h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedContent.final_text || '(최종본 없음)'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">생성자</p>
                  <div className="flex items-center gap-2 mt-1">
                    <img 
                      src={getUser(selectedContent.user_id)?.avatar} 
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-900">{getUser(selectedContent.user_id)?.display_name}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">클라이언트</p>
                  <p className="text-sm text-gray-900 mt-1">{getClient(selectedContent.client_id)?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">생성일</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(selectedContent.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">수정일</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(selectedContent.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
