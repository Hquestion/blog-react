import React, {useEffect, useState} from "react";
import {Avatar} from "antd";
import { UserOutlined, BankOutlined, ContactsOutlined, MailOutlined, GithubOutlined, LinkOutlined } from '@ant-design/icons';
import {IUser} from "../article/types";
import './UserBase.scss';
import {getUserSkills} from "../../api/user";

interface IUserBaseProp {
    user: Partial<IUser>
}

const UserBase = (props: IUserBaseProp) => {
    const { user } = props;
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        if (user && user.uuid) {
            getUserSkills(user.uuid).then((res) => {
                setSkills(res as any);
            }, () => {
                setSkills([]);
            })
        } else {
            setSkills([]);
        }
    }, [user])
    return (
        <div className="user-base bg-white flex items-center justify-start flex-col p-4">
            <Avatar className="user-base-avatar" src={user.avatar} size={"large"} icon={<UserOutlined />} />
            <div className="user-base__main mt-4 w-full flex-1">
                <div className="nickname font-bold text-2xl">{user.nickname || user.name}</div>
                <div className="nickname text-lg mt-1 mb-2">{user.bio}</div>
                <div className="company pt-1"><BankOutlined /> {user.company }</div>
                <div className="location pt-1"><ContactsOutlined /> {user.location}</div>
                <div className="email pt-1"><MailOutlined /> {user.email}</div>
                <div className="location pt-1"><GithubOutlined /> <a target="_blank" href={user.githubUrl}>{user.githubUrl}</a></div>
                <div className="email pt-1"><LinkOutlined /> <a target="_blank" href={user.blogUrl}>{user.blogUrl}</a></div>
                <div className="tech-stack mt-4">
                    技术栈
                </div>
            </div>
        </div>
    );
};

export default UserBase;
