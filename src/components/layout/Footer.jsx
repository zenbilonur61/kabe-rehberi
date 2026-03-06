import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <span className="logo-icon">🕋</span>
                        <span className="logo-text">Kabe Rehberi</span>
                    </Link>
                    <p className="footer-desc text-muted">
                        Mekke ve Medine'nin tarihi, dini ve pratik bilgilerini kapsayan dijital rehberiniz.
                    </p>
                    <div className="footer-contact">
                        <div className="contact-item">
                            <MapPin size={16} className="text-primary-light" />
                            <span>Kutsal Topraklar</span>
                        </div>
                        <div className="contact-item">
                            <Mail size={16} className="text-primary-light" />
                            <span>info@kaberehberi.app</span>
                        </div>
                    </div>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Hızlı Erişim</h4>
                    <ul className="footer-links">
                        <li><Link to="/mekke" className="footer-link">Mekke Rehberi</Link></li>
                        <li><Link to="/medine" className="footer-link">Medine Rehberi</Link></li>
                        <li><Link to="/hazirlik-merkezi" className="footer-link">Hazırlık Merkezi</Link></li>
                        <li><Link to="/harita" className="footer-link">Kutsal Harita</Link></li>
                        <li><Link to="/kible" className="footer-link">Kıble Bulucu</Link></li>
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Özel Bölümler</h4>
                    <ul className="footer-links">
                        <li><Link to="/mekke#kabe" className="footer-link">Kabe'nin Bölümleri</Link></li>
                        <li><Link to="/hazirlik-merkezi#checklist" className="footer-link">Umre Checklisti</Link></li>
                        <li><Link to="/hazirlik-merkezi#hanefi-notlar" className="footer-link">Hanefî Notlar</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-container">
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} Kabe & Medine Rehberi. Tüm hakları saklıdır.
                    </p>
                    <p className="made-with">
                        Sevgiyle <Heart size={14} className="heart-icon" /> geliştirildi
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
