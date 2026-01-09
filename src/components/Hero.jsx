import React, { useRef, useState, useEffect } from 'react';
import { useScroll, animated } from '@react-spring/web';
import MagneticButton from './MagneticButton';

const Typewriter = ({ text, speed = 100 }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{displayText}</span>;
}

const Hero = () => {
    const containerRef = useRef(null);

    // Create a spring based on scroll position relative to the viewport
    // We'll use a simple scroll listener approach for the background for better control in this specific section
    const { scrollY } = useScroll();

    return (
        <section ref={containerRef} className="section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

            {/* Background Layer - Moves slower than content (Parallax) */}
            <animated.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%', // Taller than container to allow movement
                    background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 70%)',
                    zIndex: -1,
                    // Parallax translate + Zoom effect (scale)
                    transform: scrollY.to(y => `translateY(${y * 0.5}px) scale(${1 + y * 0.0005})`),
                    opacity: 0.8
                }}
            >
                {/* Abstract pattern lines */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>
            </animated.div>

            <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: '-5vh' }}>
                <animated.h1
                    className="heading"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        marginBottom: '1.5rem',
                        opacity: scrollY.to([0, 300], [1, 0]), // Fade out on scroll
                        // transform: scrollY.to(y => `translateY(${y * -0.2}px)`) // Move slightly up
                        transform: scrollY.to(y => `translateY(${y * -0.2}px) scale(${1 - y * 0.0005})`) // Move up and scale down slightly
                    }}
                >
                    Fred – Web Developer & <br /> <span style={{ color: '#aaa' }}><Typewriter text="Arduino Projects Creator" /></span>
                </animated.h1>

                <animated.p
                    className="subheading"
                    style={{
                        marginBottom: '2.5rem',
                        fontSize: '1.25rem',
                        opacity: scrollY.to([0, 400], [1, 0]),
                        maxWidth: '600px'
                    }}
                >
                    Hi, I’m Fred. I build responsive websites and create innovative Arduino projects.
                </animated.p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <MagneticButton
                        className="btn"
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    >
                        View Portfolio
                    </MagneticButton>
                    <MagneticButton
                        className="btn"
                        style={{ background: 'white', color: 'black' }}
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Connect with Me
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default Hero;
