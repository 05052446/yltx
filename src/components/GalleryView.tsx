import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, EMOTION_TAGS } from '../data/mockData';
import { 
  Heart, 
  Eye, 
  Sparkles, 
  PlusCircle, 
  Filter, 
  RotateCcw,
  Palette
} from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { 
    artworks, 
    selectedCategory, 
    setSelectedCategory, 
    selectedMood, 
    setSelectedMood,
    searchQuery,
    setSearchQuery,
    setSelectedArtworkModal,
    toggleLikeArtwork,
    setIsUploadModalOpen
  } = useApp();

  // Filter artworks based on category, mood, search, and approved status
  const filteredArtworks = artworks.filter((art) => {
    if (art.status !== 'approved') return false;

    const matchesCategory = selectedCategory === '全部' || art.category === selectedCategory;
    const matchesMood = !selectedMood || art.moodTags.some((tag) => tag.includes(selectedMood));
    const matchesSearch = !searchQuery.trim() || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.moodTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesMood && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Category & Mood Filter Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-4">
        
        {/* Top bar with counter & quick action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif text-stone-900">
                无声画廊 · 艺术疗愈社区
              </h1>
              <p className="text-xs text-stone-500">
                双列/多列流式画廊 · 用色彩倾听心跳 ({filteredArtworks.length} 件展出作品)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(selectedCategory !== '全部' || selectedMood || searchQuery) && (
              <button
                id="btn-clear-filters"
                onClick={() => {
                  setSelectedCategory('全部');
                  setSelectedMood('');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>清空筛选</span>
              </button>
            )}

            <button
              id="gallery-btn-upload"
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs hover:shadow transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>上传我的画作</span>
            </button>
          </div>
        </div>

        {/* Medium Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-cat-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100/90 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Emotion Mood Pills */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <div className="text-[11px] font-semibold text-stone-600 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-stone-600" />
            <span>情绪色彩：</span>
          </div>

          <button
            onClick={() => setSelectedMood('')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              !selectedMood
                ? 'bg-stone-200 text-stone-900 font-bold'
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
            }`}
          >
            全部情绪
          </button>

          {EMOTION_TAGS.map((tag) => {
            const isSelected = selectedMood === tag.label;
            return (
              <button
                key={tag.label}
                id={`gallery-mood-${tag.label}`}
                onClick={() => setSelectedMood(isSelected ? '' : tag.label)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-stone-900 text-stone-900 shadow-xs ring-1 ring-stone-900'
                    : `${tag.color}`
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${tag.dot}`} />
                <span>#{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Waterfall Gallery (CSS Column Waterfall for Xiaohongshu Look) */}
      {filteredArtworks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <Palette className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800">未找到符合筛选的作品</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            您可以尝试更换分类标签、重置情绪筛选，或者成为第一个创作并发布该主题作品的无声艺术家！
          </p>
          <button
            onClick={() => {
              setSelectedCategory('全部');
              setSelectedMood('');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-stone-900 text-white text-xs rounded-full font-medium hover:bg-stone-800 transition-colors"
          >
            清空所有筛选
          </button>
        </div>
      ) : (
        <div 
          id="xiaohongshu-masonry-container" 
          className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5"
        >
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              id={`artwork-card-${art.id}`}
              onClick={() => setSelectedArtworkModal(art)}
              className="break-inside-avoid bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col"
            >
              {/* Image with subtle overlay */}
              <div className="relative overflow-hidden bg-stone-100">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Category tag */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-stone-900/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{art.category}</span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-3 sm:p-4 space-y-2">
                {/* Title */}
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                  {art.title}
                </h3>

                {/* Mood Tags */}
                <div className="flex flex-wrap gap-1">
                  {art.moodTags.slice(0, 2).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Story excerpt */}
                <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {art.story}
                </p>

                {/* Bottom author & like row (Classic Xiaohongshu) */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0 pr-2">
                    <img
                      src={art.artist.avatar}
                      alt={art.artist.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full ring-1 ring-stone-200 shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-stone-800 truncate">
                        {art.artist.name}
                      </span>
                      <span className="text-[9px] text-emerald-700 font-medium truncate">
                        {art.artist.badge}
                      </span>
                    </div>
                  </div>

                  {/* Heart like button with micro-animation */}
                  <button
                    id={`btn-like-art-${art.id}`}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent modal opening
                      toggleLikeArtwork(art.id);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-rose-50 transition-colors group/btn shrink-0"
                    title="为无声画作点赞"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 transition-transform group-hover/btn:scale-125 ${
                        art.isLiked 
                          ? 'text-rose-500 fill-rose-500 scale-110' 
                          : 'text-stone-400 group-hover/btn:text-rose-400'
                      }`} 
                    />
                    <span className={`text-[11px] font-semibold ${art.isLiked ? 'text-rose-600' : 'text-stone-500'}`}>
                      {art.likes}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
