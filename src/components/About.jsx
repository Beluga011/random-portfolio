import React from 'react';
import { useScroll, animated } from '@react-spring/web';
import profileImg from '../assets/profile.png';

const About = () => {
    const { scrollY } = useScroll();

    return (
        <section id="about" className="section" style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>
            {/* Parallax Background */}
            {/* Deep Background Layer */}
            <animated.div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: 0,
                    width: '100%',
                    height: '140%',
                    zIndex: 0,
                    opacity: 0.2,
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: scrollY.to(y => `translateY(${(y * 0.2)}px) scale(${1 + y * 0.0002})`), // Moves slower & slight zoom
                }}
            />

            {/* Mid-ground Layer - Subtle floating elements */}
            <animated.div
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(50,50,50,0.3) 0%, transparent 70%)',
                    zIndex: 0,
                    transform: scrollY.to(y => `translateY(${(y * -0.1)}px) rotate(${y * 0.05}deg)`), // Moves counter to scroll + rotate
                }}
            />

            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                    {/* Profile Image */}
                    <div style={{
                        width: '100%',
                        paddingBottom: '100%', // Square aspect ratio
                        background: '#111',
                        borderRadius: '50%',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid #333'
                    }}>
                        <animated.div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transform: scrollY.to(y => `scale(${1 + (y % 1000) * 0.0001})`) // Subtle breathing/zoom effect based on scroll
                        }}>
                            <img
                                src={profileImg}
                                alt="Fred Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </animated.div>
                    </div>
                </div>
                <div style={{ flex: 1, minWidth: '280px' }}>
                    <h2 className="heading" style={{ marginBottom: '2rem' }}>About Me</h2>
                    <p className="subheading" style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: '1.8' }}>
                        I’m Fred, a 1st-year BSIT student passionate about web development and Arduino electronics. I enjoy designing functional websites, experimenting with smart devices, and sharing my projects with the tech community.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
