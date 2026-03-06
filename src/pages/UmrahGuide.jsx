import { BookOpen, Scissors, Footprints, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import Timeline from '../components/shared/Timeline';
import Accordion from '../components/shared/Accordion';
import './Mecca.css';
import './UmrahGuide.css';

const umrahSteps = [
    {
        title: "1. Hazırlık ve Mîkāt (İhrama Girme)",
        detail: "Umre yolculuğuna niyet eden kişi, Mîkāt sınırını geçmeden önce hazırlıklarını yapar. Tırnaklar kesilir, boy abdesti (güsül) alınır. Erkekler beden uzuvlarına göre dikilmiş normal kıyafetlerini çıkarıp izar ve rida denilen iki parça ihram örtüsüne bürünürler. Kadınlar normal tesettür kıyafetleriyle kalırlar. Namaza uygun halde olan kimse iki rekât ihram namazı kılar; hayız veya nifas halindeki kadın ise namaz kılmadan niyet edip telbiye ile ihrama girer. Hanefî mezhebinde niyetle birlikte telbiye söylemek ihramın fiilen başlaması için esastır.",
        icon: <AlertCircle size={24} />
    },
    {
        title: "2. Mekke'ye Varış ve Kâbe'yi Ziyaret",
        detail: "Mekke'ye ulaşıldığında eşyalar otele bırakılır ve fazla oyalanmadan, tevazu içinde Mescid-i Haram'a gidilir. Kâbe ilk görüldüğünde kişi huşu ile dua eder; âlimler bu anda çokça dua etmeyi tavsiye etmişlerdir. Tavafa başlanacağı sırada telbiye kesilir ve tavaf için hazırlık yapılır."
    },
    {
        title: "3. Tavaf (Kâbe'nin Etrafında Dönüş)",
        detail: "Tavaf, Hacerü'l-Esved'in bulunduğu hizadan başlar. Kâbe sol tarafa alınarak etrafında 7 kez dönülür. Her bir dönüşe 'Şavt' denir. Hanefî mezhebinde tavafın abdestli yapılması gerekir; abdestsiz tavaf ceza gerektirebilir. Erkekler bu tavafta sağ omuzlarını açarlar (ıztıba) ve ilk 3 şavtta kısa adımlarla canlı yürürler (remel). Tavaf sırasında belirlenmiş özel dualar okunabileceği gibi, kişi içinden geldiği gibi de dua edebilir. Tavaf bitince Makam-ı İbrahim'in arkasında veya Harem'in uygun bir yerinde 2 rekât tavaf namazı kılınır ve zemzem içilir.",
        hadith: "Tavaf, namaz gibidir; ancak onda konuşabilirsiniz. O halde tavafta ancak hayır konuşun."
    },
    {
        title: "4. Sa'y (Safa ile Merve Arasında Yürüyüş)",
        detail: "Tavaftan sonra Safa tepesine gidilir. Safa ile Merve tepeleri arasında 4 gidiş, 3 geliş olmak üzere toplam 7 kez gidip gelinir. Safa'dan Merve'ye gidiş 1, dönüş 2 sayılır. Hanefî mezhebinde sa'y umrenin vaciplerindendir. Erkekler iki yeşil ışık arasında koşar adımlarla yürürler (hervele); kadınlar normal yürüyüşlerini sürdürürler. Sa'y, Hz. Hacer'in oğlu İsmail için su arayışını ve Allah'a tevekkülünü hatırlatır.",
        hadith: "Safa ve Merve Allah’ın nişanelerindendir. (Bakara Suresi 158. Ayet)"
    },
    {
        title: "5. Tıraş Olma ve İhramdan Çıkış",
        detail: "Sa'y tamamlandıktan sonra erkekler saçlarını tamamen kazıtırlar veya başın en az dörtte birinden parmak boğumu kadar kısaltırlar. Kadınlar ise saçlarının ucundan yaklaşık bir parmak boğumu kadar keserler; saçlarını kazıtmazlar. Bu işlemle birlikte umre ibadeti tamamlanmış olur ve ihram yasakları kalkar."
    }
];

const ihramYasaklari = [
    {
        name: "Vücutla İlgili Yasaklar",
        detail: "Saç, sakal veya vücudun herhangi bir yerinden kıl koparmak veya kesmek yasaktır. Tırnak kesmek, koku (parfüm, kokulu sabun) sürünmek yasaktır."
    },
    {
        name: "Giyimle İlgili Hükümler",
        detail: "Erkekler bedenin bir uzvuna göre biçimlendirilmiş kıyafet, iç çamaşırı, çorap, eldiven ve başı örten şeyler giymezler. Ayakta topukların ve ayağın üst-orta kısmının açık kalması gerekir. Kadınlar normal tesettürleriyle kalırlar; ancak ihramda yüzlerine değen peçe veya nikap kullanmaz, yabancı erkekler yanında yüzü değmeyecek şekilde örterler."
    },
    {
        name: "Davranış ve Çevreyle İlgili Yasaklar",
        detail: "Eşler arası cinsel ilişki veya buna zemin hazırlayacak davranışlar yasaktır. Başkalarıyla tartışmak, kavga etmek, kötü söz söylemek (fısk ve cidal) kesinlikle haramdır. Harem bölgesinin bitkilerini koparmak, ağaç kesmek ve av hayvanlarına zarar vermek yasaktır."
    }
];

const UmrahGuide = () => {
    return (
        <div className="mecca-page umrah-page">
            <section className="page-banner umrah-banner">
                <div className="banner-bg umrah-bg"></div>
                <div className="container banner-content">
                    <h1 className="animate-slide-up">Adım Adım Umre Rehberi</h1>
                    <p className="banner-subtitle animate-slide-up delay-100">
                        "Umre, diğer umreye kadar arada işlenen (küçük) günahlara keffârettir." (Hadis-i Şerif)
                    </p>
                </div>
            </section>

            <div className="container page-layout">
                {/* Sidebar */}
                <aside className="page-sidebar animate-slide-up delay-200">
                    <div className="sidebar-sticky glass-panel">
                        <h3 className="sidebar-title">Rehber İçeriği</h3>
                        <ul className="sidebar-nav">
                            <li><a href="#nedir"><BookOpen size={16} /> Umre Nedir?</a></li>
                            <li><a href="#adimlar"><Footprints size={16} /> Adım Adım Umre</a></li>
                            <li><a href="#ihram"><AlertCircle size={16} /> İhram Yasakları</a></li>
                            <li><a href="#tavsiyeler"><CheckCircle2 size={16} /> Önemli Tavsiyeler</a></li>
                        </ul>
                    </div>
                </aside>

                {/* Content */}
                <main className="page-content animate-slide-up delay-300">

                    <section id="nedir" className="content-section">
                        <div className="section-heading">
                            <RefreshCw className="section-icon text-secondary" size={32} />
                            <h2>Umre Nedir?</h2>
                        </div>
                        <div className="info-card glass-panel section-intro mb-4">
                            <p className="lead-text" style={{ margin: 0 }}>
                                Umre, ihrama girerek Kâbe'yi tavaf etmek, Safa ile Merve arasında sa'y yapmak ve tıraş olup ihramdan çıkmaktan ibaret olan bir ibadettir. Hac ibadetinden farklı olarak senenin büyük kısmında yapılabilir.
                                Hanefî mezhebinde umrenin farzları ihram ve tavaf, vacipleri ise sa'y ile tıraş olup ihramdan çıkmaktır. Umre, Zilhicce'nin 9, 10, 11, 12 ve 13. günlerinde yapılırsa sahih olmakla birlikte mekruh tahrîmî kabul edilir.
                            </p>
                        </div>
                    </section>

                    <hr className="section-divider" />

                    <section id="adimlar" className="content-section">
                        <div className="section-heading">
                            <Footprints className="section-icon text-secondary" size={32} />
                            <h2>Adım Adım Umre İbadeti</h2>
                        </div>
                        <p className="text-muted mb-4">Umre ibadetinin baştan sona uygulanış şekli aşağıda sırasiyle verilmiştir. Her adımın kendine has duaları ve usulleri vardır.</p>

                        <Timeline events={umrahSteps} theme="secondary" />
                    </section>

                    <hr className="section-divider" />

                    <section id="ihram" className="content-section">
                        <div className="section-heading">
                            <AlertCircle className="section-icon" style={{ color: '#EF4444' }} size={32} />
                            <h2>İhram Yasakları Nelerdir?</h2>
                        </div>
                        <p className="text-muted mb-4">Mîkāt sınırında niyet edilip ihrama girildiği andan, sa'y bitip tıraş olunana kadar geçen sürede uyulması gereken kesin kurallar vardır. Bu kuralların ihlali ceza (kurban kesimi veya sadaka) gerektirebilir.</p>

                        <Accordion items={ihramYasaklari} theme="danger" />
                    </section>

                    <hr className="section-divider" />

                    <section id="tavsiyeler" className="content-section">
                        <div className="section-heading">
                            <CheckCircle2 className="section-icon text-secondary" size={32} />
                            <h2>Altın Tavsiyeler</h2>
                        </div>
                        <div className="grid-2-col">
                            <div className="tavsiye-card glass-panel">
                                <h4>Rahat Ayakkabılar</h4>
                                <p className="text-muted">Tavaf ve sa'y alanları mermerdir. Ortopedik ve yumuşak tabanlı ürünler kullanın; erkekler için ayağın üst-orta kısmını açık bırakan rahat ihram sandaletleri tercih edilmelidir.</p>
                            </div>
                            <div className="tavsiye-card glass-panel">
                                <h4>Sıcaklara Dikkat</h4>
                                <p className="text-muted">Özellikle öğle saatlerinde güneş altında tavaftan kaçının. Bol bol (ama yudum yudum) zemzem için, vücudunuzu susuz bırakmayın.</p>
                            </div>
                            <div className="tavsiye-card glass-panel">
                                <h4>Dua Listesi Hazırlayın</h4>
                                <p className="text-muted">Heyecandan dualarınızı unutabilirsiniz. Kâbe'yi ilk gördüğünüzde ve tavaf esnasında etmek istediğiniz spesifik duaları önceden bir kağıda yazın.</p>
                            </div>
                            <div className="tavsiye-card glass-panel">
                                <h4>Pişik Önlemi</h4>
                                <p className="text-muted">Erkekler ihramda iç çamaşırı giyemezler. Yürüme mesafesi uzun olduğundan ihrama girmeden önce mutlaka kokusuz pişik kremi / pudra kullanın.</p>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default UmrahGuide;
