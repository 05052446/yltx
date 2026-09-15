import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import { 
  Palette, 
  Home, 
  Image as ImageIcon, 
  Video, 
  MessageSquareHeart, 
  HandHeart, 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  Menu, 
  X,
  UserCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentRole, 
    toggleRole, 
    searchQuery, 
    setSearchQuery,
    setIsUploadModalOpen,
    resetDemoData
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: AppTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: '首页', icon: <Home className="w-4 h-4" /> },
    { tab: 'gallery', label: '作品社区', icon: <ImageIcon className="w-4 h-4" /> },
    { tab: 'video', label: '疗愈视界', icon: <Video className="w-4 h-4" /> },
    { tab: 'plaza', label: '心语广场', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { tab: 'resources', label: '公益资源', icon: <HandHeart className="w-4 h-4" /> },
    { tab: 'admin', label: '管理后台', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  const handleTabClick = (tab: AppTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Tagline */}
          <div 
            id="brand-logo-container"
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Palette className="w-5 h-5 text-emerald-700 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-serif">艺路同行</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5" /> 挑战杯示范项目
                </span>
              </div>
              <span className="text-[11px] text-stone-600 font-medium tracking-wide">
                语障人士艺术疗愈共享平台
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1 rounded-2xl border border-stone-200/60">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-link-${item.tab}`}
                  onClick={() => handleTabClick(item.tab)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Box */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xs lg:max-w-sm">
            <Search className="w-4 h-4 absolute left-3 text-stone-600 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              placeholder="搜索疗愈作品、情绪或作者..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab === 'home' && e.target.value.trim().length > 0) {
                  setActiveTab('gallery');
                }
              }}
              className="w-full pl-9 pr-4 py-1.5 bg-stone-100/90 hover:bg-stone-100 focus:bg-white border border-stone-200 rounded-full text-xs text-stone-800 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-stone-600 hover:text-stone-600"
                aria-label="清空搜索"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Quick Upload CTA */}
            <button
              id="btn-quick-upload-artwork"
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>发布作品</span>
            </button>

            {/* Role Switcher Pill */}
            <button
              id="btn-toggle-user-role"
              onClick={toggleRole}
              title="切换创作者视角 / 管理员答辩演示模式"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                currentRole === 'admin'
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <img
                src={
                  currentRole === 'admin'
                    ? './images/avatar-adminteacher.svg'
                    : './images/avatar-chenlin.svg'
                }
                alt="Avatar"
                className="w-5 h-5 rounded-full ring-1 ring-stone-200"
              />
              <span className="text-[11px]">
                {currentRole === 'admin' ? '评审专家视角' : '创作者：林晨'}
              </span>
              <UserCheck className="w-3 h-3 text-emerald-600" />
            </button>

            {/* Reset Data for defense test */}
            <button
              id="btn-reset-demo-data"
              onClick={resetDemoData}
              title="答辩一键重置初始数据"
              className="hidden xl:flex items-center justify-center w-8 h-8 rounded-full text-stone-600 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="菜单开关"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden py-3 border-t border-stone-200 space-y-2">
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-600" />
                <input
                  type="text"
                  placeholder="搜索疗愈作品、情绪或作者..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeTab === 'home') setActiveTab('gallery');
                  }}
                  className="w-full pl-9 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 px-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => handleTabClick(item.tab)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile role switcher and reset */}
            <div className="pt-2 px-2 flex items-center justify-between border-t border-stone-200/60">
              <button
                onClick={toggleRole}
                className="flex items-center gap-2 text-xs text-stone-700 bg-stone-100 px-3 py-1.5 rounded-xl"
              >
                <span>当前身份:</span>
                <span className="font-semibold text-emerald-700">
                  {currentRole === 'admin' ? '评审专家 / 管理员' : '语障青年：林晨'}
                </span>
              </button>

              <button
                onClick={resetDemoData}
                className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-800"
              >
                <RotateCcw className="w-3 h-3" /> 重置数据
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
