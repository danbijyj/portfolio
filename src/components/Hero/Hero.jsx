import { useEffect } from 'react';
import gsap from 'gsap';
import './style.scss';

const Hero = ({ startAnimation }) => {
    useEffect(() => {
        const h1 = document.querySelector('#hero .inner h1');
        if (h1) {
            gsap.set(h1, { opacity: 0 });
        }
    }, []);

    useEffect(() => {
        if (!startAnimation) return;

        const h1 = document.querySelector('#hero .inner h1');
        if (!h1) return;

        const text = h1.textContent || '';
        h1.innerHTML = '';
        const fragment = document.createDocumentFragment();

        text.split('').forEach((ch) => {
            const span = document.createElement('span');
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            fragment.appendChild(span);
        });

        h1.appendChild(fragment);
        gsap.set(h1, { opacity: 1 });
        const spans = h1.querySelectorAll('span');
        gsap.to(spans, {
            y: 0,
            opacity: 1,
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
                <p className="whoami">{'<Who am I ?>'}</p>
                <h1>Frontend Developer</h1>
                <p>{'</Who codes with clarity'}</p>
                <p>{'and design sense >'}</p>
            </div>
        </section>
    );
};

export default Hero;
