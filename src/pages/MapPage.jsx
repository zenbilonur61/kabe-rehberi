import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { meccaData } from '../data/meccaData';
import { medinaData } from '../data/medinaData';
import './MapPage.css';

// Fix for default marker icons in Leaflet with React in case it's needed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom Icons
const createCustomIcon = (color) => {
    const svgMarkup = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="12" fill="${color}" stroke="white" stroke-width="3" />
            <circle cx="14" cy="14" r="4" fill="white" />
        </svg>
    `.trim();

    return new L.Icon({
        iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`,
        iconRetinaUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
    });
};

const meccaIcon = createCustomIcon('#D97706'); // Gold for Mecca
const medinaIcon = createCustomIcon('#10B981'); // Emerald for Medina

// Auto-center map and track zoom level
function MapController({ center, zoom, onZoomChange }) {
    const map = useMapEvents({
        zoomend: () => {
            if (onZoomChange) onZoomChange(map.getZoom());
        }
    });

    useEffect(() => {
        map.flyTo(center, zoom, {
            animate: true,
            duration: 1.5
        });
    }, [center, zoom, map]);

    useEffect(() => {
        if (onZoomChange) onZoomChange(map.getZoom());
    }, [map, onZoomChange]);

    return null;
}

const MapPage = () => {
    const [view, setView] = useState('all'); // 'all', 'mecca', 'medina'
    const [currentZoom, setCurrentZoom] = useState(6);

    // Prepare data
    const locations = [];

    // Add Mecca
    if (meccaData.kabe.coordinates) {
        locations.push({
            id: 'kabe', title: meccaData.kabe.title, coordinates: meccaData.kabe.coordinates,
            type: 'mecca', desc: meccaData.kabe.description, link: '/mekke#kabe', icon: meccaIcon
        });
    }
    meccaData.places.forEach(p => {
        if (p.coordinates) {
            locations.push({
                id: p.id, title: p.name, coordinates: p.coordinates,
                type: 'mecca', desc: p.description, link: '/mekke', icon: meccaIcon
            });
        }
    });

    // Add Medina
    if (medinaData.mescid.coordinates) {
        locations.push({
            id: 'mescid-nebevi', title: medinaData.mescid.title, coordinates: medinaData.mescid.coordinates,
            type: 'medina', desc: medinaData.mescid.description, link: '/medine#mescid', icon: medinaIcon
        });
    }
    medinaData.places.forEach(p => {
        if (p.coordinates) {
            locations.push({
                id: p.id, title: p.name, coordinates: p.coordinates,
                type: 'medina', desc: p.description, link: '/medine', icon: medinaIcon
            });
        }
    });

    const mapCenter = useMemo(() => {
        if (view === 'mecca') return [21.4225, 39.8262];
        if (view === 'medina') return [24.4672, 39.6111];
        // Center of Saudi Arabia approx to see both Mecca and Medina
        return [22.8, 39.7];
    }, [view]);

    const mapZoom = useMemo(() => {
        if (view === 'mecca') return 12;
        if (view === 'medina') return 13;
        return 6;
    }, [view]);

    return (
        <div className="map-page-container">
            <div className="map-header text-center animate-slide-up">
                <h1>Kutsal Topraklar Haritası</h1>
                <p className="text-muted">Mekke ve Medine'deki kutsal mekanları <strong>gerçek harita üzerinde</strong> keşfedin.</p>

                <div className="map-filters">
                    <button className={`filter-btn ${view === 'all' ? 'active' : ''}`} onClick={() => setView('all')}>Tümü</button>
                    <button className={`filter-btn ${view === 'mecca' ? 'active' : ''}`} onClick={() => setView('mecca')}>Mekke Bölgesi</button>
                    <button className={`filter-btn ${view === 'medina' ? 'active' : ''}`} onClick={() => setView('medina')}>Medine Bölgesi</button>
                </div>
            </div>

            <div className="map-view-wrapper animate-slide-up delay-100">
                <MapContainer center={mapCenter} zoom={mapZoom} style={{ width: '100%', height: '100%' }}>
                    <MapController center={mapCenter} zoom={mapZoom} onZoomChange={setCurrentZoom} />
                    {/* Standard elegant light map from CartoDB */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />

                    {locations.filter(loc => view === 'all' || loc.type === view).map((loc) => (
                        <Marker
                            key={loc.id}
                            position={loc.coordinates}
                            icon={loc.icon}
                        >
                            {/* Show permanent labels only when zoomed in (zoom level 14 or higher) */}
                            {currentZoom >= 14 && (
                                <Tooltip permanent direction="top" offset={[0, -18]} className="pin-tooltip-label">
                                    {loc.title}
                                </Tooltip>
                            )}

                            <Popup className="custom-leaflet-popup" closeButton={false}>
                                <div className="map-info-popup">
                                    <div className="info-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-primary)', fontWeight: 700 }}>{loc.title}</h3>
                                        <span className={`badge-type ${loc.type}`}>
                                            {loc.type === 'mecca' ? 'Mekke' : 'Medine'}
                                        </span>
                                    </div>
                                    <p className="info-desc" style={{ fontSize: '0.9rem', marginBottom: '15px', color: 'var(--color-text-muted)' }}>{loc.desc}</p>
                                    <Link to={loc.link} className="info-link text-primary-light" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                                        <Info size={16} /> Detaylı Bilgi Gör <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPage;
