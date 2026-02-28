import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutMe.scss';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const sectionRef = useRef(null);
    const picRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || !picRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                picRef.current,
                { y: 90, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 30%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="aboutme" className="aboutme" ref={sectionRef}>
            <div className="inner">
                <h2>Ab*ut me</h2>
                <div className="con">
                    <div className="pic" ref={picRef}>
                        <img src="/images/me.jpg" alt="about me" />
                        <span>*</span>
                    </div>
                    <div className="intro">
                        <div>
                            <h3>
                                장유정<span>JANG YOO JUNG</span>
                            </h3>
                            <p>
                                디자인과 웹 퍼블리싱 실무 경험을 기반으로 React
                                환경에서 사용자 인터페이스를 구현하는 UI
                                Developer 장유정입니다.
                            </p>
                            <p>
                                사용자 경험을 고려한 화면 설계와 구조적인 마크업
                                역량을 바탕으로 디자인 의도를 실제 서비스 화면에
                                안정적으로 구현합니다.
                            </p>
                            <p>
                                디자인, 퍼블리싱, 프론트엔드 개발을 바탕으로
                                커뮤니케이션을 이해하고 실무에 바로 기여할 수
                                있는 개발자를 목표로 합니다.
                            </p>
                        </div>
                        <div className="spec">
                            <div className="box">
                                <h4>Education</h4>
                                <p>
                                    이젠아카데미 DX교육센터 UX/UI 디자인 웹
                                    프론트엔드개발 부트캠프
                                </p>
                                <p>
                                    정글디자인학원 웹퍼블리싱 프로페셔널
                                    아카데미
                                </p>
                                <ul>
                                    <li>
                                        <span>* </span>UI Developer
                                    </li>
                                    <li>
                                        <span>* </span>Frontend Developer
                                    </li>
                                    <li>
                                        <span>* </span>Web Publisher
                                    </li>
                                </ul>
                            </div>
                            <div className="box">
                                <h4>License</h4>
                                <p>사회복지사 2급</p>
                                <p>커피바리스타 2급</p>
                                <p>웹디자인기능사</p>
                                <p>사무자동화산업기사</p>
                                <p>컴퓨터그래픽스운용기능사</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
