"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Hero from "@/features/hero/components/Hero";
import Piano from "@/features/piano/components/Piano";
import Dashboard from "@/features/dashboard/components/Dashboard";
import ExportModal from "@/features/export/components/ExportModal";

export default function Home() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-on-surface overflow-hidden">
      {/* Navigation */}
      <Navbar onExportClick={() => setIsExportModalOpen(true)} />

      {/* Sidebar Controls */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-20 pt-24 h-screen flex flex-col relative overflow-hidden">
        {/* Branding & Status Info */}
        <Hero />

        {/* Piano Instrument */}
        <Piano />

        {/* Bottom Control Dashboard */}
        <Dashboard />
      </main>

      {/* Export Selection Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

    </div>
  );
}
