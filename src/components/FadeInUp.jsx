import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const FadeInUp = ({ children, delay = 0, threshold = 0.1 }) => {
    const [inView, setInView] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    const springs = useSpring({
        from: { opacity: 0, transform: 'translateY(40px)' },
        to: inView ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 0, transform: 'translateY(40px)' },
        delay: delay,
        config: { mass: 1, tension: 120, friction: 14 }
    });

    return (
        <animated.div ref={ref} style={springs}>
            {children}
        </animated.div>
    );
};

export default FadeInUp;
