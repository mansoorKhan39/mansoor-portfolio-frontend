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

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-[var(--border)]">
        <div className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
          Mansoor Ali Khan
        </div>
        <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-dim)' }}>
          Admin Panel
        </p>
      </div>
      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                isActive
                  ? 'border-[var(--border-strong)] bg-white/10'
                  : 'border-transparent hover:bg-white/5'
              }`
            }
            style={({ isActive }) => ({
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
            })}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-[var(--border)] space-y-1.5">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-all"
          style={{ color: 'var(--text-muted)' }}
        >
          <ExternalLink size={17} /> View Site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <aside
        className="w-64 border-r border-[var(--border)] flex-col fixed left-0 top-0 bottom-0 hidden md:flex"
        style={{ backgroundColor: 'var(--bg-sidebar)' }}
      >
        <SidebarContent />
      </aside>

      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] flex items-center justify-between px-4 h-14"
        style={{ backgroundColor: 'var(--bg-sidebar)' }}
      >
        <div className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>
          Mansoor Ali Khan
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Toggle admin sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-64 border-r border-[var(--border)] flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--bg-sidebar)' }}
      >
        <SidebarContent />
      </aside>

      <main className="flex-1 md:ml-64 min-h-screen pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  )
}
