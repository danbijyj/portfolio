import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.scss';

const Loader = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const repeatCount = 5;

    const marquees = [
        { id: 'top', className: 'clip_top', text: 'Hello World' },
        { id: 'center', className: 'clip_center', text: 'JANGYOOJUNG' },
        { id: 'bottom', className: 'clip_bottom', text: 'Portfolio' },
    ];

    const renderSpans = (text) =>
        [...Array(repeatCount)].map((_, i) => (
            <span key={i}>{text}&nbsp;</span>
        ));

    useEffect(() => {
        const loaderEl = loaderRef.current;
        if (!loaderEl) return;

        const normalizeWidths = () => {
            const els = gsap.utils.toArray(
                loaderEl.querySelectorAll('.marquee'),
            );
            const widths = els.map((el) => el.scrollWidth);
            const maxWidth = Math.max(...widths);
            els.forEach((el) => {
                el.style.width = `${maxWidth}px`;
            });
        };

        const ctx = gsap.context(() => {
            loaderEl.classList.add('ready');
            gsap.set(loaderEl, { opacity: 1 });

            const tl = gsap.timeline({
                defaults: { ease: 'power4.inOut' },
                onComplete: () => {
                    onComplete?.();
                },
            });

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
                .to(loaderEl, { opacity: 0, duration: 0.5, delay: 1.5 });
        }, loaderRef);

        const handleResize = () => {
            normalizeWidths();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx.revert();
        };
    }, [onComplete]);

    return (
        <div className="loader" ref={loaderRef}>
            {marquees.map((m) => (
                <section key={m.id} className={`loader_clip ${m.className}`}>
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
