import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) return null;

    return (
        <nav>
            <Link to="/" className="nav-brand">
                <Calendar size={28} />
                <span>Event<span style={{ color: 'var(--primary)' }}>Master</span></span>
            </Link>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Explore</Link></li>
                <li><Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LogIn size={18} /> Login
                </Link></li>
                <li><Link to="/register" className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserPlus size={18} /> Get Started
                </Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
