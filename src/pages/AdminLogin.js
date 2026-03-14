import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, LogIn, AlertCircle, Loader2, Server, Activity } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
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
            const data = await login(formData.email, formData.password);
            if (data.user.role !== 'admin') {
                setError('Insufficient privileges. You must be an administrator to access this terminal.');
                // We keep the user logged in but don't redirect to admin dashboard
                // They can still use the regular app
                return;
            }
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.msg || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#0f172a', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorative elements */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>

            <div style={{ 
                width: '100%', 
                maxWidth: '480px', 
                background: 'rgba(30, 41, 59, 0.7)', 
                backdropFilter: 'blur(20px)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '32px', 
                padding: '4rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: 'linear-gradient(135deg, #2563eb, #8b5cf6)', 
                        borderRadius: '24px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 2rem',
                        boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
                    }}>
                        <Shield color="white" size={40} />
                    </div>
                    <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Admin Terminal</h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Restricted personnel only. Log in to authorize.</p>
                </div>

                {error && (
                    <div style={{ 
                        padding: '1.25rem', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        color: '#f87171', 
                        borderRadius: '16px', 
                        marginBottom: '2rem', 
                        display: 'flex', 
                        gap: '12px', 
                        alignItems: 'flex-start', 
                        fontSize: '0.95rem', 
                        border: '1px solid rgba(239, 68, 68, 0.2)' 
                    }}>
                        <AlertCircle size={20} style={{ flexShrink: 0 }} /> 
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Administrator ID (Email)
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            style={{ 
                                width: '100%', 
                                padding: '1.2rem', 
                                background: '#1e293b', 
                                border: '1px solid #334155', 
                                borderRadius: '16px', 
                                color: 'white',
                                fontSize: '1rem',
                                transition: 'all 0.2s'
                            }}
                            placeholder="admin@eventmaster.io"
                        />
                    </div>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Security Clearance (Password)
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                style={{ 
                                    width: '100%', 
                                    padding: '1.2rem', 
                                    background: '#1e293b', 
                                    border: '1px solid #334155', 
                                    borderRadius: '16px', 
                                    color: 'white',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s'
                                }}
                                placeholder="••••••••••••"
                            />
                            <Lock size={18} style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '1.5rem', 
                            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '16px', 
                            fontWeight: '800', 
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : <><LogIn size={24} /> Initiate Handshake</>}
                    </button>
                </form>

                <div style={{ 
                    marginTop: '3rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '1.5rem', 
                    background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
                        <Server size={14} /> Global Node: ACTIVE
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
                        <Activity size={14} /> Latency: 12ms
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                input:focus { outline: none; border-color: #2563eb !important; background: #0f172a !important; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
            ` }} />
        </div>
    );
};

export default AdminLogin;
