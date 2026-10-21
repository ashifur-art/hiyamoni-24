import React, { useState } from 'react'
import { Link } from 'react-router'
import hiyamoni1 from '../assets/hiyamoni-1.jpg'
import hiyamoni2 from '../assets/hiyamoni-2.jpg'
import hiyamoni3 from '../assets/hiyamoni-3.jpg'
import FlowerDecor from '../components/FlowerDecor'
import '../Gallery.css'

const portraits = [
    {
        id: 1,
        src: hiyamoni1,
        title: 'SNOWKISS',
        compliment: 'SNOWKISS — your smile is pure snow-light: gentle, mesmerizing, and so soft it still glows through a late-night video call.',
    },
    {
        id: 2,
        src: hiyamoni2,
        title: 'ROSELLE',
        compliment: 'ROSELLE — you are sweetness in bloom. Like a rose and tulip opening on Ashif’s screen, you make every ordinary chat feel like a garden.',
    },
    {
        id: 3,
        src: hiyamoni3,
        title: 'RED CHILLI',
        compliment: 'RED CHILLI — spicy, a little naughty, and completely irresistible. Even miles away, your playful spark makes Ashif smile at his phone like a fool.',
    },
]

const Gallery = () => {
    const [active, setActive] = useState(null)

    return (
        <main className="gallery-page">
            <FlowerDecor variant="gallery" />

            <header className="gallery-header">
                <p className="gallery-kicker">For Hiyamoni · 24th October · Sweet 16</p>
                <h1>Little Praises</h1>
                <p className="gallery-sub">Three pictures. Three nicknames. Tap a portrait to hold it closer — from Ashif, across the miles.</p>
            </header>

            <section className="gallery-grid">
                {portraits.map((item, index) => (
                    <article
                        key={item.id}
                        className={`gallery-card ${active === item.id ? 'is-open' : ''}`}
                        style={{ '--delay': `${0.2 + index * 0.15}s` }}
                        role="button"
                        tabIndex={0}
                        onClick={() => setActive(active === item.id ? null : item.id)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                setActive(active === item.id ? null : item.id)
                            }
                        }}
                    >
                        <div className="gallery-polaroid">
                            <div className="gallery-photo">
                                <img src={item.src} alt={`${item.title} — Hiyamoni`} />
                            </div>
                            <h2>{item.title}</h2>
                            <p>{item.compliment}</p>
                        </div>
                    </article>
                ))}
            </section>

            <div className="gallery-actions">
                <Link to="/" className="gallery-back">Back Home</Link>
                <Link to="/love-letter" className="gallery-back">Love Letter</Link>
            </div>
        </main>
    )
}

export default Gallery
