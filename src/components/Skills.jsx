import React from 'react';
import { Layers, Server, Terminal } from 'lucide-react';
import { useScroll, animated } from '@react-spring/web';

const SkillCard = ({ title, icon, skills, color }) => (
    <div
        className="skill-card"
        style={{
            padding: '2.5rem',
            background: '#0a0a0a',
            border: '1px solid #222',
            borderTop: `3px solid ${color}`,
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '100%',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 10px 30px -10px ${color}30`; // 30 = approx 20% opacity
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div style={{
            color: color,
            marginBottom: '1.5rem',
            background: `${color}15`, // 10% opacity
            padding: '12px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </div>

        <h3 style={{
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: '600'
        }}>
            {title}
        </h3>

        <p style={{
            color: '#999',
            lineHeight: '1.8',
            fontSize: '1rem',
            margin: 0
        }}>
            {skills.map((skill, index) => (
                <span key={index} style={{
                    display: 'inline-block',
                    marginRight: '8px',
                    marginBottom: '4px'
                }}>
                    {skill}{index < skills.length - 1 ? ',' : ''}
                </span>
            ))}
        </p>
    </div>
);

const Skills = () => {
    const { scrollY } = useScroll();

    const categories = [
        {
            title: 'Frontend Development',
            icon: <Layers size={24} />,
            skills: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'CSS3', 'Responsive Design'],
            color: '#6366f1' // Indigo
        },
        {
            title: 'Backend & Database',
            icon: <Server size={24} />,
            skills: ['Node.js', 'PHP', 'Python', 'MySQL', 'RESTful APIs'],
            color: '#22d3ee' // Cyan
        },
        {
            title: 'Tools & Hardware',
            icon: <Terminal size={24} />,
            skills: ['Git & GitHub', 'Arduino', 'VS Code', 'Command Line', 'Debugging'],
            color: '#f59e0b' // Amber
        }
    ];

    return (
        <section id="skills" className="section" style={{ background: '#000', position: 'relative', overflow: 'hidden' }}>
            <animated.div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(to left, #111, transparent)',
                    opacity: 0.3,
                    zIndex: 0,
                    transform: scrollY.to(y => `translateX(${(y * 0.05)}px)`),
                    pointerEvents: 'none'
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <h2 className="heading" style={{ textAlign: 'center', marginBottom: '5rem' }}>Skills & Expertise</h2>

                <div className="skills-grid">
                    {categories.map((cat, i) => (
                        <SkillCard
                            key={i}
                            title={cat.title}
                            icon={cat.icon}
                            skills={cat.skills}
                            color={cat.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
