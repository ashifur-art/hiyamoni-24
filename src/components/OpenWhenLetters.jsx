import React, { useState } from 'react'

const CARDS = [
    {
        id: 'miss',
        title: 'Open when you miss me 🥺',
        body: `Hiyamoni, if the chat feels too quiet, press play on any of our late-night calls in your memory. I am only a screen away — still staying up, still typing “are you awake?”, still loving you from this distance until our first real meeting.`,
    },
    {
        id: 'birthday',
        title: 'Open on your 17th birthday night 🌙',
        body: `It’s 24th October, and you are seventeen. I cannot hand you a cake in person yet, so I am sending this glow through the phone: Happy Birthday, my Hiyamoni. May this night feel as warm as every long call we’ve ever shared. I love you — Ashif.`,
    },
    {
        id: 'low',
        title: 'Open when you are feeling low 💖',
        body: `If the day is heavy, let this letter sit beside you. You do not have to be strong on video. Cry, rest, text me three dots — I will still choose you from miles away. Your softness is safe with me, even before we ever meet.`,
    },
]

const OpenWhenLetters = () => {
    const [openId, setOpenId] = useState(null)

    return (
        <section className="feature-section openwhen-section" data-audio="letters">
            <p className="feature-kicker">Keep these in your pocket</p>
            <h2>“Open When…” Letters</h2>
            <p className="feature-sub">Three envelopes from Ashif. Tap one when your heart needs it.</p>

            <div className="openwhen-grid">
                {CARDS.map((card) => {
                    const isOpen = openId === card.id
                    return (
                        <button
                            key={card.id}
                            type="button"
                            className={`openwhen-card ${isOpen ? 'is-open' : ''}`}
                            onClick={() => setOpenId(isOpen ? null : card.id)}
                            aria-expanded={isOpen}
                        >
                            <div className="openwhen-inner">
                                <div className="openwhen-face openwhen-front">
                                    <span className="openwhen-wax">💌</span>
                                    <h3>{card.title}</h3>
                                    <small>Tap to open</small>
                                </div>
                                <div className="openwhen-face openwhen-back">
                                    <h3>{card.title}</h3>
                                    <p>{card.body}</p>
                                    <cite>— Ashif</cite>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

export default OpenWhenLetters
