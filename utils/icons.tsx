import React from 'react';
import { Scale, TrendingUp, Landmark, Search, ShieldCheck, FileText, AlertTriangle, CheckCircle, HelpCircle, Star, Zap, Users, Trophy, Clock, Lock } from 'lucide-react';

// Registry of available icons for the CMS
export const ICON_MAP: Record<string, React.ElementType> = {
  Scale,
  TrendingUp,
  Landmark,
  Search,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Star,
  Zap,
  Users,
  Trophy,
  Clock,
  Lock
};

export const getIconComponent = (iconName: string) => {
  return ICON_MAP[iconName] || ShieldCheck; // Default fallback
};