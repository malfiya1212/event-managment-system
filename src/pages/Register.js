import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, CheckCircle, Loader2, ChevronRight, ShieldCheck } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Registration successful:', formData);
            setSuccess(true);
            setLoading(false);
            setTimeout(() => navigate('/login'), 2000);
        }, 1500);
    };

    if (success) {
        return (
            <div className="auth-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="auth-card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <div style={{ width: '80px', height: '80px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <CheckCircle size={40} />
                    </div>
                    <h1>Account Created!</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Welcome to the future of event management. Redirecting you to login...</p>
                    <Loader2 className="animate-spin" style={{ margin: '0 auto' }} color="var(--primary)" />
                </div>
            </div>
        );
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-form-side">
                <div className="auth-card">
                    <h1 style={{ marginBottom: '0.5rem' }}>Create Account</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Start hosting world-class events today.</p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.875rem' }}>
                                <User size={16} /> Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.875rem' }}>
                                <Mail size={16} /> Work Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.875rem' }}>
                                <Lock size={16} /> Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Min. 8 characters"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ height: '52px' }}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={20} /> Create Your Dashboard</>}
                        </button>
                    </form>

                    <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', gap: '12px' }}>
                        <ShieldCheck size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                            By joining, you agree to our international data processing standards and privacy protocols.
                        </p>
                    </div>

                    <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
                        Already part of the network? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '800', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            Sign In <ChevronRight size={16} />
                        </Link>
                    </p>
                </div>
            </div>

            <div className="auth-info-side" style={{
                backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2084")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div style={{ maxWidth: '480px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'white', marginBottom: '2.5rem', lineHeight: '1.1' }}>
                        Scale your events to millions.
                    </h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                            'Unified Global Payment Processing',
                            'Real-time Attendee Networking',
                            'Advanced Analytics & Lead Capture',
                            'Automated Compliance Check'
                        ].map((item, i) => (
                            <li key={i} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '1.1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CheckCircle size={14} color="white" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.6', opacity: 0.9 }}>
                            "The most intuitive event platform we've ever used. Highly recommended for international organizations looking to scale rapidly."
                        </p>
                        <div style={{ marginTop: '1.5rem', fontWeight: '700', fontSize: '0.9rem' }}>— Chief Operating Officer, NexusCon</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
