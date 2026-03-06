import { Star, History, MapPin, List, Info } from 'lucide-react';
import Accordion from '../components/shared/Accordion';
import Timeline from '../components/shared/Timeline';
import DetailCard from '../components/shared/DetailCard';
import { medinaData } from '../data/medinaData';
import './Mecca.css'; // Reusing common layout styles
import './Medina.css'; // Medina specific overrides

const Medina = () => {
    return (
        <div className="mecca-page medina-page">
            {/* Header Banner */}
            <section className="page-banner medina-banner">
                <div className="banner-bg medina-bg"></div>
                <div className="container banner-content">
                    <h1 className="animate-slide-up">Medine-i Münevvere</h1>
                    <p className="banner-subtitle animate-slide-up delay-100">
                        "Nurlanmış Şehir" - Peygamber Efendimiz'in (SAV) hicret yurdu, İslam'ın ilk başkenti ve Kainatın Efendisi'ni bağrında taşıyan mukaddes mekan.
                    </p>
                </div>
            </section>

            <div className="container page-layout">
                {/* Sidebar Navigation */}
                <aside className="page-sidebar animate-slide-up delay-200">
                    <div className="sidebar-sticky glass-panel medina-sidebar">
                        <h3 className="sidebar-title">Bölümler</h3>
                        <ul className="sidebar-nav">
                            <li><a href="#mescid"><Star size={16} /> Mescid-i Nebevî</a></li>
                            <li><a href="#bolumler"><List size={16} /> Mescid Bölümleri</a></li>
                            <li><a href="#ziyaret"><MapPin size={16} /> Dini Mekanlar</a></li>
                            <li><a href="#tarih"><History size={16} /> Tarihi Olaylar</a></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="page-content animate-slide-up delay-300">

                    {/* Section 1: Mescid-i Nebevi Tarihçe */}
                    <section id="mescid" className="content-section">
                        <div className="section-heading">
                            <Star className="section-icon text-primary-light" size={32} />
                            <h2>{medinaData.mescid.title}</h2>
                        </div>

                        <div className="info-card glass-panel section-intro mb-4 medina-intro">
                            <p className="lead-text" style={{ margin: 0 }}>{medinaData.mescid.description}</p>
                        </div>

                        <div className="quote-box medina-quote animate-slide-up">
                            <Info size={28} className="quote-icon" />
                            <p><strong>Hadis-i Şerif:</strong> "Benim bu mescidimde kılınan bir namaz, Mescid-i Haram hariç, diğer mescitlerde kılınan bin namazdan daha hayırlıdır."</p>
                        </div>

                        <h3 className="sub-heading mt-5">Mescid-i Nebevî'nin Tarihsel Gelişimi</h3>
                        <Timeline events={medinaData.mescid.history} theme="emerald" />
                    </section>

                    <hr className="section-divider" />

                    {/* Section 2: Mescid Bölümleri */}
                    <section id="bolumler" className="content-section">
                        <div className="section-heading">
                            <List className="section-icon text-primary-light" size={32} />
                            <h2>Mescid İçi Önemli Bölümler</h2>
                        </div>
                        <p className="text-muted mb-4">
                            Mescid-i Nebevî'nin her bir direği ve alanı, asr-ı saadetten bir hatıra taşır. Ravza-i Mutahhara, Hücre-i Saadet ve daha fazlası.
                        </p>

                        <Accordion items={medinaData.mescid.parts} theme="emerald" />
                    </section>

                    <hr className="section-divider" />

                    {/* Section 3: Ziyaret Yerleri */}
                    <section id="ziyaret" className="content-section">
                        <div className="section-heading">
                            <MapPin className="section-icon text-primary-light" size={32} />
                            <h2>Medine'deki Dini Mekanlar</h2>
                        </div>
                        <p className="text-muted mb-4">
                            İslam'ın ilk mescidi Küba'dan, Uhud şehitliğine ve Cennetü'l-Bâki'ye Medine'nin kutsal mekanları.
                        </p>

                        <div className="grid-2-col">
                            {medinaData.places.map((place, index) => (
                                <DetailCard key={place.id} place={place} theme="emerald" index={index} />
                            ))}
                        </div>
                    </section>

                    <hr className="section-divider" />

                    {/* Section 4: Tarihi Olaylar (Savaşlar) */}
                    <section id="tarih" className="content-section">
                        <div className="section-heading">
                            <History className="section-icon text-primary-light" size={32} />
                            <h2>Medine Dönemi Önemli Olayları</h2>
                        </div>
                        <p className="text-muted mb-4">
                            İslam devletinin temellerinin atıldığı ve varoluş mücadelesinin verildiği Bedir, Uhud ve Hendek savaşları.
                        </p>

                        <Timeline events={medinaData.events} theme="emerald" />
                    </section>

                </main>
            </div>
        </div>
    );
};

export default Medina;
