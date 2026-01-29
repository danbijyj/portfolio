import { useEffect, useState } from 'react';
import gsap from 'gsap';
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
        gsap.to(window, { scrollTo: 0, duration: 0.5, ease: 'power2.out' });
    };

    if (isModalOpen) return null;

    return (
        <SlArrowUp
            className={`top ${visible && isLoaded ? 'visible' : ''}`}
            onClick={scrollToTop}
        />
    );
};

export default TopButton;
