import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResourceItem } from '../types';
import { 
  HandHeart, 
  ExternalLink, 
  ShieldCheck, 
  PhoneCall, 
  Download, 
  MapPin, 
  Sparkles, 
  Check, 
  X,
  FileText
} from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const { resources, showToast } = useApp();
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleResourceClick = (res: ResourceItem) => {
    setSelectedResource(res);
  };

  const handleCopyHotline = (phone: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedPhone(true);
    showToast(`援助号码 ${phone} 已复制到剪贴板，支持文字或直接拨打`, 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'aac':
        return <Download className="w-5 h-5 text-blue-600" />;
      case 'psychology':
        return <PhoneCall className="w-5 h-5 text-rose-600" />;
      case 'space':
        return <MapPin className="w-5 h-5 text-emerald-600" />;
      case 'foundation':
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      default:
        return <HandHeart className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-2">
            <HandHeart className="w-3.5 h-3.5" />
            <span>政校企社协同 · 无障碍公益支持</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-stone-900">
            公益资源导航与生态支持
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            联合残联、公益基金会、特教高校及心理学机构，为语障青年搭建辅助沟通软件、法律援助、免费画材申领与线下空间网络。
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-stone-50 px-4 py-2.5 rounded-2xl border border-stone-200 text-center">
            <div className="text-lg font-bold font-serif text-emerald-700">6 大模块</div>
            <div className="text-[11px] text-stone-500">权威直通通道</div>
          </div>
          <div className="bg-stone-50 px-4 py-2.5 rounded-2xl border border-stone-200 text-center">
            <div className="text-lg font-bold font-serif text-stone-900">100% 公益</div>
            <div className="text-[11px] text-stone-500">免任何服务费用</div>
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((item) => (
          <div
            key={item.id}
            id={`resource-card-${item.id}`}
            onClick={() => handleResourceClick(item)}
            className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getCategoryIcon(item.category)}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {item.tag}
                </span>
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-700 transition-colors leading-snug">
                  {item.title}
                </h3>
                <span className="text-[11px] text-stone-600 font-medium block mt-1">
                  指导发布：{item.organization}
                </span>
              </div>

              {/* Summary */}
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {item.summary}
              </p>

              {/* Features bullets */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                {item.features.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action bar */}
            <div className="pt-4 mt-2">
              <div className="w-full py-2 px-3 rounded-xl bg-stone-50 group-hover:bg-stone-900 group-hover:text-white text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <span>{item.actionLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resource Confirmation & Detail Modal */}
      {selectedResource && (
        <div
          id="resource-detail-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
          onClick={() => setSelectedResource(null)}
        >
          <div
            id="resource-detail-modal-container"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 border border-stone-200 shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedResource(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {getCategoryIcon(selectedResource.category)}
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {selectedResource.categoryName}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  {selectedResource.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {selectedResource.summary}
            </p>

            {/* Highlight Box */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{selectedResource.highlightText}</span>
            </div>

            {/* Features list */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800">服务保障与特性：</span>
              <div className="space-y-1">
                {selectedResource.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External link destination preview */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500 font-mono break-all flex items-center justify-between">
              <span className="truncate">{selectedResource.contactOrLink}</span>
              <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded ml-2 shrink-0">
                SSL 安全认证
              </span>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              {selectedResource.category === 'psychology' ? (
                <button
                  onClick={() => handleCopyHotline('400-161-9995')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{copiedPhone ? '已复制号码' : '拨打/复制热线'}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    showToast(`已模拟接通「${selectedResource.title}」官方直达通道`, 'success');
                    setSelectedResource(null);
                  }}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>立即访问服务通道</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
