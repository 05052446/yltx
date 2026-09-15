import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Heart, 
  Bookmark, 
  Share2, 
  Send, 
  Eye, 
  Sparkles, 
  Calendar, 
  Layers, 
  Maximize2,
  Check,
  MessageCircle,
  Quote
} from 'lucide-react';

export const ArtworkDetailModal: React.FC = () => {
  const { 
    selectedArtworkModal, 
    setSelectedArtworkModal, 
    toggleLikeArtwork, 
    toggleCollectArtwork, 
    addCommentToArtwork,
    showToast
  } = useApp();

  const [commentInput, setCommentInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('💙');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtworkModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedArtworkModal]);

  if (!selectedArtworkModal) return null;

  const artwork = selectedArtworkModal;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    addCommentToArtwork(artwork.id, commentInput.trim(), selectedEmoji);
    setCommentInput('');
  };

  const handleShare = () => {
    setCopiedLink(true);
    showToast('作品分享链接与无声心事卡片已复制到剪贴板！', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const quickEmojis = ['💙', '✨', '🌱', '🫂', '🎨', '🔥', '🌸'];

  return (
    <div 
      id="artwork-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={() => setSelectedArtworkModal(null)}
    >
      <div 
        id="artwork-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col md:flex-row overflow-hidden shadow-2xl border border-stone-200/80 my-auto"
      >
        {/* Close button */}
        <button
          id="btn-close-artwork-modal"
          onClick={() => setSelectedArtworkModal(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors shadow-md backdrop-blur-xs"
          aria-label="关闭作品详情"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Big Artwork Visual */}
        <div className="w-full md:w-1/2 lg:w-3/5 bg-stone-950 flex flex-col justify-center items-center relative min-h-[300px] md:min-h-[550px] p-4 sm:p-8">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
          />

          {/* Color palette extraction display */}
          {artwork.paletteColors && artwork.paletteColors.length > 0 && (
            <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
              <span className="text-[10px] text-stone-300 font-medium">情绪色系提取：</span>
              <div className="flex items-center gap-1.5">
                {artwork.paletteColors.map((color, idx) => (
                  <div 
                    key={idx}
                    className="w-3.5 h-3.5 rounded-full border border-white/30" 
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Artist Bio, Heartfelt Story & Comments */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-between bg-white overflow-hidden max-h-[550px] md:max-h-[92vh]">
          
          {/* Scrollable Story & Details */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
            
            {/* Artist Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src={artwork.artist.avatar}
                  alt={artwork.artist.name}
                  className="w-11 h-11 rounded-full ring-2 ring-emerald-100 object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900 text-sm">{artwork.artist.name}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                      {artwork.artist.badge}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500 mt-0.5 line-clamp-1">{artwork.artist.bio}</span>
                </div>
              </div>
            </div>

            {/* Title and Metadata */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-900 text-white text-[11px] font-medium">
                  {artwork.category}
                </span>
                {artwork.moodTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold font-serif text-stone-900 leading-snug">
                {artwork.title}
              </h2>

              {/* Creation specs */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-1">
                {artwork.medium && (
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-stone-600" />
                    <span>{artwork.medium}</span>
                  </span>
                )}
                {artwork.dimensions && (
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>{artwork.dimensions}</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  <span>发布于 {artwork.createdAt}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-stone-600" />
                  <span>{artwork.views} 次触达</span>
                </span>
              </div>
            </div>

            {/* The Heartfelt Story: "作品背后的无声心事" */}
            <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <Quote className="w-4 h-4 text-emerald-600" />
                <span>作品背后的无声心事</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-wrap font-sans">
                {artwork.story}
              </p>
            </div>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-stone-500" />
                  <span>暖心共鸣与留言 ({artwork.comments.length})</span>
                </div>
                <span className="text-stone-600 text-[11px]">无声世界，有爱共鸣</span>
              </div>

              <div className="space-y-2.5">
                {artwork.comments.map((cmt) => (
                  <div 
                    key={cmt.id}
                    className="p-3 bg-white rounded-xl border border-stone-100 hover:border-stone-200 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={cmt.authorAvatar}
                          alt={cmt.authorName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-stone-800">{cmt.authorName}</span>
                        {cmt.authorBadge && (
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-md">
                            {cmt.authorBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-600">
                        {cmt.moodEmoji && <span>{cmt.moodEmoji}</span>}
                        <span>{cmt.createdAt}</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed pl-7">
                      {cmt.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Interaction & Instant Comment Bar */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            
            {/* Quick Action Buttons (Like, Collect, Share) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  id="modal-btn-like"
                  onClick={() => toggleLikeArtwork(artwork.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    artwork.isLiked
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${artwork.isLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                  <span>{artwork.likes} 赞</span>
                </button>

                <button
                  id="modal-btn-collect"
                  onClick={() => toggleCollectArtwork(artwork.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    artwork.isCollected
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${artwork.isCollected ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`} />
                  <span>{artwork.collects} 收藏</span>
                </button>
              </div>

              <button
                id="modal-btn-share"
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-stone-600 bg-white border border-stone-200 hover:bg-stone-100 transition-colors"
                title="分享作品"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? '已复制' : '分享'}</span>
              </button>
            </div>

            {/* Quick Emoji selector */}
            <div className="flex items-center gap-1 overflow-x-auto py-0.5">
              <span className="text-[10px] text-stone-600 mr-1 whitespace-nowrap">情绪符号：</span>
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`px-1.5 py-0.5 rounded-md text-xs transition-transform ${
                    selectedEmoji === emoji ? 'bg-white scale-125 shadow-xs' : 'hover:scale-110'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Live Comment Form */}
            <form onSubmit={handleSendComment} className="flex items-center gap-2">
              <input
                id="modal-input-comment"
                type="text"
                placeholder={`留下你想对创作者说的暖心话 ${selectedEmoji}...`}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-white border border-stone-300 rounded-full text-xs text-stone-800 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
              <button
                type="submit"
                id="modal-btn-send-comment"
                disabled={!commentInput.trim()}
                className="p-2 rounded-full bg-stone-900 text-white disabled:bg-stone-300 hover:bg-stone-800 transition-colors shrink-0 shadow-xs"
                aria-label="发送评论"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
};
