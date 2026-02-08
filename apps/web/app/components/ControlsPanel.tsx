'use client';

import type { Config } from '@github-readme-stylist/core';
import { Activity, BarChart3, Code2, Eye, EyeOff, Github, RefreshCw, Settings, Type } from 'lucide-react';

export type TabId = 'general' | 'ascii' | 'stats' | 'languages' | 'activity';

export type UpdateSection = <S extends keyof Config['sections'], K extends keyof Config['sections'][S]>(
  section: S,
  key: K,
  value: Config['sections'][S][K],
) => void;

type ControlsPanelProps = {
  config: Config;
  fonts: string[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onUsernameChange: (value: string) => void;
  onUpdateSection: UpdateSection;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string;
};

const tabs: Array<{ id: TabId; icon: typeof Settings; label: string }> = [
  { id: 'general', icon: Settings, label: 'General' },
  { id: 'ascii', icon: Type, label: 'ASCII' },
  { id: 'stats', icon: BarChart3, label: 'Stats' },
  { id: 'languages', icon: Code2, label: 'Langs' },
  { id: 'activity', icon: Activity, label: 'Activity' },
];

export function ControlsPanel({
  config,
  fonts,
  activeTab,
  onTabChange,
  onUsernameChange,
  onUpdateSection,
  onGenerate,
  isGenerating,
  error,
}: ControlsPanelProps) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="flex space-x-1 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 min-h-[400px]">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub Username
              </label>
              <input
                type="text"
                value={config.username}
                onChange={(e) => onUsernameChange(e.target.value)}
                className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your GitHub username"
              />
            </div>
          </div>
        )}

        {activeTab === 'ascii' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold">Enable ASCII Section</label>
              <button
                onClick={() => onUpdateSection('ascii', 'enabled', !config.sections.ascii.enabled)}
                className={`p-2 rounded-lg transition-colors ${config.sections.ascii.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
              >
                {config.sections.ascii.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {config.sections.ascii.enabled && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Text</label>
                  <textarea
                    value={config.sections.ascii.text}
                    onChange={(e) => onUpdateSection('ascii', 'text', e.target.value)}
                    className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Font</label>
                  <select
                    value={config.sections.ascii.font}
                    onChange={(e) => onUpdateSection('ascii', 'font', e.target.value)}
                    className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {fonts.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold">Enable Stats Section</label>
              <button
                onClick={() => onUpdateSection('stats', 'enabled', !config.sections.stats.enabled)}
                className={`p-2 rounded-lg transition-colors ${config.sections.stats.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
              >
                {config.sections.stats.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {config.sections.stats.enabled && (
              <div className="space-y-2">
                {(['showCommits', 'showStars', 'showFollowers'] as Array<keyof Config['sections']['stats']>).map(
                  (key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={config.sections.stats[key]}
                        onChange={(e) => onUpdateSection('stats', key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm capitalize">{String(key).replace('show', '')}</span>
                    </label>
                  ),
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold">Enable Languages Section (Python, C Java, etc.)</label>
              <button
                onClick={() => onUpdateSection('languages', 'enabled', !config.sections.languages.enabled)}
                className={`p-2 rounded-lg transition-colors ${config.sections.languages.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
              >
                {config.sections.languages.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {config.sections.languages.enabled && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Amount of Languages to Show</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.sections.languages.topN}
                  onChange={(e) => onUpdateSection('languages', 'topN', parseInt(e.target.value, 10))}
                  className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold">Enable last commits section</label>
              <button
                onClick={() => onUpdateSection('activity', 'enabled', !config.sections.activity.enabled)}
                className={`p-2 rounded-lg transition-colors ${config.sections.activity.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
              >
                {config.sections.activity.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {config.sections.activity.enabled && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Commits to Show</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={config.sections.activity.limit}
                  onChange={(e) => onUpdateSection('activity', 'limit', parseInt(e.target.value, 10))}
                  className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !config.username}
        className="w-full py-4 bg-white hover:bg-gray-50 text-black border border-gray-200 dark:border-gray-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Generating Profile...
          </>
        ) : (
          <>
            <RefreshCw className="w-5 h-5" />
            Generate README
          </>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}
    </div>
  );
}

