import './Timeline.css';

const Timeline = ({ events, theme = 'primary' }) => {
    return (
        <div className={`custom-timeline theme-${theme}`}>
            {events.map((event, index) => (
                <div
                    key={index}
                    className="timeline-node animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                >
                    <div className="timeline-marker">
                        <div className="marker-core"></div>
                        <div className="marker-ring pulse"></div>
                    </div>
                    <div className="timeline-content glass-panel hover-lift">
                        <span className="timeline-date">{event.period || event.year || 'Adım'}</span>
                        <h4 className="timeline-title">{event.title}</h4>
                        <p className="timeline-desc">{event.detail || event.description}</p>
                        {event.hadith && (
                            <div className="detail-hadith" style={{ marginTop: '15px' }}>
                                <i style={{ color: 'var(--color-primary-light)' }}>"{event.hadith}"</i>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
