import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Map, Moon, Sun, Book, Home, BookOpen, ShoppingBag, ShieldCheck, Menu, X } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;

        if (isMobileViewport) {
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const navLinks = [
        { name: 'Ana Sayfa', path: '/', icon: <Home size={18} /> },
        { name: 'Mekke', path: '/mekke', icon: <Book size={18} /> },
        { name: 'Medine', path: '/medine', icon: <Book size={18} /> },
        { name: 'Umre', path: '/umre-rehberi', icon: <BookOpen size={18} /> },
        { name: 'Merkez', path: '/hazirlik-merkezi', icon: <ShieldCheck size={18} /> },
        { name: 'Pratik Bilgiler', path: '/pratik-bilgiler', icon: <ShoppingBag size={18} /> },
        { name: 'Harita', path: '/harita', icon: <Map size={18} /> },
        { name: 'Kıble', path: '/kible', icon: <Compass size={18} /> }
    ];

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="nav-logo">
                    <Logo className="navbar-logo-component" />
                </Link>

                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="nav-actions">
                    <button className="theme-toggle hover-glow" onClick={toggleTheme} aria-label="Temayı Değiştir">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button
                        className="mobile-menu-toggle hover-glow"
                        onClick={() => setIsMenuOpen((current) => !current)}
                        aria-label="Menüyü Aç"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
