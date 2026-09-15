/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 「艺路同行」——面向语障人士的艺术疗愈共享平台
 * 大学生创新创业竞赛 (互联网+ / 挑战杯) 答辩级高保真演示系统
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { GalleryView } from './components/GalleryView';
import { VideoView } from './components/VideoView';
import { PlazaView } from './components/PlazaView';
import { ResourcesView } from './components/ResourcesView';
import { AdminView } from './components/AdminView';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { ArtworkUploadModal } from './components/ArtworkUploadModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-800">
      {/* Top sticky navigation bar */}
      <Navbar />

      {/* Main content body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'gallery' && <GalleryView />}
        {activeTab === 'video' && <VideoView />}
        {activeTab === 'plaza' && <PlazaView />}
        {activeTab === 'resources' && <ResourcesView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <ArtworkDetailModal />
      <ArtworkUploadModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
