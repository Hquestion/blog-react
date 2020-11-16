import React, {useEffect, useRef, useState} from "react";
import {Avatar, Button, Input} from "antd";
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import { useLoginContext } from "../../context/login-context";
import {addComment} from "../../api/comment";
import {IComment} from "./types";

interface IUserCommentInputProp {
    postId: string,
    comment?: Partial<IComment>,
    onCommentSuccess: () => any;
    autoFocus?: boolean
}

export default function UserCommentInput(props: IUserCommentInputProp) {
    const [input, setInput] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const ref = useRef();
    const { isLogin, toggleLogin } = useLoginContext();
    const { postId, comment, onCommentSuccess, autoFocus } = props;
    useEffect(() => {
        const handleMousedown = (e: any) => {
            if(ref && ref.current) {
                if (!((ref.current as any).contains(e.target))) {
                    setIsFocus(false);
                }
            }
        }
        document.addEventListener('mousedown', handleMousedown, true);
        return () => {
            document.removeEventListener('mousedown', handleMousedown, true);
        }
    }, []);

    const handleComment = () => {
        if (!isLogin()) {
            return toggleLogin(true);
        }
        addComment(postId, input, comment && comment.uuid).promise.then(() => {
            setInput('');
            setIsFocus(false);
            onCommentSuccess();
        });
    }

    return (
        <div className="user-comment-input__wrapper bg-gray-100 px-3 py-3" ref={ref as any}>
            <div className="user-comment-input__main flex items-start justify-start">
                { (!comment || !comment.uuid) && <Avatar size={"default"} icon={<UserOutlined />} /> }
                <Input.TextArea
                    className="ml-2 resize-none"
                    placeholder={(comment && comment.uuid)
                        ? `回复${comment && comment.userMeta && comment.userMeta.nickname}`
                        : "请输入你的评论" }
                    value={input}
                    autoSize
                    rows={1}
                    autoFocus={!!autoFocus}
                    onInput={e => setInput((e as any).target.value)}
                    onFocus={() => setIsFocus(true)}
                />
            </div>
            {
                isFocus && (
                    <div className="user-comment-input__footer flex items-center justify-end mt-2">
                        <Button
                            type="primary"
                            disabled={input.trim() === ''}
                            icon={<CommentOutlined />}
                            onClick={handleComment}
                        >评论</Button>
                    </div>
                )
            }
        </div>
    )
}
