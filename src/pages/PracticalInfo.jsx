import { ShoppingCart, Cross, Phone, Map, Coffee } from 'lucide-react';
import Accordion from '../components/shared/Accordion';
import DetailCard from '../components/shared/DetailCard';
import './Mecca.css';
import './PracticalInfo.css';

const shoppingData = [
    {
        id: "bindawood",
        name: "Bin Dawood Süpermarket",
        description: "Mekke ve Medine'nin en büyük, en ulaşılabilir süpermarketi.",
        detail: "Hem Kâbe'nin dibindeki Ebrâc-el Beyt (Saat Kulesi) altında, hem de Mescid-i Nebevî çevresinde şubeleri vardır. Taze meyve, kuruyemiş, hediyelik eşya, ihram, kıyafet ve kişisel bakım ürünlerini, kısacası her şeyi bulabileceğiniz devasa bir zincirdir."
    },
    {
        id: "abraj_al_bait",
        name: "Ebrâc-el Beyt (Saat Kulesi) AVM",
        description: "Kâbe manzaralı devasa alışveriş kompleksi.",
        detail: "İçerisinde dünyaca ünlü markalar, devasa bir 'Food Court' (yemek katı) ve yüzlerce dükkan bulunur. Türk restoranlarından, global fast food zincirlerine kadar her türlü yeme içme imkanını barındırır."
    },
    {
        id: "taiba_center",
        name: "Taiba (Taybe) AVM - Medine",
        description: "Mescid-i Nebevî'nin hemen yanı başındaki alışveriş merkezi.",
        detail: "Özellikle hurma alışverişi, tesbih, seccade ve hediyelik eşyalar için Medine'deki en popüler yerdir. Mescid-i Nebevî avlusundan çıktığınız an karşınızda bulabilirsiniz."
    },
    {
        id: "al_baik",
        name: "Al Baik (Popüler Restoran Zinciri)",
        description: "Bölgenin efsanevi tavuk restoranı.",
        detail: "Mekke ve Medine'ye gidenlerin vazgeçilmezidir. Özellikle akşam namazlarından sonra önünde devasa kuyruklar oluşur. Broasted (kızarmış) tavuğu meşhurdur ve fiyat/performans olarak mükemmeldir."
    }
];

const healthData = [
    {
        title: "Eczaneler ve Çalışma Saatleri",
        detail: "Mekke ve Medine'de eczaneler (Arapça: صيدلية - Saydaliye) genellikle 24 saat veya gece geç saatlere kadar açıktır. 'Nahdi' (النهدي) eczaneleri bölgedeki en büyük eczane zinciridir ve otellerin hemen altında şubelerini bulmak mümkündür."
    },
    {
        title: "Sağlık Ocakları (Müstevsaf)",
        detail: "Kâbe ve Mescid-i Nebevî'nin hemen etrafında, hacıların acil durumları için ücretsiz veya çok cüzi miktarlara hizmet veren sağlık klinikleri bulunur. Pasaportunuzla başvurduğunuzda temel muayene ve ilaç yardımı anında yapılır."
    },
    {
        title: "Koruyucu Önlemler",
        detail: "Çok yoğun insan kalabalığı olduğu için klimalı ortamlardan dışarıdaki sıcağa çıkmak hastalıklara yol açabilmektedir. Tavaf esnasında maske kullanmak ve bol C vitamini takviyesi almak yaygın tavsiyelerdendir."
    }
];

const PracticalInfo = () => {
    return (
        <div className="mecca-page practical-page">
            <section className="page-banner practical-banner">
                <div className="banner-bg"></div>
                <div className="container banner-content">
                    <h1 className="animate-slide-up">Pratik Bilgiler</h1>
                    <p className="banner-subtitle animate-slide-up delay-100">
                        Kutsal topraklardaki ziyaretiniz boyunca hayatınızı kolaylaştıracak
                        alışveriş, eczane, yeme-içme ve ulaşım rehberi.
                    </p>
                </div>
            </section>

            <div className="container page-layout">
                <aside className="page-sidebar animate-slide-up delay-200">
                    <div className="sidebar-sticky glass-panel practical-sidebar">
                        <h3 className="sidebar-title">Kategoriler</h3>
                        <ul className="sidebar-nav">
                            <li><a href="#marketler"><ShoppingCart size={16} /> Süpermarket & AVM</a></li>
                            <li><a href="#saglik"><Cross size={16} /> Sağlık & Eczane</a></li>
                            <li><a href="#yeme"><Coffee size={16} /> Yeme & İçme</a></li>
                            <li><a href="#ulasim"><Map size={16} /> Ulaşım & Taksiler</a></li>
                        </ul>
                    </div>
                </aside>

                <main className="page-content animate-slide-up delay-300">

                    <section id="marketler" className="content-section">
                        <div className="section-heading">
                            <ShoppingCart className="section-icon text-primary" size={32} />
                            <h2>Süpermarketler ve Alışveriş Merkezi</h2>
                        </div>
                        <p className="text-muted mb-4">
                            Gündelik ihtiyaçlarınızı, hediyelik eşyalarınızı, ihram takımlarınızı ve atıştırmalıklarınızı
                            temin edebileceğiniz, oteller bölgesine yürüme mesafesindeki en güvenilir noktalar.
                        </p>

                        <div className="grid-2-col pt-3">
                            {shoppingData.map((place, index) => (
                                <DetailCard key={place.id} place={place} theme="primary" index={index} />
                            ))}
                        </div>
                    </section>

                    <hr className="section-divider" />

                    <section id="saglik" className="content-section">
                        <div className="section-heading">
                            <Cross className="section-icon text-secondary" size={32} />
                            <h2>Sağlık, Hastane ve Eczaneler</h2>
                        </div>
                        <p className="text-muted mb-4">Acil bir durumda ilaç, krem veya sağlık desteği almak istediğinizde bilmeniz gerekenler.</p>

                        <Accordion items={healthData} theme="secondary" />
                    </section>

                    <hr className="section-divider" />

                    <section id="ulasim" className="content-section">
                        <div className="section-heading">
                            <Map className="section-icon text-primary" size={32} />
                            <h2>Ulaşım ve Uygulamalar</h2>
                        </div>
                        <div className="grid-2-col">
                            <div className="info-card glass-panel" style={{ borderLeft: '4px solid #10B981' }}>
                                <h4 style={{ marginTop: 0 }}>Uber ve Careem İndirin</h4>
                                <p className="text-muted">Suudi Arabistan'da taksicilerle pazarlık yapmak yorucu olabilir. Türkiye'den gitmeden önce telefonunuza "Uber" veya Arap versiyonu olan "Careem"i kurarsanız fiyatı baştan bilerek rahat edersiniz.</p>
                            </div>
                            <div className="info-card glass-panel" style={{ borderLeft: '4px solid #F59E0B' }}>
                                <h4 style={{ marginTop: 0 }}>Hızlı Tren (Haramain)</h4>
                                <p className="text-muted">Mekke, Medine ve Cidde arasındaki en güvenli ve hızlı ulaşım Haramain Hızlı Treni'dir. Biletleri online olarak gitmeden önce almanız tavsiye edilir.</p>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default PracticalInfo;
