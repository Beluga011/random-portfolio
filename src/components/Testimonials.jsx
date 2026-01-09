import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { text: "Fred’s coding skills and creativity in Arduino projects are impressive for a student.", author: "Jane D." },
        { text: "His web development work is clean, functional, and well-structured.", author: "Mark S." },
        { text: "Fred shows great problem-solving abilities and a willingness to learn.", author: "Alex P." },
        { text: "His projects demonstrate both technical skill and innovation.", author: "Lisa R." },
        { text: "A dedicated developer who always delivers high-quality work.", author: "John M." }
    ];

    // Duplicate for infinite scroll
    const items = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section id="testimonials" className="section" style={{ background: '#000', overflow: 'hidden', padding: '8rem 0' }}>
            <div className="container" style={{ maxWidth: '100%' }}>
                <h2 className="heading" style={{ marginBottom: '4rem', textAlign: 'center' }}>Testimonials</h2>

                <div style={{
                    display: 'flex',
                    width: '100%',
                    overflow: 'hidden',
                    maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
                }}>
                    <div
                        className="testimonials-scroll"
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            animation: 'scroll-testimonials 40s linear infinite',
                            width: 'max-content'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                        onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                    >
                        {items.map((t, i) => (
                            <div key={i} style={{
                                width: '400px',
                                padding: '3rem',
                                background: '#0a0a0a',
                                border: '1px solid #222',
                                borderRadius: '8px',
                                flexShrink: 0,
                                transition: 'border-color 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#333'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#222'}
                            >
                                <p style={{
                                    fontStyle: 'italic',
                                    marginBottom: '1.5rem',
                                    fontSize: '1.2rem',
                                    color: '#ccc',
                                    lineHeight: '1.6'
                                }}>
                                    "{t.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: `hsl(${i * 60}, 70%, 50%)`, // Dynamic colors based on index
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '600', color: 'white' }}>{t.author}</p>
                                        <p style={{ fontSize: '0.8rem', color: '#666' }}>Client / Professor</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes scroll-testimonials {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-33.33%); } /* Move 1/3 since we have 3 sets */
                    }
                `}
            </style>
        </section>
    );
};

export default Testimonials;
