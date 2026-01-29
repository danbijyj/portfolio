import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader/Loader';
import NavBar from './components/NavBar/NavBar';
import TopButton from './components/TopButton/TopButton';
import Hero from './components/Hero/Hero';
import AboutMe from './components/Sections/AboutMe/AboutMe';
import Skills from './components/Sections/Skills/Skills';
import WorksView from './components/Sections/WorksView/WorksView';
import Works from './components/Sections/Works/Works';
import Contact from './components/Sections/Contact/Contact';

import './scss/global.scss';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
            <NavBar startAnimation={isLoaded} />
            <div
                id="wrap"
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            >
                <Hero startAnimation={isLoaded} />
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
