import React from 'react';
import { useScroll, animated } from '@react-spring/web';

const ParallaxSection = ({ children, id, className = '', speed = 0.5, bgElement }) => {
    const { scrollY } = useScroll();

    // Calculate parallax transform based on global scroll
    // This simple formula moves the background at a different speed than the foreground
    // speed < 1 : background moves slower (farther away)
    // speed > 1 : background moves faster (closer)
    // We can also create a hook to detect if in view, but for global simple parallax 
    // relying on scrollY is smoothest.

    return (
        <section id={id} className={`section ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
            {bgElement && (
                <animated.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '120%', // Make larger to allow movement without gaps
                        zIndex: -1,
                        transform: scrollY.to(y => {
                            // Only apply transform if we are somewhat near this section could be optimization
                            // but for simplicity and smoothness, simple factor mapping is best.
                            // We need to offset it based on the section's position roughly, 
                            // but actually for a "window" effect, just mapping Y usually works if aligned top.
                            // A better approach for section-specific:
                            return `translateY(${y * speed}px)`;
                        })
                    }}
                >
                    {bgElement}
                </animated.div>
            )}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </section>
    );
};

export default ParallaxSection;
