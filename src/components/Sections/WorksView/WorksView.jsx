import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { items } from '../../../assets/data/worksViewData';
import './WorksView.scss';

gsap.registerPlugin(ScrollToPlugin);

const itemPositions = [
    { top: '-5%', left: '5%' },
    { top: '40%', left: '-2%' },
    { top: '25%', left: '20%' },
    { top: '8%', left: '35%' },
    { top: '60%', left: '40%' },
    { top: '70%', left: '15%' },
    { top: '-2%', left: '55%' },
    { top: '10%', left: '85%' },
    { top: '40%', left: '60%' },
    { top: '80%', left: '70%' },
    { top: '50%', left: '80%' },
];

const WorksView = () => {
    const galleryRef = useRef(null);
    const itemRefs = useRef([]);

    const scrollToWorks = () => {
        gsap.to(window, {
            duration: 0.5,
            scrollTo: '#works',
            ease: 'power2.inOut',
        });
    };

    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        const isMobile = window.innerWidth <= 768;
        if (isMobile) return;

        const handleMouseMove = (e) => {
            itemRefs.current.forEach((el, index) => {
                if (!el) return;

                const speed = items[index]?.parallaxSpeed ?? 0.02;
                const deltaX = (e.clientX - window.innerWidth / 2) * speed;
                const deltaY = (e.clientY - window.innerHeight / 2) * speed;

                gsap.to(el, {
                    x: deltaX,
                    y: deltaY,
                    duration: 0.6,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
            });
        };

        gallery.addEventListener('mousemove', handleMouseMove);

        return () => {
            gallery.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section id="worksview" className="worksview">
            <div className="title">
                <h2>
                    CREATIVE
                    <br />
                    MY W*RKS
                </h2>
                <button onClick={scrollToWorks}>Works All View</button>
            </div>
            <div className="gallery" ref={galleryRef}>
                {items.map((itemData, index) => {
                    const pos = itemPositions[index];
                    return (
                        <div
                            key={index}
                            className="item"
                            ref={(el) => (itemRefs.current[index] = el)}
                            style={{
                                top: pos.top,
                                left: pos.left,
                            }}
                        >
                            <img src={itemData.img} alt="" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WorksView;
