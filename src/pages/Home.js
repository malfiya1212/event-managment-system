import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, Zap, Users, BarChart, Settings, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="home-content">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <span className="badge" style={{ marginBottom: '1.5rem' }}>The #1 Platform for Global Events</span>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.05', marginBottom: '1.5rem' }}>
                        Empower Your <span style={{ color: 'var(--primary)' }}>Impact</span> Through Events.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '580px', lineHeight: '1.6' }}>
                        The all-in-one infrastructure for high-scale international conferences,
                        industry summits, and elite networking. Trusted by Fortune 500 companies worldwide.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to="/register">
                            <button className="btn-primary" style={{ padding: '1rem 2.5rem', width: 'auto', fontSize: '1.1rem' }}>
                                Start Organization <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                            </button>
                        </Link>
                        <Link to="/events">
                            <button style={{
                                padding: '1rem 2.5rem',
                                background: 'white',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '1.1rem'
                            }}>
                                View Directory
                            </button>
                        </Link>
                    </div>

                    <div style={{ marginTop: '5rem', display: 'flex', gap: '4rem', opacity: 0.8 }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800' }}>500+</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', tracking: '0.1em' }}>Partners</p>
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800' }}>2M+</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', tracking: '0.1em' }}>Attendees</p>
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800' }}>120+</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', tracking: '0.1em' }}>Countries</p>
                        </div>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1540575861501-7ce0e220471d?auto=format&fit=crop&q=80&w=2070"
                        alt="International Tech Conference"
                        className="hero-image"
                    />
                    <div style={{
                        position: 'absolute',
                        top: '40px',
                        left: '-40px',
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--bg-subtle)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Globe size={20} color="var(--primary)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Global Reach</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Multi-country scaling</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted By Marquee */}
            <div style={{ background: 'var(--bg-subtle)', padding: '4rem 0', borderY: '1px solid var(--border)' }}>
                <div className="container-full">
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>
                        Trusted by the world's most innovative organizations
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5, filter: 'grayscale(1)' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>TECHCORP</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>GLOBALTECH</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>INVENTSYS</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>PRIMESUMMIT</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>METAEVENTS</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>NEXUSCON</span>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '8rem 0' }}>
                <div className="container-full">
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem' }}>
                        <span className="badge">Core Capabilities</span>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '1rem' }}>Everything you need for world-class delivery.</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                        {[
                            { icon: <Shield />, title: 'Enterprise Security', desc: 'Secure data encryption and international compliance for high-stakes governmental summits.' },
                            { icon: <Zap />, title: 'Lightning Rapid Setup', desc: 'Go from concept to live registration in under 60 minutes with our AI-powered templates.' },
                            { icon: <Users />, title: 'Massive Connectivity', desc: 'Concurrent hosting for over 100,000 attendees with real-time networking hubs.' },
                            { icon: <BarChart />, title: 'Deep Analytics', desc: 'Real-time ROI tracking, lead scoring, and attendee engagement heatmaps.' },
                            { icon: <Settings />, title: 'Full Automation', desc: 'Automated email workflows, badge printing, and post-event summaries.' },
                            { icon: <Globe />, title: 'Multilingual Support', desc: 'Native support for 50+ languages and localized payment processing.' }
                        ].map((feat, i) => (
                            <div key={i} style={{ padding: '2.5rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', transition: 'all 0.3s' }}>
                                <div style={{ width: '50px', height: '50px', background: '#eff6ff', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    {feat.icon}
                                </div>
                                <h3 style={{ marginBottom: '1rem', fontWeight: '700' }}>{feat.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
