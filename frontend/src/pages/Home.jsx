import React from 'react';
import { Shield, BookOpen, Award, CheckCircle2, ArrowRight, Flame, Target, Users } from 'lucide-react';
import BeltBadge from '../components/BeltBadge';

const Home = ({ setActiveTab }) => {
  const belts = [
    { name: 'White Belt (10th Kyu)', desc: 'Purity, foundation, stances (Zenkutsu-dachi) & Kihon basics.' },
    { name: 'Yellow Belt (8th Kyu)', desc: 'Awakening energy, Heian Shodan kata & basic blocking.' },
    { name: 'Orange Belt (7th Kyu)', desc: 'Stability, counter-punches, leg strength & distance control.' },
    { name: 'Green Belt (6th Kyu)', desc: 'Growth, introduction to dynamic Kumite sparring drills.' },
    { name: 'Blue Belt (4th Kyu)', desc: 'Fluidity, speed combinations & sweep defense.' },
    { name: 'Purple Belt (3rd Kyu)', desc: 'Precision, advanced pinan katas & strike locks.' },
    { name: 'Brown Belt (2nd Kyu)', desc: 'Refinement, tournament sparring & student leadership.' },
    { name: 'Black Belt (1st Dan)', desc: 'Mastery of body & mind, advanced Bunkai & teaching.' },
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Hero Section */}
      <div className="glass-panel" style={{ padding: '60px 40px', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden', marginBottom: '60px' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.15, fontSize: '20rem', pointerEvents: 'none' }}>
          🥋
        </div>

        <div style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px' }}>
            <Flame size={16} /> TRADITIONAL SHOTOKAN & ROYAL KARATE ASSOCIATION
          </div>
          
          <h1 style={{ fontSize: '3.2rem', color: '#ffffff', lineHeight: 1.15, marginBottom: '20px' }}>
            Master the Art of <span style={{ color: 'var(--accent-gold)' }}>Karate</span> & Self-Discipline
          </h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.7 }}>
            Step into the world's premier online martial arts academy. Train under Grandmasters, track your belt rank progression, and unlock elite Kihon, Kata, and Kumite courses.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('classes')} className="btn btn-primary btn-lg">
              Explore Courses <ArrowRight size={18} />
            </button>
            <button onClick={() => setActiveTab('signup')} className="btn btn-gold btn-lg">
              Join Royal Karate Association Today
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ background: 'rgba(220, 38, 38, 0.15)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-crimson)', marginBottom: '20px' }}>
            <BookOpen size={26} />
          </div>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Structured Curriculum</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            From White Belt to 3rd Dan Black Belt, access step-by-step video HD drills, kata breakdowns, and belt requirements.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', marginBottom: '20px' }}>
            <Target size={26} />
          </div>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Live & On-Demand Classes</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Join live interactive sessions with certified Senseis or review drill modules at your own pace anywhere.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.15)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', marginBottom: '20px' }}>
            <Users size={26} />
          </div>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Dedicated Student Portal</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage your student profile, track your belt evaluation history, emergency contacts, and class schedule securely.
          </p>
        </div>

      </div>

      {/* Belt Path System */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'white', marginBottom: '10px' }}>The Belt Progression Path</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The journey of a thousand miles begins with a single stance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {belts.map((b, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--accent-gold)' }}>
              <div style={{ marginBottom: '10px' }}>
                <BeltBadge rank={b.name} />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
