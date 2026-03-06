import { ArrowRight, BookOpen, Map, Compass, Clock, Star, ShieldCheck } from 'lucide-react';
import Card from '../components/shared/Card';
import './Home.css';

// We will replace these with generated images once they are ready.
// For now, these are defined to use the images that will be downloaded/generated to the public folder.
import heroBg from '/mekke_hero_bg.png';

const Home = () => {
    const features = [
        {
            title: "Mekke Rehberi",
            description: "Kabe'nin tarihi, bölümleri ve çevresindeki kutsal mekanlar hakkında detaylı bilgiler.",
            icon: BookOpen,
            linkTo: "/mekke",
            image: "/mecca_card_img.png",
            delay: 100
        },
        {
            title: "Medine Rehberi",
            description: "Mescid-i Nebevî, Ravza-i Mutahhara ve Peygamber Efendimiz'in şehrindeki önemli yerler.",
            icon: Star,
            linkTo: "/medine",
            image: "/medina_card_img.png",
            delay: 200
        },
        {
            title: "Hazırlık Merkezi",
            description: "Checklist, Hanefî notlar, sık yapılan hatalar, kişisel planlayıcı ve acil durum kartı.",
            icon: ShieldCheck,
            linkTo: "/hazirlik-merkezi",
            image: "/logo.png",
            delay: 250
        },
        {
            title: "Kutsal Harita",
            description: "Kabe, Hira, Sevr, Uhud ve Kuba gibi önemli mekanları interaktif harita üzerinde keşfedin.",
            icon: Map,
            linkTo: "/harita",
            image: "/map_bg.png",
            delay: 300
        },
        {
            title: "Ezan & Kıble",
            description: "Bulunduğunuz konuma göre namaz vakitlerini takip edin, Hanefî ikindi hesabını görün ve kıble yönünüzü bulun.",
            icon: Compass,
            linkTo: "/kible",
            image: "/compass_bg.png",
            delay: 400
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-overlay"></div>
                <div className="hero-bg-image" style={{ backgroundImage: `url(${heroBg})` }}></div>

                <div className="container hero-content">
                    <span className="badge animate-slide-up">Bismillahirrahmânirrahîm</span>
                    <h1 className="hero-title animate-slide-up delay-100">
                        Kutsal Topraklara <br /> Dijital Yolculuk
                    </h1>
                    <p className="hero-subtitle animate-slide-up delay-200">
                        Mekke ve Medine'nin manevi atmosferini, derin tarihini ve pratik bilgilerini keşfedeceğiniz en kapsamlı rehber.
                    </p>
                    <div className="hero-actions animate-slide-up delay-300">
                        <a href="#explore" className="btn btn-primary">
                            Keşfetmeye Başla
                            <ArrowRight size={18} />
                        </a>
                        <a href="/kible" className="btn btn-secondary glass-panel">
                            <Compass size={18} />
                            Kıble Bulucu
                        </a>
                    </div>
                </div>

                {/* Decorative separator */}
                <div className="hero-separator">
                    <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="var(--color-bg-main)"></path>
                    </svg>
                </div>
            </section>

            {/* Daily Info Highlights - Quick bar */}
            <section className="highlights-bar">
                <div className="container">
                    <div className="highlights-wrapper glass-panel animate-slide-up delay-400">
                        <div className="highlight-item">
                            <div className="highlight-icon-wrapper"><Clock size={20} className="text-secondary" /></div>
                            <div>
                                <span className="highlight-label">Namaz Vakitleri</span>
                                <span className="highlight-value">Canlı hesaplama için Kıble sayfası</span>
                            </div>
                        </div>
                        <div className="highlight-divider"></div>
                        <div className="highlight-item">
                            <div className="highlight-icon-wrapper"><BookOpen size={20} className="text-secondary" /></div>
                            <div>
                                <span className="highlight-label">Günün Hadisi</span>
                                <span className="highlight-value text-italic">"Mebrur haccın karşılığı ancak cennettir."</span>
                            </div>
                        </div>
                        <div className="highlight-divider"></div>
                        <div className="highlight-item">
                            <div className="highlight-icon-wrapper"><Map size={20} className="text-secondary" /></div>
                            <div>
                                <span className="highlight-label">Mesafe</span>
                                <span className="highlight-value">Mekke - Medine: 450 km</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Navigation Cards Section */}
            <section id="explore" className="explore-section">
                <div className="container">
                    <div className="section-header text-center animate-slide-up">
                        <h2 className="section-title">Rehber Bölümleri</h2>
                        <p className="section-subtitle text-muted">Aramak istediğiniz konuyu seçin ve manevi yolculuğunuza adım atın.</p>
                        <div className="title-ornament">
                            <span></span><Star size={12} className="text-secondary" /><span></span>
                        </div>
                    </div>

                    <div className="cards-grid">
                        {features.map((feature, index) => (
                            <Card key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
