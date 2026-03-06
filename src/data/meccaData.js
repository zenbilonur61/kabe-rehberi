export const meccaData = {
    kabe: {
        title: "Kâbe-i Muazzama",
        description: "Yeryüzünde Allah'a ibadet etmek için yapılan ilk mabet; İslam aleminin kıblesi.",
        history: [
            {
                period: "Hz. Adem Dönemi",
                title: "İlk İnşa",
                detail: "Bazı rivayetlerde, yeryüzündeki ilk mabedin Hz. Adem devrinde veya onun gösterildiği yerde kurulduğu zikredilir. Kur'an'da açık olarak sabit olan ise temellerinin Hz. İbrahim ve Hz. İsmail tarafından yeniden yükseltilmesidir."
            },
            {
                period: "M.Ö. 2000'ler",
                title: "Hz. İbrahim ve Hz. İsmail",
                detail: "Nuh Tufanı sonrası kaybolan temelleri Allah'ın emriyle Hz. İbrahim ve oğlu Hz. İsmail tarafından bulunup yeniden inşa edilmiştir."
            },
            {
                period: "M.S. 605",
                title: "Kureyş'in Yenilemesi",
                detail: "Kâbe'nin yangın ve selden hasar görmesi üzerine Kureyş kabilesi tarafından yeniden inşası. Hacerül Esved'in konulması sırasındaki anlaşmazlık, 35 yaşındaki 'Muhammed'ül Emin' (SAV) tarafından hakemliğiyle çözülmüştür."
            },
            {
                period: "M.S. 683 & 692",
                title: "Emeviler Dönemi",
                detail: "Abdullah bin Zübeyr döneminde tamamen yıkılıp Hz. İbrahim'in temelleri üzerine (Hatim dahil edilerek) yapıldı. Haccac zaliminin kuşatmasında yıkılınca eski yarı kübik haline döndürüldü."
            },
            {
                period: "M.S. 1630",
                title: "Osmanlı Dönemi",
                detail: "Sultan IV. Murad döneminde meydana gelen şiddetli sel felaketinden sonra Kâbe büyük bir onarım görmüş ve günümüze kadar ulaşan sağlam yapısına kavuşmuştur."
            }
        ],
        parts: [
            {
                name: "Hacerül Esved",
                meaning: "Siyah Taş",
                detail: "Tavafın başlama ve bitiş noktasıdır. Cennetten indiğinde bembeyaz olduğu, insanların günahlarıyla karardığı rivayet edilir. Gümüş bir mahfaza içindedir. Kalabalıkta başkalarına eziyet vermeden uzaktan istilam etmek esastır."
            },
            {
                name: "Mültezem",
                meaning: "Sıkıca Sarılınan Yer",
                detail: "Hacerül Esved ile Kâbe'nin kapısı arasında kalan yaklaşık 2 metrelik kısımdır. Duaların reddedilmeyip kabul olunduğu en mübarek makamlardandır."
            },
            {
                name: "Hatîm (Hicr-i İsmail)",
                meaning: "İsmail'in Odası",
                detail: "Kâbe'nin rükn-i şami ve rükn-i iraki köşeleri arasındaki dış duvarla çevrili yarım ay şeklindeki alandır. Aslen Kâbe'nin içinden sayılır. Hz. İsmail ve Hz. Hacer'in kabirlerinin burada olduğuna dair rivayetler vardır."
            },
            {
                name: "Makam-ı İbrahim",
                meaning: "İbrahim'in Makamı",
                detail: "Hz. İbrahim'in Kâbe'yi inşa ederken iskele olarak kullandığı, üzerinde ayak izinin bulunduğu taştır. Cam bir mahfaza içinde Kâbe'nin karşısında bulunur."
            },
            {
                name: "Mîzab-ı Kâbe",
                meaning: "Altın Oluk",
                detail: "Kâbe çatısında biriken yağmur sularının Hatim alanına aktığı kanaldır. Altından yapılmıştır ve rahmet sembolüdür."
            },
            {
                name: "Rükn-i Yemânî",
                meaning: "Yemen Köşesi",
                detail: "Kâbe'nin Hacerül Esved'den bir önceki köşesidir. Tavaf sırasında izdiham yoksa sağ elle dokunmak müstehaptır. Hanefî mezhebinde burası öpülmez ve uzaktan işaret edilmez."
            }
        ],
        hadiths: [
            "Kim bu Beyt'i hacceder de kötü söz söylemez ve günah işlemezse, annesinden doğduğu günkü gibi döner.",
            "Tavaf, namaz gibidir; ancak onda konuşabilirsiniz. O halde tavafta ancak hayır konuşun."
        ],
        coordinates: [21.4225, 39.8262]
    },
    places: [
        {
            id: "hira",
            name: "Hira Mağarası (Nur Dağı)",
            description: "İlk vahyin geldiği eşsiz mekan.",
            detail: "Mekke'ye 5 km uzaklıktaki Nur Dağı'ndadır. Hz. Muhammed (SAV) peygamberlik öncesi burada inzivaya çekilirdi. 610 yılı Ramazan ayında Kadir Gecesi'nde Cebrail (AS) ilk vahiy olan 'İkra' (Oku) emrini burada getirmiştir.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Hira+Cave+Makkah",
            practicalInfo: "Zirveye tırmanış yaklaşık 1 - 1.5 saat sürmektedir. Kayalık ve dik olduğundan fiziksel zorluk içerir. Yanınıza bol su almanız elzemdir.",
            coordinates: [21.4578, 39.8594]
        },
        {
            id: "sevr",
            name: "Sevr Mağarası",
            description: "Hicret yolculuğunun en kritik sığınağı.",
            detail: "Mekke'nin güneyinde yer alır. Peygamber Efendimiz (SAV) ile Hz. Ebubekir (RA), 622 yılındaki Medine'ye hicretleri sırasında müşriklerden gizlenmek için burada 3 gün 3 gece kalmışlardır. 'Üzülme, şüphesiz Allah bizimledir' ayeti burada inmiştir.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Mount+Thawr+Makkah",
            hadith: "Üçüncüleri Allah olan iki kişiye ne sanırsın? La tahzen innallahe meana (Üzülme, Allah bizimledir).",
            coordinates: [21.3787, 39.8291]
        },
        {
            id: "arafat",
            name: "Arafat Dağı (Cebel-i Rahme)",
            description: "Haccın en önemli rüknü olan vakfenin yapıldığı yer.",
            detail: "Mekke'nin 21 km doğusunda yer alır. Hz. Adem ile Hz. Havva'nın cennetten yeryüzüne indirildikten sonra buluştukları yer olduğuna inanılır. Peygamberimiz Veda Hutbesi'ni burada, Rahmet Dağı'nda okumuştur.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Mount+Arafat+Makkah",
            hadith: "Hac Arafat'tır.",
            coordinates: [21.3547, 39.9841]
        },
        {
            id: "mualla",
            name: "Cennet'ül Mualla",
            description: "Mekke'nin en eski ve kutsal kabristanı.",
            detail: "Harem-i Şerif'e 2 km uzaklıktadır. Peygamber Efendimiz'in en büyük destekçisi ve can yoldaşı eşi Hz. Hatice validemiz, dedesi Abdulmuttalip, amcası Ebu Talip ve atası Haşim burada medfundur.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Jannatul+Mualla+Cemetery+Makkah",
            coordinates: [21.4365, 39.8296]
        },
        {
            id: "mina",
            name: "Mina",
            description: "Şeytan taşlama ve kurban kesme mahalli.",
            detail: "Mekke ile Müzdelife arasındadır. Hacılar Kurban Bayramı günlerini burada çadırlarda geçirir, Cemrelere (şeytan taşlama noktaları) taş atar ve kurban keserler. Akabe Biatları'nın yeminleştiği yer de buradadır.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Mina+Makkah",
            coordinates: [21.4140, 39.8931]
        },
        {
            id: "birthplace",
            name: "Mevlid-i Nebi (Peygamberimizin Doğduğu Ev)",
            description: "Kainatın Efendisi'nin (SAV) dünyaya teşrif ettiği kutlu mekân.",
            detail: "Mescid-i Haram'ın doğusunda, Şib-i Ebi Talip (Ebu Talip Mahallesi) bölgesindedir. Peygamber Efendimiz'in doğduğu yer olarak meşhur kabul edilen mekândır. Doğum yılı Fil Vakası'nın gerçekleştiği yıl olarak bilinir; gün ve tarih hakkında ise farklı rivayetler nakledilmiştir. Günümüzde üzerine Mekke kütüphanesi yapılmıştır.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Birthplace+of+Muhammad+Makkah",
            coordinates: [21.4253, 39.8294]
        },
        {
            id: "jinn_mosque",
            name: "Mescid-i Cin",
            description: "Cinlerin Kur'an dinleyip Müslüman oldukları mekan.",
            detail: "Cennet'ül Mualla kabristanının yakınındadır. Peygamber Efendimiz (SAV) burada namaz kıldırıp Kur'an okurken, Nusaybin cinlerinden bir grup dinlemiş ve Müslüman olmuştur. Cin Suresi'nin indiği ve bu olayın yaşandığı yere inşa edilen tarihi bir mesciddir.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Masjid+al-Jinn+Makkah",
            coordinates: [21.4328, 39.8268]
        },
        {
            id: "shajara_mosque",
            name: "Mescid-i Şecere (Ağaç Mescidi)",
            description: "Peygamberimizin mucizesine tanıklık eden ağacın yeri.",
            detail: "Mescid-i Cin'in hemen karşısındadır. Peygamber Efendimiz (SAV), cinlerin Müslüman olduğu gece onlara nübüvvetini kanıtlamak için bir ağacı yanına çağırmış, ağaç yeri yara yara gelip selam vermiş ve tekrar yerine dönmüştür. Bu ağacın bulunduğu yere yapılan mescittir.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Masjid+Shajarah+Makkah",
            hadith: "Ben Allah'ın Resulü olduğuma dair neye şahit tutayım? - Bu ağaca! - dedi ve ağaç yeri yararak geldi.",
            coordinates: [21.4332, 39.8266]
        },
        {
            id: "hudaybiyyah",
            name: "Hudeybiye (Şümaysi)",
            description: "Bey'at-ı Rıdvan'ın yapıldığı ve barış antlaşmasının imzalandığı yer.",
            detail: "Mekke'nin batısında, Harem sınırının hemen dışında yer alır. 628 yılında Müslümanlar umre için geldiklerinde müşrikler izin vermemiş, burada ağaç altında (Kuran'da övülen) Rıdvan Biatı yapılmış ve umre iptal edilse de büyük diplomatik zafer olan Hudeybiye Antlaşması imzalanmıştır.",
            mapLink: "https://www.google.com/maps/search/?api=1&query=Al+Hudaibiyah+Makkah",
            coordinates: [21.4649, 39.6154]
        }
    ],
    events: [
        {
            title: "Fil Vakası",
            year: "570 M.S. (Peygamberimizin doğduğu yıl)",
            description: "Yemen Valisi Ebrehe'nin Kâbe'yi yıkmak için fillerden oluşan büyük bir kızıl orduyla Mekke'ye yürümesi. Ebabil kuşlarının attığı pişkin tuğladan taşlarla ordunun helak olması olayıdır. Fil Suresi bu olayı anlatır."
        },
        {
            title: "Mekke'nin Fethi",
            year: "11 Ocak 630 (Hicri 8)",
            description: "Hudeybiye Antlaşması'nın bozulması üzerine İslam ordusunun kan dökmeden Mekke'yi fethetmesi. Peygamber Efendimiz (SAV) Kâbe'deki 360 putu kendi elleriyle devirmiş ve Kâbe'yi putlardan temizlemiştir. Mekkeliler için genel af ilan edilmiştir."
        },
        {
            title: "Hudeybiye Antlaşması",
            year: "628 M.S.",
            description: "Müslümanların umre yapmak için Mekke'ye gelirken müşrikler tarafından durdurulup yapılan antlaşma. Görünüşte Müslümanların aleyhine gibi dursa da, Kuran'da 'Apaçık bir fetih' olarak müjdelenmiş ve İslam'ın Arap yarımadasında yayılmasını hızlandırmıştır."
        }
    ]
};
