import React from "react";
import { useBookStats } from "../../hooks/useBookStats";

const Stats = () => {
  const stats = useBookStats(); // ✅ inilah yang mengisi variabel `stats`

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Statistik Buku</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="stat-card">
          📚 <strong>{stats.milik}</strong> Dimiliki
        </div>
        <div className="stat-card">
          📖 <strong>{stats.baca}</strong> Dibaca
        </div>
        <div className="stat-card">
          🛒 <strong>{stats.beli}</strong> Dibeli
        </div>
      </div>
    </div>
  );
};

export default Stats;
