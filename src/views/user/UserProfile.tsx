import React from "react";
import {Avatar, Button} from "antd";
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import {IUser} from "../article/types";
import './UserProfile.scss';
import { useHistory } from 'react-router-dom';
import useIsCurrentUser from "../../utils/useIsCurrentUser";

interface IUserProfileProp {
    user: Partial<IUser>
}

const UserProfile = (props: IUserProfileProp) => {
    const { user } = props;
    const history = useHistory();
    const isCurrentUser = useIsCurrentUser(user.uuid);

    const handleEdit = () => {
        history.push(`/user-edit/${user.uuid}`);
    }

    return (
        <div className="user-profile bg-white flex items-start justify-start p-4">
            <Avatar className="user-profile-avatar" src={user.avatar} size={"large"} icon={<UserOutlined />} />
            <div className="user-profile__main ml-4 flex-1">
                <div className="nickname font-bold text-2xl">{user.nickname || user.name}</div>
                <div className="company">{user.company }</div>
                <div className="location">{user.location}</div>
                <div className="tech-stack">
                    技术栈
                </div>
            </div>
            {
                isCurrentUser && <Button type="default" icon={<EditOutlined />} className="ml-4" onClick={handleEdit}>编辑</Button>
            }
        </div>
    );
};

export default UserProfile;
