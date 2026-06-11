import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, ExternalLink, Menu, X, BarChart2 } from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-slate-800">
        <div className="font-display font-bold text-lg text-white">
          <span className="text-brand-400">&lt;</span>MAK<span className="text-brand-400">/&gt;</span>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-mono">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Icon size={18} />{label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 space-y-2">
        <a href="/" target="_blank" rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <ExternalLink size={18} /> View Site
        </a>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex bg-slate-950">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-col fixed left-0 top-0 bottom-0 hidden md:flex">
        <SidebarContent />
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 h-14">
        <div className="font-display font-bold text-white">
          <span className="text-brand-400">&lt;</span>MAK<span className="text-brand-400">/&gt;</span>
          <span className="text-xs text-slate-500 font-mono ml-2">Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white p-1">
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {sidebarOpen && <div className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}
      <aside className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>
      <main className="flex-1 md:ml-64 min-h-screen pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  )
}
