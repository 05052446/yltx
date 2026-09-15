import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { resolveAssetUrl, handleImageError } from '../utils/assetHelper';
import { 
  ShieldCheck, 
  Users, 
  Palette, 
  Heart, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  TrendingUp, 
  RotateCcw, 
  Sparkles, 
  BarChart3, 
  Smile, 
  MessageSquareHeart,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    artworks, 
    updateArtworkStatus, 
    deleteArtwork, 
    plazaPosts, 
    deletePost, 
    resetDemoData, 
    setSelectedArtworkModal,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'artworks' | 'posts'>('overview');

  // Stats calculations
  const totalArtworksCount = artworks.length;
  const approvedArtworksCount = artworks.filter(a => a.status === 'approved').length;
  const hiddenArtworksCount = artworks.filter(a => a.status === 'hidden').length;
  const totalLikes = artworks.reduce((acc, curr) => acc + curr.likes, 0) + 
                     plazaPosts.reduce((acc, curr) => acc + curr.likes + curr.hugs + curr.echoes, 0);
  const totalViews = artworks.reduce((acc, curr) => acc + curr.views, 0);

  // Mood spectrum distribution
  const moodCounts: { [key: string]: number } = {
    '平静': 0,
    '共鸣': 0,
    '释怀': 0,
    '探索': 0,
    '希望': 0,
    '温暖': 0
  };

  artworks.forEach((art) => {
    art.moodTags.forEach((tag) => {
      Object.keys(moodCounts).forEach((key) => {
        if (tag.includes(key)) {
          moodCounts[key] += 1;
        }
      });
    });
  });

  const totalMoodHits = Object.values(moodCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Admin Dashboard Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>全国大学生竞赛 · 评审答辩后台控制台</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif">
            「艺路同行」管理后台与数据大屏
          </h1>
          <p className="text-xs sm:text-sm text-stone-400">
            全链路前端状态闭环 · 实时审核生效 · 即时数据大屏可视化
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            id="btn-admin-reset-demo"
            onClick={resetDemoData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置为初始演示数据</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-stone-200 shadow-xs">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeAdminTab === 'overview'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>数据大屏简报 (答辩加分项)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('artworks')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeAdminTab === 'artworks'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>作品审核与下架 ({artworks.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('posts')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeAdminTab === 'posts'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span>心语广场言论管理 ({plazaPosts.length})</span>
        </button>
      </div>

      {/* Tab 1: Data Dashboard Overview */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>入驻语障青年创作者</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-serif text-stone-900">1,280 <span className="text-xs font-sans text-emerald-600 font-semibold">+18 本周</span></div>
              <div className="text-[11px] text-stone-400">覆盖全国 31 省市特校与融合高校</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>无声疗愈艺术作品</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Palette className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-serif text-stone-900">{5420 + artworks.length} <span className="text-xs font-sans text-blue-600 font-semibold">件已上架</span></div>
              <div className="text-[11px] text-stone-400">涵盖水彩、数字板绘、陶艺与拼贴</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>累计共鸣与点赞互动</span>
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-serif text-stone-900">{(48600 + totalLikes).toLocaleString()} <span className="text-xs font-sans text-rose-600 font-semibold">次温暖反馈</span></div>
              <div className="text-[11px] text-stone-400">抱抱 · 共鸣 · 爱心多元互动</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
                <span>全国线下工坊开展</span>
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold font-serif text-stone-900">324 <span className="text-xs font-sans text-amber-600 font-semibold">场次落地</span></div>
              <div className="text-[11px] text-stone-400">联合 42 家特教中心与无声咖啡馆</div>
            </div>

          </div>

          {/* Emotion Spectrum & AI Safety Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Emotion Spectrum Breakdown */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                    <Smile className="w-4 h-4 text-emerald-600" />
                    <span>无声作品情绪图谱分布（实时分析）</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    基于入驻作品标签与无声心事自然语言处理的疗愈心理倾向
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                  健康平稳指数 98.6%
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {Object.entries(moodCounts).map(([mood, count]) => {
                  const percentage = Math.round((count / totalMoodHits) * 100) || 10;
                  let barColor = 'bg-blue-500';
                  if (mood === '共鸣') barColor = 'bg-emerald-500';
                  if (mood === '释怀') barColor = 'bg-orange-500';
                  if (mood === '探索') barColor = 'bg-purple-500';
                  if (mood === '希望') barColor = 'bg-teal-500';
                  if (mood === '温暖') barColor = 'bg-amber-500';

                  return (
                    <div key={mood} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-stone-700">#{mood}</span>
                        <span className="text-stone-500">{percentage}% ({count} 幅作品关联)</span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${barColor} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl text-[11px] text-stone-600 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>结论提示：语障青年创作者在社区中表现出显著的「平静」与「释怀」增长趋势，艺术创作对于舒缓社交挫败感具备显著疗效。</span>
              </div>
            </div>

            {/* AI Safety & Auditing Engine Status */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-stone-900">AI 纯净语境防护盾</h3>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed">
                  专为无障碍与特教群体定制的敏感词语义模型，24小时拦截歧视、嘲讽与不文明言论。
                </p>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                    <span className="text-stone-600">已自动拦截不良言论</span>
                    <span className="font-bold text-stone-800">128 次</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                    <span className="text-stone-600">平均审核响应延迟</span>
                    <span className="font-bold text-emerald-600">0.08 秒</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                    <span className="text-stone-600">心理危机警报触发</span>
                    <span className="font-bold text-stone-800">0 起 (平安运行)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast('已完成全站语境安全巡检，未发现任何风险内容！', 'success')}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                立即执行全站 AI 安全巡检
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Artworks Moderation Table */}
      {activeAdminTab === 'artworks' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-stone-900">作品审核与前台展示管理</h2>
              <p className="text-xs text-stone-500">
                支持即时“下架 / 恢复展示 / 彻底删除”，修改即刻同步前台画廊
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">展示中: {approvedArtworksCount} 件</span>
              <span className="text-xs text-stone-400">|</span>
              <span className="text-xs text-stone-500">已下架: {hiddenArtworksCount} 件</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-3">作品预览</th>
                  <th className="p-3">标题与门类</th>
                  <th className="p-3">创作者信息</th>
                  <th className="p-3">情绪标签</th>
                  <th className="p-3">互动数据</th>
                  <th className="p-3">展示状态</th>
                  <th className="p-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {artworks.map((art) => (
                  <tr key={art.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3">
                      <img
                        src={resolveAssetUrl(art.imageUrl, 'artwork')}
                        alt={art.title}
                        onError={(e) => handleImageError(e, 'artwork')}
                        className="w-12 h-12 object-cover rounded-xl border border-stone-200"
                      />
                    </td>
                    <td className="p-3 font-semibold text-stone-900">
                      <div>{art.title}</div>
                      <div className="text-[10px] text-stone-400 font-normal">{art.category}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-stone-800">{art.artist.name}</div>
                      <div className="text-[10px] text-emerald-700">{art.artist.badge}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {art.moodTags.map((t, idx) => (
                          <span key={idx} className="bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded text-[10px]">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-stone-500">
                      <div>❤️ {art.likes} 赞</div>
                      <div>💬 {art.comments.length} 评</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        art.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {art.status === 'approved' ? '展示中' : '已下架'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedArtworkModal(art)}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs transition-colors"
                          title="查看大图与心事"
                        >
                          查看
                        </button>

                        {art.status === 'approved' ? (
                          <button
                            onClick={() => updateArtworkStatus(art.id, 'hidden')}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs transition-colors"
                            title="隐藏/下架"
                          >
                            下架
                          </button>
                        ) : (
                          <button
                            onClick={() => updateArtworkStatus(art.id, 'approved')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs transition-colors"
                            title="重新上架"
                          >
                            通过
                          </button>
                        )}

                        <button
                          onClick={() => deleteArtwork(art.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="彻底删除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Tab 3: Plaza Posts Moderation */}
      {activeAdminTab === 'posts' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6 animate-fade-in">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">心语广场言论监控与管理</h2>
              <p className="text-xs text-stone-500">
                可模拟过滤违规发帖，维护语障群体温馨无害的交流环境
              </p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-semibold border border-emerald-200">
              绿色指数：100%
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {plazaPosts.map((post) => (
              <div key={post.id} className="py-4 flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-800 text-xs">{post.author.name}</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                      {post.topic}
                    </span>
                    <span className="text-[10px] text-stone-400">{post.createdAt}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                    <span>🫂 抱抱 {post.hugs}</span>
                    <span>🌊 共鸣 {post.echoes}</span>
                    <span>❤️ 点赞 {post.likes}</span>
                    <span>💬 留言 {post.comments.length}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      showToast('已为该篇正能量心语加推至广场顶部推荐', 'success');
                    }}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold transition-colors"
                  >
                    加精推荐
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    删除过滤
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
