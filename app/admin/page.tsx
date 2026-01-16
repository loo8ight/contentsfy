'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import { StatCard, RecentContentsTable, UserContentStats } from '@/components/dashboard';
import { FileText, Users, Shield } from 'lucide-react';
import {
  mockDashboardStats,
  mockContents,
  mockUsers,
  mockClients,
  mockFormats
} from '@/lib/mock-data';

export default function AdminDashboard() {
  const stats = mockDashboardStats;

  return (
    <div className="min-h-screen">
      <Header 
        title="관리자 대시보드" 
        subtitle="Contentsfy 전체 현황을 모니터링합니다"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="이번주 콘텐츠"
            value={stats.weeklyContents}
            change={stats.weeklyContentsChange}
            icon={FileText}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="활성 클라이언트"
            value={stats.activeClients}
            change={stats.activeClientsChange}
            icon={Users}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            title="컴플라이언스 통과율"
            value={`${stats.compliancePassRate}%`}
            change={stats.compliancePassRateChange}
            icon={Shield}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1">
          <RecentContentsTable
            contents={mockContents}
            users={mockUsers}
            clients={mockClients}
            formats={mockFormats}
          />
        </div>

        {/* User Content Stats */}
        <UserContentStats
          users={mockUsers}
          contents={mockContents}
        />
      </div>
    </div>
  );
}
