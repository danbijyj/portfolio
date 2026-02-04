import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../../../assets/data/skillsData';
import SkillBox from './SkillBox';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef = useRef(null);
    const circleRef = useRef(null);
    const progressRef = useRef(null);
    const boxRefs = useRef([]);

    const TOTAL = skillsData.length;

    const getCircleSize = () => {
        const w = window.innerWidth;
        if (w <= 480) return 1000;
        if (w <= 768) return 2000;
        return 4000;
    };

    const showBox = (index) => {
        boxRefs.current.forEach((box, i) => {
            gsap.set(box, {
                opacity: i === index ? 1 : 0,
                zIndex: i === index ? 2 : 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        });
    };

    const allSkillNames = useMemo(() => {
        return skillsData.flatMap((skill) => {
            if (skill.items) {
                return skill.items.map((item) => item.name);
            }
            if (skill.groups) {
                return skill.groups.flatMap((group) =>
                    group.items.map((item) => item.name),
                );
            }
            return [];
        });
    }, []);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                circleRef.current,
                { width: 0, height: 0, opacity: 0, top: '5%' },
                {
                    width: getCircleSize(),
                    height: getCircleSize(),
                    opacity: 1,
                    top: '12%',
                    duration: 3,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                },
            );

            gsap.set(boxRefs.current, {
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
            });

            showBox(0);

            let prevIndex = 0;

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${TOTAL * 200}`,
                scrub: 0.5,
                pin: true,
                onUpdate: (self) => {
                    const p = self.progress;
                    const index = Math.min(TOTAL - 1, Math.floor(p * TOTAL));

                    gsap.to(progressRef.current, {
                        scaleY: p,
                        transformOrigin: 'top',
                        ease: 'none',
                        duration: 0.1,
                    });

                    if (index !== prevIndex) {
                        showBox(index);
                        setActiveIndex(index);
                        prevIndex = index;
                    }
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleListClick = (index) => {
        setActiveIndex(index);
        showBox(index);

        gsap.to(progressRef.current, {
            scaleY: index / (TOTAL - 1),
            transformOrigin: 'top',
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    return (
        <section ref={sectionRef} id="skills" className="skills">
            <span className="circle" ref={circleRef} />

            <div className="inner">
                <div className="skill_wrap">
                    <h2>Skills</h2>

                    <div className="contents">
                        <div className="col">
                            <div className="box_wrap">
                                {skillsData.map((skill, i) => (
                                    <SkillBox
                                        key={skill.category}
                                        data={skill}
                                        ref={(el) => (boxRefs.current[i] = el)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="col">
                            <div className="list_wrap">
                                {skillsData.map((skill, i) => (
                                    <button
                                        key={skill.category}
                                        className={`list ${
                                            activeIndex === i ? 'active' : ''
                                        }`}
                                        onClick={() => handleListClick(i)}
                                    >
                                        {skill.category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="progress-bar">
                            <div className="progress" ref={progressRef} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="skills_line">
                <div>
                    {[0, 1].map((i) => (
                        <span key={i}>{allSkillNames.join(' ')}&nbsp;</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
