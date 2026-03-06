import { useState, useEffect } from 'react';
import { Compass, Clock, MapPin, AlertTriangle, Crosshair } from 'lucide-react';
import {
    buildAladhanUrl,
    calculateQiblaDirection,
    fetchJsonWithTimeout,
    isValidLatitude,
    isValidLongitude,
    sanitizePrayerTimes,
    sanitizeShortText,
} from '../utils/security';
import './Qibla.css';

const Qibla = () => {
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [qiblaDirection, setQiblaDirection] = useState(0); // Qibla angle from true North
    const [compassHeading, setCompassHeading] = useState(0); // Device compass heading
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prayerTimesError, setPrayerTimesError] = useState(null);
    const [sensorError, setSensorError] = useState(null);
    const [locationName, setLocationName] = useState("Konum Aranıyor...");
    const [permissionGranted, setPermissionGranted] = useState(false);

    const normalizeDegrees = (value) => ((value % 360) + 360) % 360;

    const getCurrentDateParam = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const getScreenOrientationAngle = () => {
        if (typeof window === 'undefined') {
            return 0;
        }

        if (typeof window.screen?.orientation?.angle === 'number') {
            return window.screen.orientation.angle;
        }

        if (typeof window.orientation === 'number') {
            return window.orientation;
        }

        return 0;
    };

    const hasOrientationSupport = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        return (
            typeof window.DeviceOrientationEvent !== 'undefined' ||
            'ondeviceorientation' in window ||
            'ondeviceorientationabsolute' in window
        );
    };

    // Get true location and fetch data
    const fetchLocationAndData = async () => {
        setLoading(true);
        setError(null);
        setPrayerTimesError(null);

        if (!navigator.geolocation) {
            setError("Tarayıcınız konum servisini desteklemiyor.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
                    setError("Cihaz geçerli bir konum verisi sağlayamadı.");
                    setLoading(false);
                    return;
                }

                try {
                    const nextQiblaDirection = calculateQiblaDirection(latitude, longitude);

                    if (nextQiblaDirection === null) {
                        throw new Error('Invalid location geometry');
                    }

                    setQiblaDirection(nextQiblaDirection);
                    setLocationName("Konum doğrulandı");

                    const timingsUrl = buildAladhanUrl(`/v1/timings/${getCurrentDateParam()}`, {
                        latitude,
                        longitude,
                        method: 13,
                        school: 1,
                    });
                    const timeData = await fetchJsonWithTimeout(timingsUrl);
                    const nextPrayerTimes = sanitizePrayerTimes(timeData?.data?.timings);

                    if (!nextPrayerTimes) {
                        throw new Error('Invalid API payload');
                    }

                    setPrayerTimes(nextPrayerTimes);
                    setLocationName(`${sanitizeShortText(timeData?.data?.meta?.timezone, 'Konum doğrulandı')} (Saat Dilimi)`);
                    setLoading(false);
                } catch {
                    setPrayerTimes(null);
                    setPrayerTimesError("Namaz vakitleri şu anda alınamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.");
                    setLoading(false);
                }
            },
            () => {
                setError("Konum izni reddedildi veya bulunamadı. Namaz vakitlerini ve pusulayı kullanmak için arama çubuğundan konum izni vermeniz gerekmektedir.");
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    };

    const requestOrientationPermission = () => {
        if (!hasOrientationSupport()) {
            setSensorError("Bu cihaz veya tarayıcı canlı pusula sensörü sunmuyor. Canlı yön için telefon ya da tablet kullanın.");
            return;
        }

        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ devices
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        setSensorError(null);
                        setPermissionGranted(true);
                        window.addEventListener('deviceorientation', handleOrientation, true);
                    } else {
                        setSensorError("Pusula sensörü izni reddedildi.");
                    }
                })
                .catch(() => {
                    setSensorError("Pusula sensörü başlatılamadı.");
                });
        } else {
            // Non iOS 13+ devices
            setPermissionGranted(true);
            setSensorError(null);
            // try alternative event if absolute is supported
            if ('ondeviceorientationabsolute' in window) {
                window.addEventListener('deviceorientationabsolute', handleOrientation, true);
            } else {
                window.addEventListener('deviceorientation', handleOrientation, true);
            }
        }
    };

    const handleOrientation = (event) => {
        let heading = null;

        if (typeof event.webkitCompassHeading === 'number') {
            // Apple devices
            heading = event.webkitCompassHeading;
        } else if (typeof event.alpha === 'number') {
            heading = 360 - event.alpha;

            if (typeof event.absolute !== 'boolean' || event.absolute === false) {
                heading -= getScreenOrientationAngle();
            }
        }

        if (heading === null) {
            return;
        }

        setCompassHeading(normalizeDegrees(heading));
    };

    useEffect(() => {
        fetchLocationAndData();

        const refreshIntervalId = window.setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchLocationAndData();
            }
        }, 15 * 60 * 1000);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchLocationAndData();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.clearInterval(refreshIntervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('deviceorientation', handleOrientation, true);
            window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
        };
        // eslint-disable-next-line
    }, []);

    // The needle must point to Qibla.
    // The device compass gives us where the top of the phone is pointing (from North).
    // So North is at angle: -compassHeading
    // Qibla from North is: qiblaDirection
    // Therefore, arrow rotation relative to phone is: qiblaDirection - compassHeading
    const needleRotation = normalizeDegrees(qiblaDirection - compassHeading);

    return (
        <div className="qibla-page">
            <div className="container">
                <div className="page-header text-center animate-slide-up">
                    <Compass className="header-icon text-secondary" size={48} />
                    <h1>Ezan & Kıble Bulucu</h1>
                    <p className="text-muted">Bulunduğunuz konuma göre hesaplanan namaz vakitleri ve canlı kıble pusulası. İkindi vakti Hanefî hesabına göre gösterilir.</p>
                </div>

                {error ? (
                    <div className="error-banner glass-panel animate-slide-up delay-100">
                        <AlertTriangle size={24} color="#EF4444" />
                        <p>{error}</p>
                        <button className="btn-retry" onClick={fetchLocationAndData}>Tekrar Dene</button>
                    </div>
                ) : (
                    <div className="city-selector animate-slide-up delay-100">
                        <label><MapPin size={18} /> Gelişmiş Konum:</label>
                        <div className="location-display">
                            {loading ? "Hesaplanıyor..." : locationName}
                        </div>
                    </div>
                )}

                {!error && (
                    <div className="qibla-grid animate-slide-up delay-200">
                        {/* Prayer Times Panel */}
                        <div className="prayers-panel glass-panel">
                            <div className="panel-header">
                                <Clock className="text-primary-light" size={24} />
                                <h3>Namaz Vakitleri</h3>
                            </div>

                            {loading ? (
                                <div className="loading-spinner"></div>
                            ) : prayerTimes ? (
                                <div className="times-list">
                                    <div className="time-row">
                                        <span className="time-name">İmsak (Fajr)</span>
                                        <span className="time-value">{prayerTimes.Fajr}</span>
                                    </div>
                                    <div className="time-row">
                                        <span className="time-name">Güneş (Sunrise)</span>
                                        <span className="time-value">{prayerTimes.Sunrise}</span>
                                    </div>
                                    <div className="time-row">
                                        <span className="time-name">Öğle (Dhuhr)</span>
                                        <span className="time-value">{prayerTimes.Dhuhr}</span>
                                    </div>
                                    <div className="time-row">
                                        <span className="time-name">İkindi (Asr)</span>
                                        <span className="time-value">{prayerTimes.Asr}</span>
                                    </div>
                                    <div className="time-row">
                                        <span className="time-name">Akşam (Maghrib)</span>
                                        <span className="time-value">{prayerTimes.Maghrib}</span>
                                    </div>
                                    <div className="time-row">
                                        <span className="time-name">Yatsı (Isha)</span>
                                        <span className="time-value">{prayerTimes.Isha}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted" style={{ margin: 0 }}>
                                    {prayerTimesError || "Namaz vakitleri henüz yüklenemedi."}
                                </p>
                            )}
                        </div>

                        {/* Qibla Compass Panel */}
                        <div className="compass-panel glass-panel">
                            <div className="panel-header">
                                <Compass className="text-secondary" size={24} />
                                <h3>Canlı Kıble Pusulası</h3>
                            </div>

                            {loading ? (
                                <div className="loading-spinner mb-4"></div>
                            ) : (
                                <>
                                    {!permissionGranted && (
                                        <button className="btn-orient mb-4" onClick={requestOrientationPermission}>
                                            <Crosshair size={18} />
                                            Pusula Sensörünü Başlat
                                        </button>
                                    )}
                                    <p className="compass-desc text-muted">
                                        Cihazınızı düz bir zemine koyunuz ve 8 çizer gibi kalibre ediniz. <strong style={{ color: 'var(--color-primary-light)' }}>Yeşil/Kırmızı olan sivri uç Kâbe yönünü (Kıble) gösterir.</strong>
                                    </p>
                                    {sensorError && (
                                        <p className="text-muted" style={{ marginTop: '0.75rem', color: '#B45309' }}>
                                            {sensorError}
                                        </p>
                                    )}

                                    <div className="compass-wrapper">
                                        <div className="compass-face" style={{ transform: `rotate(${-compassHeading}deg)` }}>
                                            <div className="compass-mark mark-n">K</div>
                                            <div className="compass-mark mark-e">D</div>
                                            <div className="compass-mark mark-s">G</div>
                                            <div className="compass-mark mark-w">B</div>
                                            <div className="compass-ring"></div>
                                            <div className="compass-ring inner-ring"></div>

                                            <div className="kaaba-marker-container" style={{ transform: `rotate(${qiblaDirection}deg)` }}>
                                                <div className="kaaba-marker"></div>
                                            </div>
                                        </div>

                                        <div className="compass-needle-container" style={{ transform: `rotate(${needleRotation}deg)` }}>
                                            <div className="needle tip-north"></div>
                                            <div className="needle tip-south"></div>
                                            <div className="needle-center"></div>
                                        </div>
                                    </div>

                                    <div className="qibla-degree mt-3 text-center">
                                        <p style={{ margin: '0 0 5px', fontSize: '1rem' }}>
                                            Kuzeye Uzaklık: <strong>{qiblaDirection ? qiblaDirection.toFixed(1) : 0}°</strong>
                                        </p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                            Kusursuz ölçüm için cihazınızı manyetik cihazlardan uzak tutunuz.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Qibla;
