import { useEffect } from 'react';
import { worksData } from '../../../assets/data/worksData';
import './styleModal.scss';

const WorksModal = ({ itemId, onClose }) => {
    const item = worksData.find((data) => data.id === itemId);
    if (!item) return null;

    useEffect(() => {
        const html = document.documentElement;
        const scrollY = window.scrollY;
        const originalScrollBehavior = getComputedStyle(html).scrollBehavior;
        html.style.scrollBehavior = 'auto';
        html.dataset.scrollY = scrollY;
        html.style.overflowY = 'scroll';
        html.style.position = 'fixed';
        html.style.top = `-${scrollY}px`;
        html.style.width = '100%';

        return () => {
            const savedY = Number(html.dataset.scrollY || 0);
            html.style.position = '';
            html.style.top = '';
            window.scrollTo(0, savedY);
            html.style.overflowY = '';
            html.style.width = '';
            html.style.scrollBehavior = originalScrollBehavior;
            delete html.dataset.scrollY;
        };
    }, []);

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <button className="close_btn" onClick={onClose}>
                    ✕
                </button>
                <div className="content_wrap">
                    <div className="text">
                        <p className="ctgr">{item.ctgr}</p>
                        <div className="title_wrap">
                            <h2>{item.title}</h2>
                            {item.responsive && <span>반응형</span>}
                        </div>
                        <p className="desc">{item.desc}</p>
                        {item.type === 'personal' ? (
                            <ul className="detail_list">
                                <li>
                                    <span className="label">페이지구성</span>
                                    <span className="value">
                                        {item.details.structure}
                                    </span>
                                </li>
                                <li>
                                    <span className="label">수행비율</span>
                                    <span className="value">
                                        {item.details.ratio}
                                    </span>
                                </li>
                            </ul>
                        ) : (
                            <ul className="detail_list">
                                <li>
                                    <span className="label">페이지구성</span>
                                    <span className="value">
                                        {item.details.structure}
                                    </span>
                                </li>
                                <li>
                                    <span className="label">주요기능</span>
                                    <span className="value">
                                        {item.details.func}
                                    </span>
                                </li>
                                <li>
                                    <span className="label">팀원수</span>
                                    <span className="value">
                                        {item.details.team_size}명
                                    </span>
                                </li>
                                <li>
                                    <span className="label">수행파트</span>
                                    <span className="value">
                                        {item.details.role}
                                    </span>
                                </li>
                            </ul>
                        )}
                        <div className="tags">
                            {item.tags?.map((tag, i) => (
                                <span key={i}>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="img_wrap">
                        <img src={item.img} alt={item.title} />
                    </div>
                </div>
                <div className="btn_wrap">
                    {item.links?.plan && (
                        <a href={item.links.plan} target="_blank">
                            기획서
                        </a>
                    )}
                    {item.links?.docu && (
                        <a href={item.links.docu} target="_blank">
                            화면정의서
                        </a>
                    )}
                    {item.links?.github && (
                        <a href={item.links.github} target="_blank">
                            GitHub
                        </a>
                    )}
                    {item.links?.site && (
                        <a href={item.links.site} target="_blank">
                            Web Site
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorksModal;
