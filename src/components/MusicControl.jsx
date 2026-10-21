import React from 'react'
import { useAudio } from '../context/AudioContext'

const MusicControl = () => {
    const { muted, toggleMute } = useAudio()

    return (
        <button
            type="button"
            className="music-control"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute music' : 'Mute music'}
            title={muted ? 'Unmute background music' : 'Mute background music'}
        >
            {muted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
                    <path d="m16 9 5 6M21 9l-5 6" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                    <path fill="currentColor" d="M11 5 6 9H3v6h3l5 4V5z" />
                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" />
                </svg>
            )}
        </button>
    )
}

export default MusicControl
