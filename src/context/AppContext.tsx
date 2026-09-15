import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Artwork, 
  VideoCourse, 
  PlazaPost, 
  ResourceItem, 
  WorkshopEvent, 
  AppTab, 
  UserRole, 
  CommentItem 
} from '../types';
import { 
  INITIAL_ARTWORKS, 
  INITIAL_VIDEOS, 
  INITIAL_PLAZA_POSTS, 
  INITIAL_RESOURCES, 
  INITIAL_EVENTS 
} from '../data/mockData';

interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'info' | 'heart';
}

interface AppContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  toggleRole: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  
  // Artworks
  artworks: Artwork[];
  addArtwork: (artworkData: Omit<Artwork, 'id' | 'createdAt' | 'likes' | 'isLiked' | 'collects' | 'isCollected' | 'views' | 'status' | 'comments'>) => void;
  toggleLikeArtwork: (id: string) => void;
  toggleCollectArtwork: (id: string) => void;
  addCommentToArtwork: (artworkId: string, content: string, moodEmoji?: string) => void;
  updateArtworkStatus: (id: string, status: 'approved' | 'hidden' | 'pending') => void;
  deleteArtwork: (id: string) => void;
  
  // Plaza Posts
  plazaPosts: PlazaPost[];
  addPlazaPost: (content: string, topic: string, moodTag: string, images?: string[]) => void;
  togglePostReaction: (postId: string, reaction: 'hug' | 'echo' | 'like') => void;
  addCommentToPost: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
  
  // Videos & Resources
  videos: VideoCourse[];
  resources: ResourceItem[];
  events: WorkshopEvent[];
  toggleRegisterEvent: (eventId: string) => void;

  // Modals
  selectedArtworkModal: Artwork | null;
  setSelectedArtworkModal: (artwork: Artwork | null) => void;
  selectedVideoModal: VideoCourse | null;
  setSelectedVideoModal: (video: VideoCourse | null) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  externalLinkModal: ResourceItem | null;
  setExternalLinkModal: (res: ResourceItem | null) => void;

  // Toast
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'heart') => void;
  
  // Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ARTWORKS: 'yilu_artworks_v1',
  PLAZA_POSTS: 'yilu_plaza_posts_v1',
  EVENTS: 'yilu_events_v1',
  ROLE: 'yilu_user_role_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('creator');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedMood, setSelectedMood] = useState('');

  // Artworks state with localStorage
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTWORKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load artworks from storage:', e);
    }
    return INITIAL_ARTWORKS;
  });

  // Plaza posts state with localStorage
  const [plazaPosts, setPlazaPosts] = useState<PlazaPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLAZA_POSTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load plaza posts from storage:', e);
    }
    return INITIAL_PLAZA_POSTS;
  });

  // Events state with localStorage
  const [events, setEvents] = useState<WorkshopEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load events from storage:', e);
    }
    return INITIAL_EVENTS;
  });

  // Constant mock resources & videos
  const [videos] = useState<VideoCourse[]>(INITIAL_VIDEOS);
  const [resources] = useState<ResourceItem[]>(INITIAL_RESOURCES);

  // Modals state
  const [selectedArtworkModal, setSelectedArtworkModal] = useState<Artwork | null>(null);
  const [selectedVideoModal, setSelectedVideoModal] = useState<VideoCourse | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [externalLinkModal, setExternalLinkModal] = useState<ResourceItem | null>(null);

  // Toast
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'heart' = 'info') => {
    setToast({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(artworks));
    } catch (e) {
      console.error('Failed to save artworks to localStorage', e);
    }
  }, [artworks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAZA_POSTS, JSON.stringify(plazaPosts));
    } catch (e) {
      console.error('Failed to save plaza posts to localStorage', e);
    }
  }, [plazaPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Failed to save events to localStorage', e);
    }
  }, [events]);

  const toggleRole = () => {
    const nextRole: UserRole = currentRole === 'creator' ? 'admin' : 'creator';
    setCurrentRole(nextRole);
    showToast(
      nextRole === 'admin' 
        ? '已切换至「管理员 / 评审专家」视角，可进行审核与数据看板查看' 
        : '已切换至「语障青年创作者：林晨」视角', 
      'info'
    );
  };

  // Artwork actions
  const addArtwork = (
    artworkData: Omit<Artwork, 'id' | 'createdAt' | 'likes' | 'isLiked' | 'collects' | 'isCollected' | 'views' | 'status' | 'comments'>
  ) => {
    const newArtwork: Artwork = {
      ...artworkData,
      id: `art-${Date.now()}`,
      createdAt: '刚刚',
      likes: 1,
      isLiked: true,
      collects: 0,
      isCollected: false,
      views: 12,
      status: 'approved',
      comments: [
        {
          id: `cmt-${Date.now()}`,
          authorName: '艺路同行 AI 伴学助手',
          authorAvatar: './images/avatar-yilubot.svg',
          authorBadge: '平台守护机器人',
          content: '已通过 AI 治愈度与绿色合规性审核。这是一幅充满生机与情感的作品，感谢你的勇敢分享！',
          createdAt: '刚刚',
          moodEmoji: '🌸',
          likes: 3,
          isLiked: false
        }
      ]
    };

    setArtworks((prev) => [newArtwork, ...prev]);
    showToast('作品提交成功！已通过 AI 自动初审并在画廊置顶展示', 'success');
  };

  const toggleLikeArtwork = (id: string) => {
    setArtworks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextIsLiked = !item.isLiked;
          const nextLikes = nextIsLiked ? item.likes + 1 : Math.max(0, item.likes - 1);
          if (nextIsLiked) {
            showToast('已为无声创作者送上爱心与掌声！+1', 'heart');
          }
          const updated = { ...item, isLiked: nextIsLiked, likes: nextLikes };
          if (selectedArtworkModal && selectedArtworkModal.id === id) {
            setSelectedArtworkModal(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const toggleCollectArtwork = (id: string) => {
    setArtworks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCollected = !item.isCollected;
          const nextCollects = nextCollected ? item.collects + 1 : Math.max(0, item.collects - 1);
          showToast(nextCollected ? '已将该作品收入您的「个人疗愈灵感集」' : '已从灵感集移除', 'info');
          const updated = { ...item, isCollected: nextCollected, collects: nextCollects };
          if (selectedArtworkModal && selectedArtworkModal.id === id) {
            setSelectedArtworkModal(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const addCommentToArtwork = (artworkId: string, content: string, moodEmoji = '💬') => {
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      authorName: currentRole === 'admin' ? '评审指导组·管理员' : '林晨 (MoMo)',
      authorAvatar: currentRole === 'admin' 
        ? './images/avatar-adminteacher.svg'
        : './images/avatar-chenlin.svg',
      authorBadge: currentRole === 'admin' ? '平台管理员' : '语障青年艺术家',
      content,
      createdAt: '刚刚',
      moodEmoji,
      likes: 1,
      isLiked: false
    };

    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === artworkId) {
          const updated = {
            ...art,
            comments: [newComment, ...art.comments]
          };
          if (selectedArtworkModal && selectedArtworkModal.id === artworkId) {
            setSelectedArtworkModal(updated);
          }
          return updated;
        }
        return art;
      })
    );
    showToast('暖心评论已即时发送并同步至作者！', 'success');
  };

  const updateArtworkStatus = (id: string, status: 'approved' | 'hidden' | 'pending') => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, status } : art))
    );
    showToast(`作品状态已更新为：${status === 'approved' ? '展示中' : '已下架'}`, 'info');
  };

  const deleteArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((art) => art.id !== id));
    if (selectedArtworkModal && selectedArtworkModal.id === id) {
      setSelectedArtworkModal(null);
    }
    showToast('该作品已从平台下架删除', 'info');
  };

  // Plaza actions
  const addPlazaPost = (content: string, topic: string, moodTag: string, images?: string[]) => {
    const newPost: PlazaPost = {
      id: `post-${Date.now()}`,
      author: {
        name: currentRole === 'admin' ? '艺路同行官方服务组' : '林晨 (MoMo)',
        avatar: currentRole === 'admin'
          ? './images/avatar-adminteacher.svg'
          : './images/avatar-chenlin.svg',
        badge: currentRole === 'admin' ? '官方督导' : '语障青年创作者',
        isDeafCreator: currentRole !== 'admin'
      },
      content,
      images,
      topic,
      moodTag,
      createdAt: '刚刚',
      hugs: 1,
      isHugged: true,
      echoes: 0,
      isEchoed: false,
      likes: 1,
      isLiked: true,
      status: 'approved',
      comments: []
    };

    setPlazaPosts((prev) => [newPost, ...prev]);
    showToast('心语动态发布成功！已呈现在广场置顶流', 'success');
  };

  const togglePostReaction = (postId: string, reaction: 'hug' | 'echo' | 'like') => {
    setPlazaPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          if (reaction === 'hug') {
            const next = !post.isHugged;
            showToast(next ? '向创作者送出了一个温暖的隔空拥抱 🫂' : '已取消拥抱', 'heart');
            return { ...post, isHugged: next, hugs: next ? post.hugs + 1 : Math.max(0, post.hugs - 1) };
          }
          if (reaction === 'echo') {
            const next = !post.isEchoed;
            showToast(next ? '心意相通！已记录你的心灵共鸣 🌊' : '已取消共鸣', 'info');
            return { ...post, isEchoed: next, echoes: next ? post.echoes + 1 : Math.max(0, post.echoes - 1) };
          }
          if (reaction === 'like') {
            const next = !post.isLiked;
            showToast(next ? '点赞支持成功 ❤️' : '已取消点赞', 'heart');
            return { ...post, isLiked: next, likes: next ? post.likes + 1 : Math.max(0, post.likes - 1) };
          }
        }
        return post;
      })
    );
  };

  const addCommentToPost = (postId: string, content: string) => {
    const newComment: CommentItem = {
      id: `pcom-${Date.now()}`,
      authorName: currentRole === 'admin' ? '评审指导老师' : '林晨 (MoMo)',
      authorAvatar: currentRole === 'admin'
        ? './images/avatar-adminteacher.svg'
        : './images/avatar-chenlin.svg',
      content,
      createdAt: '刚刚',
      likes: 0
    };

    setPlazaPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
    showToast('已在心语动态下留下温馨回音', 'success');
  };

  const deletePost = (postId: string) => {
    setPlazaPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast('该心语动态已被管理员屏蔽过滤', 'info');
  };

  // Workshop Registration
  const toggleRegisterEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const nextReg = !ev.isRegistered;
          showToast(
            nextReg 
              ? `预约成功！电子凭证已生成，欢迎参加「${ev.title}」` 
              : '已取消该工坊的预约席位', 
            nextReg ? 'success' : 'info'
          );
          return {
            ...ev,
            isRegistered: nextReg,
            registeredCount: nextReg ? ev.registeredCount + 1 : Math.max(0, ev.registeredCount - 1)
          };
        }
        return ev;
      })
    );
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ARTWORKS);
      localStorage.removeItem(STORAGE_KEYS.PLAZA_POSTS);
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
    } catch (e) {
      console.error(e);
    }
    setArtworks(INITIAL_ARTWORKS);
    setPlazaPosts(INITIAL_PLAZA_POSTS);
    setEvents(INITIAL_EVENTS);
    showToast('已重置为答辩评委初始演示数据状态！', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentRole,
        setCurrentRole,
        toggleRole,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedMood,
        setSelectedMood,
        artworks,
        addArtwork,
        toggleLikeArtwork,
        toggleCollectArtwork,
        addCommentToArtwork,
        updateArtworkStatus,
        deleteArtwork,
        plazaPosts,
        addPlazaPost,
        togglePostReaction,
        addCommentToPost,
        deletePost,
        videos,
        resources,
        events,
        toggleRegisterEvent,
        selectedArtworkModal,
        setSelectedArtworkModal,
        selectedVideoModal,
        setSelectedVideoModal,
        isUploadModalOpen,
        setIsUploadModalOpen,
        externalLinkModal,
        setExternalLinkModal,
        toast,
        showToast,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
