import React, { useEffect, useState } from 'react'

const ITEMS = [
    { id: 'rose', label: 'Handing her a real Red Rose & Tulip 🌹🌷' },
    { id: 'eyes', label: 'Staring into her eyes without a screen 📱❌' },
    { id: 'food', label: 'Eating her favorite food together 🍕' },
    { id: 'photo', label: 'Taking our very first real photo together 📸' },
    { id: 'hand', label: 'Holding her hand for the first time 🤝' },
]

const STORAGE_KEY = 'hiyamoni-first-meeting-list'

const MeetingBucketList = () => {
    const [checked, setChecked] = useState({})

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
            setChecked(saved)
        } catch {
            setChecked({})
        }
    }, [])

    const toggle = (id) => {
        setChecked((prev) => {
            const next = { ...prev, [id]: !prev[id] }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            return next
        })
    }

    const done = ITEMS.filter((item) => checked[item.id]).length

    return (
        <section className="feature-section bucket-section" data-audio="moments">
            <p className="feature-kicker">Until the first hug</p>
            <h2>Our First Meeting Bucket List</h2>
            <p className="feature-sub">
                Dreams we are saving for the day screens finally turn into a real moment. {done}/{ITEMS.length} waiting.
            </p>

            <ul className="bucket-list">
                {ITEMS.map((item) => (
                    <li key={item.id}>
                        <label className={checked[item.id] ? 'is-checked' : ''}>
                            <input
                                type="checkbox"
                                checked={!!checked[item.id]}
                                onChange={() => toggle(item.id)}
                            />
                            <span className="bucket-box" aria-hidden="true" />
                            <span className="bucket-text">{item.label}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default MeetingBucketList
