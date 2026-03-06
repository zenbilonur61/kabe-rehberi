import { meccaData } from './meccaData';
import { medinaData } from './medinaData';

export const checklistGroups = [
    {
        id: 'before-departure',
        title: 'Yola Çıkmadan Önce',
        description: 'Belgeler, sağlık ve temel hazırlıklarınızı tamamlayın.',
        items: [
            { id: 'passport-copy', label: 'Pasaport, vize, uçuş ve otel belgelerinin dijital ve basılı kopyalarını ayırdım.' },
            { id: 'vaccines-meds', label: 'Kullandığım ilaçları, reçeteleri ve gerekli aşıları kontrol ettim.' },
            { id: 'money-cards', label: 'Banka kartları, nakit ve acil durum bütçesini ayrı yerlere koydum.' },
            { id: 'ihram-kit', label: 'İhram, rahat sandalet, küçük çanta, kokusuz bakım ürünleri ve yedek kıyafet hazır.' },
            { id: 'dua-list', label: 'Umrede okumak istediğim dua ve niyet notlarını kısa bir liste hâlinde hazırladım.' },
        ],
    },
    {
        id: 'miqat',
        title: 'Mikat ve İhram',
        description: 'İhrama giriş ve mikat adımlarını sırasıyla takip edin.',
        items: [
            { id: 'ghusl-ready', label: 'Mikat öncesi gusül veya abdest, tırnak ve temizlik hazırlığını yaptım.' },
            { id: 'ihram-intention', label: 'Niyet ve telbiye ile ihrama girme adımını biliyorum.' },
            { id: 'women-face-cover', label: 'Kadınlar için yüz örtüsüyle ilgili Hanefî ölçüsünü not ettim.' },
            { id: 'forbidden-list', label: 'İhram yasaklarını ve ihlal hâlinde neyin ceza gerektirdiğini okudum.' },
        ],
    },
    {
        id: 'mecca',
        title: 'Mekke Günleri',
        description: 'Tavaf, sa\'y ve Harem yoğunluğunda kolaylık sağlayan adımlar.',
        items: [
            { id: 'wudu-tawaf', label: 'Tavafa abdestli başlamam gerektiğini biliyorum.' },
            { id: 'safe-istilam', label: 'Hacerülesved ve Rükn-i Yemânî uygulamasında başkasına eziyet etmemek ilkesi bende net.' },
            { id: 'sai-count', label: 'Sa\'yin Safa başlangıçlı 7 gidiş-geliş olduğunu ve sayımı nasıl takip edeceğimi not ettim.' },
            { id: 'hair-exit', label: 'İhramdan çıkış için tıraş veya saç kısaltma miktarını biliyorum.' },
            { id: 'hydration-crowd', label: 'Sıcaklık, kalabalık ve dinlenme planımı günün yoğun saatlerine göre ayarladım.' },
        ],
    },
    {
        id: 'medina',
        title: 'Medine Günleri',
        description: 'Ravza, selam ve ziyaret adabını düzenli hâle getirin.',
        items: [
            { id: 'nusuk-check', label: 'Nusuk uygulamasındaki Ravza uygunluk ve saatlerini kontrol ettim.' },
            { id: 'salam-adab', label: 'Peygamber Efendimize selam adabını, ses ve bekleme ölçüsünü biliyorum.' },
            { id: 'baqi-adab', label: 'Kabir ziyaretinde dua, vakar ve tevhid ölçüsünü tekrar ettim.' },
            { id: 'quba-plan', label: 'Kuba, Uhud ve Bâki ziyaretlerini yorgunluk durumuma göre dağıttım.' },
        ],
    },
    {
        id: 'return',
        title: 'Dönüş Öncesi',
        description: 'Son gün telaşını azaltan kısa ama kritik kontroller.',
        items: [
            { id: 'farewell-items', label: 'Otel kasası, pasaport, para ve elektronik eşyalar için son kontrol listesi hazır.' },
            { id: 'gifts-luggage', label: 'Hediye ve zemzem taşıma planımı bagaj sınırına göre yaptım.' },
            { id: 'contacts-shared', label: 'Aileme otel, uçuş ve acil durum iletişim bilgilerimi paylaştım.' },
            { id: 'reflection-notes', label: 'Seyahatten dönüş sonrası için derslerimi ve dualarımı not ettim.' },
        ],
    },
];

export const hanefiNotes = [
    {
        id: 'umrah-structure',
        level: 'Farz / Vacip',
        title: 'Umrenin yapısı',
        summary: 'Hanefî mezhebinde ihram ve tavaf farz; sa\'y ile tıraş olup ihramdan çıkış vaciptir.',
        detail: 'Bu ayrım, eksik yapılan bir adımın sadece "eksik sevap" değil bazen ceza veya iade gerektirebilmesi açısından kritiktir.',
        source: 'el-Hidâye (Menâsik), Reddü\'l-Muhtâr (Kitâbü\'l-Hac)',
    },
    {
        id: 'tawaf-wudu',
        level: 'Vacip Hassasiyeti',
        title: 'Tavafta abdest',
        summary: 'Hanefîlerde tavafın abdestli yapılması gerekir; abdestsiz tavaf ceza gerektirebilir.',
        detail: 'Bu yüzden tavafa başlamadan önce abdestinizi yenilemek, yoğun saatte bozulursa düzenli bir çıkış planı yapmak faydalıdır.',
        source: 'el-Fetaval-Hindiyye, Reddul-Muhtar',
    },
    {
        id: 'rukun-yamani',
        level: 'Sünnete Uygunluk',
        title: 'Rükn-i Yemânî ölçüsü',
        summary: 'İzdiham yoksa dokunulur; öpülmez ve uzaktan işaret edilmez.',
        detail: 'Hacerülesved ile Rükn-i Yemânî aynı şekilde uygulanmaz. Kalabalıkta başkasına eziyet etmemek her şeyin önündedir.',
        source: 'Hanefî menâsik eserleri, klasik tavaf adabı bahsi',
    },
    {
        id: 'women-ihram',
        level: 'Kadınlar İçin',
        title: 'Kadınların ihram kıyafeti',
        summary: 'Kadınlar normal tesettürleriyle kalır; ancak yüzlerine değen peçe veya nikap kullanmazlar.',
        detail: 'Yabancı erkekler yanında örtünme ihtiyacı varsa, yüzün önüne değmeyecek şekilde sarkıtma usulü tercih edilir.',
        source: 'el-Fetâvâ\'l-Hindiyye, Hanefî ihram bahisleri',
    },
    {
        id: 'visit-adab',
        level: 'Adab',
        title: 'Kabir ve Ravza ziyareti',
        summary: 'Selam, dua ve hürmet vardır; ibadetin merkezi yine Allah Teâlâ\'dır.',
        detail: 'Hanefî/Ehli Sünnet çizgide kabir ziyareti dua ve ibret içindir; ses yükseltme, izdiham ve yanlış ulûhiyet dili kullanılmaz.',
        source: 'Mâtürîdî-Ehli Sünnet adab literatürü, klasik ziyaret bahisleri',
    },
    {
        id: 'makruh-days',
        level: 'Mekruh',
        title: 'Umrenin mekruh günleri',
        summary: 'Zilhiccenin 9-13. günleri arasında umre yapmak Hanefîlerde mekruh tahrîmen kabul edilir.',
        detail: 'Planlama yaparken uçuş veya aktarım yüzünden bu günlere denk geliyorsa, rehber veya âlim görüşüyle hareket etmek daha emniyetlidir.',
        source: 'Hanefî fıkıh kitapları, menâsik bölümü',
    },
];

export const commonMistakes = [
    {
        id: 'crowd-harm',
        title: 'İzdihamda başkasına zarar vermek',
        risk: 'Yüksek',
        correction: 'Sünneti yaşatmak için insanları itmek değil, eziyet vermeden ibadet etmek esastır.',
    },
    {
        id: 'ritual-count',
        title: 'Sa\'y veya tavaf sayısını karıştırmak',
        risk: 'Yüksek',
        correction: 'Her şavtta kısa not tutmak, bileklik veya telefon notu kullanmak karışıklık riskini azaltır.',
    },
    {
        id: 'late-hydration',
        title: 'Sıcakta su ve dinlenmeyi geciktirmek',
        risk: 'Orta',
        correction: 'İbadeti günün serin saatlerine yaymak ve kısa mola planlamak uzun vadede daha verimlidir.',
    },
    {
        id: 'ravza-rush',
        title: 'Ravza ziyaretini tek hedef haline getirmek',
        risk: 'Orta',
        correction: 'Ravza büyük nimet olsa da Mescid-i Nebevî adabı, selam ve genel ibadet de yolculuğun merkezindedir.',
    },
    {
        id: 'grave-language',
        title: 'Kabir ziyaretinde yanlış hitaplar kullanmak',
        risk: 'Yüksek',
        correction: "Dua Allah'a edilir; Peygamber Efendimize ve salihlere selam ve hürmetle yaklaşılır.",
    },
    {
        id: 'shoe-plan',
        title: 'Ayakkabı ve çıkış noktasını plansız bırakmak',
        risk: 'Düşük ama çok yaygın',
        correction: 'Kapınızı, raftaki konumu ve toplama noktasını kısa not edin; bu yorgunlukta büyük kolaylık sağlar.',
    },
];

export const emergencyNumbers = [
    {
        label: 'Sağlık danışma ve acil sağlık hattı',
        number: '937',
        note: 'Bakanlık sağlık hattıdır; sağlık soruları ve acil yönlendirme için kullanılır.',
    },
    {
        label: 'Birleşik acil hat (Mekke, Riyad, Doğu Bölgesi)',
        number: '911',
        note: 'Güvenlik ve çoklu acil durum yönlendirmesi için kullanılır.',
    },
    {
        label: 'Sivil savunma / yangın (diğer bölgelerde)',
        number: '998',
        note: 'Mekke dışındaki bazı bölgelerde ayrı acil hat olarak geçer; yerel otel yönlendirmesini de kontrol edin.',
    },
];

export const emergencyPhrases = [
    {
        tr: 'Kayboldum, otelime dönmem gerekiyor.',
        ar: 'Ana daeit, wa ahtaj an arji ila funduqi.',
        arabic: 'أنا ضائع، وأحتاج أن أرجع إلى فندقي.',
    },
    {
        tr: 'Grubumdan ayrıldım.',
        ar: 'Infasaltu an majmuati.',
        arabic: 'انفصلت عن مجموعتي.',
    },
    {
        tr: 'Acil doktora ihtiyacım var.',
        ar: 'Ahtaj ila tabib bifawri.',
        arabic: 'أحتاج إلى طبيب فورًا.',
    },
    {
        tr: 'Bu benim otel kartım ve oda numaram.',
        ar: 'Hadhihi bitaqat funduqi wa raqm ghurfati.',
        arabic: 'هذه بطاقة فندقي ورقم غرفتي.',
    },
];

export const sourceTransparency = {
    lastUpdated: '6 Mart 2026',
    editorialPolicy: [
        'İbadet adımlarında Hanefî mezhebi ve Ehli Sünnet çizgisi esas alınır.',
        'İhtilaflı meselelerde kesin hüküm dili yerine açıklayıcı ve ihtiyatlı dil kullanılır.',
        'Tarihî veya operasyonel bilgiler ile fıkhî hükümler birbirinden ayrılır.',
        'Zamanla değişebilecek resmî uygulamalar için kullanıcıya güncel resmî kanalları kontrol etme notu eklenir.',
    ],
    references: [
        'Klasik Hanefî kaynakları: el-Hidaye, Reddü\'l-Muhtar, el-Fetâva\'l-Hindiyye',
        'Güncel operasyonel kaynaklar: Nusuk, Suudi sağlık ve güvenlik duyuruları',
        'Sağlık ve acil hat notları: Saudi Ministry of Health ve Civil Defense açıklamaları',
    ],
};

const rawdaPart = medinaData.mescid.parts.find((part) => part.name === 'Ravza-i Mutahhara');

export const plannerPaceOptions = {
    rahat: {
        label: 'Rahat',
        capacity: 3.6,
        description: 'Tek ana rota, uzun mola ve daha az yürüme odaklıdır.',
        dayNote: 'Aynı güne tek ana rota koyun; serin saatlerde çıkış yapıp otel molasını uzun tutun.',
    },
    normal: {
        label: 'Normal',
        capacity: 5.2,
        description: 'İbadet ile ziyaretleri dengeli şekilde birleştirir.',
        dayNote: 'Bir ana rota ile yakın durakları aynı güne koyabilirsiniz; kalabalık ve sıcak saatlerde mola verin.',
    },
    yorucu: {
        label: 'Yorucu',
        capacity: 6.8,
        description: 'Farz ibadetlerden sonra daha fazla dinî ve tarihî nokta görmeyi hedefler.',
        dayNote: 'Erken saatlerde ardı ardına dinî ziyaret yapabilirsiniz; su, ulaşım ve dönüş planını önceden netleştirin.',
    },
};

const meccaPlannerMeta = {
    'harem-core': {
        priority: 100,
        importance: 'Zaruri',
        effort: 'Orta',
        duration: 'Esnek',
        visitNote: 'Her günün ana omurgası olarak tutulmalı.',
    },
    mualla: {
        priority: 92,
        importance: 'Çok yüksek',
        effort: 'Düşük',
        duration: '45-60 dk',
        visitNote: 'Harem merkezine yakın olduğu için kısa ama önemli bir ziyarettir.',
    },
    arafat: {
        priority: 90,
        importance: 'Çok yüksek',
        effort: 'Orta',
        duration: '2-3 saat',
        visitNote: 'Mina ile aynı rota üzerinde planlamak en makul seçenektir.',
    },
    mina: {
        priority: 84,
        importance: 'Yüksek',
        effort: 'Orta',
        duration: '1-2 saat',
        visitNote: 'Arafat rotasına eklenince gün daha verimli olur.',
    },
    hudaybiyyah: {
        priority: 82,
        importance: 'Yüksek',
        effort: 'Orta',
        duration: '60-90 dk',
        visitNote: 'Araçla gidilen kısa ama tarihsel olarak çok güçlü bir duraktır.',
    },
    birthplace: {
        priority: 80,
        importance: 'Yüksek',
        effort: 'Düşük',
        duration: '20-30 dk',
        visitNote: 'Merkez bölge gezisine eklenmesi en doğru yoldur.',
    },
    jinn_mosque: {
        priority: 78,
        importance: 'Yüksek',
        effort: 'Düşük',
        duration: '20-30 dk',
        visitNote: 'Cennetü\'l Muallâ ile aynı hatta ziyaret edilebilir.',
    },
    hira: {
        priority: 74,
        importance: 'Orta',
        effort: 'Yüksek',
        duration: '3-4 saat',
        visitNote: 'Yüksek efor ister; gün yetmiyorsa önce diğer ana duraklar tamamlanmalı.',
    },
    shajara_mosque: {
        priority: 72,
        importance: 'Orta',
        effort: 'Düşük',
        duration: '15-20 dk',
        visitNote: 'Mescid-i Cin yakınında olduğu için aynı blokta mantıklıdır.',
    },
    sevr: {
        priority: 64,
        importance: 'Vakit kalırsa',
        effort: 'Yüksek',
        duration: '3-4 saat',
        visitNote: 'Yorucu tırmanış sebebiyle ancak yeterli gün ve enerji varsa düşünülmelidir.',
    },
};

const medinaPlannerMeta = {
    'nebevi-core': {
        priority: 100,
        importance: 'Zaruri',
        effort: 'Düşük',
        duration: 'Esnek',
        visitNote: 'Her günün ana ekseni Mescid-i Nebevî olmalı.',
    },
    rawda: {
        priority: 96,
        importance: 'Çok yüksek',
        effort: 'Düşük',
        duration: '30-60 dk',
        visitNote: 'Nusuk uygunluğuna göre esnek planlanmalı.',
    },
    baqi: {
        priority: 94,
        importance: 'Çok yüksek',
        effort: 'Düşük',
        duration: '30-45 dk',
        visitNote: 'Ravza veya selam sonrası en mantıklı yakın duraktır.',
    },
    quba: {
        priority: 91,
        importance: 'Çok yüksek',
        effort: 'Orta',
        duration: '60-90 dk',
        visitNote: 'Kıbleteyn ve Hendek ile bir rota hâlinde kolayca birleşir.',
    },
    uhud_mountain: {
        priority: 88,
        importance: 'Yüksek',
        effort: 'Orta',
        duration: '90-120 dk',
        visitNote: 'Okçular Tepesi ile aynı sahada ele alınmalı.',
    },
    qiblatayn: {
        priority: 82,
        importance: 'Yüksek',
        effort: 'Düşük',
        duration: '30-45 dk',
        visitNote: 'Kuba ve Hendek hattına eklemek verimlidir.',
    },
    rumat_hill: {
        priority: 78,
        importance: 'Yüksek',
        effort: 'Orta',
        duration: '30-45 dk',
        visitNote: 'Uhud sahasını anlamlı kılan tamamlayıcı duraklardan biridir.',
    },
    khandaq: {
        priority: 74,
        importance: 'Orta',
        effort: 'Düşük',
        duration: '30-45 dk',
        visitNote: 'Araçlı şehir rotasına rahatça eklenebilir.',
    },
    kubbetus_senaya: {
        priority: 69,
        importance: 'Tamamlayıcı',
        effort: 'Düşük',
        duration: '15-20 dk',
        visitNote: 'Uhud bölgesi ziyaretinde kısa bir durak olarak anlam kazanır.',
    },
    ghar_uhud: {
        priority: 60,
        importance: 'Vakit kalırsa',
        effort: 'Yüksek',
        duration: '2-3 saat',
        visitNote: 'Zorlayıcı çıkış sebebiyle ancak yeterli gün ve kondisyon varsa seçilmeli.',
    },
};

const buildPlannerCatalog = (manualPlaces, sourcePlaces, meta) => (
    [...manualPlaces, ...sourcePlaces.map((place) => ({
        ...place,
        ...meta[place.id],
    }))]
        .sort((left, right) => right.priority - left.priority)
);

export const plannerPlaces = {
    mecca: buildPlannerCatalog(
        [
            {
                id: 'harem-core',
                name: 'Mescid-i Haram ve Kâbe',
                description: 'Umre, tavaf, dua, zemzem ve Harem merkezli ibadet blokları.',
                mapLink: 'https://www.google.com/maps/search/?api=1&query=Masjid+al+Haram+Makkah',
                ...meccaPlannerMeta['harem-core'],
            },
        ],
        meccaData.places,
        meccaPlannerMeta
    ),
    medina: buildPlannerCatalog(
        [
            {
                id: 'nebevi-core',
                name: 'Mescid-i Nebevî ve selam',
                description: 'Farz namazlar, hücre-i saadete selam, salavat ve sakin mescid adabı.',
                mapLink: 'https://www.google.com/maps/search/?api=1&query=Al+Masjid+an+Nabawi+Medina',
                ...medinaPlannerMeta['nebevi-core'],
            },
            {
                id: 'rawda',
                name: 'Ravza-i Mutahhara',
                description: rawdaPart?.detail || 'Nusuk uygunluğuna göre planlanan, Mescid-i Nebevî içindeki çok kıymetli ziyaret alanı.',
                mapLink: 'https://www.google.com/maps/search/?api=1&query=Rawdah+Al+Sharifah+Medina',
                ...medinaPlannerMeta.rawda,
            },
        ],
        medinaData.places,
        medinaPlannerMeta
    ),
};

export const plannerRouteTemplates = {
    mecca: [
        {
            id: 'mecca-haram',
            title: 'Harem merkezli ibadet',
            description: 'Farz namazlar, umre veya tavaf, zemzem ve dua bloklarıyla günün ana omurgası.',
            placeIds: ['harem-core'],
            priority: 100,
            load: 3.2,
            required: true,
            bestWindow: 'Serin saatler',
            caution: 'Kalabalık saatlerde aynı güne uzak ziyaret eklemeyin.',
            minimumDays: { rahat: 1, normal: 1, yorucu: 1 },
        },
        {
            id: 'mecca-city-core',
            title: 'Merkez ziyaretleri',
            description: 'Cennetü\'l Muallâ eksenli, yürüyerek veya kısa araç geçişiyle tamamlanabilen merkez durakları.',
            placeIds: ['mualla', 'jinn_mosque', 'shajara_mosque', 'birthplace'],
            priority: 88,
            load: 2.4,
            bestWindow: 'Sabah sonrası',
            caution: 'Merkez sokaklarda kalabalık saatlerde kısa tutulması daha rahattır.',
            minimumDays: { rahat: 2, normal: 2, yorucu: 1 },
        },
        {
            id: 'mecca-hajj-sites',
            title: 'Arafat ve Mina hattı',
            description: 'Hac menasik alanlarını aynı gün görmeyi hedefleyen araçlı rota.',
            placeIds: ['arafat', 'mina'],
            priority: 87,
            load: 2.6,
            bestWindow: 'Sabah erken',
            caution: 'Uzak mesafe sebebiyle sıcak saatlere kalmadan dönmek daha makuldür.',
            minimumDays: { rahat: 2, normal: 2, yorucu: 2 },
        },
        {
            id: 'mecca-hudaybiyyah',
            title: 'Hudeybiye ziyareti',
            description: 'Barış antlaşması ve Rıdvan Biatı eksenindeki kısa ama çok anlamlı rota.',
            placeIds: ['hudaybiyyah'],
            priority: 80,
            load: 1.7,
            bestWindow: 'İkindi öncesi',
            caution: 'Aynı günde Harem yoğunluğu varsa kısa tutulması daha uygundur.',
            minimumDays: { rahat: 3, normal: 2, yorucu: 2 },
        },
        {
            id: 'mecca-hira',
            title: 'Nur Dağı ve Hira',
            description: 'İlk vahiy noktasını görmek için fiziksel güç isteyen tırmanış rotası.',
            placeIds: ['hira'],
            priority: 72,
            load: 3.1,
            bestWindow: 'Güneş doğmadan önce',
            caution: 'Kayalık ve yorucu çıkıştır; sıcaklık artmadan iniş planlayın.',
            minimumDays: { rahat: 5, normal: 4, yorucu: 3 },
        },
        {
            id: 'mecca-sevr',
            title: 'Sevr Dağı',
            description: 'Hicret hatırası için ayrılan, kondisyon isteyen ek rota.',
            placeIds: ['sevr'],
            priority: 64,
            load: 3.0,
            bestWindow: 'Çok erken saat',
            caution: 'Dik ve taşlık yapı sebebiyle yetersiz enerjide plana eklenmemeli.',
            minimumDays: { rahat: 6, normal: 5, yorucu: 4 },
        },
    ],
    medina: [
        {
            id: 'medina-nebevi',
            title: 'Mescid-i Nebevî merkezli gün',
            description: 'Farz namazlar, selam, salavat ve sakin ibadet bloklarıyla Medine ritmini oturtur.',
            placeIds: ['nebevi-core'],
            priority: 100,
            load: 2.8,
            required: true,
            bestWindow: 'Tüm gün',
            caution: 'Mescid akışını öğrenmeden aynı güne çok uzak rota yığmayın.',
            minimumDays: { rahat: 1, normal: 1, yorucu: 1 },
        },
        {
            id: 'medina-rawda-baqi',
            title: 'Ravza ve Bâki',
            description: 'Nusuk uygunluğu varsa Ravza, ardından Bâki ve selam adabı merkezli yakın rota.',
            placeIds: ['rawda', 'baqi'],
            priority: 94,
            load: 2.3,
            bestWindow: 'Nusuk saatine göre',
            caution: 'Ravza saati değişirse bu blok diğer günle yer değiştirilebilir.',
            minimumDays: { rahat: 2, normal: 1, yorucu: 1 },
        },
        {
            id: 'medina-quba-route',
            title: 'Kuba, Kıbleteyn ve Hendek',
            description: 'Araçla rahatça birbirine bağlanan Medine şehir rotası.',
            placeIds: ['quba', 'qiblatayn', 'khandaq'],
            priority: 86,
            load: 2.8,
            bestWindow: 'Sabah',
            caution: 'Tek seferde gezi aracıyla yapmak zaman kazandırır.',
            minimumDays: { rahat: 2, normal: 2, yorucu: 1 },
        },
        {
            id: 'medina-uhud-route',
            title: 'Uhud sahası',
            description: 'Uhud, Okçular Tepesi ve ilgili yakın durakları aynı hatta toplar.',
            placeIds: ['uhud_mountain', 'rumat_hill', 'kubbetus_senaya'],
            priority: 84,
            load: 2.9,
            bestWindow: 'Sabah erken',
            caution: 'Alanda yürüme olduğu için sıcak saatlerden önce tamamlamak gerekir.',
            minimumDays: { rahat: 3, normal: 2, yorucu: 2 },
        },
        {
            id: 'medina-uhud-cave',
            title: 'Gâr-ı Uhud tırmanışı',
            description: 'Yeterli enerji varsa Uhud bölgesine eklenebilecek zorlayıcı tırmanış.',
            placeIds: ['ghar_uhud'],
            priority: 60,
            load: 2.6,
            bestWindow: 'Günün ilk saatleri',
            caution: 'Tırmanış gerektirdiği için diğer Uhud rotalarından ayrıca değerlendirilmelidir.',
            minimumDays: { rahat: 5, normal: 4, yorucu: 3 },
        },
    ],
};
