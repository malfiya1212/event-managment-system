import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Search, MapPin, Calendar as CalendarIcon, ExternalLink, SlidersHorizontal, Loader2, X, CreditCard, Smartphone, ShieldCheck, Wallet, ArrowRight, CheckCircle, LogIn } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';

const Events = () => {
    const { user } = useContext(AuthContext);
    const { success, error: notifyError } = useContext(NotificationContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Payment/Checkout States
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentStep, setPaymentStep] = useState(1); // 1: Select, 2: Scan/Detail, 3: Processing, 4: Success
    const [isPurchasing, setIsPurchasing] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

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

    const categories = ['All', 'Technology', 'Finance', 'Environment', 'AI / Tech', 'Design', 'Business'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const openCheckout = (event) => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        setSelectedEvent(event);
        setShowCheckout(true);
        setPaymentStep(1);
        setPaymentMethod('');
    };

    const handlePaymentAction = () => {
        if (!paymentMethod) return notifyError('Please select a payment method');
        setPaymentStep(2);
    };

    const confirmPayment = async () => {
        setPaymentStep(3);
        setIsPurchasing(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('AUTH_REQUIRED');

            await axios.post(`http://localhost:5000/api/tickets/buy/${selectedEvent.id}`, {
                paymentMethod: paymentMethod,
                transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            }, {
                headers: { 'x-auth-token': token }
            });
            
            setPaymentStep(4);
            success(`Successfully booked ticket for ${selectedEvent.title}!`);
            fetchEvents(); // Refresh capacity
        } catch (err) {
            console.error('Purchase error:', err);
            const errorMsg = err.response?.data?.msg || err.message;
            if (errorMsg === 'AUTH_REQUIRED' || err.response?.status === 401) {
                notifyError('Session expired or unauthorized. Please login again.');
                window.location.href = '/login';
            } else {
                notifyError(errorMsg || 'Infrastructure error. Please try again later.');
            }
            setShowCheckout(false);
        } finally {
            setIsPurchasing(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <Loader2 className="animate-spin" size={64} color="var(--primary)" />
                    <p style={{ marginTop: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Synchonizing Global Events...</p>
                </div>
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
                                    <button onClick={() => openCheckout(event)} className="btn-primary" style={{ display: 'flex', gap: '10px', alignItems: 'center', width: 'auto', padding: '0.75rem 1.5rem' }} disabled={event.remainingCapacity === 0}>
                                        {event.remainingCapacity === 0 ? 'Sold Out' : (
                                            user ? <>{'Register Now'} <ExternalLink size={18} /></> : <>{'Sign in to Register'} <LogIn size={18} /></>
                                        )}
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

            {/* Premium Checkout Modal */}
            {showCheckout && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(10px)', padding: '1rem' }}>
                    <div style={{ background: 'white', width: '100%', maxWidth: '550px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative' }}>
                        <button onClick={() => setShowCheckout(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}><X size={20} /></button>
                        
                        {/* Modal Header */}
                        <div style={{ background: '#f8fafc', padding: '2.5rem', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                <ShieldCheck size={16} /> Secure Event Registration
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>{selectedEvent?.title}</h2>
                            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>Reserve your entry for <strong>${selectedEvent?.price}</strong></p>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '2.5rem' }}>
                            {paymentStep === 1 && (
                                <>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem' }}>Select Payment Method</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {[
                                            { id: 'telebirr', name: 'Telebirr', icon: Smartphone, color: '#0066ff' },
                                            { id: 'chapa', name: 'Chapa', icon: Wallet, color: '#de383a' },
                                            { id: 'bank', name: 'Other Bank Transfer', icon: CreditCard, color: '#16a34a' }
                                        ].map(method => (
                                            <div 
                                                key={method.id} 
                                                onClick={() => setPaymentMethod(method.id)}
                                                style={{ 
                                                    padding: '1.25rem', 
                                                    borderRadius: '16px', 
                                                    border: '2px solid', 
                                                    borderColor: paymentMethod === method.id ? 'var(--primary)' : '#e2e8f0',
                                                    background: paymentMethod === method.id ? 'rgba(37, 99, 235, 0.05)' : 'white',
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: '1.25rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ background: method.color, color: 'white', padding: '8px', borderRadius: '10px' }}>
                                                    <method.icon size={24} />
                                                </div>
                                                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{method.name}</div>
                                                <div style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', border: '2px solid', borderColor: paymentMethod === method.id ? 'var(--primary)' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {paymentMethod === method.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handlePaymentAction} className="btn-primary" style={{ marginTop: '2.5rem', padding: '1.2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        Continue to Payment <ArrowRight size={20} />
                                    </button>
                                </>
                            )}

                            {paymentStep === 2 && (
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Scan to Pay</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please scan this gateway code with your <strong>{paymentMethod.toUpperCase()}</strong> app.</p>
                                    
                                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '24px', display: 'inline-block', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                        {/* Mock QR for Payment Gateway */}
                                        <div style={{ width: '200px', height: '200px', background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #eee' }}>
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PAYMENT_GATEWAY_SIMULATION" alt="Payment QR" style={{ width: '100%' }} />
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '0.9rem', padding: '1rem', background: '#f1f5f9', borderRadius: '12px', marginBottom: '2rem', color: '#64748b', fontWeight: '600' }}>
                                        Amount: <span style={{ color: 'var(--text-main)', fontWeight: '800' }}>${selectedEvent?.price}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button 
                                            onClick={confirmPayment} 
                                            className="btn-primary" 
                                            disabled={isPurchasing}
                                            style={{ padding: '1.2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flex: 1 }}
                                        >
                                            {isPurchasing ? <Loader2 className="animate-spin" size={20} /> : <>{'I have paid'} <CheckCircle size={20} /></>}
                                        </button>
                                        <button onClick={() => setPaymentStep(1)} disabled={isPurchasing} style={{ padding: '1.2rem', borderRadius: '16px', background: '#f1f5f9', border: 'none', fontWeight: '700', cursor: 'pointer', flex: 1 }}>Back</button>
                                    </div>

                                </div>
                            )}

                            {paymentStep === 3 && (
                                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                    <Loader2 className="animate-spin" size={64} color="var(--primary)" style={{ margin: '0 auto 2rem' }} />
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Verifying Transaction...</h2>
                                    <p style={{ color: 'var(--text-muted)' }}>Confirming payment with {paymentMethod.toUpperCase()} servers.</p>
                                </div>
                            )}

                            {paymentStep === 4 && (
                                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                    <div style={{ background: '#ecfdf5', color: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                        <CheckCircle size={48} />
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem' }}>Booking Confirmed!</h2>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Your ticket with a secure QR pass has been added to your profile.</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                        <button onClick={() => window.location.href = '/my-tickets'} className="btn-primary" style={{ flex: 1, padding: '1.2rem', borderRadius: '16px' }}>View My Tickets</button>
                                        <button onClick={() => setShowCheckout(false)} style={{ flex: 1, padding: '1.2rem', background: '#f1f5f9', border: 'none', borderRadius: '16px', fontWeight: '700', cursor: 'pointer' }}>Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
