import { useEffect } from 'react';
import gsap from 'gsap';
import './Loader.scss';

const Loader = ({ onComplete }) => {
    const repeatCount = 5;

    const marquees = [
        { className: 'clip_top', text: 'Hello World' },
        { className: 'clip_center', text: 'JANGYOOJUNG' },
        { className: 'clip_bottom', text: 'Portfolio' },
    ];

    const renderSpans = (text) =>
        [...Array(repeatCount)].map((_, i) => (
            <span key={i}>{text}&nbsp;</span>
        ));

    useEffect(() => {
        const loader = document.querySelector('.loader');
        loader.classList.add('ready');
        gsap.set(loader, { opacity: 1 });

        const tl = gsap.timeline({
            defaults: { ease: 'power4.inOut' },
            onComplete: () => {
                loader.style.display = 'none';
                loader.style.pointerEvents = 'none';
                if (onComplete) onComplete();
            },
        });

        const normalizeWidths = () => {
            const els = gsap.utils.toArray('.marquee');
            const widths = els.map((el) => el.scrollWidth);
            const maxWidth = Math.max(...widths);
            els.forEach((el) => {
                el.style.width = `${maxWidth}px`;
            });
        };

        const runAnimation = () => {
            tl.clear();
            normalizeWidths();

            gsap.set('.clip_top', { height: 0 });
            gsap.set('.clip_bottom', { height: 0 });

            gsap.set('.clip_top .marquee', { x: '100%' });
            gsap.set('.clip_center .marquee', { x: '-100%' });
            gsap.set('.clip_bottom .marquee', { x: '100%' });

            tl.to('.clip_top', { height: '33.3vh', duration: 1.2 })
                .to('.clip_bottom', { height: '33.3vh', duration: 1.2 }, '<')

                .to('.clip_top .marquee', { x: '0%', duration: 1.5 }, '-=0.5')
                .to('.clip_center .marquee', { x: '0%', duration: 1.5 }, '<')
                .to('.clip_bottom .marquee', { x: '0%', duration: 1.5 }, '<')
                .to('.loader', { opacity: 0, duration: 1, delay: 1.5 });
        };

        runAnimation();

        const handleResize = () => {
            gsap.set('.marquee', { clearProps: 'transform' });
            runAnimation();
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
                            {renderSpans(m.text)}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Loader;
