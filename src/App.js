import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import './App.css';

/**
 * A robust lazy loading helper that attempts to reload the page once if a chunk fail to load.
 * This effectively handles ChunkLoadErrors caused by network hiccups or new deployments
 * where the chunk hash has changed.
 */
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasBeenForceRefreshed) {
        // First fallback: retry loading the chunk by refreshing the page
        console.warn('Chunk loading failed. Attempting a force refresh...', error);
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        return { default: () => null }; // Return dummy component while reloading
      }
      
      // If we already refreshed and it still fails, it's a real error
      console.error('Critical Error: Chunk could not be loaded even after refresh.', error);
      throw error;
    }
  });

// Lazy load pages with retry logic
const Home = lazyWithRetry(() => import('./pages/Home'));
const Login = lazyWithRetry(() => import('./pages/Login'));
const Register = lazyWithRetry(() => import('./pages/Register'));
const Events = lazyWithRetry(() => import('./pages/Events'));
const MyTickets = lazyWithRetry(() => import('./pages/MyTickets'));
const AdminDashboard = lazyWithRetry(() => import('./pages/AdminDashboard'));
const AdminLogin = lazyWithRetry(() => import('./pages/AdminLogin'));

const LoadingSpinner = () => (
  <div style={{ 
    height: '60vh', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: '2rem'
  }}>
    <div className="animate-spin" style={{ 
      width: '40px', 
      height: '40px', 
      border: '3px solid var(--border)', 
      borderTopColor: 'var(--primary)', 
      borderRadius: '50%' 
    }}></div>
    <p style={{ color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em' }}>Synchronizing Experience...</p>
  </div>
);

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/my-tickets" element={<MyTickets />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}


export default App;

