import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket as TicketIcon, Calendar, MapPin, Download, Loader2 } from 'lucide-react';

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tickets/my-tickets');
                setTickets(res.data);
            } catch (err) {
                console.error('Error fetching tickets:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="container-full">
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '3rem' }}>Your Passports to Experience</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '2rem' }}>
                {tickets.length > 0 ? (
                    tickets.map(ticket => (
                        <div key={ticket.id} style={{
                            background: 'white',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            display: 'flex',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ padding: '2rem', flex: 1, borderRight: '2px dashed var(--border)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-10px', right: '-11px', width: '20px', height: '20px', background: 'var(--bg-subtle)', borderRadius: '50%' }}></div>
                                <div style={{ position: 'absolute', bottom: '-10px', right: '-11px', width: '20px', height: '20px', background: 'var(--bg-subtle)', borderRadius: '50%' }}></div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                                    <TicketIcon size={16} /> Official Entry Pass
                                </div>

                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>{ticket.Event?.title}</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <Calendar size={18} /> {ticket.Event?.date ? new Date(ticket.Event.date).toLocaleDateString(undefined, { dateStyle: 'full' }) : 'N/A'}
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <MapPin size={18} /> {ticket.Event?.location || 'N/A'}
                                    </div>
                                </div>

                                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Ticket Status</div>
                                        <div style={{ fontWeight: '800', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                            {ticket.status.toUpperCase()}
                                        </div>
                                    </div>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                                        <Download size={16} /> Save PDF
                                    </button>
                                </div>
                            </div>

                            <div style={{ width: '180px', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1rem' }}>
                                <div style={{ padding: '10px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <img src={ticket.qrData} alt="QR Code" style={{ width: '120px', height: '120px' }} />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '1px' }}>SCAN AT GATE</div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.5 }}>#{String(ticket.id).padStart(8, '0')}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '8rem 2rem', background: 'white', borderRadius: '32px', border: '1px solid var(--border)' }}>
                        <TicketIcon size={64} style={{ opacity: 0.1, marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>No tickets found.</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '400px', margin: '1rem auto 2rem' }}>
                            You haven't registered for any events yet. Start your journey by exploring our global directory.
                        </p>
                        <a href="/events" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '1rem 2rem', textDecoration: 'none' }}>
                            Explore Events
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTickets;
