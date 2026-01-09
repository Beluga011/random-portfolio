import React from 'react';
import { useScroll, animated } from '@react-spring/web';

const EducationItem = ({ title, place, date }) => (
    <div style={{
        paddingLeft: '2rem',
        borderLeft: '1px solid #333',
        position: 'relative',
        paddingBottom: '2rem'
    }}>
        <div style={{
            position: 'absolute',
            left: '-5px',
            top: '0',
            width: '9px',
            height: '9px',
            background: 'white',
            borderRadius: '50%'
        }}></div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: '#888', fontSize: '1rem' }}>{place}</p>
    </div>
);

const Education = () => {
    const { scrollY } = useScroll();

    return (
        <section id="education" className="section" style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>
            <animated.div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '10%',
                    width: '2px',
                    height: '50%',
                    background: 'linear-gradient(to top, #333, transparent)',
                    opacity: 0.5,
                    zIndex: 0,
                    transform: scrollY.to(y => `translateY(${(y * -0.1)}px)`)
                }}
            />

            <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
                <h2 className="heading" style={{ marginBottom: '3rem' }}>Education & Experience</h2>

                <div style={{ marginTop: '2rem' }}>
                    <EducationItem title="BS Information Technology" place="Batangas State University - TNEU Lipa Campus" />
                    <EducationItem title="Highschool" place="Padre Vicente Garcia Memorial Academy Inc." />
                    <EducationItem title="Elementary" place="Leon M. Manigbas Elementary School" />

                    <div style={{ paddingLeft: '2rem', borderLeft: '1px solid transparent', marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Achievements</h3>
                        <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                            Successfully built web apps, Arduino devices, and SEO-optimized projects demonstrating technical skills and innovation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
