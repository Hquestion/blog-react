import React from "react";
import {Avatar, Button} from "antd";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import {IUser} from "../article/types";
import './UserProfile.scss';

interface IUserProfileProp {
    user: Partial<IUser>
}

const UserProfile = (props: IUserProfileProp) => {
    const { user } = props;
    return (
        <div className="user-profile bg-white flex items-start justify-start p-4">
            <Avatar className="user-profile-avatar" src={user.avatar} size={"large"} icon={<UserOutlined />} />
            <div className="user-profile__main ml-2 flex-1">
                <div className="nickname font-bold text-2xl">{user.nickname || user.name}</div>
                <div className="company">{user.company }</div>
                <div className="location">{user.location}</div>
                <div className="tech-stack">
                    技术栈
                </div>
            </div>
            <Button type="default" icon={<EditOutlined />} className="ml-4">编辑</Button>
        </div>
    );
};

export default UserProfile;
