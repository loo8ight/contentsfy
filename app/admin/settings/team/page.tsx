'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockUsers } from '@/lib/mock-data';
import { User } from '@/types';
import { 
  Users,
  Plus,
  MoreHorizontal,
  Shield,
  Trash2,
  Mail,
  X,
  UserPlus
} from 'lucide-react';

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

export default function TeamSettingsPage() {
  const [teamMembers] = useState<User[]>(mockUsers);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="min-h-screen">
      <Header 
        title="팀 관리" 
        subtitle="팀원을 초대하고 권한을 관리합니다"
      />

      <div className="p-6 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">전체 팀원</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{teamMembers.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">관리자</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {teamMembers.filter(m => m.role === 'admin').length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">활성 멤버</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {teamMembers.filter(m => m.is_active).length}
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">팀원 목록</h3>
                <p className="text-sm text-gray-500">워크스페이스에 속한 팀원들을 관리합니다</p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                팀원 초대
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {teamMembers.map((member) => (
                <div key={member.user_id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={member.avatar}
                      alt={member.display_name}
                      className="w-10 h-10 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{member.display_name}</p>
                        {getRoleBadge(member.role)}
                        {!member.is_active && (
                          <span className="text-xs text-gray-400">(비활성)</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select 
                      defaultValue={member.role}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="admin">관리자</option>
                      <option value="member">멤버</option>
                      <option value="viewer">뷰어</option>
                    </select>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Invitations */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">대기중인 초대</h3>
              <p className="text-sm text-gray-500">아직 수락되지 않은 초대입니다</p>
            </div>

            <div className="p-6 text-center text-gray-500">
              <Mail className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>대기중인 초대가 없습니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">팀원 초대</h2>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일 주소
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  역할
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="member">멤버</option>
                  <option value="viewer">뷰어</option>
                  <option value="admin">관리자</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  메시지 (선택)
                </label>
                <textarea
                  rows={3}
                  placeholder="초대 메시지를 작성하세요..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Mail className="w-4 h-4" />
                초대 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
