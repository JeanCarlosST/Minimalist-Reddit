import React from "react";
import { formatNumber, isHexLight } from "../../utils";
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'
import styles from "./SubredditResultItem.module.css";
import { useNavigate } from "react-router-dom";

const SubredditResultItem = ({subreddit}) => {
    const navigate = useNavigate();
    const title = subreddit.title;
    const prefixedName = subreddit.display_name_prefixed;
    const bannerColor = subreddit.primary_color;
    const subscribers = formatNumber(subreddit.subscribers);
    let icon = subreddit.icon_img;
    let textColor = "#FFF";
    
    if(!icon)
        icon = DefaultIcon;

    if(isHexLight(bannerColor))
        textColor = "#000";

    const handleClick = () => {
        navigate(`/${prefixedName}`);
    }

    return (
        <div className={styles.subredditResultItem} onClick={handleClick}>
            <div className={styles.itemHeader} style={{ backgroundColor: bannerColor }}>
                <img src={icon}/>
                <span className={styles.name} style={{ color: textColor }}>{prefixedName}</span>
            </div>
            <div className={styles.itemBody}>
                <h4>{title}</h4>
                <div className={styles.info}>
                    <hr/>
                    <span className={styles.subscribers}>{subscribers}</span>
                    <span>Subscribers</span>
                </div>
            </div>
        </div>
    )
}

export default SubredditResultItem;