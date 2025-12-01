import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { worksData } from '../../../assets/data/worksData';
import WorksModal from './WorksModal';
import './style.scss';

gsap.registerPlugin(ScrollToPlugin);

const Works = () => {
    const filtersRefs = useRef([]);
    const [filter, setFilter] = useState('all');
    const [activeIndex, setActiveIndex] = useState(0);
    const [filteredItems, setFilteredItems] = useState(worksData);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const filters = [
        { label: 'All', filter: 'all' },
        { label: 'Personal', filter: 'personal' },
        { label: 'Team', filter: 'team' },
        { label: 'Backend', filter: 'backend' },
    ];

    const getFontSize = (isActive = false) => {
        const width = window.innerWidth;
        let active = 100;
        let inactive = 60;

        if (width <= 480) {
            active = 48;
            inactive = 28;
        } else if (width <= 768) {
            active = 60;
            inactive = 36;
        }

        return isActive ? `${active}px` : `${inactive}px`;
    };

    useEffect(() => {
        filtersRefs.current.forEach((el, i) => {
            if (!el) return;
            const text = el.textContent;
            el.innerHTML = text
                .split('')
                .map((char) => `<span>${char}</span>`)
                .join('');
            const spans = el.querySelectorAll('span');
            gsap.set(spans, { fontSize: getFontSize(i === 0) });
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            filtersRefs.current.forEach((el, i) => {
                if (!el) return;
                const spans = el.querySelectorAll('span');
                gsap.set(spans, { fontSize: getFontSize(i === activeIndex) });
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeIndex]);

    useEffect(() => {
        if (filter === 'all') setFilteredItems(worksData);
        else setFilteredItems(worksData.filter((i) => i.tag.includes(filter)));
    }, [filter]);

    const animateFontSize = (target, enlarge = true) => {
        const spans = target.querySelectorAll('span');
        gsap.to(spans, {
            fontSize: enlarge ? getFontSize(true) : getFontSize(false),
            stagger: 0.025,
            duration: 0.6,
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

        const itemsWrap = document.querySelector('.items_wrap');
        const itemsContainer = itemsWrap.querySelector('.items');

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
                    }
                );
            },
        });

        gsap.to(itemsWrap, {
            scrollTo: { y: 0 },
            duration: 0.6,
            ease: 'power2.inOut',
        });
    };

    const handleItemClick = (item) => setSelectedItemId(item.id);
    const handleCloseModal = () => setSelectedItemId(null);

    const isMobile = window.innerWidth <= 480;

    const col1 = !isMobile ? filteredItems.filter((_, i) => i % 2 === 0) : null;
    const col2 = !isMobile ? filteredItems.filter((_, i) => i % 2 !== 0) : null;

    return (
        <section id="works" className="works">
            <div className="inner">
                <div className="filters_wrap">
                    <h2>W*rks</h2>
                    <div className="filters">
                        {filters.map((f, i) => (
                            <div
                                key={i}
                                className={`filter ${
                                    i === activeIndex ? 'active' : ''
                                }`}
                                onClick={() => handleFilterClick(i, f.filter)}
                            >
                                <h3 ref={(el) => (filtersRefs.current[i] = el)}>
                                    {f.label}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="items_wrap">
                    <div className="items">
                        {isMobile ? (
                            <div className="items_col">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="item"
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className="works_item">
                                            <div className="img_wrap">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                />
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
                                ))}
                            </div>
                        ) : (
                            <>
                                {[col1, col2].map((col, colIndex) => (
                                    <div key={colIndex} className="items_col">
                                        {col.map((item) => (
                                            <div
                                                key={item.id}
                                                className="item"
                                                onClick={() =>
                                                    handleItemClick(item)
                                                }
                                            >
                                                <div className="works_item">
                                                    <div className="img_wrap">
                                                        <img
                                                            src={item.img}
                                                            alt={item.title}
                                                        />
                                                    </div>
                                                    <p className="ctgr">
                                                        {item.ctgr}
                                                    </p>
                                                    <div className="title_wrap">
                                                        <p>{item.title}</p>
                                                        <div>
                                                            <span>
                                                                {item.skill1}
                                                            </span>
                                                            <span>
                                                                {item.skill2}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="line"></div>
                                                    <button>more</button>
                                                </div>
                                            </div>
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

export default Works;
