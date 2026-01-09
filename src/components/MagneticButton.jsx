import React, { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const MagneticButton = ({ children, className, onClick, style }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const { x, y } = useSpring({
        x: position.x,
        y: position.y,
        config: { mass: 0.1, tension: 170, friction: 10 }
    });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };

        // Attraction strength
        const distanceX = clientX - center.x;
        const distanceY = clientY - center.y;

        setPosition({ x: distanceX * 0.2, y: distanceY * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <animated.button
            ref={ref}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                transform: x.to((x) => `translate3d(${x}px, ${y.get()}px, 0)`),
                willChange: 'transform'
            }}
        >
            {children}
        </animated.button>
    );
};

export default MagneticButton;
