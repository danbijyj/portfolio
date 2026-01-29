import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './NavBar.scss';

gsap.registerPlugin(ScrollToPlugin);

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const smoothScrollTo = (target) => {
            gsap.to(window, {
                duration: 0.5,
                scrollTo: target,
                ease: 'none',
            });
        };

        const links = document.querySelectorAll('nav a');

        const handleClick = (e) => {
            e.preventDefault();
            const href = e.currentTarget.getAttribute('href');
            const target = document.querySelector(href);
            if (target) smoothScrollTo(target);
            setMenuOpen(false);
        };

        links.forEach((link) => link.addEventListener('click', handleClick));

        return () => {
            links.forEach((link) =>
                link.removeEventListener('click', handleClick),
            );
        };
    }, []);

    return (
        <nav className="nav">
            <div className="line left"></div>
            <div className="inner">
                <div className="logo_line"></div>
                <div className="logo">
                    <a href="#hero">
                        <p>Portfolio by</p>
                        <h1>{'{ JANG YOO JUNG }'}</h1>
                    </a>
                </div>
                <div
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`menu ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <a href="#aboutme">About me</a>
                        </li>
                        <li>
                            <a href="#skills">Skills</a>
                        </li>
                        <li>
                            <a href="#works">Works</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="line right"></div>
        </nav>
    );
};

export default NavBar;
