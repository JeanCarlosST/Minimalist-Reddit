import React from "react"
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils";
import moment from "moment";

const PostItem = ({post}) => {
    const { data } = post;
    const title = data.title;
    const postHint = data.post_hint;
    const score = formatNumber(data.score);
    const subreddit = data.subreddit_name_prefixed;
    const postedBy = data.author;
    const timeElapsed = moment.unix(data.created_utc).fromNow();
    const numComments = formatNumber(data.num_comments);
    const postLink = `/${subreddit}/comments/${data.id}`;
    const isVideo = data.is_video;
    const source = isVideo ? data.media.reddit_video.fallback_url : data.url;
    const isImage = postHint === "image";
    const isLink = postHint === "link";
    const thumbnail = data.thumbnail
    
    return (
        <Link to={postLink} className="postItem">
            <div className="postVotesContainer">
                <button type="button" className="upVote voteButton">
                    <FaArrowAltCircleUp/>
                </button>
                <p>{score}</p>
                <button type="button" className="downVote voteButton">
                    <FaArrowAltCircleDown/>
                </button>
            </div>
            <div className="postContentContainer">
                <div className="postContentHeader">
                    <h4>{title}</h4> 
                    {isLink && <img src={thumbnail} className="thumbnail"/>}
                </div>
                { isVideo && <video src={source} className="postMedia" autoPlay muted controls></video> }
                { isImage && <img src={source} className="postMedia"/>}
                { isLink && <a href={source} className="externalLink">External link</a>}
                <div className="postInfo">
                    <p>
                        <Link to={subreddit} className="subredditLink">{subreddit}</Link>
                        {" · "} 
                        <span className="postedBy">Posted by {postedBy}</span>
                    </p>
                    <p className="timeElapsed">
                        {timeElapsed}
                    </p>
                    <p className="numComments">
                        <FaRegComments/>
                        <span>{numComments}</span>
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostItem;