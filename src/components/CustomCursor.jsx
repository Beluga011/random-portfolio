import React, { useEffect } from 'react';
import { useSpring, animated, to } from '@react-spring/web';

const CustomCursor = () => {
    // 1. Use the imperative API. sending an object returns [props, api]
    const [springs, api] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 0,
        config: { mass: 1, tension: 1200, friction: 50 }
    }));

    useEffect(() => {
        const handleMouseMove = (e) => {
            // 2. Update the spring values directly without causing a re-render
            api.start({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [api]);

    return (
        <animated.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'white',
                pointerEvents: 'none',
                zIndex: 10000,
                mixBlendMode: 'difference',
                // Interpolate using the spring values directly
                // Interpolate using the spring values directly with the `to` helper for better stability
                transform: to([springs.x, springs.y], (x, y) => `translate3d(${x - 10}px, ${y - 10}px, 0)`),
            }}
        />
    );
};

export default CustomCursor;
