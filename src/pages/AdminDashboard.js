import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Calendar, MapPin, Trash2, Edit3, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', date: '', location: '',
        category: 'Technology', price: '', totalCapacity: '', image: ''
    });

    useEffect(() => { fetchEvents(); }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        } catch (err) { console.error('Error fetching events:', err); }
        finally { setLoading(false); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/events', formData);
            setShowModal(false);
            setFormData({ title: '', description: '', date: '', location: '', category: 'Technology', price: '', totalCapacity: '', image: '' });
            fetchEvents();
        } catch (err) { alert('Error creating event. Make sure you are an admin.'); }
    };

    if (user?.role !== 'admin') {
        return <div style={{ padding: '4rem', textAlign: 'center' }}><h1>Access Denied</h1><p>You must be an admin to view this page.</p></div>;
    }

    if (loading) {
        return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}><Loader2 className="animate-spin" size={48} color="var(--primary)" /></div>);
    }

    return (
        <div className="container-full">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Admin Command Center</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your global events and track attendance.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary" style={{ width: 'auto', padding: '1rem 2rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Plus size={20} /> Create New Event
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '1.5rem', fontWeight: '800' }}>Event Details</th>
                            <th style={{ padding: '1.5rem', fontWeight: '800' }}>Date & Location</th>
                            <th style={{ padding: '1.5rem', fontWeight: '800' }}>Capacity</th>
                            <th style={{ padding: '1.5rem', fontWeight: '800' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <img src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=60'} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{event.title}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{event.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.9rem', marginBottom: '4px' }}><Calendar size={14} /> {new Date(event.date).toLocaleDateString()}</div>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}><MapPin size={14} /> {event.location}</div>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{event.totalCapacity - event.remainingCapacity} / {event.totalCapacity}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Attendees Registered</div>
                                    <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                                        <div style={{ width: `${((event.totalCapacity - event.remainingCapacity) / event.totalCapacity) * 100}%`, height: '100%', background: 'var(--primary)' }}></div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button style={{ padding: '8px', borderRadius: '8px', background: 'var(--bg-subtle)', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit3 size={18} /></button>
                                        <button style={{ padding: '8px', borderRadius: '8px', background: '#fef2f2', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '32px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: '800' }}>Create Global Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ gridColumn: '1 / -1' }}><label>Event Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} required /></div>
                                <div style={{ gridColumn: '1 / -1' }}><label>Description</label><textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', height: '100px', fontFamily: 'inherit' }} /></div>
                                <div><label>Date</label><input type="date" name="date" value={formData.date} onChange={handleChange} required /></div>
                                <div><label>Price ($)</label><input type="number" name="price" value={formData.price} onChange={handleChange} required /></div>
                                <div><label>Total Capacity</label><input type="number" name="totalCapacity" value={formData.totalCapacity} onChange={handleChange} required /></div>
                                <div><label>Category</label><select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', fontFamily: 'inherit' }}><option>Technology</option><option>Finance</option><option>Environment</option><option>AI / Tech</option><option>Design</option><option>Business</option></select></div>
                                <div style={{ gridColumn: '1 / -1' }}><label>Location</label><input type="text" name="location" value={formData.location} onChange={handleChange} required /></div>
                                <div style={{ gridColumn: '1 / -1' }}><label>Image URL</label><input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." /></div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                                <button type="submit" className="btn-primary">Initialize Event</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'var(--bg-subtle)', color: 'var(--text)', border: 'none', padding: '1rem 2rem', borderRadius: '14px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
