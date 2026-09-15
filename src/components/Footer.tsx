import React from 'react';
import { useApp } from '../context/AppContext';
import { Palette, Heart, Sparkles, Award, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="mt-16 bg-white border-t border-stone-200/80 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-100">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs">
                <Palette className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold font-serif text-stone-900">艺路同行</span>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                语障人士艺术疗愈共享平台
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
              中国国际大学生创新大赛（互联网+）与“挑战杯”大学生创业计划竞赛示范项目。专为语障青年搭建的艺术疗愈与无障碍共创社区，通过视觉情绪画卷、无声心语广场与公益资源协同，让安静的心灵更有力量。
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>无障碍视觉第一原则</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200/60">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>挑战杯助残专项推荐</span>
              </span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-900 tracking-wider uppercase">平台导航</h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-700 transition-colors">
                  首页推荐
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-emerald-700 transition-colors">
                  无声画廊 (小红书瀑布流)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('video')} className="hover:text-emerald-700 transition-colors">
                  疗愈视界 (AAC与曼陀罗教程)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('plaza')} className="hover:text-emerald-700 transition-colors">
                  心语广场 (三维情绪反馈)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-emerald-700 transition-colors">
                  公益资源 (政策与救助通道)
                </button>
              </li>
            </ul>
          </div>

          {/* Guidance & Ethics Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-900 tracking-wider uppercase">指导与合作网络</h4>
            <div className="space-y-1.5 text-xs text-stone-600">
              <div>中国残疾人联合会无障碍指导</div>
              <div>高校特教与表达性艺术治疗研创中心</div>
              <div>思源工程·扬帆公益基金会</div>
              <div>马利画材“一盒色彩”青年扶持计划</div>
              <div className="pt-1 text-[11px] text-stone-600">
                技术支持：高校创客实验室 · 前端工程组
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-2">
          <div>
            © 2026 「艺路同行」大学生创业团队. 保留所有权利.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>用</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>为无声的心灵绘就彩虹</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
