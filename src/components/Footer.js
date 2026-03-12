import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '5rem 4rem 2rem' }}>
            <div className="container-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
                <div style={{ gridColumn: 'span 1' }}>
                    <Link to="/" className="nav-brand" style={{ marginBottom: '1.5rem', display: 'flex' }}>
                        <Calendar size={28} />
                        <span>Event<span style={{ color: 'var(--primary)' }}>Master</span></span>
                    </Link>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        The global leader in professional event management. Connecting industry leaders and innovators through world-class summits.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}><Facebook size={20} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}><Twitter size={20} /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}><Linkedin size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}><Instagram size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '800' }}>Platform</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link to="/events" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Discover Events</Link></li>
                        <li><Link to="/register" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Host an Event</Link></li>
                        <li><a href="/pricing" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pricing</a></li>
                        <li><a href="/referral" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Referral Program</a></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '800' }}>Company</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><a href="/about" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>About Us</a></li>
                        <li><a href="/careers" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Careers</a></li>
                        <li><a href="/privacy" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Privacy Policy</a></li>
                        <li><a href="/terms" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '800' }}>Contact</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Mail size={16} /> support@eventmaster.com
                        </li>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Phone size={16} /> +1 (800) 123-4567
                        </li>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <MapPin size={16} /> 123 Event Plaza, New York, NY
                        </li>
                    </ul>
                </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <p>© 2026 EventMaster Global Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
