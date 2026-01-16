'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { mockUsers, mockWorkspaces } from '@/lib/mock-data';
import { User } from '@/types';
import { 
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  UserCheck,
  UserX,
  Eye,
  Mail,
  Calendar,
  Building2,
  Coins,
  StickyNote
} from 'lucide-react';

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getRoleBadge = (role: User['role']) => {
  switch (role) {
    case 'admin':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          <Shield className="w-3 h-3" />
          관리자
        </span>
      );
    case 'member':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          멤버
        </span>
      );
    case 'viewer':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
          뷰어
        </span>
      );
  }
};

const getPlanBadge = (plan: User['plan']) => {
  switch (plan) {
    case 'free':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
          Free
        </span>
      );
    case 'pro':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          Pro
        </span>
      );
    case 'business':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          Business
        </span>
      );
  }
};

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [addUsageAmount, setAddUsageAmount] = useState<number>(0);
  const [editMemo, setEditMemo] = useState<string>('');

  const getWorkspace = (workspaceId: string) => 
    mockWorkspaces.find(w => w.workspace_id === workspaceId);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' ? user.is_active : !user.is_active);
    return matchesSearch && matchesRole && matchesStatus;
  });

  useEffect(() => {
    if (selectedUser) {
      setAddUsageAmount(0);
      setEditMemo(selectedUser.memo || '');
    }
  }, [selectedUser]);

  return (
    <div className="min-h-screen">
      <Header 
        title="사용자 관리" 
        subtitle="플랫폼 사용자를 관리하고 권한을 설정합니다"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">전체 사용자</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">활성 사용자</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{users.filter(u => u.is_active).length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">관리자</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">{users.filter(u => u.role === 'admin').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">비활성 사용자</p>
            <p className="text-2xl font-bold text-gray-400 mt-1">{users.filter(u => !u.is_active).length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="이름 또는 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">모든 역할</option>
            <option value="admin">관리자</option>
            <option value="member">멤버</option>
            <option value="viewer">뷰어</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    플랜
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    워크스페이스
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    사용량
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => {
                  const workspace = getWorkspace(user.workspace_id);
                  return (
                    <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.display_name}
                            className="w-10 h-10 rounded-full bg-gray-100"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{user.display_name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4">
                        {getPlanBadge(user.plan)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{workspace?.name || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.is_active ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            <UserCheck className="w-3 h-3" />
                            활성
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            <UserX className="w-3 h-3" />
                            비활성
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Coins className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{user.usage_remaining}</span>
                            <span className="text-gray-400">/ {user.usage_total}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(user.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
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

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <UserX className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 p-6 animate-fade-in">
            <div className="text-center mb-6">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.display_name}
                className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-900">{selectedUser.display_name}</h2>
              <p className="text-gray-500">{selectedUser.email}</p>
              <div className="mt-2">{getRoleBadge(selectedUser.role)}</div>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">사용자 ID</span>
                <span className="text-gray-900 font-mono text-sm">{selectedUser.user_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">워크스페이스</span>
                <span className="text-gray-900">{getWorkspace(selectedUser.workspace_id)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">상태</span>
                <span className={selectedUser.is_active ? 'text-green-600' : 'text-gray-500'}>
                  {selectedUser.is_active ? '활성' : '비활성'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">플랜</span>
                <span className="text-gray-900">
                  {selectedUser.plan === 'free' && 'Free'}
                  {selectedUser.plan === 'pro' && 'Pro'}
                  {selectedUser.plan === 'business' && 'Business'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">남은 사용량</span>
                <span className="text-gray-900">
                  {selectedUser.usage_remaining} / {selectedUser.usage_total}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">관리자 추가</span>
                <span className="text-gray-900">{selectedUser.admin_topup_count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">가입일</span>
                <span className="text-gray-900">{formatDate(selectedUser.created_at)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사용량 추가
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={addUsageAmount}
                    onChange={(e) => setAddUsageAmount(Number(e.target.value))}
                    className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="추가 횟수"
                  />
                  <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    추가 적용
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  관리자 추가는 잔여 사용량에 가산됩니다.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  메모
                </label>
                <textarea
                  rows={3}
                  value={editMemo}
                  onChange={(e) => setEditMemo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="메모를 입력하세요"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  닫기
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  수정 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
