import { useEffect, useState } from 'react';
import gsap from 'gsap';
import './style.scss';
import { SlArrowUp } from 'react-icons/sl';

const TopButton = ({ isLoaded }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        gsap.to(window, { scrollTo: 0, duration: 0.5, ease: 'power2.out' });
    };

    return (
        <SlArrowUp
            className={`top ${visible && isLoaded ? 'visible' : ''}`}
            onClick={scrollToTop}
        />
    );
};

export default TopButton;
