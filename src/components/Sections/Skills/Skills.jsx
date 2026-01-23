import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../../../assets/data/skillsData';
import SkillBox from './SkillBox';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const boxRefs = useRef([]);
    const progressRef = useRef(null);

    useEffect(() => {
        const boxes = boxRefs.current;
        const progress = progressRef.current;

        gsap.timeline({
            scrollTrigger: {
                trigger: '.skills',
                start: 'top 90%',
                end: 'top 20%',
                scrub: 1,
            },
        }).fromTo(
            '.circle',
            { width: 0, height: 0, opacity: 0, top: '5%' },
            {
                width: '4000px',
                height: '4000px',
                opacity: 1,
                top: '12%',
                duration: 3,
            },
        );

        gsap.set(boxes, { opacity: 0, position: 'absolute', top: 0, left: 0 });
        gsap.set(boxes[0], { opacity: 1, zIndex: 2 });

        let prevIndex = 0;

        ScrollTrigger.create({
            trigger: '.skills',
            start: 'top top',
            end: '+=820',
            scrub: 0.5,
            pin: true,
            onUpdate: (self) => {
                const progressVal = self.progress;
                let index = 0;
                if (progressVal < 1 / 3) index = 0;
                else if (progressVal < 2 / 3) index = 1;
                else index = 2;

                gsap.to(progress, {
                    scaleY: progressVal,
                    transformOrigin: 'top',
                    ease: 'none',
                    duration: 0.1,
                });

                if (index !== prevIndex) {
                    boxes.forEach((box, i) => {
                        gsap.set(box, {
                            opacity: i === index ? 1 : 0,
                            zIndex: i === index ? 2 : 1,
                        });
                    });
                    prevIndex = index;
                    setActiveIndex(index);
                }
            },
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    const handleListClick = (index) => {
        setActiveIndex(index);
        const boxes = boxRefs.current;
        boxes.forEach((box, i) => {
            gsap.set(box, {
                opacity: i === index ? 1 : 0,
                zIndex: i === index ? 2 : 1,
            });
        });
        gsap.to(progressRef.current, {
            scaleY: index / (boxes.length - 1),
            transformOrigin: 'top',
            duration: 0.4,
        });
    };

    return (
        <section id="skills" className="skills">
            <span className="circle"></span>
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
                                <div
                                    className={`list ${
                                        activeIndex === 0 ? 'active' : ''
                                    }`}
                                    onClick={() => handleListClick(0)}
                                >
                                    Design
                                </div>
                                <div
                                    className={`list ${
                                        activeIndex === 1 ? 'active' : ''
                                    }`}
                                    onClick={() => handleListClick(1)}
                                >
                                    Frontend
                                </div>
                                <div
                                    className={`list ${
                                        activeIndex === 2 ? 'active' : ''
                                    }`}
                                    onClick={() => handleListClick(2)}
                                >
                                    Others
                                </div>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div className="progress" ref={progressRef}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="skills_line">
                <div>
                    <span>
                        Figma Photoshop HTML CSS SCSS Styled-components
                        Tailwind-CSS Javascript React React-Router Redux-Toolkit
                        Zustand GSAP Github Notion ChatGPT Claude Gemini Vercel
                        Vite Etc.&nbsp;
                    </span>
                    <span>
                        Figma Photoshop HTML CSS SCSS Styled-components
                        Tailwind-CSS Javascript React React-Router Redux-Toolkit
                        Zustand GSAP Github Notion ChatGPT Claude Gemini Vercel
                        Vite Etc.&nbsp;
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Skills;
