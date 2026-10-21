import React, { useEffect, useRef } from 'react'

const MAX_PARTICLES = 70

const PetalCursor = () => {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const lastSpawnRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let frame = 0
        let running = true

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const spawn = (x, y, burst = 2) => {
            const now = performance.now()
            if (!burst && now - lastSpawnRef.current < 28) return
            lastSpawnRef.current = now
            const count = burst
            for (let i = 0; i < count; i += 1) {
                if (particlesRef.current.length >= MAX_PARTICLES) {
                    particlesRef.current.shift()
                }
                const isHeart = Math.random() > 0.45
                particlesRef.current.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 1.8,
                    vy: -1.2 - Math.random() * 1.8,
                    life: 1,
                    size: isHeart ? 8 + Math.random() * 7 : 10 + Math.random() * 8,
                    rot: Math.random() * Math.PI,
                    vr: (Math.random() - 0.5) * 0.08,
                    kind: isHeart ? 'heart' : 'petal',
                    color: isHeart
                        ? (Math.random() > 0.5 ? '#ff4d6d' : '#c1121f')
                        : (Math.random() > 0.5 ? '#9b2226' : '#e63946'),
                })
            }
        }

        const onPointer = (e) => {
            const point = e.touches ? e.touches[0] : e
            if (!point) return
            spawn(point.clientX, point.clientY, e.type === 'touchstart' ? 5 : 2)
        }

        window.addEventListener('pointermove', onPointer, { passive: true })
        window.addEventListener('pointerdown', onPointer, { passive: true })
        window.addEventListener('touchmove', onPointer, { passive: true })

        const drawHeart = (x, y, size, color, alpha) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.scale(size / 16, size / 16)
            ctx.globalAlpha = alpha
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.moveTo(0, 4)
            ctx.bezierCurveTo(-8, -4, -8, 8, 0, 12)
            ctx.bezierCurveTo(8, 8, 8, -4, 0, 4)
            ctx.fill()
            ctx.restore()
        }

        const drawPetal = (p) => {
            ctx.save()
            ctx.translate(p.x, p.y)
            ctx.rotate(p.rot)
            ctx.globalAlpha = p.life
            ctx.fillStyle = p.color
            ctx.beginPath()
            ctx.ellipse(0, 0, p.size * 0.35, p.size * 0.7, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = 'rgba(255,255,255,0.35)'
            ctx.beginPath()
            ctx.ellipse(-p.size * 0.08, 0, p.size * 0.1, p.size * 0.35, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
        }

        const tick = () => {
            if (!running) return
            frame = requestAnimationFrame(tick)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particlesRef.current = particlesRef.current.filter((p) => p.life > 0.02)
            particlesRef.current.forEach((p) => {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.012
                p.rot += p.vr
                p.life -= 0.012
                if (p.kind === 'heart') {
                    drawHeart(p.x, p.y, p.size, p.color, p.life)
                } else {
                    drawPetal(p)
                }
            })
        }
        tick()

        return () => {
            running = false
            cancelAnimationFrame(frame)
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', onPointer)
            window.removeEventListener('pointerdown', onPointer)
            window.removeEventListener('touchmove', onPointer)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="petal-cursor"
            aria-hidden="true"
        />
    )
}

export default PetalCursor
