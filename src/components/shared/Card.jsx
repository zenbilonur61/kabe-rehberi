import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Card.css';

const Card = ({ title, description, image, linkTo, icon: Icon, delay = 0 }) => {
    return (
        <div className={`guide-card hover-lift hover-glow delay-${delay} animate-slide-up`} style={{ animationFillMode: 'both' }}>
            {image && (
                <div className="card-image-wrap">
                    <img src={image} alt={title} className="card-image" />
                </div>
            )}
            <div className="card-content">
                <div className="card-header">
                    {Icon && <Icon className="card-icon text-secondary" size={24} />}
                    <h3 className="card-title">{title}</h3>
                </div>
                <p className="card-desc text-muted">{description}</p>
                {linkTo && (
                    <Link to={linkTo} className="card-link text-primary-light">
                        <span>Keşfet</span>
                        <ArrowRight size={16} className="arrow-icon" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Card;
