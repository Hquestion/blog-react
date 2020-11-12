import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import {IComment} from "./types";
import {Avatar, Button} from "antd";
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import {relativeTimeFormatter} from "../../utils/formatter";
import { useLoginContext } from "../../context/login-context";
import UserCommentInput from "./UserCommentInput";
import './UserCommentItem.scss';

interface IUserCommentItemProp {
    comment: Partial<IComment>,
    onCommentSuccess: () => any
}

const UserCommentItem = (props: IUserCommentItemProp) => {
    const { comment, onCommentSuccess } = props;
    const { userMeta, content, commentMeta, createdAt, uuid, postMeta, post } = comment;
    const [isSubCommentVisible, setIsSubCommentVisible] = useState(false);
    const { state } = useLoginContext();
    const ref = useRef();
    useEffect(() => {
        const handleMousedown = (e: any) => {
            if(ref && ref.current) {
                if (!((ref.current as any).contains(e.target))) {
                    setIsSubCommentVisible(false);
                }
            }
        }
        document.addEventListener('mousedown', handleMousedown, true);
        return () => {
            document.removeEventListener('mousedown', handleMousedown, true);
        }
    }, []);
    const handleDelComment = () => {}
    const handleComment = () => {
        setIsSubCommentVisible(true);
    }
    const handleCommentSuccess = () => {
        setIsSubCommentVisible(false);
        onCommentSuccess();
    }
    return (
        <div className="user-comment-item flex justify-start items-start px-4 py-1 bg-white">
            <Avatar className="" src={userMeta && userMeta.avatar} icon={<UserOutlined /> } />
            <div className="user-comment-info ml-4 flex-1">
                <div className="user-name font-bold">{userMeta && (userMeta.nickname || userMeta.name || '')}</div>
                { commentMeta && (
                    <div className="parent-comment bg-gray-100 border-gray-200 rounded px-2 py-1 border text-sm">
                        回复<Link className="text-blue-500" to={'/'}>@{commentMeta.userMeta && commentMeta.userMeta.nickname}</Link>:
                        <span className="ml-1">{commentMeta.content}</span>
                    </div>
                )
                }
                <div className="user-comment-main text-gray-600">
                    {content}
                </div>
                <div className="user-comment-footer text-gray-400 mt-1 flex justify-between items-center">
                    <div className="text-sm">
                        {relativeTimeFormatter(createdAt || '')}
                        { state.user && state.user.uuid === (userMeta && userMeta.uuid)
                        && <span className="ml-2 cursor-pointer hover:text-gray-800 del-icon" onClick={handleDelComment}>删除</span> }
                    </div>
                    <Button
                        type="text"
                        size="small"
                        className="text-gray-500 comment-btn"
                        icon={<MessageOutlined />}
                        onClick={handleComment}
                    >回复</Button>
                </div>
                <div ref={ref as any}>
                    { isSubCommentVisible && (
                        <UserCommentInput
                            postId={post || ''}
                            comment={props.comment}
                            onCommentSuccess={handleCommentSuccess}
                        />
                    ) }
                </div>
            </div>
        </div>
    );
}

export default UserCommentItem;
