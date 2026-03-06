import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

const Accordion = ({ items, theme = 'primary' }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`custom-accordion theme-${theme}`}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`accordion-item ${isOpen ? 'open' : ''} glass-panel animate-slide-up`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <button
                            className="accordion-header"
                            onClick={() => toggleItem(index)}
                            aria-expanded={isOpen}
                        >
                            <div className="accordion-title-wrap">
                                <span className="accordion-number">{index + 1}</span>
                                <span className="accordion-title">
                                    {item.name || item.title}
                                    {(item.meaning || item.year) && (
                                        <span className="accordion-subtitle">({item.meaning || item.year})</span>
                                    )}
                                </span>
                            </div>
                            <ChevronDown
                                className={`accordion-icon ${isOpen ? 'rotate' : ''}`}
                                size={20}
                            />
                        </button>

                        <div
                            className="accordion-content-wrapper"
                            style={{ maxHeight: isOpen ? '500px' : '0' }}
                        >
                            <div className="accordion-content">
                                <p>{item.detail || item.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
