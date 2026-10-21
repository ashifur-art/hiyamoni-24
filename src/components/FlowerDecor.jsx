import React from 'react'
import redRose from '../assets/red-rose.jpg'
import tulip from '../assets/tulip.jpg'

const FlowerDecor = ({ variant = 'home' }) => {
    const items = variant === 'gallery'
        ? [
            { src: redRose, className: 'flower-deco rose-a', alt: 'Red rose' },
            { src: tulip, className: 'flower-deco tulip-a', alt: 'Tulip' },
            { src: redRose, className: 'flower-deco rose-b', alt: 'Red rose' },
            { src: tulip, className: 'flower-deco tulip-b', alt: 'Tulip' },
            { src: redRose, className: 'flower-deco rose-c', alt: 'Red rose' },
            { src: tulip, className: 'flower-deco tulip-c', alt: 'Tulip' },
        ]
        : [
            { src: redRose, className: 'flower-deco rose-a', alt: 'Red rose' },
            { src: tulip, className: 'flower-deco tulip-a', alt: 'Tulip' },
            { src: redRose, className: 'flower-deco rose-b', alt: 'Red rose' },
            { src: tulip, className: 'flower-deco tulip-b', alt: 'Tulip' },
        ]

    return (
        <div className={`flower-decor flower-decor--${variant}`} aria-hidden="true">
            {items.map((item, index) => (
                <img
                    key={`${item.className}-${index}`}
                    src={item.src}
                    alt=""
                    className={item.className}
                />
            ))}
        </div>
    )
}

export default FlowerDecor
