import React, { useState } from 'react';
import { X, Github, ExternalLink, AlertCircle, Globe, Monitor } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import attendanceImg from '../assets/attendance.png';
import lmsImg from '../assets/lms.png';
import recipeImg from '../assets/recipe.png';
import posImg from '../assets/pos.png';
import FadeInUp from './FadeInUp';

const ProjectModal = ({ project, onClose }) => {
    // Animation for modal pop
    const animation = useSpring({
        from: { opacity: 0, transform: 'scale(0.9) translateY(20px)' },
        to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    });

    if (!project) return null;

    const isOngoing = project.status === 'ongoing';
    const hasLiveLink = !!project.liveLink; // Starts with https
    const isIframeTarget = hasLiveLink; // We treat live links as iframe targets per user request

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isIframeTarget ? '0' : '1rem', // No padding for iframe mode to maximize space
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>

            <animated.div style={{
                ...animation,
                width: isIframeTarget ? '100%' : '100%', // Full width for iframe
                height: isIframeTarget ? '100%' : 'auto', // Full height for iframe
                maxWidth: isIframeTarget ? '100%' : '600px',
                maxHeight: isIframeTarget ? '100%' : '90vh',
                background: '#1a1a1a',
                borderRadius: isIframeTarget ? '0' : '12px',
                border: isIframeTarget ? 'none' : '1px solid #333',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }} onClick={e => e.stopPropagation()}>

                {/* Modal Header */}
                <div style={{
                    padding: '0.75rem 1.5rem',
                    background: '#111',
                    borderBottom: '1px solid #222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div onClick={onClose} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                        </div>
                        {isIframeTarget && (
                            <div style={{
                                width: '300px',
                                maxWidth: '40vw',
                                height: '24px',
                                background: '#000',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 10px',
                                fontSize: '0.75rem',
                                color: '#666',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>
                                {project.liveLink}
                            </div>
                        )}
                    </div>

                    <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>
                        {project.title}
                    </span>

                    {isIframeTarget && (
                        <div onClick={onClose} style={{ cursor: 'pointer', color: '#fff' }}>
                            <X size={20} />
                        </div>
                    )}
                </div>

                {/* Content Body */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    background: isIframeTarget ? '#fff' : 'transparent', // White bg for iframe container
                    overflow: isIframeTarget ? 'hidden' : 'auto',
                    position: 'relative'
                }}>
                    {isIframeTarget ? (
                        <iframe
                            src={project.liveLink}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title={project.title}
                        />
                    ) : (
                        // Standard Card Layout for Ongoing / GitHub only
                        <div style={{
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff'
                        }}>
                            {/* Icon / Image */}
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: isOngoing ? 'rgba(255, 189, 46, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                border: '1px solid #333',
                                overflow: 'hidden'
                            }}>
                                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{project.title}</h3>

                            {isOngoing && (
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    background: 'rgba(255, 189, 46, 0.15)',
                                    color: '#ffbd2e',
                                    border: '1px solid rgba(255, 189, 46, 0.3)',
                                    marginTop: '0.5rem'
                                }}>
                                    Active Development
                                </span>
                            )}

                            <p style={{
                                color: '#bbb',
                                lineHeight: '1.6',
                                fontSize: '1rem',
                                marginTop: '1.5rem',
                                maxWidth: '90%'
                            }}>
                                {isOngoing
                                    ? `The ${project.title} is currently being built. I'm focusing on robust architecture and seamless user experience.`
                                    : project.desc
                                }
                            </p>

                            {/* Tech Stack */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                justifyContent: 'center',
                                marginTop: '2rem',
                                marginBottom: '2rem'
                            }}>
                                {project.tech.map(t => (
                                    <span key={t} style={{
                                        background: '#222',
                                        color: '#ccc',
                                        padding: '6px 14px',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        border: '1px solid #333'
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Action Button */}
                            {!isOngoing && (
                                <a
                                    href={`https://github.com/frediee/${project.githubLink}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '12px 28px',
                                        background: 'white',
                                        color: 'black',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        fontSize: '1rem',
                                        transition: 'transform 0.2s',
                                        marginTop: '1rem'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Github size={20} />
                                    View on GitHub
                                </a>
                            )}

                            {isOngoing && (
                                <button onClick={onClose} style={{
                                    marginTop: '1rem',
                                    padding: '12px 28px',
                                    background: '#ef4444', // Red color
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    transition: 'background 0.3s'
                                }}
                                    onMouseEnter={e => e.target.style.background = '#dc2626'}
                                    onMouseLeave={e => e.target.style.background = '#ef4444'}
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </animated.div>
        </div>
    );
};

const ProjectCard = ({ project, onClick }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={() => onClick(project)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '2rem',
                background: '#111',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #222',
                boxShadow: hovered ? '0 10px 30px rgba(255,255,255,0.05)' : '0 5px 10px rgba(0,0,0,0.1)',
                transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
            }}
        >
            <div style={{
                width: '100%',
                height: '200px',
                background: '#1a1a1a',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
                position: 'relative'
            }}>
                <img
                    src={project.image}
                    alt={project.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: hovered ? 1 : 0.8,
                        transition: 'opacity 0.3s ease',
                        filter: 'brightness(0.7)'
                    }}
                />
                {/* Overlay Text if needed, or just let image speak */}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    padding: '4px 8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    backdropFilter: 'blur(2px)'
                }}>
                    {project.status === 'ongoing' ? 'In Development' : 'Completed'}
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <h3 style={{
                    marginBottom: '0.75rem',
                    fontSize: '1.5rem',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {project.title}
                    {project.status === 'ongoing' && (
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: '#333', color: '#ffbd2e', border: '1px solid #555' }}>WIP</span>
                    )}
                </h3>

                <p style={{
                    color: '#999',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                }}>
                    {project.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {project.tech.map((t, i) => (
                        <span key={i} style={{
                            padding: '4px 12px',
                            background: '#222',
                            color: '#ccc',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            border: '1px solid #333'
                        }}>
                            {t}
                        </span>
                    ))}
                </div>

                <div style={{
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {/* Helper text logic */}
                    {project.liveLink ? 'VIEW SITE' : (project.status === 'ongoing' ? 'VIEW STATUS' : 'VIEW CODE')}
                    <ExternalLink size={16} />
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            title: 'Attendance System',
            desc: 'A comprehensive attendance tracking solution.',
            tech: ['Python', 'PHP', 'MySQL', 'HTML', 'CSS'],
            status: 'ongoing',
            image: attendanceImg
        },
        {
            title: 'Learning Management System',
            desc: 'Learning Management System for educational institutions.',
            tech: ['React', 'PHP', 'MySQL'],
            status: 'ongoing',
            image: lmsImg
        },
        {
            title: 'Recipe Website',
            desc: 'Interactive platform for sharing and discovering recipes.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            status: 'completed',
            liveLink: 'https://sliceandspice.vercel.app/',
            image: recipeImg
        },
        {
            title: 'Point of Sales System',
            desc: 'Efficient POS system for retail management.',
            tech: ['Python'],
            status: 'completed',
            githubLink: 'pos-python',
            image: posImg
        }
    ];

    return (
        <section id="projects" className="section" style={{ background: '#050505' }}>
            <div className="container">
                <h2 className="heading" style={{ borderBottom: '1px solid #222', paddingBottom: '1rem', display: 'inline-block', marginBottom: '4rem' }}>Projects</h2>

                <div className="projects-grid">
                    {projects.map((project, i) => (
                        <FadeInUp key={i} delay={i * 100}>
                            <ProjectCard project={project} onClick={setSelectedProject} />
                        </FadeInUp>
                    ))}
                </div>

                {/* Modal Overlay */}
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </div>
        </section>
    );
};

export default Projects;
