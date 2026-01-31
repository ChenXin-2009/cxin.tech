import ThreeScene from '@/components/ThreeScene'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fullscreen canvas lives in ThreeScene (fixed) */}
      <ThreeScene />

      {/* 主题切换按钮 */}
      <ThemeToggle />

      {/* 明日方舟风格装饰线条 */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* 左上角装饰 */}
        <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 opacity-20" style={{ borderColor: 'var(--text-primary)' }}></div>
        <div className="absolute top-12 left-12 w-24 h-24 border-l border-t opacity-10" style={{ borderColor: 'var(--text-primary)' }}></div>
        
        {/* 右下角装饰 */}
        <div className="absolute bottom-8 right-8 w-40 h-40 border-r-2 border-b-2 opacity-20" style={{ borderColor: 'var(--text-primary)' }}></div>
        <div className="absolute bottom-12 right-12 w-32 h-32 border-r border-b opacity-10" style={{ borderColor: 'var(--text-primary)' }}></div>
        
        {/* 倾斜线条 */}
        <div className="absolute top-1/4 right-1/4 w-px h-32 opacity-10 rotate-45 origin-top" style={{ backgroundColor: 'var(--text-primary)' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-px h-24 opacity-10 -rotate-45 origin-bottom" style={{ backgroundColor: 'var(--text-primary)' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center md:justify-end p-4 md:p-8 pointer-events-none">
        <div className="w-full max-w-2xl text-center md:text-right pointer-events-auto">
          {/* 标签编号 */}
          <div className="flex justify-center md:justify-end items-center gap-4 mb-6 text-xs font-mono opacity-40" style={{ color: 'var(--text-primary)' }}>
            <span className="px-2 py-1 border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>SYS-001</span>
            <span className="px-2 py-1" style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>CXIN.TECH</span>
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 relative break-words" style={{ fontFamily: 'var(--font-title)', color: 'var(--text-primary)' }}>
            CXIN.tech
            {/* 荧光色点缀 */}
            <span className="absolute -right-2 md:-right-4 top-0 w-2 h-2 bg-orange-500 rounded-full"></span>
          </h1>
          
          {/* 副标题带装饰线 */}
          <div className="flex items-center justify-center md:justify-end gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <p className="text-base md:text-lg opacity-80 font-medium" style={{ color: 'var(--text-primary)' }}>Crafting minimal 3D web experiences</p>
          </div>

          <p className="text-sm md:text-md opacity-60 mb-2 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            Fast, accessible, and elegant designs — powered by Next.js and Three.js.
          </p>
          <p className="text-sm md:text-md opacity-60 mb-8 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            Explore creative experiments, blog posts, and small tools.
          </p>

          {/* 按钮组 */}
          <div className="flex justify-center md:justify-end gap-4 items-center">
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
          <div className="mt-12 pt-6 border-t flex justify-center md:justify-end gap-4 md:gap-6 text-xs font-mono opacity-40 flex-wrap" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <span>STATUS: ONLINE</span>
            <span>UPTIME: 99.9%</span>
            <span className="text-orange-500">◆</span>
          </div>
        </div>
      </div>
    </main>
  )
}
