'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockUsers } from '@/lib/mock-data';
import { 
  User, 
  Mail,
  Camera,
  Save
} from 'lucide-react';

export default function ProfileSettingsPage() {
  const currentUser = mockUsers.find(u => u.role === 'admin')!;
  const [displayName, setDisplayName] = useState(currentUser.display_name);
  const [email, setEmail] = useState(currentUser.email || '');

  return (
    <div className="min-h-screen">
      <Header 
        title="프로필 설정" 
        subtitle="개인 정보 및 프로필을 관리합니다"
      />

      <div className="p-6 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Avatar Section */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">프로필 이미지</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.display_name}
                    className="w-24 h-24 rounded-full bg-gray-100"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    JPG, GIF 또는 PNG. 최대 2MB.
                  </p>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    이미지 변경
                  </button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    표시 이름
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    사용자 ID
                  </label>
                  <input
                    type="text"
                    value={currentUser.user_id}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    역할
                  </label>
                  <input
                    type="text"
                    value={currentUser.role === 'admin' ? '관리자' : currentUser.role}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                <Save className="w-4 h-4" />
                변경사항 저장
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">비밀번호 변경</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    현재 비밀번호
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    새 비밀번호
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    새 비밀번호 확인
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                비밀번호 변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
