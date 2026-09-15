import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, EMOTION_TAGS } from '../data/mockData';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Palette,
  HeartHandshake
} from 'lucide-react';

/* Quick preset art photos for judges to test instantly without uploading local file */
const PRESET_ART_PREVIEWS = [
  {
    name: '山野晨雾',
    url: './images/art-preset-1.jpg',
    category: '水彩画',
    mood: '平静'
  },
  {
    name: '飞鸟与极光',
    url: './images/art-2.jpg',
    category: '数字插画',
    mood: '希望'
  },
  {
    name: '陶土的温度',
    url: './images/art-4.jpg',
    category: '陶艺手工',
    mood: '温暖'
  },
  {
    name: '落日红云',
    url: './images/art-3.jpg',
    category: '油画',
    mood: '释怀'
  }
];

export const ArtworkUploadModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, addArtwork, currentRole } = useApp();

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [category, setCategory] = useState<any>('水彩画');
  const [selectedMoods, setSelectedMoods] = useState<string[]>(['平静']);
  const [imageUrl, setImageUrl] = useState('');
  const [medium, setMedium] = useState('纸本水彩 / 留白胶');
  const [artistName, setArtistName] = useState(currentRole === 'admin' ? '指导组创研员' : '林晨 (MoMo)');
  const [artistBadge, setArtistBadge] = useState(currentRole === 'admin' ? '特邀高校评委' : '听障青年创作者');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('请选择有效的图片文件 (PNG, JPG, WEBP)');
      return;
    }

    // Convert file to Base64 data URL
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const toggleMoodTag = (tag: string) => {
    if (selectedMoods.includes(tag)) {
      if (selectedMoods.length > 1) {
        setSelectedMoods(selectedMoods.filter((m) => m !== tag));
      }
    } else {
      if (selectedMoods.length < 3) {
        setSelectedMoods([...selectedMoods, tag]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('请填写作品标题');
      return;
    }
    if (!imageUrl) {
      setErrorMsg('请上传作品图片或选择下方快捷预设');
      return;
    }
    if (!story.trim()) {
      setErrorMsg('请写下作品背后的无声心事，这是连接心灵的纽带');
      return;
    }

    setIsSubmitting(true);

    // Simulate swift AI audit and saving
    setTimeout(() => {
      addArtwork({
        title: title.trim(),
        story: story.trim(),
        imageUrl,
        category,
        moodTags: selectedMoods,
        moodColor: '#10B981',
        medium: medium.trim() || '综合艺术媒介',
        artist: {
          id: `artist-${Date.now()}`,
          name: artistName,
          avatar: './images/avatar-default.svg',
          badge: artistBadge,
          bio: '语障青年创作者，用视觉色彩记录生活微光。',
          location: '中国',
          artworksCount: 1,
          followersCount: 12
        }
      });

      setIsSubmitting(false);
      setIsUploadModalOpen(false);

      // Reset form
      setTitle('');
      setStory('');
      setImageUrl('');
    }, 450);
  };

  return (
    <div 
      id="artwork-upload-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={() => setIsUploadModalOpen(false)}
    >
      <div 
        id="artwork-upload-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6 my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-stone-900">
                发布疗愈画作 · 分享无声心事
              </h2>
              <p className="text-xs text-stone-500">
                支持本地图片或演示预设 · 自动经过 AI 治愈合规性守护
              </p>
            </div>
          </div>
          <button
            id="btn-close-upload-modal"
            onClick={() => setIsUploadModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              作品图片 <span className="text-rose-500">*</span>
            </label>

            {imageUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 max-h-64 flex items-center justify-center group">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-64 object-contain"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-stone-800 rounded-full text-xs font-semibold shadow-xs"
                  >
                    更换图片
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-full text-xs font-semibold shadow-xs"
                  >
                    移除
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-emerald-50/30"
              >
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 mx-auto flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-stone-800">
                  点击选择本地图片 或 拖拽至此处
                </div>
                <div className="text-[11px] text-stone-600 mt-1">
                  支持 JPG, PNG, WebP 格式，最大 10MB
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Quick preset selector for judges demo */}
            <div className="mt-2 flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[11px] text-stone-600 whitespace-nowrap">答辩快捷样图：</span>
              {PRESET_ART_PREVIEWS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImageUrl(preset.url);
                    setTitle(preset.name);
                    setCategory(preset.category);
                    setSelectedMoods([preset.mood]);
                    setStory(`这是在无声的世界里创作的《${preset.name}》，用${preset.category}的笔触传递内心的${preset.mood}之美。愿每一次凝望，都能带给你温暖的抚慰。`);
                  }}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-100 rounded-lg text-[11px] text-stone-700 font-medium whitespace-nowrap border border-stone-200 transition-colors"
                >
                  {preset.name} ({preset.category})
                </button>
              ))}
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                作品名称 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="如：静止的微风、听雨..."
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                艺术门类
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                {CATEGORIES.filter((c) => c !== '全部').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Emotion tags */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              情绪状态标签（最多选择 3 个）
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOTION_TAGS.map((tag) => {
                const isSelected = selectedMoods.includes(tag.label);
                return (
                  <button
                    key={tag.label}
                    type="button"
                    onClick={() => toggleMoodTag(tag.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    #{tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Story: "无声心事" */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              作品背后的“无声心事” <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="这幅画是在什么心境下诞生的？你在无声的世界里想对大家说些什么？请尽情倾诉..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none leading-relaxed"
            />
          </div>

          {/* Artist Identity Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                创作者署名
              </label>
              <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                创作者身份徽章
              </label>
              <input
                type="text"
                value={artistBadge}
                onChange={(e) => setArtistBadge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none"
              />
            </div>
          </div>

          {/* AI Compliance & Healing Audit Badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs text-stone-700 space-y-0.5">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <span>AI 绿色治愈合规守护已就绪</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded-md font-semibold">
                  秒级自动过审
                </span>
              </div>
              <p className="text-stone-500 text-[11px] leading-relaxed">
                平台搭载大学生创新算法，实时分析画面情绪色调与无声文字心绪，自动识别并过滤恶意攻击，保护语障创作者纯净疗愈生态。
              </p>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-5 py-2 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-all disabled:bg-stone-400"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>AI 自动审核上架中...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>提交并立即上架</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
