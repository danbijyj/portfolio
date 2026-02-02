import { useEffect, useState } from 'react';
import { SlArrowUp } from 'react-icons/sl';
import './TopButton.scss';

const TopButton = ({ isLoaded }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
