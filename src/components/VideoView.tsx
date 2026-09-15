import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VideoCourse } from '../types';
import { resolveAssetUrl, handleImageError } from '../utils/assetHelper';
import { 
  Play, 
  Clock, 
  Eye, 
  Sparkles, 
  X, 
  Subtitles, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Share2,
  Tv
} from 'lucide-react';

export const VideoView: React.FC = () => {
  const { videos, selectedVideoModal, setSelectedVideoModal, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'guide' | 'therapy'>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoQuality, setVideoQuality] = useState('1080P 超清');
  const [bulletBarrage, setBulletBarrage] = useState(true);

  const filteredVideos = videos.filter((v) => {
    if (activeTab === 'all') return true;
    return v.category === activeTab;
  });

  const handleOpenVideo = (video: VideoCourse) => {
    setSelectedVideoModal(video);
    setIsPlaying(true);
  };

  const sampleBarrages = [
    '学到了！以后和听障朋友沟通更自信了 💙',
    '曼陀罗画法好神奇，心真的静下来了',
    '字幕好清晰，对听障朋友太友好了！',
    '特邀老师讲得很温柔透彻',
    '这就是大学生的优质公益项目，点赞支持！',
    '色彩真的能传递潜意识的力量'
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Tv className="w-3.5 h-3.5" />
            <span>无障碍视听 · 疗愈课堂</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-stone-900">
            疗愈视界：科普指南与正念课程
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            全课程配备无声高精度中文字幕、图文要点解析与专业讲师团队，为语障青年、家庭看护者及社会志愿者提供双向理解桥梁。
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            全部视听 ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'guide'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            语障沟通指南 (AAC)
          </button>
          <button
            onClick={() => setActiveTab('therapy')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'therapy'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            艺术疗愈教程
          </button>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            id={`video-card-${video.id}`}
            onClick={() => handleOpenVideo(video)}
            className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Cover with Play Icon */}
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
                <img
                  src={resolveAssetUrl(video.coverUrl, 'artwork')}
                  alt={video.title}
                  loading="lazy"
                  onError={(e) => handleImageError(e, 'artwork')}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Dark overlay with play badge */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-emerald-700 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-transform">
                    <Play className="w-6 h-6 fill-emerald-600 ml-1" />
                  </div>
                </div>

                {/* Tags on cover */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-900/80 backdrop-blur-md text-white">
                    {video.categoryLabel}
                  </span>
                  {video.subtitlesAvailable && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500 text-white flex items-center gap-1">
                      <Subtitles className="w-3 h-3" />
                      <span>含中文字幕</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white text-xs bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {video.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Core concepts */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {video.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-600 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructor Footer */}
            <div className="px-5 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={resolveAssetUrl(video.instructor.avatar, 'avatar')}
                  alt={video.instructor.name}
                  onError={(e) => handleImageError(e, 'avatar')}
                  className="w-8 h-8 rounded-full ring-1 ring-stone-200"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-800">{video.instructor.name}</span>
                  <span className="text-[10px] text-stone-500 line-clamp-1">{video.instructor.title}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-stone-500">
                <Eye className="w-3.5 h-3.5" />
                <span>{video.views} 次播放</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Simulated Video Player Modal */}
      {selectedVideoModal && (
        <div 
          id="video-player-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-stone-950/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedVideoModal(null)}
        >
          <div 
            id="video-player-modal-container"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-stone-900 text-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl border border-stone-800 flex flex-col my-auto"
          >
            {/* Header */}
            <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-sm text-stone-100 truncate max-w-md sm:max-w-xl">
                  {selectedVideoModal.title}
                </h3>
              </div>
              <button
                id="btn-close-video-modal"
                onClick={() => setSelectedVideoModal(null)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                aria-label="关闭视频"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Stage (Simulated Canvas / Video Player) */}
            <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={resolveAssetUrl(selectedVideoModal.coverUrl, 'artwork')}
                alt="Stage"
                onError={(e) => handleImageError(e, 'artwork')}
                className="w-full h-full object-cover opacity-60"
              />

              {/* Floating Simulated Barrages */}
              {bulletBarrage && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-4 left-6 bg-black/50 text-white/90 px-3 py-1 rounded-full text-xs animate-pulse">
                    💬 {sampleBarrages[0]}
                  </div>
                  <div className="absolute top-14 right-10 bg-black/50 text-emerald-200 px-3 py-1 rounded-full text-xs">
                    ✨ {sampleBarrages[1]}
                  </div>
                  <div className="absolute bottom-16 left-12 bg-black/50 text-amber-200 px-3 py-1 rounded-full text-xs">
                    🌱 {sampleBarrages[2]}
                  </div>
                </div>
              )}

              {/* Subtitles Overlay */}
              {subtitlesEnabled && (
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 px-6 py-2 rounded-xl border border-white/20 text-center max-w-xl pointer-events-none">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-300">
                    【无声实时中文字幕】“让每一次色彩的碰撞，代替我们未曾道出口的呼唤...”
                  </p>
                </div>
              )}

              {/* Play / Pause toggle overlay button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-transparent cursor-pointer"
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-xl">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                )}
              </button>

              {/* Player Bottom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 flex flex-col gap-1.5">
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden cursor-pointer">
                  <div className="w-1/3 h-full bg-emerald-500" />
                </div>

                <div className="flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white"
                    >
                      {isPlaying ? '暂停' : '播放'}
                    </button>

                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span className="text-[11px]">{isMuted ? '静音' : '音量'}</span>
                    </button>

                    <span className="text-[11px] text-stone-400">06:12 / {selectedVideoModal.duration}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Subtitles toggle */}
                    <button
                      onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        subtitlesEnabled ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      <Subtitles className="w-3.5 h-3.5" />
                      <span>字幕{subtitlesEnabled ? '开' : '关'}</span>
                    </button>

                    {/* Barrage toggle */}
                    <button
                      onClick={() => setBulletBarrage(!bulletBarrage)}
                      className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                        bulletBarrage ? 'bg-stone-700 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      弹幕
                    </button>

                    {/* Quality selector */}
                    <select
                      value={videoQuality}
                      onChange={(e) => setVideoQuality(e.target.value)}
                      className="bg-stone-800 text-stone-200 text-[11px] rounded px-1.5 py-0.5 border border-stone-700 focus:outline-none"
                    >
                      <option value="1080P 超清">1080P 超清</option>
                      <option value="720P 高清">720P 高清</option>
                      <option value="480P 流畅">480P 流畅</option>
                    </select>

                    <button
                      onClick={() => showToast('已切换至全屏模拟模式', 'info')}
                      className="hover:text-white"
                      title="全屏"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Lesson Notes & Key Takeaways */}
            <div className="p-5 bg-stone-900 overflow-y-auto max-h-60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedVideoModal.instructor.avatar}
                    alt={selectedVideoModal.instructor.name}
                    className="w-10 h-10 rounded-full ring-2 ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-100">{selectedVideoModal.instructor.name}</span>
                      <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full border border-stone-700">
                        {selectedVideoModal.instructor.title}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400">{selectedVideoModal.categoryLabel} · {selectedVideoModal.views} 次播放</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast('课程配套无声教案 PDF 已加入下载队列', 'success')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold self-start sm:self-auto transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>下载本节无声教案</span>
                </button>
              </div>

              {/* Key Takeaway Box */}
              <div className="bg-stone-800/80 rounded-2xl p-4 border border-stone-700/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span>讲师疗愈心语 (Key Takeaway)</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed italic">
                  “{selectedVideoModal.keyTakeaway}”
                </p>
                <div className="pt-2 border-t border-stone-700/60 flex flex-wrap gap-2 text-[11px] text-stone-400">
                  <span className="text-stone-300 font-semibold">核心知识点：</span>
                  {selectedVideoModal.coreConcepts.map((concept, idx) => (
                    <span key={idx} className="bg-stone-900 px-2 py-0.5 rounded-md text-stone-300">
                      • {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
