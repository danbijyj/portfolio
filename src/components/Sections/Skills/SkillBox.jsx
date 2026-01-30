import { forwardRef } from 'react';

const SkillBox = forwardRef(({ data }, ref) => {
    if (data.type === 'basic') {
        return (
            <div className="box" ref={ref}>
                <h3 className="box_title">{data.category}</h3>
                <div className="divider"></div>
                <div className="icon_grid">
                    {data.items.map((item, i) => (
                        <div className="icon_item" key={i}>
                            <img src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (data.type === 'grouped') {
        return (
            <div className="box others_box" ref={ref}>
                {data.groups.map((group, i) => (
                    <div className="group" key={i}>
                        <h4 className="group_title">{group.title}</h4>
                        <div className="divider"></div>
                        <div className="icon_grid">
                            {group.items.map((item, j) => (
                                <div className="icon_item" key={j}>
                                    <img src={item.icon} alt={item.name} />
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return null;
});

export default SkillBox;
