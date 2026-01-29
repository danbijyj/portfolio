import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Contact.scss';

const Contact = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marqueeInner = marqueeRef.current.querySelector('.marquee_inner');
        const marqueeParts = marqueeInner.querySelectorAll('.marquee_part');

        marqueeParts.forEach((part) => {
            const clone = part.cloneNode(true);
            marqueeInner.appendChild(clone);
        });

        const tween = gsap.to(marqueeInner, {
            x: '-50%',
            repeat: -1,
            duration: 70,
            ease: 'linear',
        });

        let currentScroll = 0;
        let isScrollingDown = true;

        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            isScrollingDown = scrollTop > currentScroll;

            gsap.to(tween, {
                timeScale: isScrollingDown ? 1 : -1,
                overwrite: true,
            });

            currentScroll = scrollTop;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            tween.kill();
        };
    }, []);

    return (
        <section id="contact" className="contact">
            <div className="contact_marquee" ref={marqueeRef}>
                <div className="marquee_inner">
                    {[...Array(5)].map((_, i) => (
                        <div className="marquee_part" key={i}>
                            {
                                '<frontend="developer" jangyoojung="portfolio" /> '
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div className="inner">
                <h2>C*ntact</h2>
                <p className="getintouch">get in touch</p>
                <ul>
                    <li>
                        <img src="./images/con_git.png" alt="깃허브주소" />
                        <a href="https://github.com/danbijyj" target="_blank">
                            github.com/danbijyj
                        </a>
                    </li>
                    <li>
                        <img src="./images/con_mail.png" alt="이메일" />
                        danbijyj@naver.com
                    </li>
                    <li>
                        <img src="./images/con_kakao.png" alt="카카오톡ID" />
                        sstation
                    </li>
                </ul>
                <div className="copy">
                    <p className="thanks">Thanks for visiting</p>
                    <p className="copyright">
                        ⓒ Jang Yoo Jung. All rights reserved.
                    </p>
                </div>
                <div className="left">
                    <img src="./images/star_left.png" alt="" />
                </div>
                <div className="right">
                    <img src="./images/star_right.png" alt="" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
