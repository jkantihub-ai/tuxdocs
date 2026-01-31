
export interface DocItem {
  id: string;
  title: string;
  category: 'HOWTO' | 'Guide' | 'FAQ' | 'ManPage';
  summary: string;
  lastUpdated: string;
  content?: string;
}

export interface Contribution {
  id: string;
  type: 'edit' | 'new' | 'flag';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  timestamp: string;
  targetId?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; uri: string }[];
}

export enum NavigationSection {
  Home = 'home',
  HowTos = 'howtos',
  Guides = 'guides',
  ManPages = 'manpages',
  Search = 'search',
  Moderation = 'moderation',
  Terminal = 'terminal',
  About = 'about',
  Pro = 'pro'
}
