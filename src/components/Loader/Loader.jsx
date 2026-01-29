import { useEffect } from 'react';
import gsap from 'gsap';
import './style.scss';

const Loader = ({ onComplete }) => {
    const marquees = [
        { className: 'clip_top', text: 'Hello World', repeat: 6 },
        { className: 'clip_center', text: 'JANGYOOJUNG', repeat: 12 },
        { className: 'clip_bottom', text: 'Portfolio', repeat: 6 },
    ];

    const renderSpans = (text, count) =>
        [...Array(count)].map((_, i) => <span key={i}>{text}&nbsp;</span>);

    useEffect(() => {
        const loader = document.querySelector('.loader');
        loader.classList.add('ready');
        gsap.set(loader, { opacity: 1 });
        gsap.set('.marquee', { xPercent: -50, yPercent: -50 });

        const tl = gsap.timeline({
            defaults: { ease: 'power4.inOut' },
            onComplete: () => {
                loader.style.display = 'none';
                loader.style.pointerEvents = 'none';
                if (onComplete) onComplete();
            },
        });

        const setStartX = () => {
            const top = document.querySelector('.clip_top .marquee');
            const center = document.querySelector('.clip_center .marquee');
            const bottom = document.querySelector('.clip_bottom .marquee');

            if (!top || !center || !bottom) return;

            const vw = window.innerWidth;

            const offR = (el) => vw / 2 + el.offsetWidth / 2;
            const offL = (el) => -(vw / 2 + el.offsetWidth / 2);

            gsap.set(top, { x: offR(top) });
            gsap.set(center, { x: offL(center) });
            gsap.set(bottom, { x: offR(bottom) });
        };

        const runAnimation = () => {
            tl.clear();

            gsap.set('.clip_top', { height: 0 });
            gsap.set('.clip_center', { height: 0 });
            gsap.set('.clip_bottom', { height: 0 });

            setStartX();

            tl.to('.clip_top', { height: '33.3vh', duration: 1.2 })
                .to('.clip_center', { height: '33.3vh', duration: 1.2 }, '<')
                .to('.clip_bottom', { height: '33.3vh', duration: 1.2 }, '<')

                .to('.clip_top .marquee', { x: 0, duration: 1.3 }, '-=0.5')
                .to('.clip_center .marquee', { x: 0, duration: 1.3 }, '<')
                .to('.clip_bottom .marquee', { x: 0, duration: 1.3 }, '<')

                .to('.loader', { opacity: 0, duration: 1.2, delay: 1 });
        };

        runAnimation();

        const handleResize = () => {
            setStartX();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div className="loader">
            {marquees.map((m, i) => (
                <section key={i} className={`loader_clip ${m.className}`}>
                    <div className="marquee">
                        <div className="marquee_container">
                            {renderSpans(m.text, m.repeat)}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Loader;
