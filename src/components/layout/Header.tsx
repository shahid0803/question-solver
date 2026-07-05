'use client';

import React from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';
import { GlassInput } from '@/components/ui';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-lg border-b border-gray-600/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <GlassInput placeholder="Search questions..." icon={Search} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-800/30 transition-all text-text-secondary">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800/30 transition-all text-text-secondary">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800/30 transition-all text-text-secondary">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
