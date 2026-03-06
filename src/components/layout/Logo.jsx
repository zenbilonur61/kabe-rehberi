import React from 'react';

const Logo = ({ className }) => {
    return (
        <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Golden Crescent */}
                <path
                    d="M45 15 A45 45 0 1 0 45 105 A38 38 0 1 1 45 15"
                    fill="#D97706"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                />

                {/* Kaaba Silhouette */}
                {/* Right/Front Face */}
                <path d="M40 45 L75 52 L75 95 L40 88 Z" fill="#0f172a" />
                {/* Left Face */}
                <path d="M40 45 L15 55 L15 85 L40 88 Z" fill="#1e293b" />
                {/* Top Face */}
                <path d="M40 45 L15 55 L45 60 L75 52 Z" fill="#334155" />

                {/* Gold Embroidery (Kiswa pattern) */}
                <path d="M15 58 L40 50 L75 56" fill="none" stroke="#D97706" strokeWidth="2.5" />
                <circle cx="45" cy="53" r="1.2" fill="#D97706" />
                <circle cx="55" cy="55" r="1.2" fill="#D97706" />
                <circle cx="65" cy="57" r="1.2" fill="#D97706" />

                {/* Golden Door */}
                <path d="M48 70 L60 73 L60 92 L48 89 Z" fill="#D97706" />
                <path d="M48 70 Q54 68 60 73" fill="none" stroke="#D97706" strokeWidth="1" />
            </svg>

            <div className="logo-text-wrapper" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span className="logo-title" style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: 'white',
                    fontFamily: 'var(--font-serif)',
                    letterSpacing: '0.5px'
                }}>Kabe</span>
                <span className="logo-subtitle" style={{
                    fontSize: '2.1rem',
                    fontWeight: '800',
                    color: 'white',
                    fontFamily: 'var(--font-serif)',
                    letterSpacing: '0.5px'
                }}>Rehberi</span>
            </div>
        </div>
    );
};

export default Logo;
