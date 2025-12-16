import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const riseRef = useRef(null);

    useEffect(() => {
        const el = riseRef.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { y: 90, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#aboutme',
                    start: 'top 30%',
                    toggleActions: 'restart none none reverse',
                },
            }
        );
    }, []);

    return (
        <section id="aboutme" className="aboutme">
            <div className="inner">
                <h2>Ab*ut me</h2>
                <div className="con">
                    <div className="pic" ref={riseRef}>
                        <img src="/images/me.jpg" alt="" />
                        <span>*</span>
                    </div>
                    <div className="intro">
                        <div>
                            <h3>
                                장유정<span>JANG YOO JUNG</span>
                            </h3>
                            <p>
                                안녕하세요. 감각과 논리를 모두 갖춘 개발자를
                                꿈꾸는 장유정입니다.
                            </p>
                            <p>
                                깔끔한 코드와 자연스러운 디자인, 사용자 중심의
                                사고를 중요하게 생각하며, 보기에도 좋고
                                사용하기에도 편한 웹을 만드는 것을 추구합니다.
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
                                        <span>* </span>UX/UI Design
                                    </li>
                                    <li>
                                        <span>* </span>Web Publisher
                                    </li>
                                    <li>
                                        <span>* </span>Frontend Developer
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
