"use client"

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // 检查本地存储或系统偏好
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = stored || (systemPrefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-8 right-8 z-50 w-12 h-12 border-2 hover:bg-current/10 transition-all group"
      style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      aria-label="Toggle theme"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {theme === 'light' ? (
          // 暗色模式图标 - 实心圆
          <div className="w-4 h-4 rounded-full bg-current"></div>
        ) : (
          // 亮色模式图标 - 空心方块
          <div className="w-4 h-4 border-2 border-current"></div>
        )}
        {/* 装饰角 */}
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-orange-500"></div>
        {/* 底部装饰线 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </div>
    </button>
  )
}
