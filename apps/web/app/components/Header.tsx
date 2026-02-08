import { Terminal } from 'lucide-react';

export function Header() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-black dark:bg-white rounded-lg">
          <Terminal className="w-6 h-6 text-white dark:text-black" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">GitHub Readme Stylist</h1>
        </div>
      </div>
    </header>
  );
}

