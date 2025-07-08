import React from 'react';

const Sunflower = ({ className = '', style }: { className?: string, style?: React.CSSProperties }) => (
    <div className={`relative w-16 h-16 ${className}`} style={style}>
        <div className="absolute inset-0 bg-yellow-600 rounded-full transform scale-50"></div>
        {[...Array(12)].map((_, i) => (
            <div
                key={i}
                className="absolute w-full h-full bg-orange-400 rounded-full"
                style={{ transform: `rotate(${i * 30}deg) scale(1, 0.3)`, clipPath: 'ellipse(50% 50% at 50% 50%)' }}
            ></div>
        ))}
    </div>
);

export default Sunflower;
