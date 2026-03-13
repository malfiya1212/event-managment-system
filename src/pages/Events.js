import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Calendar as CalendarIcon, ExternalLink, SlidersHorizontal, Loader2 } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const categories = ['All', 'Technology', 'Finance', 'Environment', 'AI / Tech', 'Design', 'Business'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleBuyTicket = async (eventId) => {
        try {
            await axios.post(`http://localhost:5000/api/tickets/buy/${eventId}`);
            alert('Ticket purchased successfully! Check your tickets page.');
            // Refresh events to update capacity
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        } catch (err) {
            alert(err.response?.data?.msg || 'Error purchasing ticket. Please login first.');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="container-full" style={{ paddingBottom: '8rem' }}>
            <div style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '600px' }}>
                    <span className="badge">Global Directory</span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginTop: '1rem' }}>Discover Extraordinary Events</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        Browse our curated selection of high-impact summits, conferences, and exhibitions from every corner of the globe.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', background: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', width: '100%', maxWidth: '500px' }}>
                    <Search color="var(--text-muted)" size={20} />
                    <input type="text" placeholder="Search by event name or city..." style={{ border: 'none', background: 'transparent', padding: 0, height: 'auto', width: '100%' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '1rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.9rem' }}>
                    <SlidersHorizontal size={18} /> Filters:
                </div>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '0.6rem 1.25rem', borderRadius: '99px', border: '1px solid', borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border)', background: selectedCategory === cat ? 'var(--primary)' : 'white', color: selectedCategory === cat ? 'white' : 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>{cat}</button>
                ))}
            </div>

            <div className="event-grid">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div key={event.id} className="event-card">
                            <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                <img src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000'} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                                    <span className="badge" style={{ background: 'white', color: 'var(--primary)', boxShadow: 'var(--shadow-sm)' }}>{event.category}</span>
                                </div>
                            </div>
                            <div className="event-card-body">
                                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.3' }}>{event.title}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                        <CalendarIcon size={18} /> {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                        <MapPin size={18} /> {event.location}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>
                                        {event.remainingCapacity} tickets left out of {event.totalCapacity}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                                    <button onClick={() => handleBuyTicket(event.id)} className="btn-primary" style={{ display: 'flex', gap: '10px', alignItems: 'center', width: 'auto', padding: '0.75rem 1.5rem' }} disabled={event.remainingCapacity === 0}>
                                        {event.remainingCapacity === 0 ? 'Sold Out' : 'Register Now'} <ExternalLink size={18} />
                                    </button>
                                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--secondary)' }}>${event.price}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                        <SlidersHorizontal size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <h3>No events found matching your criteria.</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search terms or filters.</p>
                        <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer' }}>Reset all filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
