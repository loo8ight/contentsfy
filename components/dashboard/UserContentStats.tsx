'use client';

import React from 'react';
import { User, Content } from '@/types';
import { FileText, TrendingUp } from 'lucide-react';

interface UserContentStatsProps {
  users: User[];
  contents: Content[];
}

export default function UserContentStats({ users, contents }: UserContentStatsProps) {
  // Calculate content count per user
  const userStats = users.map(user => {
    const userContents = contents.filter(c => c.user_id === user.user_id);
    const passCount = userContents.filter(c => c.qc_status === 'PASS').length;
    const failCount = userContents.filter(c => c.qc_status === 'FAIL').length;
    const warnCount = userContents.filter(c => c.qc_status === 'WARN').length;
    
    return {
      user,
      totalCount: userContents.length,
      passCount,
      failCount,
      warnCount,
      passRate: userContents.length > 0 ? (passCount / userContents.length) * 100 : 0
    };
  }).filter(stat => stat.totalCount > 0).sort((a, b) => b.totalCount - a.totalCount);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">유저별 생성 콘텐츠</h3>
        <p className="text-sm text-gray-500">사용자별 콘텐츠 생성 현황</p>
      </div>

      <div className="divide-y divide-gray-100">
        {userStats.map(({ user, totalCount, passCount, failCount, warnCount, passRate }) => (
          <div key={user.user_id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.display_name}
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{user.display_name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : user.role === 'member'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">{totalCount}</span>
                    <span className="text-sm text-gray-500">콘텐츠</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-green-600">통과 {passCount}</span>
                    <span className="text-yellow-600">경고 {warnCount}</span>
                    <span className="text-red-600">실패 {failCount}</span>
                  </div>
                </div>

                <div className="w-24">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">QC 통과율</span>
                    <span className="text-xs font-medium text-gray-700">{passRate.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        passRate >= 80 ? 'bg-green-500' : passRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${passRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {userStats.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>아직 생성된 콘텐츠가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
