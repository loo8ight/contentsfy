'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockAnnouncements } from '@/lib/mock-data';
import { Announcement } from '@/types';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Pin, 
  Eye, 
  EyeOff,
  Megaphone,
  AlertCircle,
  Wrench,
  PartyPopper,
  MoreHorizontal,
  Search
} from 'lucide-react';

const getTypeInfo = (type: Announcement['type']) => {
  switch (type) {
    case 'notice':
      return { icon: <Megaphone className="w-4 h-4" />, label: '공지', bgColor: 'bg-blue-50', textColor: 'text-blue-700' };
    case 'update':
      return { icon: <AlertCircle className="w-4 h-4" />, label: '업데이트', bgColor: 'bg-green-50', textColor: 'text-green-700' };
    case 'maintenance':
      return { icon: <Wrench className="w-4 h-4" />, label: '점검', bgColor: 'bg-orange-50', textColor: 'text-orange-700' };
    case 'event':
      return { icon: <PartyPopper className="w-4 h-4" />, label: '이벤트', bgColor: 'bg-purple-50', textColor: 'text-purple-700' };
    default:
      return { icon: <Megaphone className="w-4 h-4" />, label: '공지', bgColor: 'bg-gray-50', textColor: 'text-gray-700' };
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function AnnouncementsPage() {
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || ann.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen">
      <Header 
        title="공지사항 관리" 
        subtitle="사용자에게 표시되는 공지사항을 관리합니다"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="공지사항 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">모든 유형</option>
              <option value="notice">공지</option>
              <option value="update">업데이트</option>
              <option value="maintenance">점검</option>
              <option value="event">이벤트</option>
            </select>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            새 공지사항
          </button>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    작성일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAnnouncements.map((announcement) => {
                  const typeInfo = getTypeInfo(announcement.type);
                  return (
                    <tr key={announcement.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {announcement.is_pinned && (
                            <Pin className="w-4 h-4 text-orange-500" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{announcement.title}</p>
                            <p className="text-sm text-gray-500 truncate max-w-md">{announcement.content}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeInfo.bgColor} ${typeInfo.textColor}`}>
                          {typeInfo.icon}
                          {typeInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {announcement.is_published ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <Eye className="w-3 h-3" />
                            게시됨
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            <EyeOff className="w-3 h-3" />
                            비공개
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{formatDate(announcement.created_at)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                            <Pin className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <Megaphone className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal (Placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg mx-4 p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 mb-4">새 공지사항 작성</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">유형</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="notice">공지</option>
                  <option value="update">업데이트</option>
                  <option value="maintenance">점검</option>
                  <option value="event">이벤트</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="공지사항 내용을 입력하세요"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
                  <span className="text-sm text-gray-700">즉시 게시</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
                  <span className="text-sm text-gray-700">상단 고정</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
