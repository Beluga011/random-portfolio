import React, { useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter, AlertCircle } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [touched, setTouched] = useState({ name: false, email: false, message: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const isValidId = (field) => {
        if (!touched[field]) return true;
        if (field === 'email') return /\S+@\S+\.\S+/.test(formData.email);
        return formData[field].trim().length > 0;
    };

    const inputStyle = (hasError) => ({
        width: '100%',
        padding: '1rem',
        background: '#111',
        border: `1px solid ${hasError ? '#ef4444' : '#333'}`,
        color: 'white',
        borderRadius: '8px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        fontFamily: 'inherit'
    });

    return (
        <form name="contact" method="POST" data-netlify="true" noValidate>
            <input type="hidden" name="form-name" value="contact" />

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={inputStyle(!isValidId('name'))}
                        onFocus={(e) => !(!isValidId('name')) && (e.target.style.borderColor = 'white')}
                        onBlurCapture={(e) => { handleBlur(e); e.target.style.borderColor = !isValidId('name') ? '#ef4444' : '#333'; }}
                        maxLength={50}
                    />
                    {!isValidId('name') && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Name is required</span>}
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={inputStyle(!isValidId('email'))}
                        onFocus={(e) => !(!isValidId('email')) && (e.target.style.borderColor = 'white')}
                        onBlurCapture={(e) => { handleBlur(e); e.target.style.borderColor = !isValidId('email') ? '#ef4444' : '#333'; }}
                        maxLength={100}
                    />
                    {!isValidId('email') && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Valid email required</span>}
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...inputStyle(!isValidId('message')), resize: 'vertical', minHeight: '150px' }}
                    onFocus={(e) => !(!isValidId('message')) && (e.target.style.borderColor = 'white')}
                    onBlurCapture={(e) => { handleBlur(e); e.target.style.borderColor = !isValidId('message') ? '#ef4444' : '#333'; }}
                    rows={5}
                    maxLength={500}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    {!isValidId('message') ?
                        <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>Message is required</span> :
                        <span></span>
                    }
                    <span style={{ color: '#555', fontSize: '0.8rem' }}>{formData.message.length}/500</span>
                </div>
            </div>

            <button type="submit" className="btn" style={{
                background: 'white',
                color: 'black',
                padding: '1rem 2rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '8px',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s ease'
            }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                Send Message
                <Mail size={18} />
            </button>
        </form>
    );
};

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        background: '#0a0a0a',
        border: '1px solid #333',
        color: 'white',
        borderRadius: '4px',
        fontSize: '1rem',
        fontFamily: 'inherit',
        marginBottom: '1rem'
    };

    return (
        <footer id="contact" style={{
            background: '#050505',
            borderTop: '1px solid #111',
            padding: '6rem 2rem 2rem',
            position: 'relative'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>

                {/* Upper Section: Contact Form & Navigation */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap-reverse',
                    gap: '4rem',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>

                    {/* Left: Branding & Links */}
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div>
                            <h2 className="heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '-1px' }}>Fred.</h2>
                            <p style={{ color: '#888', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '300px' }}>
                                A passionate developer crafting digital experiences with precision and creativity.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '4rem' }}>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#fff', letterSpacing: '1px' }}>Menu</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {['About', 'Skills', 'Projects', 'Education', 'Testimonials'].map(item => (
                                        <li key={item}>
                                            <button
                                                onClick={() => document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                                                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '1rem' }}
                                                onMouseEnter={(e) => e.target.style.color = 'white'}
                                                onMouseLeave={(e) => e.target.style.color = '#888'}
                                            >
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#fff', letterSpacing: '1px' }}>Socials</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com' },
                                        { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com' },
                                        { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com' }
                                    ].map(item => (
                                        <li key={item.name}>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#888', textDecoration: 'none', fontSize: '1rem' }}
                                                onMouseEnter={(e) => e.target.style.color = 'white'}
                                                onMouseLeave={(e) => e.target.style.color = '#888'}
                                            >
                                                {item.icon} {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div style={{ flex: '1 1 400px' }}>
                        <h2 className="heading" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Connect with Me</h2>
                        <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Let's build smart websites and innovative Arduino projects together!
                        </p>

                        <ContactForm />
                    </div>

                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid #111',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{ color: '#333', fontSize: '0.8rem' }}>
                        © {new Date().getFullYear()} Fred. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        style={{
                            background: '#111',
                            border: '1px solid #222',
                            color: 'white',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.color = 'black';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#111';
                            e.currentTarget.style.color = 'white';
                        }}
                        aria-label="Back to top"
                    >
                        <ArrowUp size={20} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
