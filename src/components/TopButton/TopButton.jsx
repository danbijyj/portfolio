import { useEffect, useState } from 'react';
import './TopButton.scss';
import { SlArrowUp } from 'react-icons/sl';

const TopButton = ({ isLoaded }) => {
    const [visible, setVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);

        const observer = new MutationObserver(() => {
            setIsModalOpen(document.body.classList.contains('modal-open'));
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (isModalOpen) return null;

    return (
        <button
            className={`top ${visible && isLoaded ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            type="button"
        >
            <SlArrowUp />
        </button>
    );
};

export default TopButton;
