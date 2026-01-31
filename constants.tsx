
import React from 'react';

export const TUX_LOGO = (className: string) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C8.13401 2 5 5.13401 5 9C5 10.3815 5.40228 11.669 6.09641 12.7554C5.40538 13.5678 5 14.6295 5 15.7931C5 18.5133 7.46243 20.7241 10.5 20.7241C10.5186 20.7241 10.537 20.724 10.5555 20.7238C10.8407 21.4398 11.3533 22 12 22C12.6467 22 13.1593 21.4398 13.4445 20.7238C13.463 20.724 13.4814 20.7241 13.5 20.7241C16.5376 20.7241 19 18.5133 19 15.7931C19 14.6295 18.5946 13.5678 17.9036 12.7554C18.5977 11.669 19 10.3815 19 9C19 5.13401 15.866 2 12 2Z" fill="currentColor"/>
    <circle cx="9.5" cy="8.5" r="1.5" fill="black"/>
    <circle cx="14.5" cy="8.5" r="1.5" fill="black"/>
    <path d="M10 11.5C10 11.5 11 13 12 13C13 13 14 11.5 14 11.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 12L11 14.5H13L12 12Z" fill="#FF8C00"/>
  </svg>
);

export const MOCK_DOCS: any[] = [
  {
    id: '1',
    title: 'Linux Kernel 6.x Hardware Hacking',
    category: 'HOWTO',
    summary: 'A deep dive into writing drivers for modern ARM64 systems and custom PCIe devices.',
    lastUpdated: '2024-03-20',
  },
  {
    id: '2',
    title: 'The Advanced Bash-Scripting Guide',
    category: 'Guide',
    summary: 'An in-depth exploration of the art of shell scripting, updated for Bash 5.2+ features.',
    lastUpdated: '2024-01-15',
  },
  {
    id: '3',
    title: 'Docker-to-Podman Migration FAQ',
    category: 'FAQ',
    summary: 'Comprehensive list of differences and migration steps for daemonless container management.',
    lastUpdated: '2024-02-10',
  },
  {
    id: '4',
    title: 'Systemd Boot Optimization',
    category: 'HOWTO',
    summary: 'Techniques for reducing boot time on production servers using systemd-analyze.',
    lastUpdated: '2024-04-01',
  },
  {
    id: '5',
    title: 'Vim Mastery: Modern Configs',
    category: 'Guide',
    summary: 'Transitioning from classic .vimrc to Lua-based NeoVim configurations.',
    lastUpdated: '2023-12-05',
  }
];
