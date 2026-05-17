import React from 'react';
import { Users, Cloud, HardDrive } from 'lucide-react';

export default function Stats({ users }) {
  const total = users.length;
  const localCount = users.filter((u) => u.isLocal).length;
  const apiCount = total - localCount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard 
        title="Toplam Kullanıcı" 
        value={total} 
        icon={<Users className="w-6 h-6 text-indigo-400" />} 
        gradient="from-indigo-500/20 to-indigo-500/5"
      />
      <StatCard 
        title="API'den Gelen" 
        value={apiCount} 
        icon={<Cloud className="w-6 h-6 text-blue-400" />} 
        gradient="from-blue-500/20 to-blue-500/5"
      />
      <StatCard 
        title="Local'den Gelen" 
        value={localCount} 
        icon={<HardDrive className="w-6 h-6 text-purple-400" />} 
        gradient="from-purple-500/20 to-purple-500/5"
      />
    </div>
  );
}

function StatCard({ title, value, icon, gradient }) {
  return (
    <div className={`glass rounded-2xl p-6 flex items-center justify-between bg-gradient-to-br ${gradient} border-t border-l border-white/5 shadow-xl`}>
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-100">{value}</p>
      </div>
      <div className="p-3 bg-slate-800/80 rounded-xl shadow-inner border border-slate-700/50">
        {icon}
      </div>
    </div>
  );
}
