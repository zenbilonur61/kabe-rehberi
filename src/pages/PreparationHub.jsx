import { useEffect, useMemo, useState } from 'react';
import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    ClipboardCheck,
    Copy,
    Database,
    ListChecks,
    Phone,
    Route,
    ShieldCheck,
    TriangleAlert,
    Wifi,
} from 'lucide-react';
import {
    checklistGroups,
    commonMistakes,
    emergencyNumbers,
    emergencyPhrases,
    hanefiNotes,
    plannerPaceOptions,
    plannerPlaces,
    plannerRouteTemplates,
    sourceTransparency,
} from '../data/preparationData';
import './Mecca.css';
import './PreparationHub.css';

const CHECKLIST_STORAGE_KEY = 'kabe-rehberi.checklist.v1';
const PLANNER_STORAGE_KEY = 'kabe-rehberi.planner.v1';
const EMERGENCY_STORAGE_KEY = 'kabe-rehberi.emergency.v1';

const defaultPlanner = {
    meccaDays: 4,
    medinaDays: 3,
    pace: 'normal',
};

const defaultEmergencyCard = {
    hotelName: '',
    roomNumber: '',
    groupLeader: '',
    leaderPhone: '',
    meetingPoint: '',
    notes: '',
};

const readStoredJson = (key, fallback) => {
    if (typeof window === 'undefined') {
        return fallback;
    }

    try {
        const rawValue = window.localStorage.getItem(key);

        if (!rawValue) {
            return fallback;
        }

        return {
            ...fallback,
            ...JSON.parse(rawValue),
        };
    } catch {
        return fallback;
    }
};

const readStoredChecklist = () => {
    if (typeof window === 'undefined') {
        return {};
    }

    try {
        return JSON.parse(window.localStorage.getItem(CHECKLIST_STORAGE_KEY) || '{}');
    } catch {
        return {};
    }
};

const legacyPaceMap = {
    hafif: 'rahat',
    dengeli: 'normal',
    yogun: 'yorucu',
};

const plannerCityMeta = {
    mecca: {
        label: 'Mekke',
        accent: 'secondary',
        dailyWorship: 'Farz namazlar ve ana ibadet blokları Harem merkezli tutulmalı.',
        arrivalNote: 'İlk gün kapılar, buluşma noktası ve zemzem alanları sakin şekilde öğrenilmeli.',
        departureNote: 'Son gün bagaj, zemzem ve otel çıkışı ibadetten ayrı zaman dilimine koyulmalı.',
        emptyDay: 'Bu günü Harem odaklı ibadet, istirahat ve eksik kalan tavaf/dua bloklarına ayırın.',
    },
    medina: {
        label: 'Medine',
        accent: 'primary',
        dailyWorship: 'Farz namazlar Mescid-i Nebevî merkezli planlanmalı; selam ve vakar korunmalı.',
        arrivalNote: 'İlk gün selam adabı, kapılar ve toplama noktası sakin şekilde öğrenilmeli.',
        departureNote: 'Dönüş günü Nusuk, transfer ve buluşma saati önceden netleştirilmeli.',
        emptyDay: 'Bu günü Mescid-i Nebevî merkezli sakin ibadet, salavat ve Kur\'an ile geçirin.',
    },
};

const buildPlaceLookup = (places) => Object.fromEntries(places.map((place) => [place.id, place]));

const plannerPlaceLookup = {
    mecca: buildPlaceLookup(plannerPlaces.mecca),
    medina: buildPlaceLookup(plannerPlaces.medina),
};

const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

const normalizeDayValue = (value, fallback, min, max) => {
    const numericValue = Number(value);

    return Number.isFinite(numericValue)
        ? clampValue(numericValue, min, max)
        : fallback;
};

const normalizePlanner = (storedPlanner) => {
    const paceValue = legacyPaceMap[storedPlanner?.pace] || storedPlanner?.pace;

    return {
        meccaDays: normalizeDayValue(storedPlanner?.meccaDays, defaultPlanner.meccaDays, 1, 15),
        medinaDays: normalizeDayValue(storedPlanner?.medinaDays, defaultPlanner.medinaDays, 0, 15),
        pace: plannerPaceOptions[paceValue] ? paceValue : defaultPlanner.pace,
    };
};

const getPaceMeta = (pace) => plannerPaceOptions[pace] || plannerPaceOptions.normal;

const collectPlaceIds = (routes) => Array.from(new Set(routes.flatMap((route) => route.placeIds)));

const resolveRoute = (city, route) => ({
    ...route,
    places: route.placeIds.map((placeId) => plannerPlaceLookup[city][placeId]).filter(Boolean),
});

const getIntensityLabel = (load, capacity) => {
    if (!load) {
        return 'İbadet ve mola';
    }

    const ratio = load / capacity;

    if (ratio < 0.45) {
        return 'Rahat akış';
    }

    if (ratio < 0.85) {
        return 'Dengeli akış';
    }

    return 'Yoğun akış';
};

const buildDayNotes = ({ city, dayNumber, dayCount, pace, hasRoutes }) => {
    const cityMeta = plannerCityMeta[city];
    const notes = [cityMeta.dailyWorship, getPaceMeta(pace).dayNote];

    if (dayNumber === 1) {
        notes.push(cityMeta.arrivalNote);
    }

    if (dayNumber === dayCount) {
        notes.push(cityMeta.departureNote);
    }

    if (!hasRoutes) {
        notes.push(cityMeta.emptyDay);
    }

    return [...new Set(notes)];
};

const distributeRoutesToDays = (routes, dayCount, pace) => {
    const dayBuckets = Array.from({ length: dayCount }, () => ({
        routes: [],
        load: 0,
    }));

    if (!routes.length || dayCount <= 0) {
        return dayBuckets;
    }

    const paceMeta = getPaceMeta(pace);
    let routeIndex = 0;
    let dayIndex = 0;

    if (routes[0].required && dayCount > 1) {
        dayBuckets[0].routes.push(routes[0]);
        dayBuckets[0].load += routes[0].load;
        routeIndex = 1;
        dayIndex = 1;
    }

    const remainingDays = Math.max(dayCount - dayIndex, 1);
    const remainingLoad = routes.slice(routeIndex).reduce((sum, route) => sum + route.load, 0);
    const targetLoad = remainingLoad / remainingDays || 0;

    for (; routeIndex < routes.length; routeIndex += 1) {
        const route = routes[routeIndex];
        const routesLeftIncludingCurrent = routes.length - routeIndex;
        const daysLeftIncludingCurrent = dayCount - dayIndex;
        const threshold = Math.max(targetLoad + 0.9, paceMeta.capacity * 0.82);

        if (
            dayIndex < dayCount - 1 &&
            dayBuckets[dayIndex].load > 0 &&
            dayBuckets[dayIndex].load + route.load > threshold &&
            routesLeftIncludingCurrent >= daysLeftIncludingCurrent
        ) {
            dayIndex += 1;
        }

        dayBuckets[dayIndex].routes.push(route);
        dayBuckets[dayIndex].load += route.load;

        const routesLeft = routes.length - routeIndex - 1;
        const daysLeft = dayCount - dayIndex - 1;

        if (
            dayIndex < dayCount - 1 &&
            dayBuckets[dayIndex].load >= targetLoad &&
            routesLeft >= daysLeft
        ) {
            dayIndex += 1;
        }
    }

    return dayBuckets;
};

const buildCityPlan = (city, dayCount, pace) => {
    const cityMeta = plannerCityMeta[city];
    const paceMeta = getPaceMeta(pace);
    const rankedPlaces = plannerPlaces[city];

    if (dayCount <= 0) {
        return {
            city,
            rankedPlaces: rankedPlaces.map((place) => ({ ...place, planned: false })),
            days: [],
            optionalRoutes: [],
            plannedPlaceIds: [],
            optionalPlaceIds: [],
        };
    }

    const routeCatalog = plannerRouteTemplates[city].map((route) => resolveRoute(city, route));
    const loadBudget = dayCount * paceMeta.capacity * 0.95;
    let usedLoad = 0;

    const plannedRoutes = [];
    const optionalRoutes = [];

    routeCatalog.forEach((route) => {
        const minimumDays = route.minimumDays?.[pace] ?? 1;

        if (dayCount < minimumDays) {
            optionalRoutes.push({
                ...route,
                skipReason: `${minimumDays}+ gün gerektirir`,
            });
            return;
        }

        if (route.required || usedLoad + route.load <= loadBudget) {
            plannedRoutes.push(route);
            usedLoad += route.load;
            return;
        }

        optionalRoutes.push({
            ...route,
            skipReason: 'Seçilen tempo ve gün sayısında ikinci öncelikte kalır',
        });
    });

    const plannedPlaceIds = collectPlaceIds(plannedRoutes);
    const optionalPlaceIds = collectPlaceIds(optionalRoutes).filter((placeId) => !plannedPlaceIds.includes(placeId));
    const dayBuckets = distributeRoutesToDays(plannedRoutes, dayCount, pace);

    const days = dayBuckets.map((bucket, index) => {
        const stopCount = bucket.routes.reduce((sum, route) => sum + route.places.length, 0);
        const hasRoutes = bucket.routes.length > 0;

        return {
            key: `${city}-${index + 1}`,
            title: `${index + 1}. Gün - ${cityMeta.label}`,
            accent: cityMeta.accent,
            overview: hasRoutes
                ? `${bucket.routes.length} rota ve ${stopCount} ana durakla planlandı.`
                : cityMeta.emptyDay,
            intensity: getIntensityLabel(bucket.load, paceMeta.capacity),
            routes: bucket.routes,
            notes: buildDayNotes({
                city,
                dayNumber: index + 1,
                dayCount,
                pace,
                hasRoutes,
            }),
        };
    });

    return {
        city,
        rankedPlaces: rankedPlaces.map((place) => ({
            ...place,
            planned: plannedPlaceIds.includes(place.id),
        })),
        days,
        optionalRoutes,
        plannedPlaceIds,
        optionalPlaceIds,
    };
};

const buildTravelPlan = ({ meccaDays, medinaDays, pace }) => {
    const meccaPlan = buildCityPlan('mecca', meccaDays, pace);
    const medinaPlan = buildCityPlan('medina', medinaDays, pace);

    return {
        days: [...meccaPlan.days, ...medinaPlan.days],
        cities: {
            mecca: meccaPlan,
            medina: medinaPlan,
        },
        totalPlannedPlaces: meccaPlan.plannedPlaceIds.length + medinaPlan.plannedPlaceIds.length,
        totalOptionalPlaces: meccaPlan.optionalPlaceIds.length + medinaPlan.optionalPlaceIds.length,
    };
};

const PreparationHub = () => {
    const [checkedItems, setCheckedItems] = useState(readStoredChecklist);
    const [planner, setPlanner] = useState(() => normalizePlanner(readStoredJson(PLANNER_STORAGE_KEY, defaultPlanner)));
    const [emergencyCard, setEmergencyCard] = useState(() => readStoredJson(EMERGENCY_STORAGE_KEY, defaultEmergencyCard));
    const [copyFeedback, setCopyFeedback] = useState('');
    const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
    const [offlineReady, setOfflineReady] = useState(false);

    const totalChecklistItems = useMemo(
        () => checklistGroups.reduce((sum, group) => sum + group.items.length, 0),
        []
    );

    const completedChecklistItems = useMemo(
        () => Object.values(checkedItems).filter(Boolean).length,
        [checkedItems]
    );

    const completionRate = Math.round((completedChecklistItems / totalChecklistItems) * 100);

    const personalPlan = useMemo(() => buildTravelPlan(planner), [planner]);
    const activePace = getPaceMeta(planner.pace);

    useEffect(() => {
        window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checkedItems));
    }, [checkedItems]);

    useEffect(() => {
        window.localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(planner));
    }, [planner]);

    useEffect(() => {
        window.localStorage.setItem(EMERGENCY_STORAGE_KEY, JSON.stringify(emergencyCard));
    }, [emergencyCard]);

    useEffect(() => {
        const syncNetworkState = () => setOnline(window.navigator.onLine);
        window.addEventListener('online', syncNetworkState);
        window.addEventListener('offline', syncNetworkState);

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
                .then(() => setOfflineReady(true))
                .catch(() => setOfflineReady(false));
        }

        return () => {
            window.removeEventListener('online', syncNetworkState);
            window.removeEventListener('offline', syncNetworkState);
        };
    }, []);

    const toggleChecklistItem = (itemId) => {
        setCheckedItems((current) => ({
            ...current,
            [itemId]: !current[itemId],
        }));
    };

    const resetChecklist = () => {
        setCheckedItems({});
    };

    const handlePlannerChange = (event) => {
        const { name, value } = event.target;

        setPlanner((current) => ({
            ...current,
            [name]: name.endsWith('Days')
                ? clampValue(
                    Number(value) || 0,
                    name === 'meccaDays' ? 1 : 0,
                    15
                )
                : value,
        }));
    };

    const handleEmergencyChange = (event) => {
        const { name, value } = event.target;

        setEmergencyCard((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const resetEmergencyCard = () => {
        setEmergencyCard(defaultEmergencyCard);
    };

    const copyEmergencySummary = async () => {
        const summary = [
            `Otel: ${emergencyCard.hotelName || '-'}`,
            `Oda: ${emergencyCard.roomNumber || '-'}`,
            `Grup Lideri: ${emergencyCard.groupLeader || '-'}`,
            `Telefon: ${emergencyCard.leaderPhone || '-'}`,
            `Toplanma Noktası: ${emergencyCard.meetingPoint || '-'}`,
            `Not: ${emergencyCard.notes || '-'}`,
        ].join('\n');

        try {
            await navigator.clipboard.writeText(summary);
            setCopyFeedback('Kart panoya kopyalandı.');
            window.setTimeout(() => setCopyFeedback(''), 2000);
        } catch {
            setCopyFeedback('Kopyalama bu cihazda desteklenmedi.');
            window.setTimeout(() => setCopyFeedback(''), 2000);
        }
    };

    return (
        <div className="mecca-page prep-page">
            <section className="page-banner prep-banner">
                <div className="banner-bg prep-bg"></div>
                <div className="container banner-content">
                    <h1 className="animate-slide-up">Hazırlık Merkezi</h1>
                    <p className="banner-subtitle animate-slide-up delay-100">
                        Checklist, Hanefî notlar, sık yapılan hatalar, kişisel planlayıcı, acil durum kartı ve offline hazır rehber.
                    </p>
                </div>
            </section>

            <div className="container page-layout">
                <aside className="page-sidebar animate-slide-up delay-200">
                    <div className="sidebar-sticky glass-panel prep-sidebar">
                        <h3 className="sidebar-title">Merkez</h3>
                        <ul className="sidebar-nav">
                            <li><a href="#checklist"><ListChecks size={16} /> Checklist</a></li>
                            <li><a href="#hanefi-notlar"><ShieldCheck size={16} /> Hanefî Notlar</a></li>
                            <li><a href="#hatalar"><TriangleAlert size={16} /> Yapılan Hatalar</a></li>
                            <li><a href="#planlayici"><Route size={16} /> Planlayıcı</a></li>
                            <li><a href="#acil-durum"><Phone size={16} /> Acil Durum</a></li>
                            <li><a href="#kaynaklar"><Database size={16} /> Kaynaklar</a></li>
                            <li><a href="#offline"><Wifi size={16} /> Offline</a></li>
                        </ul>
                    </div>
                </aside>

                <main className="page-content animate-slide-up delay-300">
                    <section className="content-section">
                        <div className="prep-highlight-grid">
                            <div className="prep-highlight glass-panel">
                                <span className="prep-highlight-label">Checklist Durumu</span>
                                <strong>{completedChecklistItems} / {totalChecklistItems}</strong>
                                <span className="prep-highlight-note">Tamamlanma %{completionRate}</span>
                            </div>
                            <div className="prep-highlight glass-panel">
                                <span className="prep-highlight-label">Kişisel Plan</span>
                                <strong>{planner.meccaDays + planner.medinaDays} gün</strong>
                                <span className="prep-highlight-note">
                                    {activePace.label} tempo, {personalPlan.totalPlannedPlaces} ana durak plana dahil
                                </span>
                            </div>
                            <div className="prep-highlight glass-panel">
                                <span className="prep-highlight-label">Offline Hazırlık</span>
                                <strong>{offlineReady ? 'Hazır' : 'Kuruluyor'}</strong>
                                <span className="prep-highlight-note">{online ? 'Çevrimiçi' : 'Şu an çevrimdışısınız'}</span>
                            </div>
                        </div>
                    </section>

                    <section id="checklist" className="content-section">
                        <div className="section-heading">
                            <ClipboardCheck className="section-icon text-secondary" size={32} />
                            <h2>İşaretlenebilir Checklist</h2>
                        </div>
                        <div className="prep-toolbar">
                            <p className="text-muted">
                                Yolculuğunuzu parçalı takip edin. İşaretler cihazınızda saklanır.
                            </p>
                            <button className="prep-action-btn" onClick={resetChecklist}>Checklist\'i sıfırla</button>
                        </div>
                        <div className="prep-checklist-grid">
                            {checklistGroups.map((group) => (
                                <div key={group.id} className="prep-card glass-panel">
                                    <div className="prep-card-header">
                                        <h3>{group.title}</h3>
                                        <span className="prep-chip">{group.items.filter((item) => checkedItems[item.id]).length}/{group.items.length}</span>
                                    </div>
                                    <p className="text-muted prep-card-intro">{group.description}</p>
                                    <div className="prep-checklist-list">
                                        {group.items.map((item) => (
                                            <label key={item.id} className={`prep-check-item ${checkedItems[item.id] ? 'done' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(checkedItems[item.id])}
                                                    onChange={() => toggleChecklistItem(item.id)}
                                                />
                                                <span>{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="hanefi-notlar" className="content-section">
                        <div className="section-heading">
                            <ShieldCheck className="section-icon text-primary-light" size={32} />
                            <h2>Hanefî Notlar ve Delilli Çizgi</h2>
                        </div>
                        <p className="text-muted mb-4">
                            Bu alan, uygulamada en çok karışıklık çıkan meseleleri kısa hüküm özeti ve kaynak notuyla toplar.
                        </p>
                        <div className="prep-note-grid">
                            {hanefiNotes.map((note) => (
                                <article key={note.id} className="prep-card glass-panel prep-note-card">
                                    <span className="prep-badge">{note.level}</span>
                                    <h3>{note.title}</h3>
                                    <p className="prep-note-summary">{note.summary}</p>
                                    <p className="text-muted">{note.detail}</p>
                                    <div className="prep-source-line">
                                        <BookOpen size={16} />
                                        <span>{note.source}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="hatalar" className="content-section">
                        <div className="section-heading">
                            <TriangleAlert className="section-icon" style={{ color: '#B45309' }} size={32} />
                            <h2>Sık Yapılan Hatalar</h2>
                        </div>
                        <div className="prep-mistake-grid">
                            {commonMistakes.map((mistake) => (
                                <article key={mistake.id} className="prep-card glass-panel prep-mistake-card">
                                    <div className="prep-card-header">
                                        <h3>{mistake.title}</h3>
                                        <span className="prep-chip danger">{mistake.risk}</span>
                                    </div>
                                    <p className="text-muted">{mistake.correction}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="planlayici" className="content-section">
                        <div className="section-heading">
                            <Route className="section-icon text-secondary" size={32} />
                            <h2>Kişisel Planlayıcı</h2>
                        </div>
                        <div className="prep-planner-layout">
                            <div className="prep-card glass-panel">
                                <h3>Plan Ayarları</h3>
                                <div className="prep-form-grid">
                                    <label className="prep-field">
                                        <span>Mekke günü</span>
                                        <input type="number" min="1" max="15" name="meccaDays" value={planner.meccaDays} onChange={handlePlannerChange} />
                                    </label>
                                    <label className="prep-field">
                                        <span>Medine günü</span>
                                        <input type="number" min="0" max="15" name="medinaDays" value={planner.medinaDays} onChange={handlePlannerChange} />
                                    </label>
                                    <label className="prep-field">
                                        <span>Tempo</span>
                                        <select name="pace" value={planner.pace} onChange={handlePlannerChange}>
                                            <option value="rahat">Rahat</option>
                                            <option value="normal">Normal</option>
                                            <option value="yorucu">Yorucu</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="prep-plan-summary">
                                    <span className="prep-badge">{activePace.label} tempo</span>
                                    <p className="text-muted">{activePace.description}</p>
                                    <p className="text-muted">{activePace.dayNote}</p>
                                    <div className="prep-bullet-list">
                                        <div className="prep-bullet-item">
                                            <CheckCircle2 size={16} />
                                            <span>{personalPlan.totalPlannedPlaces} ana durak seçilen plana aktif olarak yerleştirildi.</span>
                                        </div>
                                        <div className="prep-bullet-item">
                                            <CheckCircle2 size={16} />
                                            <span>{personalPlan.totalOptionalPlaces} durak ise bu tempoda vakit kalırsa düşünülmeli.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="prep-plan-results">
                                <div className="prep-ranking-grid">
                                    {[
                                        { key: 'mecca', title: 'Mekke önem sırası' },
                                        { key: 'medina', title: 'Medine önem sırası' },
                                    ].map((citySection) => (
                                        <article key={citySection.key} className="prep-card glass-panel">
                                            <div className="prep-card-header">
                                                <h3>{citySection.title}</h3>
                                                <span className="prep-chip">
                                                    {personalPlan.cities[citySection.key].rankedPlaces.length} durak
                                                </span>
                                            </div>
                                            {citySection.key === 'medina' && planner.medinaDays === 0 && (
                                                <p className="text-muted prep-card-intro">
                                                    Medine bu yolculukta seçili değil; liste, öncelik sırası için referans olarak gösteriliyor.
                                                </p>
                                            )}
                                            <div className="prep-ranking-list">
                                                {personalPlan.cities[citySection.key].rankedPlaces.map((place, index) => (
                                                    <div key={place.id} className={`prep-ranking-item ${place.planned ? 'planned' : ''}`}>
                                                        <span className="prep-ranking-order">{index + 1}</span>
                                                        <div className="prep-ranking-body">
                                                            <div className="prep-ranking-line">
                                                                <strong>{place.name}</strong>
                                                                <span className={`prep-chip ${place.planned ? '' : 'soft'}`}>
                                                                    {place.planned ? 'Plana dahil' : place.importance}
                                                                </span>
                                                            </div>
                                                            <p className="text-muted">{place.visitNote}</p>
                                                            <div className="prep-place-meta">
                                                                <span>{place.importance}</span>
                                                                <span>{place.effort} efor</span>
                                                                <span>{place.duration}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {personalPlan.days.map((day) => (
                                    <article key={day.key} className={`prep-card glass-panel prep-plan-card accent-${day.accent}`}>
                                        <div className="prep-card-header">
                                            <div>
                                                <h3>{day.title}</h3>
                                                <p className="text-muted">{day.overview}</p>
                                            </div>
                                            <span className="prep-chip">{day.intensity}</span>
                                        </div>
                                        <div className="prep-route-list">
                                            {day.routes.length ? day.routes.map((route) => (
                                                <div key={route.id} className="prep-route-shell">
                                                    <div className="prep-route-header">
                                                        <div>
                                                            <h4>{route.title}</h4>
                                                            <p className="text-muted">{route.description}</p>
                                                        </div>
                                                        <span className="prep-chip soft">{route.bestWindow}</span>
                                                    </div>
                                                    <div className="prep-place-list">
                                                        {route.places.map((place) => (
                                                            <div key={place.id} className="prep-place-item">
                                                                <div className="prep-place-line">
                                                                    <strong>{place.name}</strong>
                                                                    <span className={`prep-chip ${place.effort === 'Yüksek' ? 'danger' : 'soft'}`}>
                                                                        {place.effort} efor
                                                                    </span>
                                                                </div>
                                                                <p className="text-muted">{place.visitNote}</p>
                                                                <div className="prep-place-meta">
                                                                    <span>{place.importance}</span>
                                                                    <span>{place.duration}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="prep-route-note">
                                                        <AlertCircle size={16} />
                                                        <span>{route.caution}</span>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="prep-route-shell empty">
                                                    <p className="text-muted">{day.overview}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="prep-plan-list">
                                            {day.notes.map((note) => (
                                                <div key={note} className="prep-plan-item">
                                                    <CheckCircle2 size={16} />
                                                    <span>{note}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </article>
                                ))}

                                {(personalPlan.cities.mecca.optionalRoutes.length > 0 || personalPlan.cities.medina.optionalRoutes.length > 0) && (
                                    <article className="prep-card glass-panel">
                                        <div className="prep-card-header">
                                            <h3>Bu tempoda ikinci öncelik kalanlar</h3>
                                            <span className="prep-chip soft">Vakit kalırsa</span>
                                        </div>
                                        <div className="prep-optional-grid">
                                            {['mecca', 'medina'].map((cityKey) => (
                                                personalPlan.cities[cityKey].optionalRoutes.length > 0 ? (
                                                    <div key={cityKey} className="prep-optional-group">
                                                        <strong>{cityKey === 'mecca' ? 'Mekke' : 'Medine'}</strong>
                                                        <div className="prep-bullet-list">
                                                            {personalPlan.cities[cityKey].optionalRoutes.map((route) => (
                                                                <div key={route.id} className="prep-bullet-item">
                                                                    <AlertCircle size={16} />
                                                                    <span>{route.title}: {route.skipReason}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : null
                                            ))}
                                        </div>
                                    </article>
                                )}
                            </div>
                        </div>
                    </section>

                    <section id="acil-durum" className="content-section">
                        <div className="section-heading">
                            <Phone className="section-icon text-primary-light" size={32} />
                            <h2>Acil Durum Kartı</h2>
                        </div>
                        <div className="prep-emergency-layout">
                            <div className="prep-card glass-panel">
                                <h3>Kendi kartınızı doldurun</h3>
                                <div className="prep-form-grid">
                                    <label className="prep-field">
                                        <span>Otel adı</span>
                                        <input name="hotelName" value={emergencyCard.hotelName} onChange={handleEmergencyChange} />
                                    </label>
                                    <label className="prep-field">
                                        <span>Oda numarası</span>
                                        <input name="roomNumber" value={emergencyCard.roomNumber} onChange={handleEmergencyChange} />
                                    </label>
                                    <label className="prep-field">
                                        <span>Grup lideri</span>
                                        <input name="groupLeader" value={emergencyCard.groupLeader} onChange={handleEmergencyChange} />
                                    </label>
                                    <label className="prep-field">
                                        <span>Telefon</span>
                                        <input name="leaderPhone" value={emergencyCard.leaderPhone} onChange={handleEmergencyChange} />
                                    </label>
                                    <label className="prep-field field-span-full">
                                        <span>Toplanma noktası</span>
                                        <input name="meetingPoint" value={emergencyCard.meetingPoint} onChange={handleEmergencyChange} />
                                    </label>
                                    <label className="prep-field field-span-full">
                                        <span>Kısa not</span>
                                        <textarea name="notes" rows="3" value={emergencyCard.notes} onChange={handleEmergencyChange} />
                                    </label>
                                </div>
                                <div className="prep-toolbar">
                                    <button className="prep-action-btn" onClick={copyEmergencySummary}>
                                        <Copy size={16} /> Kartı kopyala
                                    </button>
                                    <button className="prep-ghost-btn" onClick={resetEmergencyCard}>Temizle</button>
                                </div>
                                {copyFeedback && <p className="prep-feedback">{copyFeedback}</p>}
                            </div>

                            <div className="prep-emergency-side">
                                <div className="prep-card glass-panel">
                                    <h3>Hızlı hatlar</h3>
                                    <div className="prep-quick-list">
                                        {emergencyNumbers.map((entry) => (
                                            <div key={entry.number} className="prep-quick-item">
                                                <strong>{entry.number}</strong>
                                                <div>
                                                    <span>{entry.label}</span>
                                                    <small>{entry.note}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="prep-card glass-panel">
                                    <h3>Kısa Arapça cümleler</h3>
                                    <div className="prep-phrase-list">
                                        {emergencyPhrases.map((phrase) => (
                                            <div key={phrase.tr} className="prep-phrase-item">
                                                <strong>{phrase.tr}</strong>
                                                <div className="prep-phrase-copy">
                                                    <span className="prep-phrase-latin">{phrase.ar}</span>
                                                    <span className="prep-phrase-arabic" lang="ar" dir="rtl">{phrase.arabic}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="kaynaklar" className="content-section">
                        <div className="section-heading">
                            <Database className="section-icon text-secondary" size={32} />
                            <h2>Kaynak Şeffaflığı</h2>
                        </div>
                        <div className="prep-source-grid">
                            <div className="prep-card glass-panel">
                                <h3>Son güncelleme</h3>
                                <p className="prep-big-text">{sourceTransparency.lastUpdated}</p>
                                <p className="text-muted">Bu tarih, Hazırlık Merkezi içerik akışının son revizyon gününü gösterir.</p>
                            </div>
                            <div className="prep-card glass-panel">
                                <h3>Yayın çizgisi</h3>
                                <div className="prep-bullet-list">
                                    {sourceTransparency.editorialPolicy.map((item) => (
                                        <div key={item} className="prep-bullet-item">
                                            <CheckCircle2 size={16} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="prep-card glass-panel">
                                <h3>Ana referans havuzu</h3>
                                <div className="prep-bullet-list">
                                    {sourceTransparency.references.map((item) => (
                                        <div key={item} className="prep-bullet-item">
                                            <AlertCircle size={16} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="offline" className="content-section">
                        <div className="section-heading">
                            <Wifi className="section-icon text-primary-light" size={32} />
                            <h2>Offline Hazırlık</h2>
                        </div>
                        <div className="prep-offline-grid">
                            <div className="prep-card glass-panel">
                                <h3>Durum</h3>
                                <p className="prep-big-text">{offlineReady ? 'Offline destek etkin' : 'Offline destek ilk ziyarette kuruluyor'}</p>
                                <p className="text-muted">
                                    {online
                                        ? 'Bu cihaz çevrimiçi. Sayfalar açıkken uygulama temel içeriği önbelleğe almaya hazırlanıyor.'
                                        : 'Şu an çevrimdışısınız. Daha önce açılan temel sayfalar erişilebilir olmalı.'}
                                </p>
                            </div>
                            <div className="prep-card glass-panel">
                                <h3>Nasıl kullanılır?</h3>
                                <div className="prep-bullet-list">
                                    <div className="prep-bullet-item"><CheckCircle2 size={16} /><span>Yola çıkmadan önce gerekli sayfaları en az bir kez açın.</span></div>
                                    <div className="prep-bullet-item"><CheckCircle2 size={16} /><span>Checklist ve acil durum kartı bu cihazda saklanır.</span></div>
                                    <div className="prep-bullet-item"><CheckCircle2 size={16} /><span>Kritik bilgileri yine de ekran görüntüsü veya not olarak yedekleyin.</span></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default PreparationHub;
