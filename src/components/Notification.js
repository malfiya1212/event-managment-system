import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const Notification = ({ type, message, onClose }) => {
    const config = {
        success: {
            icon: <CheckCircle size={20} />,
            bg: '#ecfdf5',
            border: '#10b981',
            text: '#065f46',
            accent: '#10b981'
        },
        error: {
            icon: <XCircle size={20} />,
            bg: '#fef2f2',
            border: '#ef4444',
            text: '#991b1b',
            accent: '#ef4444'
        },
        info: {
            icon: <Info size={20} />,
            bg: '#eff6ff',
            border: '#3b82f6',
            text: '#1e40af',
            accent: '#3b82f6'
        },
        warning: {
            icon: <AlertTriangle size={20} />,
            bg: '#fffbeb',
            border: '#f59e0b',
            text: '#92400e',
            accent: '#f59e0b'
        }
    }[type];

    return (
        <div style={{
            background: config.bg,
            border: `1px solid ${config.border}`,
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '320px',
            maxWidth: '450px',
            pointerEvents: 'auto',
            animation: 'fadeInSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ color: config.accent, display: 'flex' }}>
                {config.icon}
            </div>
            <div style={{ flex: 1, color: config.text, fontWeight: '600', fontSize: '0.9rem' }}>
                {message}
            </div>
            <button 
                onClick={onClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: config.text,
                    opacity: 0.5,
                    cursor: 'pointer',
                    display: 'flex',
                    padding: '4px',
                    borderRadius: '50%',
                    transition: 'opacity 0.2s'
                }}
            >
                <X size={16} />
            </button>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3px',
                background: config.accent,
                animation: 'progress 5s linear forwards'
            }} />
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeInSlide {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}} />
        </div>
    );
};

export default Notification;
