import { useEffect, useRef, useState } from 'react';
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

    const showBox = (index) => {
        boxRefs.current.forEach((box, i) => {
            gsap.set(box, {
                opacity: i === index ? 1 : 0,
                zIndex: i === index ? 2 : 1,
            });
        });
    };

    useEffect(() => {
        if (!sectionRef.current) return;
        const w = window.innerWidth;

        const circleSize = w <= 480 ? 1200 : w <= 768 ? 2000 : 4000;

        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                    end: 'top 20%',
                    scrub: 1,
                },
            }).fromTo(
                circleRef.current,
                { width: 0, height: 0, opacity: 0, top: '5%' },
                {
                    width: circleSize,
                    height: circleSize,
                    opacity: 1,
                    top: '12%',
                    duration: 3,
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
                end: '+=600',
                scrub: 0.5,
                pin: true,
                onUpdate: (self) => {
                    const p = self.progress;
                    const index = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;

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
            scaleY: index / (skillsData.length - 1),
            transformOrigin: 'top',
            duration: 0.4,
        });
    };

    return (
        <section ref={sectionRef} id="skills" className="skills">
            <span className="circle" ref={circleRef} />

            <div className="inner">
                <div className="skill_wrap">
                    <h2>Skills</h2>

                    <div className="contents sticky">
                        <div className="col">
                            <div className="box_wrap">
                                {skillsData.map((skill, i) => (
                                    <SkillBox
                                        key={i}
                                        data={skill}
                                        ref={(el) => (boxRefs.current[i] = el)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="col">
                            <div className="list_wrap">
                                {['Design', 'Frontend', 'Others'].map(
                                    (label, i) => (
                                        <div
                                            key={label}
                                            className={`list ${
                                                activeIndex === i
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => handleListClick(i)}
                                        >
                                            {label}
                                        </div>
                                    ),
                                )}
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
                    <span>
                        Figma Photoshop HTML CSS SCSS Styled-components
                        Tailwind-CSS Javascript React React-Router Redux-Toolkit
                        Zustand GSAP RESTAPI Github Notion ChatGPT Claude Gemini
                        Vercel Vite Etc.&nbsp;
                    </span>
                    <span>
                        Figma Photoshop HTML CSS SCSS Styled-components
                        Tailwind-CSS Javascript React React-Router Redux-Toolkit
                        Zustand GSAP RESTAPI Github Notion ChatGPT Claude Gemini
                        Vercel Vite Etc.&nbsp;
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Skills;
