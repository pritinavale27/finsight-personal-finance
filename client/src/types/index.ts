import { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';

export type Theme = 'light' | 'dark' | 'system';

export interface NavItem {
  title: string;
  href: string;
  icon: ComponentType<LucideProps>;
  badge?: string | number;
  description?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  currency: string;
  timezone: string;
}
