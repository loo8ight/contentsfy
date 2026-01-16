'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { 
  User, 
  Building2, 
  Key, 
  Bell, 
  Users,
  ChevronRight
} from 'lucide-react';

const settingsMenu = [
  {
    name: '프로필',
    description: '개인 정보 및 프로필 설정을 관리합니다',
    href: '/admin/settings/profile',
    icon: User,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    name: '워크스페이스',
    description: '워크스페이스 설정 및 기본 옵션을 관리합니다',
    href: '/admin/settings/workspace',
    icon: Building2,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    name: 'API 설정',
    description: 'API 키 및 외부 서비스 연동을 관리합니다',
    href: '/admin/settings/api',
    icon: Key,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    name: '알림',
    description: '이메일 및 푸시 알림 설정을 관리합니다',
    href: '/admin/settings/notifications',
    icon: Bell,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
  {
    name: '팀 관리',
    description: '팀원 초대 및 권한을 관리합니다',
    href: '/admin/settings/team',
    icon: Users,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600'
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Header 
        title="설정" 
        subtitle="시스템 및 계정 설정을 관리합니다"
      />

      <div className="p-6 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {settingsMenu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
