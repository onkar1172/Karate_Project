import React from 'react';
import { Shield, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ marginTop: '80px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(10, 12, 16, 0.95)', padding: '60px 24px 30px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.6rem' }}>🥋</span>
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff' }}>ROYAL KARATE ASSOCIATION</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Empowering students with discipline, traditional Shotokan Karate values, physical mastery, and high-performance martial arts education worldwide.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '16px', fontSize: '1rem' }}>ASSOCIATION BRANCHES</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--accent-crimson)" /> Royal Karate Main Dojo - 108 Bushido Way</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--accent-crimson)" /> Royal Karate Northside Dojo - 45 Dragon Gate Blvd</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--accent-crimson)" /> Royal Karate Virtual Dojo - 24/7 Global Stream</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '16px', fontSize: '1rem' }}>CONTACT & SUPPORT</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} color="var(--accent-gold)" /> info@kuroobi-karate.com</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} color="var(--accent-gold)" /> +1 (800) 555-KARATE</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={16} color="var(--accent-gold)" /> Certified World Karate Federation (WKF)</li>
          </ul>
        </div>

      </div>


    </footer>
  );
};

export default Footer;
