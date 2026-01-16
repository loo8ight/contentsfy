'use client';

import React from 'react';
import { Job, User, Client, Format } from '@/types';
import { Loader2, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface JobsOverviewProps {
  jobs: Job[];
  users: User[];
  clients: Client[];
  formats: Format[];
}

const getStatusInfo = (status: Job['status']) => {
  switch (status) {
    case 'completed':
      return {
        icon: <CheckCircle className="w-4 h-4" />,
        label: '완료',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        dotColor: 'bg-green-500'
      };
    case 'running':
      return {
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        label: '진행중',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        dotColor: 'bg-blue-500'
      };
    case 'queued':
      return {
        icon: <Clock className="w-4 h-4" />,
        label: '대기중',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        dotColor: 'bg-gray-400'
      };
    case 'failed':
      return {
        icon: <XCircle className="w-4 h-4" />,
        label: '실패',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        dotColor: 'bg-red-500'
      };
    default:
      return {
        icon: <AlertCircle className="w-4 h-4" />,
        label: '알 수 없음',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        dotColor: 'bg-gray-400'
      };
  }
};

export default function JobsOverview({ jobs, users, clients, formats }: JobsOverviewProps) {
  const getUser = (userId: string) => users.find(u => u.user_id === userId);
  const getClient = (clientId: string) => clients.find(c => c.client_id === clientId);
  const getFormat = (formatId: string) => formats.find(f => f.format_id === formatId);

  // Stats
  const completedCount = jobs.filter(j => j.status === 'completed').length;
  const runningCount = jobs.filter(j => j.status === 'running').length;
  const queuedCount = jobs.filter(j => j.status === 'queued').length;
  const failedCount = jobs.filter(j => j.status === 'failed').length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">생성 작업 현황</h3>
        <p className="text-sm text-gray-500">현재 진행중인 콘텐츠 생성 작업</p>
      </div>

      {/* Stats Summary */}
      <div className="px-6 py-4 grid grid-cols-4 gap-4 border-b border-gray-100 bg-gray-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{completedCount}</div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            완료
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{runningCount}</div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            진행중
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{queuedCount}</div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            대기중
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{failedCount}</div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            실패
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto">
        {jobs.map(job => {
          const user = getUser(job.user_id);
          const client = getClient(job.client_id);
          const format = getFormat(job.format_id);
          const statusInfo = getStatusInfo(job.status);

          return (
            <div key={job.job_id} className="px-6 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`}></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{format?.name || '알 수 없음'}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{client?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{user?.display_name}</span>
                      <span>•</span>
                      <span>{job.job_id}</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                  {statusInfo.icon}
                  {statusInfo.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
