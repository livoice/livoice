import type { ReactNode } from 'react';

import { toTranscripts } from '@/services/linker';

export type NavSection = 'primary' | 'settings' | 'secondary';

const MicrophoneIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-slate-400"
  >
    <path d="M9 11.25a3 3 0 0 0 6 0V6a3 3 0 0 0-6 0z" />
    <path d="M5.25 12a6.75 6.75 0 0 0 13.5 0" />
    <path d="M12 16.5v5.25" />
    <path d="M8.25 21.75h7.5" />
  </svg>
);

export interface NavItemConfig {
  key: string;
  labelKey: string;
  icon: ReactNode;
  path: string;
  routePath: string | null;
  section: NavSection;
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    key: 'transcripts',
    labelKey: 'sidebar.transcripts',
    icon: <MicrophoneIcon />,
    path: toTranscripts(),
    routePath: '/transcripts',
    section: 'primary'
  }
];

