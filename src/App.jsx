import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader/Loader';
import NavBar from './components/NavBar/NavBar';
import TopButton from './components/TopButton/TopButton';
import Home from './components/Home/Home';
import AboutMe from './components/Sections/AboutMe/AboutMe';
import Skills from './components/Sections/Skills/Skills';
import WorksView from './components/Sections/WorksView/WorksView';
import Works from './components/Sections/Works/Works';
import Contact from './components/Sections/Contact/Contact';

import './scss/global.scss';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoaderComplete = () => {
        setIsLoaded(true);
        gsap.fromTo(
            'nav',
            { top: '-70px' },
            { top: 0, duration: 0.6, ease: 'power3.out' }
        );
        ScrollTrigger.refresh();
    };

    useEffect(() => {
        if (!isLoaded) return;
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.position = 'fixed';
            nav.style.top = '0';
        }
        const handleResize = () => {
            if (nav) {
                nav.style.position = 'fixed';
                nav.style.top = '0';
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded]);

    // useEffect(() => {
    //     if (!isLoaded) return;
    //     const handleResize = () => {
    //         const nav = document.querySelector('nav');
    //         if (nav && nav.style.top === '0px') {
    //             nav.style.top = '0';
    //         }
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [isLoaded]);

    return (
        <>
            {!isLoaded && <Loader onComplete={handleLoaderComplete} />}
            <NavBar />
            <div
                id="wrap"
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            >
                <Home startAnimation={isLoaded} />
                <AboutMe />
                <Skills />
                <WorksView />
                <Works />
                <Contact />
            </div>
            <TopButton isLoaded={isLoaded} />
        </>
    );
};

export default App;
