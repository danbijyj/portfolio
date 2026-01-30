import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.scss';

const TITLE = 'Frontend Developer';

const Hero = ({ startAnimation }) => {
    const titleRef = useRef(null);

    const splitText = (text) =>
        text.split('').map((ch, i) => (
            <span key={i} className="char">
                {ch === ' ' ? '\u00A0' : ch}
            </span>
        ));

    useEffect(() => {
        if (!startAnimation) return;

        const chars = titleRef.current?.querySelectorAll('.char');
        if (!chars) return;

        gsap.set(chars, { opacity: 0, y: 50 });

        gsap.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 1,
            ease: 'power3.out',
        });
    }, [startAnimation]);

    return (
        <section id="hero" className="hero">
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="inner">
                <p className="whoami">{'<Who am I? />'}</p>
                <h1 ref={titleRef}>{splitText(TITLE)}</h1>
                <p>{'<based on structured web publishing'}</p>
                <p>{'who codes with clarity and design sense />'}</p>
            </div>
        </section>
    );
};

export default Hero;
