import { Compass, BookOpen, Quote, MapPin, History } from 'lucide-react';
import Accordion from '../components/shared/Accordion';
import Timeline from '../components/shared/Timeline';
import DetailCard from '../components/shared/DetailCard';
import { meccaData } from '../data/meccaData';
import './Mecca.css';

const Mecca = () => {
    return (
        <div className="mecca-page">
            {/* Header Banner */}
            <section className="page-banner">
                <div className="banner-bg"></div>
                <div className="container banner-content">
                    <h1 className="animate-slide-up">Mekke-i Mükerreme</h1>
                    <p className="banner-subtitle animate-slide-up delay-100">
                        "Şüphesiz, âlemlere bereket ve hidayet kaynağı olarak insanlar için kurulan ilk ev (mâbet), Mekke'deki (Kâbe)dir." (Âl-i İmrân, 96)
                    </p>
                </div>
            </section>

            <div className="container page-layout">
                {/* Sidebar Navigation */}
                <aside className="page-sidebar animate-slide-up delay-200">
                    <div className="sidebar-sticky glass-panel">
                        <h3 className="sidebar-title">Bölümler</h3>
                        <ul className="sidebar-nav">
                            <li><a href="#kabe">Kâbe-i Muazzama</a></li>
                            <li><a href="#bolumler">Kâbe'nin Bölümleri</a></li>
                            <li><a href="#ziyaret">Önemli Ziyaret Yerleri</a></li>
                            <li><a href="#tarih">Tarihi Olaylar</a></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="page-content animate-slide-up delay-300">

                    {/* Section 1: Kabe Tarihçesi */}
                    <section id="kabe" className="content-section">
                        <div className="section-heading">
                            <Compass className="section-icon text-secondary" size={32} />
                            <h2>{meccaData.kabe.title}</h2>
                        </div>

                        <div className="info-card glass-panel section-intro mb-4">
                            <p className="lead-text" style={{ margin: 0 }}>{meccaData.kabe.description}</p>
                        </div>

                        <h3 className="sub-heading mt-5">Kâbe'nin Tarihsel Gelişimi</h3>
                        {/* Using the new Animated Timeline component for history */}
                        <Timeline events={meccaData.kabe.history} theme="secondary" />

                        <h3 className="sub-heading mt-5">Kâbe Hakkında Hadisler</h3>
                        <div className="hadiths-wrapper">
                            {meccaData.kabe.hadiths.map((hadith, index) => (
                                <div key={index} className="quote-box animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                                    <Quote size={28} className="quote-icon" />
                                    <p><strong>Hadis-i Şerif:</strong> "{hadith}"</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="section-divider" />

                    {/* Section 2: Kabenin Bölümleri */}
                    <section id="bolumler" className="content-section">
                        <div className="section-heading">
                            <MapPin className="section-icon text-secondary" size={32} />
                            <h2>Kâbe'nin Bölümleri</h2>
                        </div>
                        <p className="text-muted mb-4">Kâbe'nin her bir köşesi ve detayı farklı bir anlam, rahmet ve sır taşır. Kâbe'yi oluşturan mukaddes unsurları detaylıca inceleyin.</p>

                        {/* Using the new Animated Accordion component */}
                        <Accordion items={meccaData.kabe.parts} theme="secondary" />
                    </section>

                    <hr className="section-divider" />

                    {/* Section 3: Ziyaret Yerleri */}
                    <section id="ziyaret" className="content-section">
                        <div className="section-heading">
                            <BookOpen className="section-icon text-secondary" size={32} />
                            <h2>Mekke'deki Dini Mekanlar</h2>
                        </div>
                        <p className="text-muted mb-4">Mekke'de vahyin indiği, Peygamberimizin adım attığı ve Haccın yaşandığı tüm kutsal mekanlar.</p>

                        <div className="grid-2-col">
                            {meccaData.places.map((place, index) => (
                                <DetailCard key={place.id} place={place} theme="secondary" index={index} />
                            ))}
                        </div>
                    </section>

                    <hr className="section-divider" />

                    {/* Section 4: Tarihi Olaylar */}
                    <section id="tarih" className="content-section">
                        <div className="section-heading">
                            <History className="section-icon text-secondary" size={32} />
                            <h2>Mekke'de Yaşanan Tarihi Olaylar</h2>
                        </div>
                        <p className="text-muted mb-4">İslam tarihinin yönünü değiştiren, felaketlerin mucizelere ve fetihlere dönüştüğü önemli kilometre taşları.</p>

                        {/* Using Timeline for actual historical events */}
                        <Timeline events={meccaData.events} theme="secondary" />
                    </section>

                </main>
            </div>
        </div>
    );
};

export default Mecca;
