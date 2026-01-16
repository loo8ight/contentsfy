'use client';

import React from 'react';
import { Content, User, Client, Format } from '@/types';
import { Eye, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface RecentContentsTableProps {
  contents: Content[];
  users: User[];
  clients: Client[];
  formats: Format[];
}

const getStatusBadge = (status: Content['qc_status']) => {
  switch (status) {
    case 'PASS':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
          <CheckCircle className="w-3 h-3" />
          통과
        </span>
      );
    case 'FAIL':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
          <XCircle className="w-3 h-3" />
          실패
        </span>
      );
    case 'WARN':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
          <AlertTriangle className="w-3 h-3" />
          경고
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
          <Clock className="w-3 h-3" />
          대기중
        </span>
      );
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return '방금 전';
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return date.toLocaleDateString('ko-KR');
};

export default function RecentContentsTable({ contents, users, clients, formats }: RecentContentsTableProps) {
  const getUser = (userId: string) => users.find(u => u.user_id === userId);
  const getClient = (clientId: string) => clients.find(c => c.client_id === clientId);
  const getFormat = (formatId: string) => formats.find(f => f.format_id === formatId);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">최근 생성 콘텐츠</h3>
          <p className="text-sm text-gray-500">부정행위 모니터링용 - 보기만 가능</p>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          전체 보기
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                콘텐츠
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                생성자
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                클라이언트
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                포맷
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                QC 상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                생성일
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contents.map((content) => {
              const user = getUser(content.user_id);
              const client = getClient(content.client_id);
              const format = getFormat(content.format_id);

              return (
                <tr key={content.content_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {content.title}
                      </span>
                      <span className="text-xs text-gray-500">{content.content_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user && (
                        <>
                          <img
                            src={user.avatar}
                            alt={user.display_name}
                            className="w-7 h-7 rounded-full bg-gray-100"
                          />
                          <span className="text-sm text-gray-700">{user.display_name}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{client?.name || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {format?.name || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(content.qc_status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{formatDate(content.created_at)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
