import { useEffect } from 'react';
import gsap from 'gsap';
import './style.scss';

const Loader = ({ onComplete }) => {
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
            const marquees = gsap.utils.toArray('.marquee');
            const widths = marquees.map((el) => el.scrollWidth);
            const maxWidth = Math.max(...widths);
            marquees.forEach((el) => {
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

            tl.to('.clip_top', { height: '33.3vh', duration: 1.5 })
                .to('.clip_bottom', { height: '33.3vh', duration: 1.5 }, '<')
                .to('.clip_top .marquee', { x: '0%', duration: 2 }, '-=0.5')
                .to('.clip_center .marquee', { x: '0%', duration: 2 }, '<')
                .to('.clip_bottom .marquee', { x: '0%', duration: 2 }, '<')
                .to('.loader', { opacity: 0, duration: 1.5, delay: 1 });
        };

        runAnimation();

        const handleResize = () => {
            gsap.set(
                [
                    '.clip_top .marquee',
                    '.clip_center .marquee',
                    '.clip_bottom .marquee',
                ],
                { clearProps: 'transform' }
            );
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
            <section className="loader_clip clip_top">
                <div className="marquee">
                    <div className="marque_container">
                        <span>Hello World&nbsp;</span>
                        <span>Hello World&nbsp;</span>
                        <span>Hello World&nbsp;</span>
                        <span>Hello World&nbsp;</span>
                        <span>Hello World&nbsp;</span>
                    </div>
                </div>
            </section>
            <section className="clip_center">
                <div className="marquee">
                    <div className="marquee_container">
                        <span>JANGYOOJUNG&nbsp;</span>
                        <span>JANGYOOJUNG&nbsp;</span>
                        <span>JANGYOOJUNG&nbsp;</span>
                        <span>JANGYOOJUNG&nbsp;</span>
                        <span>JANGYOOJUNG&nbsp;</span>
                    </div>
                </div>
            </section>
            <section className="loader_clip clip_bottom">
                <div className="marquee">
                    <div className="marquee_container">
                        <span>Portfolio&nbsp;</span>
                        <span>Portfolio&nbsp;</span>
                        <span>Portfolio&nbsp;</span>
                        <span>Portfolio&nbsp;</span>
                        <span>Portfolio&nbsp;</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Loader;
