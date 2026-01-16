'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockComplianceRules } from '@/lib/mock-data';
import { ComplianceRule } from '@/types';
import { 
  Search,
  Shield,
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  AlertOctagon,
  AlertTriangle,
  Info,
  X,
  Code
} from 'lucide-react';

const getSeverityBadge = (severity: ComplianceRule['severity']) => {
  switch (severity) {
    case 'block':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
          <AlertOctagon className="w-3.5 h-3.5" />
          차단
        </span>
      );
    case 'warn':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
          <AlertTriangle className="w-3.5 h-3.5" />
          경고
        </span>
      );
    case 'info':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
          <Info className="w-3.5 h-3.5" />
          정보
        </span>
      );
  }
};

const getDomainBadge = (domain: string) => {
  switch (domain) {
    case 'medical_ad':
      return (
        <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
          의료광고
        </span>
      );
    case 'general':
      return (
        <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          일반
        </span>
      );
    default:
      return (
        <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          {domain}
        </span>
      );
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function CompliancePage() {
  const [rules, setRules] = useState<ComplianceRule[]>(mockComplianceRules);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rule.pattern.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || rule.severity === filterSeverity;
    const matchesDomain = filterDomain === 'all' || rule.domain === filterDomain;
    return matchesSearch && matchesSeverity && matchesDomain;
  });

  const toggleRuleActive = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.rule_id === ruleId ? { ...rule, is_active: !rule.is_active } : rule
    ));
  };

  // Stats
  const blockCount = rules.filter(r => r.severity === 'block').length;
  const warnCount = rules.filter(r => r.severity === 'warn').length;
  const activeCount = rules.filter(r => r.is_active).length;

  // Unique domains
  const domains = [...new Set(rules.map(r => r.domain))];

  return (
    <div className="min-h-screen">
      <Header 
        title="컴플라이언스 규칙" 
        subtitle="콘텐츠 품질 검사 규칙을 관리합니다"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">전체 규칙</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{rules.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">활성 규칙</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">차단 규칙</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{blockCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">경고 규칙</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{warnCount}</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="규칙 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
            </div>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">모든 심각도</option>
              <option value="block">차단</option>
              <option value="warn">경고</option>
              <option value="info">정보</option>
            </select>

            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">모든 도메인</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            새 규칙
          </button>
        </div>

        {/* Rules List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    활성
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    규칙
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    도메인
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    심각도
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
                {filteredRules.map((rule) => (
                  <tr key={rule.rule_id} className={`hover:bg-gray-50 transition-colors ${!rule.is_active ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleRuleActive(rule.rule_id)}
                        className="text-2xl"
                      >
                        {rule.is_active ? (
                          <ToggleRight className="w-8 h-8 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p className="font-medium text-gray-900 mb-1">{rule.message}</p>
                        <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                          {rule.pattern}
                        </code>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getDomainBadge(rule.domain)}
                    </td>
                    <td className="px-6 py-4">
                      {getSeverityBadge(rule.severity)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{formatDate(rule.created_at)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => setSelectedRule(rule)}
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRules.length === 0 && (
            <div className="py-16 text-center">
              <Shield className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || selectedRule) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedRule ? '규칙 수정' : '새 규칙 추가'}
              </h2>
              <button 
                onClick={() => { setShowCreateModal(false); setSelectedRule(null); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">도메인</label>
                <select 
                  defaultValue={selectedRule?.domain || 'medical_ad'}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="medical_ad">의료광고</option>
                  <option value="general">일반</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">심각도</label>
                <select 
                  defaultValue={selectedRule?.severity || 'warn'}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="block">차단 (Block)</option>
                  <option value="warn">경고 (Warn)</option>
                  <option value="info">정보 (Info)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  패턴 (정규식)
                </label>
                <div className="relative">
                  <Code className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue={selectedRule?.pattern || ''}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                    placeholder="(예시|패턴)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">메시지</label>
                <textarea
                  rows={3}
                  defaultValue={selectedRule?.message || ''}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="규칙 위반 시 표시할 메시지"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  defaultChecked={selectedRule?.is_active ?? true}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  규칙 활성화
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => { setShowCreateModal(false); setSelectedRule(null); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                {selectedRule ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
