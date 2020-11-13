import React from "react";
import {Avatar, Button} from "antd";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import {IUser} from "../article/types";
import './UserBase.scss';

interface IUserBaseProp {
    user: Partial<IUser>
}

const UserBase = (props: IUserBaseProp) => {
    const { user } = props;
    return (
        <div className="user-base bg-white flex items-center justify-start flex-col p-4">
            <Avatar className="user-base-avatar" src={user.avatar} size={"large"} icon={<UserOutlined />} />
            <div className="user-base__main mt-4 w-full flex-1">
                <div className="nickname font-bold text-xl">{user.nickname || user.name}</div>
                <div className="company">{user.company }</div>
                <div className="location">{user.location}</div>
                <div className="tech-stack">
                    技术栈
                </div>
            </div>
        </div>
    );
};

export default UserBase;
