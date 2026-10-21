import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

const AudioContext = createContext(null)

const TRACKS = {
    home: '/music/home.mp3',
    gift: '/music/gift.mp3',
    map: '/music/map.mp3',
    moments: '/music/moments.mp3',
    letters: '/music/letter.mp3',
    gallery: '/music/gallery.mp3',
}

const PAGE_DEFAULTS = {
    '/love-letter': 'letters',
    '/love-Letter': 'letters',
    '/gallery': 'gallery',
}

export const AudioProvider = ({ children }) => {
    const location = useLocation()
    const audioRef = useRef(null)
    const fadeRef = useRef(0)
    const [muted, setMuted] = useState(false)
    const [unlocked, setUnlocked] = useState(false)
    const [sectionKey, setSectionKey] = useState('home')

    useEffect(() => {
        const unlock = () => {
            setUnlocked(true)
            const audio = audioRef.current
            if (audio && !audio.muted) {
                audio.play().catch(() => {})
            }
        }
        window.addEventListener('pointerdown', unlock, { once: true })
        window.addEventListener('keydown', unlock, { once: true })
        return () => {
            window.removeEventListener('pointerdown', unlock)
            window.removeEventListener('keydown', unlock)
        }
    }, [])

    const resolvedKey = location.pathname === '/'
        ? sectionKey
        : (PAGE_DEFAULTS[location.pathname] || 'home')

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const nextSrc = TRACKS[resolvedKey] || TRACKS.home
        const current = audio.getAttribute('data-track')
        if (current === nextSrc) {
            audio.muted = muted
            return
        }

        const token = ++fadeRef.current
        const fadeAndSwitch = async () => {
            const startVol = audio.volume || 0.45
            if (current && !audio.paused) {
                for (let i = 0; i < 8; i += 1) {
                    if (fadeRef.current !== token) return
                    audio.volume = Math.max(0, startVol * (1 - (i + 1) / 8))
                    await new Promise((r) => setTimeout(r, 40))
                }
            }

            if (fadeRef.current !== token) return
            audio.setAttribute('data-track', nextSrc)
            audio.src = nextSrc
            audio.loop = true
            audio.volume = 0
            audio.muted = muted
            if (unlocked && !muted) {
                try {
                    await audio.play()
                } catch {
                    return
                }
            }
            for (let i = 0; i < 10; i += 1) {
                if (fadeRef.current !== token) return
                audio.volume = Math.min(0.45, ((i + 1) / 10) * 0.45)
                await new Promise((r) => setTimeout(r, 40))
            }
        }

        fadeAndSwitch()
    }, [resolvedKey, unlocked])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        audio.muted = muted
        if (!muted && unlocked) {
            audio.play().catch(() => {})
        }
    }, [muted, unlocked])

    const toggleMute = () => {
        setUnlocked(true)
        setMuted((prev) => !prev)
    }

    const setSection = (key) => {
        if (!key || !TRACKS[key]) return
        setSectionKey(key)
    }

    return (
        <AudioContext.Provider value={{ muted, toggleMute, setSection, sectionKey: resolvedKey }}>
            <audio ref={audioRef} loop preload="auto" />
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => {
    const ctx = useContext(AudioContext)
    if (!ctx) {
        return { muted: true, toggleMute: () => {}, setSection: () => {}, sectionKey: 'home' }
    }
    return ctx
}
