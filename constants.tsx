
import React from 'react';

export const TUX_LOGO = (className: string) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body Shadow */}
    <circle cx="50" cy="55" r="42" fill="currentColor" fillOpacity="0.1" />
    
    {/* Main Body (Penguin Shape) */}
    <path d="M50 8C32 8 18 25 18 50C18 70 28 88 50 88C72 88 82 70 82 50C82 25 68 8 50 8Z" fill="currentColor" />
    
    {/* White Belly (The "Playful" Roundness) */}
    <path d="M50 25C38 25 28 38 28 55C28 72 38 82 50 82C62 82 72 72 72 55C72 38 62 25 50 25Z" fill="white" />
    
    {/* Eyes - Large and Playful */}
    <circle cx="40" cy="35" r="7" fill="white" />
    <circle cx="60" cy="35" r="7" fill="white" />
    <circle cx="41" cy="36" r="3.5" fill="#0F172A" />
    <circle cx="61" cy="36" r="3.5" fill="#0F172A" />
    <circle cx="39" cy="34" r="1.5" fill="white" />
    <circle cx="59" cy="34" r="1.5" fill="white" />
    
    {/* Beak - Modern Orange Accent */}
    <path d="M45 44C45 44 47 52 50 52C53 52 55 44 55 44H45Z" fill="#F97316" />
    <path d="M47 44C47 44 49 48 50 48C51 48 53 44 53 44H47Z" fill="#FB923C" />
    
    {/* Flippers */}
    <path d="M18 50C10 50 8 65 15 72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <path d="M82 50C90 50 92 65 85 72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    
    {/* Feet - Playful Orange Paddles */}
    <path d="M30 85C30 80 40 80 42 85H30Z" fill="#F97316" />
    <path d="M58 85C58 80 68 80 70 85H58Z" fill="#F97316" />
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
