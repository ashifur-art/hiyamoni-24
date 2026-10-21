import React from 'react'

const LoveMap = () => {
    return (
        <section className="feature-section map-section" data-audio="map">
            <p className="feature-kicker">Two screens. One heartbeat.</p>
            <h2>Distance / Love Map</h2>
            <p className="feature-sub">We have never stood in the same room — but we already live in the same chat.</p>

            <div className="love-map-card">
                <div className="love-map-nodes">
                    <div className="love-node">
                        <span className="love-pin">📍</span>
                        <strong>ASHIF</strong>
                        <small>Here, typing at midnight</small>
                    </div>

                    <div className="love-bridge" aria-hidden="true">
                        <span className="love-line" />
                        <span className="pulse-heart h1">💖</span>
                        <span className="pulse-heart h2">💗</span>
                        <span className="pulse-heart h3">💖</span>
                    </div>

                    <div className="love-node">
                        <span className="love-pin">📍</span>
                        <strong>HIYAMONI</strong>
                        <small>There, lighting up my phone</small>
                    </div>
                </div>
                <p className="love-map-caption">
                    Miles apart, but close at heart — Waiting for our first real meeting! 💖
                </p>
            </div>
        </section>
    )
}

export default LoveMap
