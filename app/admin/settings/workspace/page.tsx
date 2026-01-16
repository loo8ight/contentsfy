'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockWorkspaces } from '@/lib/mock-data';
import { 
  Building2,
  Save,
  Globe,
  Clock
} from 'lucide-react';

export default function WorkspaceSettingsPage() {
  const workspace = mockWorkspaces[0];
  const [name, setName] = useState(workspace.name);

  return (
    <div className="min-h-screen">
      <Header 
        title="워크스페이스 설정" 
        subtitle="워크스페이스 정보 및 기본 설정을 관리합니다"
      />

      <div className="p-6 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    워크스페이스 이름
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    워크스페이스 ID
                  </label>
                  <input
                    type="text"
                    value={workspace.workspace_id}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    요금제
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={workspace.plan === 'mvp_free' ? 'MVP Free' : workspace.plan}
                      disabled
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <button className="px-4 py-2.5 text-primary-600 border border-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors">
                      업그레이드
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">기본 설정</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    기본 언어
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white">
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    시간대
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white">
                      <option value="Asia/Seoul">Asia/Seoul (KST)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                <Save className="w-4 h-4" />
                변경사항 저장
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl border border-red-200 overflow-hidden mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-red-600 mb-2">위험 영역</h3>
              <p className="text-sm text-gray-600 mb-4">
                워크스페이스를 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
                이 작업은 되돌릴 수 없습니다.
              </p>
              <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                워크스페이스 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
