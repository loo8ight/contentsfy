'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { 
  Bell,
  Mail,
  Smartphone,
  Monitor,
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
}

const defaultSettings: NotificationSetting[] = [
  {
    id: 'content_created',
    title: '콘텐츠 생성 완료',
    description: '새 콘텐츠가 생성되면 알림을 받습니다',
    email: false,
    push: true,
    inApp: true
  },
  {
    id: 'compliance_fail',
    title: '컴플라이언스 위반',
    description: '컴플라이언스 검사 실패 시 알림을 받습니다',
    email: true,
    push: true,
    inApp: true
  },
  {
    id: 'user_signup',
    title: '새 사용자 가입',
    description: '새 사용자가 가입하면 알림을 받습니다',
    email: true,
    push: false,
    inApp: true
  },
  {
    id: 'system_update',
    title: '시스템 업데이트',
    description: '시스템 업데이트 및 공지사항을 받습니다',
    email: true,
    push: true,
    inApp: true
  },
  {
    id: 'weekly_report',
    title: '주간 리포트',
    description: '매주 콘텐츠 생성 현황 리포트를 받습니다',
    email: true,
    push: false,
    inApp: false
  }
];

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>(defaultSettings);

  const toggleSetting = (settingId: string, channel: 'email' | 'push' | 'inApp') => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId 
        ? { ...setting, [channel]: !setting[channel] }
        : setting
    ));
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="알림 설정" 
        subtitle="이메일 및 푸시 알림 설정을 관리합니다"
      />

      <div className="p-6 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <span className="text-sm font-semibold text-gray-500">알림 유형</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-500">이메일</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-500">푸시</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-500">인앱</span>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="divide-y divide-gray-100">
              {settings.map((setting) => (
                <div key={setting.id} className="px-6 py-4">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="col-span-1">
                      <p className="font-medium text-gray-900">{setting.title}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => toggleSetting(setting.id, 'email')}>
                        {setting.email ? (
                          <ToggleRight className="w-10 h-6 text-primary-600" />
                        ) : (
                          <ToggleLeft className="w-10 h-6 text-gray-300" />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => toggleSetting(setting.id, 'push')}>
                        {setting.push ? (
                          <ToggleRight className="w-10 h-6 text-primary-600" />
                        ) : (
                          <ToggleLeft className="w-10 h-6 text-gray-300" />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => toggleSetting(setting.id, 'inApp')}>
                        {setting.inApp ? (
                          <ToggleRight className="w-10 h-6 text-primary-600" />
                        ) : (
                          <ToggleLeft className="w-10 h-6 text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Bell className="w-4 h-4" />
                알림 설정은 즉시 적용됩니다
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                <Save className="w-4 h-4" />
                저장
              </button>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">이메일 수신 설정</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@contentsfy.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 발송 시간
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="immediate">즉시 발송</option>
                    <option value="hourly">시간별 요약</option>
                    <option value="daily">일별 요약</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
