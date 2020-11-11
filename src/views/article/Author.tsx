import React from "react";
import {Avatar, Button} from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import {IUser, Post} from "./types";
import {relativeTimeFormatter, timeFormatter} from '../../utils/formatter';
import classNames from "classnames";


interface IPostAuthor {
    user: Partial<IUser>,
    post?: Partial<Post>,
    border?: Boolean,
    background?: Boolean,
    watch?: boolean,
    style?: any,
    className?: any,
    noPadding?: boolean
}

const Author:React.FC<IPostAuthor> = (props) => {
    const { user, post, style, className, watch } = props;
    const customClass = typeof className === 'string' ? {[className]: true} : className;
    const wrapperClassName = classNames({
        "author-wrapper w-full flex items-center justify-start py-3": true,
        "border border-gray-300 rounded-sm": !!props.border,
        "bg-gray-200 border-0 rounded-sm": !!props.background,
        "px-4": !props.noPadding,
        ...customClass
    })
    return (
        <div className={wrapperClassName} style={style}>
            <Avatar src={user.avatar} icon={<UserOutlined />} size={"large"} />
            <div className="author-info flex-1 ml-3">
                <div className="text-base font-bold">{ user.nickname || user.name }</div>
                {
                    post ? <div className="text-sm text-gray-500">本文发表于{ relativeTimeFormatter(post.createdAt || '') }</div>
                        : <div className="text-sm text-gray-500">加入于{ timeFormatter(user.createdAt || '') }</div>
                }
            </div>
            {
                watch && <Button
                    type={props.background ? "primary" : "default"}
                    icon={<PlusOutlined />}
                >关注</Button>
            }
        </div>
    );
}

export default Author;
