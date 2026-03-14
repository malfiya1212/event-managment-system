import React, { createContext, useState, useCallback, useMemo } from 'react';
import Notification from '../components/Notification';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const addNotification = useCallback((type, message, duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { id, type, message };
        
        setNotifications(prev => [...prev, newNotification]);

        if (duration !== Infinity) {
            setTimeout(() => removeNotification(id), duration);
        }
    }, [removeNotification]);

    const value = useMemo(() => ({
        success: (msg, dur) => addNotification('success', msg, dur),
        error: (msg, dur) => addNotification('error', msg, dur),
        info: (msg, dur) => addNotification('info', msg, dur),
        warning: (msg, dur) => addNotification('warning', msg, dur)
    }), [addNotification]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                pointerEvents: 'none'
            }}>
                {notifications.map(n => (
                    <Notification 
                        key={n.id} 
                        {...n} 
                        onClose={() => removeNotification(n.id)} 
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
