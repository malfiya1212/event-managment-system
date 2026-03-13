import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, LogIn, UserPlus, LogOut, Ticket, Settings } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
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

                {user ? (
                    <>
                        {user.role === 'admin' ? (
                            <li><Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Settings size={18} /> Admin
                            </Link></li>
                        ) : (
                            <li><Link to="/my-tickets" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Ticket size={18} /> My Tickets
                            </Link></li>
                        )}
                        <li>
                            <button onClick={logout} style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: '700',
                                fontSize: '1rem',
                                padding: '0.5rem 1rem'
                            }}>
                                <LogOut size={18} /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <LogIn size={18} /> Login
                        </Link></li>
                        <li><Link to="/register" className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserPlus size={18} /> Get Started
                        </Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
