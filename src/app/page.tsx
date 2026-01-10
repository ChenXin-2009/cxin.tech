import ThreeScene from '@/components/ThreeScene'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Fullscreen canvas lives in ThreeScene (fixed) */}
      <ThreeScene />

      <div className="relative z-10 min-h-screen flex items-center justify-end p-8 pointer-events-none">
        <div className="w-full max-w-2xl text-right text-black pointer-events-auto">
          <h1 className="text-5xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-title)' }}>CXIN.tech</h1>
          <p className="text-lg opacity-80 mb-3">Crafting minimal 3D web experiences.</p>
          <p className="text-md opacity-60 mb-2">Fast, accessible, and elegant designs — powered by Next.js and Three.js.</p>
          <p className="text-md opacity-60">Explore creative experiments, blog posts, and small tools.</p>
          <div className="mt-6 flex justify-end">
            <a href="#" className="inline-block px-4 py-2 border border-black/20 rounded hover:bg-black/5">Learn more</a>
          </div>
        </div>
      </div>
    </main>
  )
}
