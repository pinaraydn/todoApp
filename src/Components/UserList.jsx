import React from 'react';
import UserCard from './UserCard';
import { SearchX } from 'lucide-react';

export default function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-slate-400 border border-slate-700/50 border-dashed">
        <div className="w-20 h-20 bg-slate-800/80 rounded-full flex items-center justify-center mb-4">
          <SearchX className="w-10 h-10 text-slate-500" />
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-2">Kullanıcı Bulunamadı</h3>
        <p className="text-sm">Henüz bir kullanıcı eklenmemiş veya veriler yüklenememiş.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
