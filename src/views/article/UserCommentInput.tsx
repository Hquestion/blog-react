import React, {useEffect, useRef, useState} from "react";
import {Avatar, Button, Input} from "antd";
import { UserOutlined, MessageOutlined } from '@ant-design/icons';

export default function UserCommentInput() {
    const [input, setInput] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const handleMousedown = (e: any) => {
            console.log(11)
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
    return (
        <div className="user-comment-input__wrapper bg-gray-100 px-3 py-3" ref={ref as any}>
            <div className="user-comment-input__main flex items-start justify-start">
                <Avatar size={"default"} icon={<UserOutlined />} />
                <Input.TextArea
                    className="ml-2 resize-none"
                    placeholder="请输入你的评论"
                    value={input}
                    autoSize
                    rows={1}
                    onInput={e => setInput((e as any).target.value)}
                    onFocus={() => setIsFocus(true)}
                />
            </div>
            {
                isFocus && (
                    <div className="user-comment-input__footer flex items-center justify-end mt-2">
                        <Button type="primary" disabled={input.trim() === ''} icon={<MessageOutlined />}>评论</Button>
                    </div>
                )
            }
        </div>
    )
}
