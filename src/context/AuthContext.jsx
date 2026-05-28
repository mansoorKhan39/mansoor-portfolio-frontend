import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    setIsAdmin(!!token)
    setLoading(false)
  }, [])

  const login = async (password) => {
    const res = await api.post('/api/auth/login', { password })
    localStorage.setItem('admin_token', res.data.token)
    setIsAdmin(true)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
