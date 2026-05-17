import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Stats from '../Components/Stats';
import UserForm from '../Components/UserForm';
import UserList from '../Components/UserList';
import { RefreshCw, Zap } from 'lucide-react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const savedUsers = localStorage.getItem('todo_users');
      
      if (savedUsers && JSON.parse(savedUsers).length > 0) {
        setUsers(JSON.parse(savedUsers));
        setLoading(false);
      } else {
        await fetchUsersFromApi();
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('todo_users', JSON.stringify(users));
    }
  }, [users, loading]);

  const fetchUsersFromApi = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      const formattedData = data.map(u => ({ ...u, isLocal: false }));
      setUsers(formattedData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Tüm veriler sıfırlanacak ve API\'den yeniden çekilecek. Emin misiniz?')) {
      localStorage.removeItem('todo_users');
      await fetchUsersFromApi();
      setEditingUser(null);
    }
  };

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: uuidv4(),
      isLocal: true,
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const handleUpdateUser = (updatedData) => {
    setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...updatedData } : u));
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto space-y-8 relative">
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
            <Zap className="w-10 h-10 text-indigo-500" fill="currentColor" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              TODO
            </span> App
          </h1>
          
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700/50 hover:border-slate-500 shadow-lg backdrop-blur-sm"
          >
            <RefreshCw className="w-4 h-4" /> Verileri Sıfırla
          </button>
          
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-20 relative z-10">
          <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <main className="space-y-8 relative z-10">
          <Stats users={users} />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <div className="xl:col-span-4 2xl:sticky top-6">
              <UserForm 
                onSubmit={editingUser ? handleUpdateUser : handleAddUser} 
                initialData={editingUser}
                onCancel={editingUser ? () => setEditingUser(null) : undefined}
                key={editingUser ? editingUser.id : 'new'} 
              />
            </div>
            <div className="xl:col-span-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-100">Kullanıcı Listesi</h2>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                  Toplam: {users.length}
                </span>
              </div>
              <UserList 
                users={users} 
                onEdit={setEditingUser} 
                onDelete={handleDeleteUser} 
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
