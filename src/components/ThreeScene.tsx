"use client"

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import threeSettings from '@/config/threeSettings'

export default function ThreeScene() {
  const asciiRef = useRef<HTMLPreElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)
  const [scrollY, setScrollY] = React.useState(0)

  useEffect(() => {
    // 延迟一点让装饰线条先出现
    setTimeout(() => setMounted(true), 100)
    
    // 监听滚动
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    
    if (!containerRef.current || !asciiRef.current) return
    
    let animationId: number

    // 创建离屏 Three.js 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(threeSettings.cameraFov || 75, 1, 0.1, 1000)
    camera.position.z = threeSettings.cameraDistance

    // 光照
    const ambientLight = new THREE.AmbientLight(0xffffff, threeSettings.ambientLightIntensity)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, threeSettings.directionalLightIntensity)
    dirLight.position.set(...threeSettings.directionalLightPosition)
    scene.add(dirLight)

    // 创建带字母纹理的四面体
    const letters = threeSettings.faceLetters || ['C', 'X', 'I', 'N']
    const colors = threeSettings.faceColors || ['#ffffff', '#ffffff', '#ffffff', '#ffffff']
    const letterScale = threeSettings.faceLetterScale || 0.6
    
    const textures = letters.map((ch, i) => {
      const size = threeSettings.textureSize || 512
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!
      
      // 关闭图像平滑
      ctx.imageSmoothingEnabled = false
      
      // 面的背景色
      ctx.fillStyle = colors[i]
      ctx.fillRect(0, 0, size, size)
      // 字母（黑色）- 使用 transform 实现拉伸
      ctx.fillStyle = '#000000'
      const baseSize = size * letterScale
      ctx.font = `bold ${baseSize}px ${threeSettings.fontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // 应用拉伸变换
      const scaleX = threeSettings.faceLetterScaleX || 1.0
      const scaleY = threeSettings.faceLetterScaleY || 1.0
      ctx.save()
      ctx.translate(size / 2, size / 2)
      ctx.scale(scaleX, scaleY)
      ctx.fillText(ch, 0, 0)
      ctx.restore()
      
      const tex = new THREE.CanvasTexture(canvas)
      // 最近邻采样让边缘更锐利
      tex.magFilter = THREE.NearestFilter
      tex.minFilter = THREE.NearestFilter
      tex.needsUpdate = true
      return tex
    })

    const geometry = new THREE.TetrahedronGeometry(threeSettings.tetraRadius, 0)
    
    // 设置 UV 坐标（固定值，字母大小由 faceLetterScale 控制）
    const posAttr = geometry.getAttribute('position')
    const count = posAttr.count
    const uv = new Float32Array(count * 2)
    const h = 0.5
    const w = 0.5
    const yOffset = 0
    for (let i = 0; i < count; i += 3) {
      uv[i * 2] = 0.5
      uv[i * 2 + 1] = 0.5 + h * 2 / 3 + yOffset
      uv[(i + 1) * 2] = 0.5 - w
      uv[(i + 1) * 2 + 1] = 0.5 - h / 3 + yOffset
      uv[(i + 2) * 2] = 0.5 + w
      uv[(i + 2) * 2 + 1] = 0.5 - h / 3 + yOffset
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
    
    // 设置材质组
    geometry.clearGroups()
    for (let i = 0; i < 4; i++) {
      geometry.addGroup(i * 3, 3, i)
    }

    const materials = textures.map(tex => new THREE.MeshStandardMaterial({
      map: tex,
      metalness: threeSettings.metalness,
      roughness: threeSettings.roughness,
    }))

    const tetra = new THREE.Mesh(geometry, materials)
    
    // 响应式定位：移动端居中，桌面端偏左
    const updateTetraPosition = () => {
      if (window.innerWidth < 768) {
        tetra.position.x = 0 // 移动端居中
      } else {
        tetra.position.x = threeSettings.tetraOffsetX // 桌面端使用配置值
      }
    }
    updateTetraPosition()
    
    scene.add(tetra)

    // 拖拽状态和惯性
    let isDragging = false
    let targetRotationX = 0
    let targetRotationY = 0
    let velocityX = 0
    let velocityY = 0

    const onMouseDown = () => {
      isDragging = true
      targetRotationX = tetra.rotation.x
      targetRotationY = tetra.rotation.y
      document.body.style.cursor = 'grabbing'
    }

    let lastMouseX = 0
    let lastMouseY = 0
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        lastMouseX = e.clientX
        lastMouseY = e.clientY
        return
      }
      
      // 计算鼠标移动的增量
      const deltaX = (e.clientX - lastMouseX) * threeSettings.dragSensitivity
      const deltaY = (e.clientY - lastMouseY) * threeSettings.dragSensitivity
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      
      // 更新目标旋转
      targetRotationY += deltaX
      targetRotationX += deltaY
    }

    const onMouseUp = () => {
      isDragging = false
      document.body.style.cursor = ''
    }

    // 绑定到容器而不是隐藏的canvas
    const container = containerRef.current
    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // 字符宽高比
    const charAspect = threeSettings.asciiCharAspect || 0.5

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      
      // 相机宽高比 = 屏幕宽高比
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      
      // 计算字符网格大小，保持和屏幕相同的宽高比
      const gridSize = threeSettings.asciiGridSize
      const rows = Math.floor(h / gridSize)
      // cols 需要补偿字符宽高比，使渲染结果在字符显示后保持正确比例
      const cols = Math.floor((w / h) * rows / charAspect)
      
      renderer.setSize(cols, rows)
      
      // 更新四面体位置
      updateTetraPosition()
    }
    resize()
    window.addEventListener('resize', resize)

    const asciiChars = threeSettings.asciiChars || 'CXIN'
    const damping = threeSettings.dragDamping || 0.95
    const inertia = threeSettings.dragInertia || 0.92

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (isDragging) {
        // 拖动时：平滑跟随目标位置
        velocityX = (targetRotationX - tetra.rotation.x) * (1 - inertia)
        velocityY = (targetRotationY - tetra.rotation.y) * (1 - inertia)
        tetra.rotation.x += velocityX
        tetra.rotation.y += velocityY
      } else {
        // 松开后：应用惯性
        if (Math.abs(velocityX) > 0.0001 || Math.abs(velocityY) > 0.0001) {
          tetra.rotation.x += velocityX
          tetra.rotation.y += velocityY
          velocityX *= damping
          velocityY *= damping
        } else {
          // 惯性结束后恢复自动旋转
          tetra.rotation.y += threeSettings.rotationSpeedY * 0.016
          tetra.rotation.x += threeSettings.rotationSpeedX * 0.016
          targetRotationX = tetra.rotation.x
          targetRotationY = tetra.rotation.y
        }
      }

      // 渲染 3D 场景
      renderer.render(scene, camera)

      // 读取像素
      const gl = renderer.getContext()
      const w = renderer.domElement.width
      const h = renderer.domElement.height
      const pixels = new Uint8Array(w * h * 4)
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

      // 转换为 ASCII，用 CXIN 字符根据亮度选择
      let ascii = ''
      const charLen = asciiChars.length
      for (let y = h - 1; y >= 0; y--) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4
          const brightness = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3
          
          if (brightness > 15) {
            // 将亮度范围 15-255 均匀映射到所有字符
            const normalized = (brightness - 15) / (255 - 15)
            const charIndex = Math.floor(normalized * charLen)
            ascii += asciiChars[Math.min(charIndex, charLen - 1)]
          } else {
            ascii += ' '
          }
        }
        ascii += '\n'
      }
      
      if (asciiRef.current) {
        asciiRef.current.textContent = ascii
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      renderer.dispose()
      geometry.dispose()
      materials.forEach(m => m.dispose())
      textures.forEach(t => t.dispose())
    }
  }, [])

  const fontSize = threeSettings.asciiGridSize

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-auto select-none transition-colors" 
      style={{ 
        backgroundColor: 'var(--bg-canvas)', 
        cursor: 'grab',
        transform: `translateY(-${scrollY}px)`,
        transition: 'transform 0.1s linear'
      }}
    >
      <pre
        ref={asciiRef}
        className={`transition-all duration-700 ${mounted ? 'opacity-15 md:opacity-25 scale-100' : 'opacity-0 scale-95'}`}
        style={{
          margin: 0,
          padding: 0,
          fontSize: `${fontSize}px`,
          lineHeight: `${threeSettings.asciiGridSize}px`,
          fontFamily: 'monospace',
          color: 'var(--text-primary)',
          whiteSpace: 'pre',
          letterSpacing: '0px',
          pointerEvents: 'none',
          userSelect: 'none',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  )
}
