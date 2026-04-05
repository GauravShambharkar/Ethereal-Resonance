"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Hero from "@/features/hero/components/Hero";
import Piano from "@/features/piano/components/Piano";
import Dashboard from "@/features/dashboard/components/Dashboard";
import ExportModal from "@/features/export/components/ExportModal";

export default function Home() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <React.Suspense fallback={<div className="h-screen w-full bg-background" />}>
      <div className="flex h-screen bg-background text-on-surface overflow-hidden">
        {/* Sidebar Controls */}
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navigation */}
          <Navbar onExportClick={() => setIsExportModalOpen(true)} />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Branding & Status Info */}
            <Hero />

            {/* Piano Instrument */}
            <Piano />

            {/* Bottom Control Dashboard */}
            <Dashboard />
          </main>
        </div>

        {/* Export Selection Modal */}
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
        />
      </div>
    </React.Suspense>
  );
}
