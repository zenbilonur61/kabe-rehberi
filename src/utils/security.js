const ALLOWED_EXTERNAL_HOSTS = new Set(['www.google.com', 'google.com']);
const ALLOWED_API_HOSTS = new Set(['api.aladhan.com']);
const KAABA_COORDINATES = {
    latitude: 21.422487,
    longitude: 39.826206,
};

const isFiniteNumber = (value) => typeof value === 'number' && Number.isFinite(value);
const toRadians = (value) => (value * Math.PI) / 180;
const toDegrees = (value) => (value * 180) / Math.PI;

export const isValidLatitude = (value) => isFiniteNumber(value) && value >= -90 && value <= 90;

export const isValidLongitude = (value) => isFiniteNumber(value) && value >= -180 && value <= 180;

export const sanitizeDirection = (value) => {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        return null;
    }

    return ((parsed % 360) + 360) % 360;
};

export const calculateQiblaDirection = (latitude, longitude) => {
    if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
        return null;
    }

    const userLatitude = toRadians(latitude);
    const userLongitude = toRadians(longitude);
    const kaabaLatitude = toRadians(KAABA_COORDINATES.latitude);
    const kaabaLongitude = toRadians(KAABA_COORDINATES.longitude);

    const y = Math.sin(kaabaLongitude - userLongitude);
    const x =
        Math.cos(userLatitude) * Math.tan(kaabaLatitude) -
        Math.sin(userLatitude) * Math.cos(kaabaLongitude - userLongitude);

    return sanitizeDirection(toDegrees(Math.atan2(y, x)));
};

export const sanitizePrayerTimes = (value) => {
    const requiredKeys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    if (!value || typeof value !== 'object') {
        return null;
    }

    const sanitized = {};

    for (const key of requiredKeys) {
        const entry = value[key];

        if (typeof entry !== 'string') {
            return null;
        }

        sanitized[key] = entry.replace(/\s*\(.*/, '').trim();
    }

    return sanitized;
};

export const sanitizeShortText = (value, fallback, maxLength = 80) => {
    if (typeof value !== 'string') {
        return fallback;
    }

    const trimmed = value.trim();

    if (!trimmed || trimmed.length > maxLength) {
        return fallback;
    }

    return trimmed;
};

export const getSafeExternalUrl = (input) => {
    try {
        const url = new URL(input);

        if (url.protocol !== 'https:') {
            return null;
        }

        if (!ALLOWED_EXTERNAL_HOSTS.has(url.hostname)) {
            return null;
        }

        return url.toString();
    } catch {
        return null;
    }
};

export const buildAladhanUrl = (pathname, searchParams = {}) => {
    const url = new URL(pathname, 'https://api.aladhan.com');

    if (url.protocol !== 'https:' || !ALLOWED_API_HOSTS.has(url.hostname)) {
        throw new Error('Blocked API origin');
    }

    Object.entries(searchParams).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
    });

    return url.toString();
};

export const fetchJsonWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'omit',
            redirect: 'error',
            referrerPolicy: 'no-referrer',
            ...options,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } finally {
        window.clearTimeout(timeoutId);
    }
};
