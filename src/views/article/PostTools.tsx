import React, {useEffect, useState} from "react";
import { StarOutlined, LikeOutlined, StarFilled, LikeFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import './PostTools.scss';
import {Post} from "./types";
import { addStar, isStar as isStarAjax } from "../../api/star";
import { useLoginContext } from "../../context/login-context";
import classNames from "classnames";

interface IPostToolsProp {
    onFav: Function,
    onStar: Function,
    post?: Partial<Post>
}

const PostTools: React.FC<IPostToolsProp> = props => {
    const [isStar, setIsStar] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [ highlight, setHighlight ] = useState(false);
    const { post } = props;
    const { uuid }: {uuid: string} = useParams();
    const { isLogin, state } = useLoginContext();
    const starHighlightClass = classNames({
        'is-highlight': highlight,
        'text-yellow-500 starred-icon': true
    });
    useEffect(() => {
        if (!isLogin()) {
            setIsStar(false);
            return;
        }
        isStarAjax(uuid).promise.then(() => {
            setIsStar(true);
        });
    }, [state.token]);
    const handleStar = () => {
        if (!isStar) {
            addStar(uuid).promise.then(() => {
                setIsStar(true);
                setHighlight(true);
                setTimeout(() => {
                    setHighlight(false);
                }, 0);
            });
        }
    }
    const handleFav = () => {}
    return (
        <div className="post-tools text-lg flex flex-col justify-start absolute">
            <div className="post-tool-icon" title="收藏这篇文章">
                { isFav ? <StarFilled className="text-yellow-500" /> : <StarOutlined onClick={handleFav} /> }
            </div>
            <div className="post-tool-icon mt-5" title="喜欢这篇文章">
                { isStar ? <LikeFilled className={starHighlightClass} /> : <LikeOutlined onClick={handleStar} /> }
            </div>
        </div>
    );
}

export default PostTools;
