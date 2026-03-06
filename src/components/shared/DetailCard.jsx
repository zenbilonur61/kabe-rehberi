import { MapPin, Navigation, Quote, AlertCircle } from 'lucide-react';
import { getSafeExternalUrl } from '../../utils/security';
import './DetailCard.css';

const DetailCard = ({ place, theme = 'primary', index = 0 }) => {
    const safeMapLink = place.mapLink ? getSafeExternalUrl(place.mapLink) : null;

    return (
        <div
            className={`detail-card theme-${theme} animate-slide-up hover-lift`}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="detail-card-header">
                <div className="detail-icon-wrap">
                    <MapPin size={24} className="detail-icon" />
                </div>
                <h3 className="detail-title">{place.name}</h3>
            </div>

            <div className="detail-card-body">
                <p className="detail-subtitle">{place.description}</p>
                <div className="detail-divider"></div>
                <p className="detail-text">{place.detail}</p>

                {place.practicalInfo && (
                    <div className="detail-practical mt-3">
                        <AlertCircle size={16} />
                        <span><strong>Pratik Bilgi / Randevu:</strong> {place.practicalInfo}</span>
                    </div>
                )}

                {place.hadith && (
                    <div className="detail-hadith mt-3">
                        <Quote size={16} className="hadith-icon" />
                        <i>"{place.hadith}"</i>
                    </div>
                )}

                {safeMapLink && (
                    <a
                        href={safeMapLink}
                        target="_blank"
                        rel="noopener noreferrer nofollow external"
                        referrerPolicy="no-referrer"
                        className="btn-map mt-4"
                    >
                        <Navigation size={16} />
                        Haritada Göster
                    </a>
                )}
            </div>

            {/* Decorative element */}
            <div className="detail-decoration"></div>
        </div>
    );
};

export default DetailCard;
