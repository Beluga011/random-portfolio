import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Education', id: 'education' },
        { name: 'Testimonials', id: 'testimonials' },
        { name: 'Contact', id: 'contact' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
            background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div
                className="logo"
                style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    letterSpacing: '-1px',
                    cursor: 'pointer',
                    zIndex: 1001 // Ensure logo is above mobile menu overlay
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                Fred.
            </div>

            {/* Desktop Menu */}
            <ul className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <button
                            onClick={() => scrollToSection(link.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                opacity: 0.8,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s ease',
                                padding: '0.5rem'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                        >
                            {link.name}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="mobile-menu-btn" style={{ display: 'none', cursor: 'pointer', zIndex: 1001 }} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#050505',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 1000 // Below logo/button
            }}>
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}
                    >
                        {link.name}
                    </button>
                ))}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
