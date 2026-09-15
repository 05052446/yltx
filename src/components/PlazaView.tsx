import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { resolveAssetUrl, handleImageError } from '../utils/assetHelper';
import { 
  MessageSquareHeart, 
  Send, 
  Image as ImageIcon, 
  Smile, 
  Heart, 
  Share2, 
  MessageCircle, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';

const TOPICS = [
  '全部动态',
  '#每日一画',
  '#走出无声的世界',
  '#艺术疗愈小故事',
  '#线下同城互助',
  '#我的画笔我的嘴'
];

export const PlazaView: React.FC = () => {
  const { 
    plazaPosts, 
    addPlazaPost, 
    togglePostReaction, 
    addCommentToPost,
    currentRole
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState('全部动态');
  const [postContent, setPostContent] = useState('');
  const [postTopic, setPostTopic] = useState('#每日一画');
  const [postMood, setPostMood] = useState('温暖治愈');
  const [attachedImage, setAttachedImage] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [expandedCommentPostId, setExpandedCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const filteredPosts = plazaPosts.filter((post) => {
    if (selectedTopic === '全部动态') return true;
    return post.topic === selectedTopic;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    addPlazaPost(
      postContent.trim(),
      postTopic,
      postMood,
      attachedImage ? [attachedImage] : undefined
    );

    setPostContent('');
    setAttachedImage('');
    setShowImagePicker(false);
  };

  const handleAddComment = (postId: string) => {
    const input = commentInputs[postId];
    if (!input || !input.trim()) return;

    addCommentToPost(postId, input.trim());
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const sampleQuickImages = [
    './images/art-1.jpg',
    './images/art-2.jpg',
    './images/art-4.jpg',
    './images/art-3.jpg'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200 mb-2">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>无声心事 · 纯文字/图文温暖相拥</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-stone-900">
            心语广场：无障碍社交与共鸣
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            绝不强制语音 · 支持「抱抱 🫂」「共鸣 🌊」「点赞 ❤️」三种温暖情绪反馈
          </p>
        </div>

        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-stone-800">绿色阳光社区</div>
            <div className="text-stone-500 text-[11px]">AI 智能过滤攻击言论</div>
          </div>
        </div>
      </div>

      {/* Post Publisher Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={resolveAssetUrl(
              currentRole === 'admin'
                ? './images/avatar-adminteacher.svg'
                : './images/avatar-chenlin.svg',
              'avatar'
            )}
            alt="Current User"
            onError={(e) => handleImageError(e, 'avatar')}
            className="w-9 h-9 rounded-full ring-2 ring-emerald-100"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stone-800">
              {currentRole === 'admin' ? '官方督导组 / 评委' : '林晨 (MoMo)'}
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">
              {currentRole === 'admin' ? '评审管理视角' : '语障青年创作者'}
            </span>
          </div>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <textarea
            rows={3}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="写下你今天的心情随笔、绘画感悟或遇到的温暖瞬间（支持图文）..."
            className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none leading-relaxed"
          />

          {/* Attached image preview */}
          {attachedImage && (
            <div className="relative inline-block rounded-xl overflow-hidden border border-stone-200 max-w-xs">
              <img 
                src={resolveAssetUrl(attachedImage, 'artwork')} 
                alt="Attachment" 
                onError={(e) => handleImageError(e, 'artwork')}
                className="h-32 w-auto object-cover" 
              />
              <button
                type="button"
                onClick={() => setAttachedImage('')}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Preset image picker popup */}
          {showImagePicker && (
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-700">快速插入精美配图：</div>
              <div className="grid grid-cols-4 gap-2">
                {sampleQuickImages.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={resolveAssetUrl(imgUrl, 'artwork')}
                    alt="Quick preview"
                    onError={(e) => handleImageError(e, 'artwork')}
                    onClick={() => {
                      setAttachedImage(imgUrl);
                      setShowImagePicker(false);
                    }}
                    className="h-16 w-full object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Topic & Emotion selector bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={postTopic}
                onChange={(e) => setPostTopic(e.target.value)}
                className="bg-stone-100 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700 font-medium focus:outline-none"
              >
                {TOPICS.filter((t) => t !== '全部动态').map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={postMood}
                onChange={(e) => setPostMood(e.target.value)}
                className="bg-stone-100 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700 font-medium focus:outline-none"
              >
                <option value="温暖治愈">心情：温暖治愈</option>
                <option value="平静安宁">心情：平静安宁</option>
                <option value="释怀感激">心情：释怀感激</option>
                <option value="探索坚定">心情：探索坚定</option>
              </select>

              <button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  attachedImage ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{attachedImage ? '已附图片' : '添加配图'}</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={!postContent.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>发布心语</span>
            </button>
          </div>
        </form>
      </div>

      {/* Topic Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TOPICS.map((topic) => {
          const isActive = selectedTopic === topic;
          return (
            <button
              key={topic}
              id={`plaza-topic-tab-${topic}`}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            id={`plaza-post-${post.id}`}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-4"
          >
            {/* Author row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={resolveAssetUrl(post.author.avatar, 'avatar')}
                  alt={post.author.name}
                  onError={(e) => handleImageError(e, 'avatar')}
                  className="w-10 h-10 rounded-full ring-1 ring-stone-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{post.author.name}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                      {post.author.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-600 mt-0.5">
                    <span>{post.createdAt}</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-medium">{post.topic}</span>
                    <span>·</span>
                    <span>#{post.moodTag}</span>
                  </div>
                </div>
              </div>

              {post.status === 'approved' && (
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-600 bg-stone-50 px-2 py-1 rounded-full border border-stone-100">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>AI 绿色认证</span>
                </div>
              )}
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            {/* Post Images if any */}
            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {post.images.map((img, idx) => (
                  <div key={idx} className="aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={resolveAssetUrl(img, 'artwork')}
                      alt="Post attachment"
                      loading="lazy"
                      onError={(e) => handleImageError(e, 'artwork')}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Three Emotion Reaction Buttons (Core Highlight: 抱抱, 共鸣, 点赞) */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* 1. Hug 抱抱 */}
                <button
                  id={`btn-hug-${post.id}`}
                  onClick={() => togglePostReaction(post.id, 'hug')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    post.isHugged
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                  title="给创作者一个温暖的隔空拥抱"
                >
                  <span className="text-sm">🫂</span>
                  <span>抱抱</span>
                  <span className="text-[11px] opacity-80">{post.hugs}</span>
                </button>

                {/* 2. Echo 共鸣 */}
                <button
                  id={`btn-echo-${post.id}`}
                  onClick={() => togglePostReaction(post.id, 'echo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    post.isEchoed
                      ? 'bg-blue-100 text-blue-800 border border-blue-300 shadow-xs'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                  title="记录心灵共鸣"
                >
                  <span className="text-sm">🌊</span>
                  <span>共鸣</span>
                  <span className="text-[11px] opacity-80">{post.echoes}</span>
                </button>

                {/* 3. Like 点赞 */}
                <button
                  id={`btn-like-${post.id}`}
                  onClick={() => togglePostReaction(post.id, 'like')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    post.isLiked
                      ? 'bg-rose-100 text-rose-800 border border-rose-300 shadow-xs'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                  title="点赞鼓励"
                >
                  <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
                  <span>温暖</span>
                  <span className="text-[11px] opacity-80">{post.likes}</span>
                </button>
              </div>

              {/* Comment expander button */}
              <button
                onClick={() =>
                  setExpandedCommentPostId(expandedCommentPostId === post.id ? null : post.id)
                }
                className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>留言 ({post.comments.length})</span>
              </button>
            </div>

            {/* Expandable Comments list and reply input */}
            {expandedCommentPostId === post.id && (
              <div className="pt-3 border-t border-stone-100 space-y-3 bg-stone-50/50 p-3 rounded-2xl">
                {/* Existing comments */}
                {post.comments.length > 0 ? (
                  <div className="space-y-2">
                    {post.comments.map((cmt) => (
                      <div key={cmt.id} className="flex items-start gap-2.5 text-xs bg-white p-2.5 rounded-xl border border-stone-200/60">
                        <img 
                          src={resolveAssetUrl(cmt.authorAvatar, 'avatar')} 
                          alt="cmt author" 
                          onError={(e) => handleImageError(e, 'avatar')}
                          className="w-5 h-5 rounded-full mt-0.5" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-stone-800">{cmt.authorName}</span>
                            <span className="text-[10px] text-stone-600">{cmt.createdAt}</span>
                          </div>
                          <p className="text-stone-600 mt-0.5">{cmt.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs text-stone-600">
                    暂无留言，快来成为第一个留下一束光的朋友吧！
                  </div>
                )}

                {/* Reply Form */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="写下温和友善的回复..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                    className="flex-1 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                  >
                    发送
                  </button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
