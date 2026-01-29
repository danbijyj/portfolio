import { useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './NavBar.scss';

gsap.registerPlugin(ScrollToPlugin);

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScrollTo = useCallback((targetId) => {
        const target = document.querySelector(targetId);
        if (!target) return;

        gsap.to(window, {
            duration: 0.6,
            scrollTo: target,
            ease: 'none',
        });

        setMenuOpen(false);
    }, []);

    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        handleScrollTo(targetId);
    };

    return (
        <nav className="nav">
            <div className="line left"></div>
            <div className="inner">
                <div className="logo_line"></div>
                <div className="logo">
                    <a
                        href="#hero"
                        onClick={(e) => handleLinkClick(e, '#hero')}
                    >
                        <p>Portfolio by</p>
                        <h1>{'{ JANG YOO JUNG }'}</h1>
                    </a>
                </div>
                <button
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    type="button"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`menu ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <a
                                href="#aboutme"
                                onClick={(e) => handleLinkClick(e, '#aboutme')}
                            >
                                About me
                            </a>
                        </li>
                        <li>
                            <a
                                href="#skills"
                                onClick={(e) => handleLinkClick(e, '#skills')}
                            >
                                Skills
                            </a>
                        </li>
                        <li>
                            <a
                                href="#works"
                                onClick={(e) => handleLinkClick(e, '#works')}
                            >
                                Works
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, '#contact')}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="line right"></div>
        </nav>
    );
};

export default NavBar;
