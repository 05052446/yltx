import React from 'react';
import { useApp } from '../context/AppContext';
import { EMOTION_TAGS } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  Eye, 
  Palette, 
  Compass, 
  CheckCircle,
  MessageCircleHeart,
  Lightbulb
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    setActiveTab, 
    setSelectedMood, 
    artworks, 
    setSelectedArtworkModal, 
    events, 
    toggleRegisterEvent,
    setIsUploadModalOpen
  } = useApp();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setActiveTab('gallery');
  };

  // Curated 4 top artworks for the showcase
  const featuredArtworks = artworks.slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Hero Banner */}
      <section 
        id="hero-banner-section" 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5F5F0] via-[#FAF6F0] to-[#EFF6F0] border border-stone-200/70 p-6 sm:p-10 lg:p-12 shadow-sm"
      >
        {/* Soft background visual glow elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-stone-200/80 text-xs font-semibold text-emerald-800 mb-6 shadow-xs backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-600 -ml-3" />
            <span>无障碍艺术疗愈 · 互联网+ 大学生创新创业竞赛示范项目</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-stone-900 tracking-tight leading-[1.2] mb-5">
            让画笔代替言语，<br className="hidden sm:inline" />
            让色彩在<span className="text-emerald-700 underline decoration-amber-300 decoration-wavy decoration-2">无声中产生共鸣</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-2xl">
            专为言语与听力障碍青年打造的数字化艺术疗愈与创作共融空间。我们摒弃传统纯语音依赖，以纯视觉情绪画卷、图文心语广场与专业艺术疗愈工坊为桥梁，让无声的心灵世界绚烂绽放。
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              id="hero-btn-explore-gallery"
              onClick={() => setActiveTab('gallery')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm hover:shadow transition-all group"
            >
              <span>探索疗愈作品库</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-btn-share-story"
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm border border-stone-300/80 shadow-xs transition-all"
            >
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>分享我的无声心事</span>
            </button>

            <button
              id="hero-btn-view-courses"
              onClick={() => setActiveTab('video')}
              className="flex items-center gap-1.5 px-4 py-3 rounded-full text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
            >
              <span>观看正念教程</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">免费</span>
            </button>
          </div>

          {/* Quick Stats summary */}
          <div className="mt-10 pt-8 border-t border-stone-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">1,280<span className="text-emerald-600 text-lg">+</span></div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">入驻语障创作者</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">5,420<span className="text-emerald-600 text-lg">+</span></div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">无声疗愈艺术作品</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">48.6<span className="text-emerald-600 text-lg">k+</span></div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">心灵共鸣点赞</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">99.4<span className="text-emerald-600 text-lg">%</span></div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">情绪舒缓反馈率</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Accessibility Emotion Palette Bar */}
      <section id="home-mood-selector-bar" className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>今日心情视觉通道（无需打字，一键唤醒色彩）</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              点击您当前的情绪状态，平台将自动为您匹配同频无声艺术作品：
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('gallery')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>进入全部画廊</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {EMOTION_TAGS.map((tag) => (
            <button
              key={tag.label}
              id={`home-mood-tag-${tag.label}`}
              onClick={() => handleMoodSelect(tag.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer shadow-xs active:scale-95 ${tag.color}`}
            >
              <span className={`w-2 h-2 rounded-full ${tag.dot}`} />
              <span>#{tag.label}</span>
              <span className="text-[10px] opacity-60">探索共鸣</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. 今日疗愈精选 (Featured Artworks Showcase) */}
      <section id="featured-artworks-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">今日疗愈精选</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              由艺术心理顾问团队精选的治愈力之作，记录无声世界的细腻温度
            </p>
          </div>
          <button
            onClick={() => setActiveTab('gallery')}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>查看更多 (8幅)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Artworks horizontal / bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredArtworks.map((art) => (
            <div
              key={art.id}
              id={`featured-art-card-${art.id}`}
              onClick={() => setSelectedArtworkModal(art)}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col"
            >
              {/* Image container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{art.category}</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-800 text-xs font-semibold shadow-xs">
                  <Heart className={`w-3.5 h-3.5 ${art.isLiked ? 'text-rose-500 fill-rose-500' : 'text-stone-400'}`} />
                  <span>{art.likes}</span>
                </div>
              </div>

              {/* Meta info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {art.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {art.story}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={art.artist.avatar}
                      alt={art.artist.name}
                      className="w-6 h-6 rounded-full ring-1 ring-stone-200"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-stone-800 line-clamp-1">{art.artist.name}</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{art.artist.badge}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Eye className="w-3 h-3" />
                    <span>{art.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 近期疗愈活动预告 (Upcoming Workshops) */}
      <section id="upcoming-events-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">近期线下 & 线上疗愈活动</h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              手语翻译全程陪同 · 纯视觉教案 · 免费提供全套专业艺术画材
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {events.map((event) => {
            const isFull = event.registeredCount >= event.capacity;
            return (
              <div
                key={event.id}
                id={`event-card-${event.id}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-stone-800 shadow-xs">
                      {event.tag}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] bg-stone-900/80 text-white backdrop-blur-xs">
                      席位: {event.registeredCount}/{event.capacity}
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <h3 className="font-bold text-stone-900 text-sm leading-snug">
                      {event.title}
                    </h3>
                    
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 pt-1 text-xs text-stone-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{event.date} {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">讲师：{event.instructor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    id={`btn-register-event-${event.id}`}
                    onClick={() => toggleRegisterEvent(event.id)}
                    disabled={isFull && !event.isRegistered}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      event.isRegistered
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                        : isFull
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'
                    }`}
                  >
                    {event.isRegistered ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>已成功预约席位 (点击取消)</span>
                      </>
                    ) : isFull ? (
                      <span>名额已满</span>
                    ) : (
                      <>
                        <span>免费预约活动名额</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. 核心答辩特色 (Three Core Pillars) */}
      <section className="bg-gradient-to-r from-stone-50 via-emerald-50/40 to-amber-50/40 rounded-3xl p-6 sm:p-8 border border-stone-200/80">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Project Architecture</span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1">
            「艺路同行」大学生创新创业核心价值体系
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            结合特教心理学、信息无障碍技术与文创版权转化，构筑多方共赢闭环
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">以画传心 · 视觉情绪解构</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              突破口语障碍限制，建立标准化的视觉情绪符号系统与高对比色彩语言，让心理压抑与内在渴望在画布上安全着陆。
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <MessageCircleHeart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">心灵共振 · 线上社区互助</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              类似小红书式瀑布流展示机制，支持抱抱、共鸣、爱心多维情感正向反馈，为语障青年打造包容温暖的同行朋友圈。
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">公益造血 · 艺术文创赋能</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              对接企业与公益基金会，推动优秀无声画师作品版权孵化、文创衍生品定制及数字画展，实现从“受助”到“自主造血”。
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
