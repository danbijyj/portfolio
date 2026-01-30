import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { worksData } from '../../../assets/data/worksData';
import WorksModal from './WorksModal';
import './Works.scss';

gsap.registerPlugin(ScrollToPlugin);

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return isMobile;
};

const getFontSizes = () => {
    const w = window.innerWidth;
    if (w <= 480) return { active: 36, inactive: 24 };
    if (w <= 768) return { active: 48, inactive: 28 };
    return { active: 70, inactive: 50 };
};

const Works = () => {
    const isMobile = useIsMobile();
    const filtersRefs = useRef([]);
    const itemsWrapRef = useRef(null);
    const itemsRef = useRef(null);

    const [filter, setFilter] = useState('all');
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const filters = [
        { label: 'All', filter: 'all' },
        { label: 'Personal', filter: 'personal' },
        { label: 'Team', filter: 'team' },
        { label: 'Backend', filter: 'backend' },
    ];

    const filteredItems = useMemo(() => {
        if (filter === 'all') return worksData;
        return worksData.filter((i) => i.tag.includes(filter));
    }, [filter]);

    const col1 = useMemo(
        () => filteredItems.filter((_, i) => i % 2 === 0),
        [filteredItems],
    );
    const col2 = useMemo(
        () => filteredItems.filter((_, i) => i % 2 !== 0),
        [filteredItems],
    );

    useEffect(() => {
        const { active, inactive } = getFontSizes();
        filtersRefs.current.forEach((el, i) => {
            if (!el) return;
            const spans = el.querySelectorAll('span');
            gsap.set(spans, {
                fontSize: i === 0 ? active : inactive,
            });
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const { active, inactive } = getFontSizes();
            filtersRefs.current.forEach((el, i) => {
                if (!el) return;
                const spans = el.querySelectorAll('span');
                gsap.set(spans, {
                    fontSize: i === activeIndex ? active : inactive,
                });
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeIndex]);

    const animateFontSize = (target, enlarge = true) => {
        if (!target) return;
        const { active, inactive } = getFontSizes();
        const spans = target.querySelectorAll('span');
        gsap.to(spans, {
            fontSize: enlarge ? active : inactive,
            stagger: 0.025,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    const handleFilterClick = (index, filterValue) => {
        if (index === activeIndex) return;
        const prevEl = filtersRefs.current[activeIndex];
        const nextEl = filtersRefs.current[index];
        if (prevEl) animateFontSize(prevEl, false);
        if (nextEl) animateFontSize(nextEl, true);
        setActiveIndex(index);

        const itemsWrap = itemsWrapRef.current;
        const itemsContainer = itemsRef.current;

        gsap.to(itemsContainer, {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: 'power2.inOut',
            onComplete: () => {
                setFilter(filterValue);
                gsap.fromTo(
                    itemsContainer,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.2,
                        ease: 'power2.out',
                        delay: 0.1,
                    },
                );
            },
        });

        gsap.to(itemsWrap, {
            scrollTo: { y: 0 },
            duration: 0.5,
            ease: 'power2.inOut',
        });
    };

    const handleItemClick = (item) => setSelectedItemId(item.id);
    const handleCloseModal = () => setSelectedItemId(null);

    return (
        <section id="works" className="works">
            <div className="inner">
                <div className="filters_wrap">
                    <h2>W*rks</h2>
                    <div className="filters">
                        {filters.map((f, i) => (
                            <div
                                key={f.filter}
                                className={`filter ${
                                    i === activeIndex ? 'active' : ''
                                }`}
                                onClick={() => handleFilterClick(i, f.filter)}
                            >
                                <h3 ref={(el) => (filtersRefs.current[i] = el)}>
                                    {f.label.split('').map((char, idx) => (
                                        <span key={idx}>{char}</span>
                                    ))}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="items_wrap" ref={itemsWrapRef}>
                    <div className="items" ref={itemsRef}>
                        {isMobile ? (
                            <div className="items_col">
                                {filteredItems.map((item) => (
                                    <WorkItem
                                        key={item.id}
                                        item={item}
                                        onClick={handleItemClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {[col1, col2].map((col, colIndex) => (
                                    <div key={colIndex} className="items_col">
                                        {col.map((item) => (
                                            <WorkItem
                                                key={item.id}
                                                item={item}
                                                onClick={handleItemClick}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {selectedItemId && (
                <WorksModal
                    itemId={selectedItemId}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
};

const WorkItem = ({ item, onClick }) => {
    return (
        <div className="item" onClick={() => onClick(item)}>
            <div className="works_item">
                <div className="img_wrap">
                    <img src={item.img} alt={item.title} />
                </div>
                <p className="ctgr">{item.ctgr}</p>
                <div className="title_wrap">
                    <p>{item.title}</p>
                    <div>
                        <span>{item.skill1}</span>
                        <span>{item.skill2}</span>
                    </div>
                </div>
                <div className="line"></div>
                <button>more</button>
            </div>
        </div>
    );
};

export default Works;
