import React from 'react';
import { Edit2, Trash2, Mail, Phone, User as UserIcon } from 'lucide-react';

export default function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="glass rounded-3xl p-5 md:p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group border border-slate-700/50 hover:border-indigo-500/30 w-full flex flex-col 2xl:flex-col gap-5 2xl:g   items-start 2xl:items-center">

      {/* Profile Section */}
      <div className="flex items-center gap-4 flex-[1.5] min-w-0 w-full">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg shrink-0">
          <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-indigo-300 font-bold text-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-100 text-lg md:text-xl leading-tight group-hover:text-indigo-300 transition-colors truncate">
              {user.name}
            </h3>
            {user.isLocal && (
              <span className="px-2 py-1 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded-md border border-purple-500/30 shrink-0">
                LOCAL
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm md:text-base flex items-center gap-1.5 mt-1 truncate">
            <UserIcon className="w-4 h-4 shrink-0" /> <span className="truncate">@{user.username}</span>
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col sm:flex-row gap-3 flex-[2] min-w-0 w-full">
        <div className="flex items-center gap-3 text-slate-300 text-sm md:text-base bg-slate-800/50 px-4 py-3 md:px-5 md:py-4 rounded-xl flex-1 min-w-0 border border-slate-700/30">
          <Mail className="w-4 h-4 md:w-5 md:h-5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 text-sm md:text-base bg-slate-800/50 px-4 py-3 md:px-5 md:py-4 rounded-xl flex-1 min-w-0 border border-slate-700/30">
          <Phone className="w-4 h-4 md:w-5 md:h-5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{user.phone}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-1 w-full pt-4 2xl:pt-0 border-t 2xl:border-t-0  border-slate-700/50">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 flex items-center justify-center bg-slate-800 hover:bg-indigo-600/20 text-indigo-400 py-3 rounded-xl transition-colors border border-transparent hover:border-indigo-500/30 text-sm md:text-base font-semibold"
        >
          <Edit2 className="w-4 h-4 md:w-5 md:h-5" /> Düzenle
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-rose-600/20 text-rose-400 py-3 rounded-xl transition-colors border border-transparent hover:border-rose-500/30 text-sm md:text-base font-semibold"
        >
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" /> Sil
        </button>
      </div>
    </div>
  );
}
