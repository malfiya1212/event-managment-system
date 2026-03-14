import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Calendar, MapPin, Trash2, Edit3, Loader2, Users, X, Check, Search, Filter } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAttendeesModal, setShowAttendeesModal] = useState(false);
    const [selectedAttendees, setSelectedAttendees] = useState([]);
    const [selectedEventName, setSelectedEventName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
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

    const fetchAttendees = async (eventId, eventTitle) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/tickets/event/${eventId}`, {
                headers: { 'x-auth-token': token }
            });
            setSelectedAttendees(res.data);
            setSelectedEventName(eventTitle);
            setShowAttendeesModal(true);
        } catch (err) {
            alert('Error fetching attendees');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event? This will also affect associated tickets.')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: { 'x-auth-token': token }
            });
            fetchEvents();
        } catch (err) { alert('Error deleting event.'); }
    };

    const handleEdit = (event) => {
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date.split('T')[0],
            location: event.location,
            category: event.category,
            price: event.price,
            totalCapacity: event.totalCapacity,
            image: event.image || ''
        });
        setCurrentEventId(event.id);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/events/${currentEventId}`, formData, {
                    headers: { 'x-auth-token': token }
                });
            } else {
                await axios.post('http://localhost:5000/api/events', formData, {
                    headers: { 'x-auth-token': token }
                });
            }
            closeModal();
            fetchEvents();
        } catch (err) { alert('Error saving event. Make sure you are an admin.'); }
    };

    const closeModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setCurrentEventId(null);
        setFormData({ title: '', description: '', date: '', location: '', category: 'Technology', price: '', totalCapacity: '', image: '' });
    };

    const filteredEvents = events.filter(e => 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        e.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (authLoading) return null;

    if (user?.role !== 'admin') {
        return <Navigate to="/admin/login" />;
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-subtle)' }}>
                <div style={{ textAlign: 'center' }}>
                    <Loader2 className="animate-spin" size={64} color="var(--primary)" />
                    <p style={{ marginTop: '1.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Synchronizing Global Event Stream...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-full" style={{ padding: '4rem 2rem' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Check size={14} /> System Operational
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1, marginBottom: '1rem' }}>Admin Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>Orchestrate your global events, track attendee engagement, and manage system resources from a single interface.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            placeholder="Search events..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: '1rem 1rem 1rem 3rem', borderRadius: '14px', border: '1px solid var(--border)', background: 'white', width: '300px', fontWeight: '500' }} 
                        />
                    </div>
                    <button onClick={() => setShowModal(true)} className="btn-primary" style={{ width: 'auto', padding: '1rem 2rem', display: 'flex', gap: '10px', alignItems: 'center', height: 'fit-content' }}>
                        <Plus size={20} /> Create New Event
                    </button>
                </div>
            </div>

            {/* Stats Overview (Optional extra flair) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {[
                    { label: 'Live Events', value: events.length, icon: Calendar, color: '#2563eb' },
                    { label: 'Total Capacity', value: events.reduce((acc, curr) => acc + curr.totalCapacity, 0), icon: Users, color: '#8b5cf6' },
                    { label: 'Revenue Generated', value: `$${events.reduce((acc, curr) => acc + (curr.totalCapacity - curr.remainingCapacity) * curr.price, 0).toLocaleString()}`, icon: MapPin, color: '#f59e0b' }
                ].map((stat, i) => (
                    <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ background: `${stat.color}15`, color: stat.color, padding: '1rem', borderRadius: '16px' }}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Events Table */}
            <div style={{ background: 'white', borderRadius: '32px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <h3 style={{ margin: 0, fontWeight: '800' }}>Active Event Registry</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
                        <Filter size={14} /> Showing {filteredEvents.length} Events
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '1.5rem 2rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Event Details</th>
                                <th style={{ padding: '1.5rem 2rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Logistics</th>
                                <th style={{ padding: '1.5rem 2rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Occupancy</th>
                                <th style={{ padding: '1.5rem 2rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map(event => (
                                <tr key={event.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="table-row-hover">
                                    <td style={{ padding: '1.5rem 2rem' }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ position: 'relative' }}>
                                                <img src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=300'} alt="" style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
                                                <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '100px', fontWeight: '800' }}>${event.price}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '800', fontSize: '1.15rem', marginBottom: '4px' }}>{event.title}</div>
                                                <div style={{ display: 'inline-block', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '800', background: 'rgba(37, 99, 235, 0.1)', padding: '2px 10px', borderRadius: '100px' }}>{event.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem 2rem' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.95rem', fontWeight: '600', marginBottom: '8px' }}>
                                            <Calendar size={16} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            <MapPin size={16} /> {event.location}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem 2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{event.totalCapacity - event.remainingCapacity} / <span style={{ color: 'var(--text-muted)' }}>{event.totalCapacity}</span></div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: (event.totalCapacity - event.remainingCapacity) / event.totalCapacity > 0.9 ? '#dc2626' : 'var(--primary)' }}>
                                                {Math.round(((event.totalCapacity - event.remainingCapacity) / event.totalCapacity) * 100)}%
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${((event.totalCapacity - event.remainingCapacity) / event.totalCapacity) * 100}%`, height: '100%', background: (event.totalCapacity - event.remainingCapacity) / event.totalCapacity > 0.9 ? '#dc2626' : 'var(--primary)', borderRadius: '4px' }}></div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                            <button onClick={() => fetchAttendees(event.id, event.title)} title="Manage Attendees" style={{ padding: '12px', borderRadius: '14px', background: 'rgba(37, 99, 235, 0.05)', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Users size={20} /></button>
                                            <button onClick={() => handleEdit(event)} title="Edit Event" style={{ padding: '12px', borderRadius: '14px', background: 'var(--bg-subtle)', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit3 size={20} /></button>
                                            <button onClick={() => handleDelete(event.id)} title="Delete Event" style={{ padding: '12px', borderRadius: '14px', background: '#fff1f2', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={20} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(12px)' }}>
                    <div style={{ background: 'white', padding: '3.5rem', borderRadius: '40px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                        <button onClick={closeModal} style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#f1f5f9', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
                        
                        <h2 style={{ marginBottom: '0.5rem', fontSize: '2.8rem', fontWeight: '800', letterSpacing: '-0.03em' }}>{isEditing ? 'Pulse Edit' : 'Initialize Event'}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Define the parameters for your next world-class event experience.</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Event Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '1rem', fontWeight: '500' }} placeholder="Global Tech Summit 2026" />
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', height: '120px', fontSize: '1rem', fontWeight: '500', fontFamily: 'inherit', resize: 'none' }} placeholder="Provide detailed insights about the event focus and target audience..." />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '1rem' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Price ($)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '1rem' }} placeholder="99.00" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Total Capacity</label>
                                    <input type="number" name="totalCapacity" value={formData.totalCapacity} onChange={handleChange} required style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '1rem' }} placeholder="500" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '1rem', fontWeight: '500', background: 'white' }}>
                                        <option>Technology</option><option>Web3 / Crypto</option><option>AI & SaaS</option><option>Finance</option><option>Design</option><option>Business</option><option>Environment</option>
                                    </select>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Location / Venue</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} required style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '1rem' }} placeholder="Silicon Valley Innovation Center" />
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' }}>Image URL</label>
                                    <input type="text" name="image" value={formData.image} onChange={handleChange} style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '1rem' }} placeholder="https://unsplash.com/photos/your-image-id" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '4rem' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 2, padding: '1.5rem' }}>{isEditing ? 'Save Changes' : 'Launch Event'}</button>
                                <button type="button" onClick={closeModal} style={{ flex: 1, background: '#f1f5f9', color: 'var(--text)', border: 'none', padding: '1.5rem', borderRadius: '20px', fontWeight: '800', cursor: 'pointer' }}>Discard</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Attendees Modal */}
            {showAttendeesModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(12px)' }}>
                    <div style={{ background: 'white', padding: '3.5rem', borderRadius: '40px', width: '100%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}>
                        <button onClick={() => setShowAttendeesModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#f1f5f9', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}><X size={24} /></button>
                        
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', background: 'rgba(37,99,235,0.1)', padding: '4px 12px', borderRadius: '100px', marginBottom: '1rem' }}>
                                <Users size={12} /> {selectedAttendees.length} Registered Attendees
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>{selectedEventName}</h2>
                        </div>

                        {selectedAttendees.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                                <Users size={48} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>No registrations found for this event yet.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {selectedAttendees.map((ticket, idx) => (
                                    <div key={ticket.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid var(--border)' }}>
                                        <div style={{ background: 'var(--primary)', color: 'white', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem' }}>
                                            {ticket.User.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{ticket.User.name}</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{ticket.User.email}</div>
                                        </div>
                                        <div style={{ marginLeft: 'auto', background: '#ecfdf5', color: '#059669', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' }}>
                                            {ticket.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{ __html: `
                .table-row-hover:hover { background: #fdfdfd; }
                input:focus, textarea:focus, select:focus { outline: 2px solid var(--primary); outline-offset: -2px; border-color: transparent !important; }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.4); }
                .btn-primary:active { transform: translateY(0); }
            ` }} />
        </div>
    );
};

export default AdminDashboard;
