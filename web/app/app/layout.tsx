'use client';

import Link from 'next/link';
import { Sparkles, Home, FileText, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900 hidden sm:block">Contentsfy</span>
              </Link>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                <Link href="/app" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Home className="w-4 h-4 inline mr-1.5" />
                  대시보드
                </Link>
                <Link href="/app/create" className="px-3 py-2 text-sm text-primary-600 bg-primary-50 rounded-lg font-medium">
                  <FileText className="w-4 h-4 inline mr-1.5" />
                  콘텐츠 생성
                </Link>
                <Link href="/app/history" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  히스토리
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {/* 사용량 표시 */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                <span className="text-gray-500">남은 생성</span>
                <span className="font-bold text-primary-600">8/10</span>
              </div>
              
              {/* 프로필 */}
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                <User className="w-4 h-4" />
              </button>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-3 space-y-1">
              <Link href="/app" className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                대시보드
              </Link>
              <Link href="/app/create" className="block px-3 py-2 text-primary-600 bg-primary-50 rounded-lg font-medium">
                콘텐츠 생성
              </Link>
              <Link href="/app/history" className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                히스토리
              </Link>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-3 py-2 text-sm text-gray-500">
                  남은 생성: <span className="font-bold text-primary-600">8/10</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}
