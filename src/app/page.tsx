"use client"

import { useEffect, useState } from 'react'
import ThreeScene from '@/components/ThreeScene'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const [projectsVisible, setProjectsVisible] = useState(false)
  const fullTitle = 'CXIN.tech'

  useEffect(() => {
    setMounted(true)
    
    // 打字机效果 - 逐个显示字符
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setVisibleChars(currentIndex)
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    // 滚动渐隐效果和项目区域渐显
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // 首屏内容渐隐：在滚动0-100vh之间，透明度从1渐变到0
      const opacity = Math.max(0, 1 - scrollY / windowHeight)
      setScrollOpacity(opacity)
      
      // 项目区域渐显：当滚动超过50vh时开始显示
      if (scrollY > windowHeight * 0.5) {
        setProjectsVisible(true)
      } else {
        setProjectsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // 初始检查
    handleScroll()

    return () => {
      clearInterval(typingInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fullscreen canvas lives in ThreeScene (fixed) */}
      <ThreeScene />

      {/* 主题切换按钮 */}
      <ThemeToggle />

      {/* 明日方舟风格装饰线条 */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* 左上角装饰 */}
        <div 
          className={`absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 opacity-20 transition-all duration-600 ${mounted ? 'scale-100' : 'scale-0'}`}
          style={{ borderColor: 'var(--text-primary)', transformOrigin: 'top left' }}
        ></div>
        <div 
          className={`absolute top-12 left-12 w-24 h-24 border-l border-t opacity-10 transition-all duration-600 delay-75 ${mounted ? 'scale-100' : 'scale-0'}`}
          style={{ borderColor: 'var(--text-primary)', transformOrigin: 'top left' }}
        ></div>
        
        {/* 右下角装饰 */}
        <div 
          className={`absolute bottom-8 right-8 w-40 h-40 border-r-2 border-b-2 opacity-20 transition-all duration-600 delay-150 ${mounted ? 'scale-100' : 'scale-0'}`}
          style={{ borderColor: 'var(--text-primary)', transformOrigin: 'bottom right' }}
        ></div>
        <div 
          className={`absolute bottom-12 right-12 w-32 h-32 border-r border-b opacity-10 transition-all duration-600 delay-[225ms] ${mounted ? 'scale-100' : 'scale-0'}`}
          style={{ borderColor: 'var(--text-primary)', transformOrigin: 'bottom right' }}
        ></div>
        
        {/* 倾斜线条 */}
        <div 
          className={`absolute top-1/4 right-1/4 w-px opacity-10 rotate-45 origin-top transition-all duration-500 delay-300 ${mounted ? 'h-32' : 'h-0'}`}
          style={{ backgroundColor: 'var(--text-primary)' }}
        ></div>
        <div 
          className={`absolute bottom-1/3 left-1/3 w-px opacity-10 -rotate-45 origin-bottom transition-all duration-500 delay-[350ms] ${mounted ? 'h-24' : 'h-0'}`}
          style={{ backgroundColor: 'var(--text-primary)' }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center md:justify-end p-4 md:p-8 pointer-events-none">
        <div 
          className="w-full max-w-2xl text-center md:text-right pointer-events-auto transition-opacity duration-300"
          style={{ opacity: scrollOpacity }}
        >
          {/* 标签编号 */}
          <div 
            className={`flex justify-center md:justify-end items-center gap-4 mb-6 text-xs font-mono opacity-40 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-40' : 'translate-y-4 opacity-0'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="px-2 py-1 border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>SYS-001</span>
            <span className="px-2 py-1" style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>CXIN.TECH</span>
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <h1 
            className="text-4xl md:text-6xl font-extrabold mb-2 relative break-words" 
            style={{ fontFamily: 'var(--font-title)', color: 'var(--text-primary)' }}
          >
            {fullTitle.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-opacity duration-100"
                style={{ opacity: index < visibleChars ? 1 : 0 }}
              >
                {char}
              </span>
            ))}
            {/* 荧光色点缀 */}
            {visibleChars === fullTitle.length && (
              <span className="absolute -right-2 md:-right-4 top-0 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            )}
          </h1>
          
          {/* 副标题带装饰线 */}
          <div 
            className={`flex items-center justify-center md:justify-end gap-3 mb-6 transition-all duration-500 delay-[400ms] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <div className="w-8 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <p className="text-base md:text-lg opacity-80 font-medium" style={{ color: 'var(--text-primary)' }}>Crafting minimal 3D web experiences</p>
          </div>

          <p 
            className={`text-sm md:text-md opacity-60 mb-2 leading-relaxed transition-all duration-500 delay-[500ms] ${mounted ? 'translate-y-0 opacity-60' : 'translate-y-4 opacity-0'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            Fast, accessible, and elegant designs — powered by Next.js and Three.js.
          </p>
          <p 
            className={`text-sm md:text-md opacity-60 mb-8 leading-relaxed transition-all duration-500 delay-[550ms] ${mounted ? 'translate-y-0 opacity-60' : 'translate-y-4 opacity-0'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            Explore creative experiments, blog posts, and small tools.
          </p>

          {/* 按钮组 */}
          <div 
            className={`flex justify-center md:justify-end gap-4 items-center transition-all duration-500 delay-[600ms] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <div className="text-xs font-mono opacity-30" style={{ color: 'var(--text-primary)' }}>v0.1.0</div>
            <a 
              href="#" 
              className="relative inline-block px-6 py-3 border-2 hover:opacity-70 transition-all group overflow-hidden"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <span className="relative z-10">LEARN MORE</span>
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform" style={{ backgroundColor: 'var(--border-color)' }}></div>
              {/* 按钮装饰 */}
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-orange-500"></div>
            </a>
          </div>

          {/* 底部信息栏 */}
          <div 
            className={`mt-12 pt-6 border-t flex justify-center md:justify-end gap-4 md:gap-6 text-xs font-mono opacity-40 flex-wrap transition-all duration-500 delay-[650ms] ${mounted ? 'translate-y-0 opacity-40' : 'translate-y-4 opacity-0'}`}
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            <span>STATUS: ONLINE</span>
            <span>UPTIME: 99.9%</span>
            <span className="text-orange-500">◆</span>
          </div>
        </div>
      </div>

      {/* 项目展示区域 */}
      <div className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* 区域标题 */}
          <div 
            className={`flex items-center gap-4 mb-8 transition-all duration-700 ${projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <h2 className="text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>PROJECTS</h2>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <span className="text-xs font-mono opacity-40" style={{ color: 'var(--text-primary)' }}>001</span>
          </div>

          {/* 项目卡片列表 */}
          <div className="space-y-6">
            {/* Solmap 项目卡片 */}
            <a
              href="https://solmap.cxin.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative border-2 p-0 transition-all duration-700 delay-100 hover:border-orange-500 flex flex-col md:flex-row overflow-hidden ${projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ borderColor: 'var(--border-color)' }}
            >
              {/* 卡片装饰 */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>

              {/* 左侧图片区域 */}
              <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative" style={{ backgroundColor: 'var(--border-color)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-20" style={{ color: 'var(--text-primary)' }}>🪐</span>
                </div>
                {/* 项目编号标签 */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-mono px-2 py-1 border" style={{ borderColor: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>PRJ-001</span>
                </div>
              </div>

              {/* 右侧内容区域 */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  {/* 标题和状态 */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors" style={{ fontFamily: 'var(--font-title)', color: 'var(--text-primary)' }}>
                      SOLMAP
                    </h3>
                    <span className="text-xs px-2 py-1 border ml-4" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>LIVE</span>
                  </div>

                  {/* 项目描述 */}
                  <p className="text-sm opacity-60 mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    太阳系实时地图 - 实时可视化太阳系行星位置和运动轨迹
                  </p>

                  {/* 技术标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 opacity-40 font-mono" style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>Three.js</span>
                    <span className="text-xs px-2 py-1 opacity-40 font-mono" style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>WebGL</span>
                    <span className="text-xs px-2 py-1 opacity-40 font-mono" style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>Astronomy</span>
                  </div>
                </div>

                {/* 底部链接 */}
                <div className="flex items-center gap-4 text-xs font-mono pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="opacity-60" style={{ color: 'var(--text-primary)' }}>solmap.cxin.tech</span>
                  <a 
                    href="https://github.com/ChenXin-2009/solmap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 hover:text-orange-500 transition-all"
                    style={{ color: 'var(--text-primary)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub →
                  </a>
                </div>
              </div>

              {/* 悬停效果背景 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" style={{ backgroundColor: 'var(--text-primary)' }}></div>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
