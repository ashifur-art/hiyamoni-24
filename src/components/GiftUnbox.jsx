import React, { useState } from 'react'
import redRose from '../assets/red-rose.jpg'
import tulip from '../assets/tulip.jpg'

const bouquet = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    src: i % 2 === 0 ? redRose : tulip,
    delay: `${0.08 * i}s`,
    x: `${-40 + (i * 7)}%`,
}))

const GiftUnbox = () => {
    const [opened, setOpened] = useState(false)

    return (
        <section className="feature-section gift-section" data-audio="gift">
            <p className="feature-kicker">A surprise for Hiyamoni</p>
            <h2>Virtual Gift Unboxing</h2>
            <p className="feature-sub">Tap the box, my love — Ashif packed this from miles away.</p>

            <div className={`gift-stage ${opened ? 'is-open' : ''}`}>
                <button
                    type="button"
                    className="gift-hitbox"
                    onClick={() => setOpened(true)}
                    aria-label={opened ? 'Gift already opened' : 'Open birthday gift'}
                    disabled={opened}
                >
                    <div className="gift-3d" aria-hidden="true">
                        <div className="gift-lid">
                            <span className="gift-bow" />
                        </div>
                        <div className="gift-body">
                            <span className="gift-ribbon-v" />
                        </div>
                    </div>
                    {!opened && <span className="gift-hint">Tap to unwrap 🎁</span>}
                </button>

                {opened && (
                    <div className="gift-reveal">
                        <div className="gift-bouquet" aria-hidden="true">
                            {bouquet.map((petal) => (
                                <img
                                    key={petal.id}
                                    src={petal.src}
                                    alt=""
                                    style={{ '--delay': petal.delay, '--x': petal.x }}
                                />
                            ))}
                        </div>
                        <article className="gift-card">
                            <h3>Happy Sweet 16, Hiyamoni ✨</h3>
                            <p>
                                Across every late-night text and every long call, this wish still finds you:
                                may 24th October glow as softly as your smile on my screen.
                            </p>
                            <p className="gift-secret">
                                Secret love note: I fall for you in pixels first — and I am saving my whole heart
                                for the day I finally meet you in real life. — Ashif
                            </p>
                        </article>
                    </div>
                )}
            </div>
        </section>
    )
}

export default GiftUnbox
