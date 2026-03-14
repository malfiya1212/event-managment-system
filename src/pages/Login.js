import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/events');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form-side">
                <div className="auth-card">
                    <h1 style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Access your global event dashboard.</p>

                    {error && (
                        <div style={{ padding: '1rem', background: '#fef2f2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.9rem', border: '1px solid #fee2e2' }}>
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.875rem' }}>
                                <Mail size={16} /> Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.875rem' }}>
                                    <Lock size={16} /> Password
                                </label>
                                <a href="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Forgot?</a>
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ height: '52px' }}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Sign In to Dashboard</>}
                        </button>
                    </form>

                    <div
                        onClick={() => setFormData({ email: 'test@example.com', password: 'password' })}
                        style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'var(--bg-subtle)',
                            borderRadius: '12px',
                            border: '1px dotted var(--primary)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#eff6ff'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
                    >
                        <p style={{ margin: 0, color: 'var(--text-muted)', textAlign: 'center' }}>
                            Demo Access: <strong style={{ color: 'var(--primary)' }}>test@example.com</strong> / <strong style={{ color: 'var(--primary)' }}>password</strong>
                            <br />
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(Click to auto-fill)</span>
                        </p>
                    </div>

                    <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '800', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            Join EventMaster <ChevronRight size={16} />
                        </Link>
                    </p>
                    <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <Link to="/admin/login" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Lock size={14} /> Administrator Portal
                        </Link>
                    </div>
                </div>
            </div>

            <div className="auth-info-side" style={{
                backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1475721027785-f749ce072e00?auto=format&fit=crop&q=80&w=2070")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div style={{ maxWidth: '480px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'white', marginBottom: '2rem', lineHeight: '1.1' }}>
                        Trusted by industry leaders worldwide.
                    </h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '4rem', opacity: 0.9 }}>
                        "EventMaster has transformed how we handle our global summits. The reliability, scale, and international support are simply unmatched in the event management industry."
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                        <img
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100"
                            alt="Sarah Jenkins"
                            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }}
                        />
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>Sarah Jenkins</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Regional Director, GlobalTech Solutions</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
