import React from "react";
import { formatNumber, isHexLight } from "../../utils";
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "./SubredditResultItem.module.css";
import { useNavigate } from "react-router-dom";

const SubredditResultItem = ({subreddit, isFetching}) => {
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
                { !isFetching ? <img src={icon}/> : <Skeleton width={60} height={60} borderRadius={30} />}
                <span className={styles.name} style={{ color: textColor }}>
                    { !isFetching ? prefixedName : <Skeleton width={40}/>}
                </span>
            </div>
            <div className={styles.itemBody}>
                <h4>{!isFetching ? title : <Skeleton />}</h4>
                <div className={styles.info}>
                    <hr/>
                    <span className={styles.subscribers}>
                        { !isFetching ? subscribers : <Skeleton width={50}/>}
                    </span>
                    <span>Subscribers</span>
                </div>
            </div>
        </div>
    )
}

export default SubredditResultItem;