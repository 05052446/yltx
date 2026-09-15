/**
 * Data structures and types for 「艺路同行」 Art Healing Platform
 */

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  badge: string; // e.g., '听障青年水彩画师', '无声陶艺造物者', '手语绘本插画师'
  bio: string;
  location: string;
  artworksCount: number;
  followersCount: number;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  content: string;
  createdAt: string;
  moodEmoji?: string;
  likes: number;
  isLiked?: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  story: string; // "作品背后的无声心事"
  imageUrl: string;
  category: '水彩画' | '数字插画' | '油画' | '陶艺手工' | '情绪涂鸦' | '综合拼贴';
  moodTags: string[]; // e.g., ['平静', '深海呼吸', '治愈']
  moodColor: string; // hex or tailwind class
  paletteColors?: string[]; // e.g. ['#7FA99B', '#F5E6CC', '#F7B7A3']
  artist: Artist;
  likes: number;
  isLiked: boolean;
  collects: number;
  isCollected: boolean;
  views: number;
  createdAt: string;
  status: 'approved' | 'pending' | 'hidden';
  medium?: string; // e.g. "阿诗300g细纹水彩纸 / 美利蓝蜂鸟水彩"
  dimensions?: string; // e.g. "38cm × 53cm"
  comments: CommentItem[];
}

export interface VideoCourse {
  id: string;
  title: string;
  description: string;
  category: 'guide' | 'therapy'; // 'guide': 语障沟通指南, 'therapy': 艺术疗愈教程
  categoryLabel: string;
  duration: string;
  views: string;
  coverUrl: string;
  videoEmbedUrl?: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    isDeafOrHardOfHearing?: boolean;
  };
  tags: string[];
  subtitlesAvailable: boolean;
  coreConcepts: string[];
  keyTakeaway: string;
}

export interface PlazaPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge: string;
    isDeafCreator?: boolean;
  };
  content: string;
  images?: string[];
  topic: string;
  moodTag: string;
  createdAt: string;
  hugs: number;
  isHugged: boolean;
  echoes: number;
  isEchoed: boolean;
  likes: number;
  isLiked: boolean;
  comments: CommentItem[];
  status: 'approved' | 'flagged';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'aac' | 'foundation' | 'psychology' | 'support' | 'space' | 'supplies';
  categoryName: string;
  summary: string;
  organization: string;
  contactOrLink: string;
  isExternalUrl?: boolean;
  actionLabel: string;
  tag: string;
  highlightText: string;
  features: string[];
}

export interface WorkshopEvent {
  id: string;
  title: string;
  tag: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  instructorTitle: string;
  capacity: number;
  registeredCount: number;
  isRegistered: boolean;
  description: string;
  imageUrl: string;
  targetAudience: string;
}

export type AppTab = 'home' | 'gallery' | 'video' | 'plaza' | 'resources' | 'admin';

export type UserRole = 'creator' | 'admin';
