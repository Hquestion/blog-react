import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo.svg';
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, BookOutlined, StarOutlined, PoweroffOutlined, EditOutlined } from '@ant-design/icons';
import AuthWrapper from "../AuthWrapper";
import { useLoginContext } from '../../context/login-context';

const AuthButton = AuthWrapper(Button);

function UserMenu() {
    const { isLogin } = useLoginContext();
    function handleClick(e: any) {
        console.log(e);
        if (isLogin()) {

        }
    }

    return (
        <Menu onClick={handleClick}>
            <Menu.Item key="0" icon={<PoweroffOutlined />}>
                <Link to="http://www.alipay.com/">
                    我的文章
                </Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<StarOutlined />}>
                <Link to="http://www.alipay.com/">
                    我的收藏
                </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<BookOutlined />}>
                <Link to="http://www.alipay.com/">
                    我的标签
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" icon={<PoweroffOutlined />}>
                退出登陆
            </Menu.Item>
        </Menu>
    );
}

function UserLoginToggle() {
    const { isLogin } = useLoginContext();
    const handleLogin = () => {
        alert('登录');
    }
    if (!isLogin()) {
        return (
            <AuthButton
                type="link"
                icon={<UserOutlined />}
                size="middle"
                onClick={handleLogin}
            >
                登录
            </AuthButton>
        )
    }
    return (
        <Dropdown overlay={UserMenu} trigger={['click']}>
            <Avatar className="mx-4 cursor-pointer" src={''} icon={<UserOutlined />} />
        </Dropdown>
    )
}

function BlogHeader() {
    const [avatar, setAvatar] = useState('');
    const { isLogin } = useLoginContext();
    const handleClick = (...rest: any[]) => {
        alert(rest[0])
    }
    return (
        <div className="w-full h-16 bg-black text-white fixed top-0 left-0">
            <div className="container mx-auto flex justify-between items-center px-8">
                <Link to="/" style={{ 'fontSize': 0 }}>
                    <img src={logo} className="w-16 h-16" alt=""/>
                </Link>
                <div className="login flex justify-around items-center">
                    <AuthButton
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleClick()}
                    >
                        写文章
                    </AuthButton>
                    <UserLoginToggle />
                </div>
            </div>
        </div>
    );
}

export default BlogHeader;
