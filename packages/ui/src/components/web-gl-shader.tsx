"use client"

import { useEffect, useRef, useCallback } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
    isVisible: boolean
    lastTime: number
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
    isVisible: true,
    lastTime: 0,
  })

  const animate = useCallback(() => {
    const { current: refs } = sceneRef
    
    // Skip rendering completely when not visible
    if (!refs.isVisible) {
      refs.animationId = requestAnimationFrame(animate)
      return
    }

    // Aggressive throttling: 15fps for performance
    const now = performance.now()
    if (now - refs.lastTime < 66) { // ~15fps
      refs.animationId = requestAnimationFrame(animate)
      return
    }
    refs.lastTime = now

    if (refs.uniforms) refs.uniforms.time.value += 0.03 // Increase increment for same visual speed
    if (refs.renderer && refs.scene && refs.camera) {
      refs.renderer.render(refs.scene, refs.camera)
    }
    refs.animationId = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        // Smooth gradient transitions at top and bottom (black edges)
        float verticalFade = 1.0;
        float fadeSize = 0.25; // 25% of screen for fade
        
        // Top fade (black at top)
        if (uv.y < fadeSize) {
          verticalFade = smoothstep(0.0, fadeSize, uv.y);
        }
        // Bottom fade (black at bottom)
        else if (uv.y > 1.0 - fadeSize) {
          verticalFade = smoothstep(1.0, 1.0 - fadeSize, uv.y);
        }
        
        // Single wave intensity for uniform purple color
        float wave = 0.05 / abs(p.y + sin((p.x + time) * xScale) * yScale);

        // Map intensity to purple shades (violet to lavender)
        float r = wave * 0.58;
        float g = wave * 0.20;
        float b = wave * 0.92;
        
        // Apply vertical fade to blend with background at edges
        // Background color matches --background: oklch(0.145 0 0) ≈ #0a0a0a
        vec3 bgColor = vec3(0.04, 0.04, 0.04);
        vec3 color = mix(bgColor, vec3(r, g, b), verticalFade);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ 
        canvas,
        powerPreference: "low-power",
        antialias: false,
      })
      // Limit pixel ratio more aggressively (max 1.5)
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      // Match background color to --background: oklch(0.145 0 0) ≈ #0a0a0a
      refs.renderer.setClearColor(new THREE.Color(0x0a0a0a))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [canvas.clientWidth, canvas.clientHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms || !canvas) return
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    // Use IntersectionObserver to pause when not visible with higher threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          refs.isVisible = entry.isIntersecting && entry.intersectionRatio > 0.1
        })
      },
      { threshold: [0, 0.1, 0.5], rootMargin: '-50px' }
    )

    initScene()
    animate()
    observer.observe(canvas)
    
    // Use ResizeObserver instead of window resize for better performance
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      observer.disconnect()
      resizeObserver.disconnect()
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [animate])

  return (
    <canvas
      ref={canvasRef}
      className="absolute -top-16 left-0 w-full h-full block will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    />
  )
}
