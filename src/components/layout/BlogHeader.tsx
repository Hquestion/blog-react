import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo.svg';
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, BookOutlined, StarOutlined, PoweroffOutlined, EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import AuthWrapper from "../AuthWrapper";
import { useLoginContext } from '../../context/login-context';
import { logout } from "../../api/auth";

enum MenuKeys {
    MY_ARTICLE = "MY_ARTICLE",
    MY_FAV = "MY_FAV",
    MY_TAG = "MY_TAG",
    LOGOUT = "LOGOUT"
}

const AuthButton = AuthWrapper(Button);

function UserLoginToggle() {
    const { isLogin, setToken, setUser } = useLoginContext();

    const handleLogin = () => {
        alert('登录');
    }

    const handleMenuClick: ({key}: { key: React.Key }) => void = ( { key }) => {
        switch (key) {
            case MenuKeys.LOGOUT:
                logout().promise.then(() => {
                    setToken('');
                    setUser(null);
                });
                break;
            default:
                break;
        }
    }

    const userMenu = () => {
        return (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key={MenuKeys.MY_ARTICLE} icon={<PoweroffOutlined />}>
                    <Link to="http://www.alipay.com/">
                        我的文章
                    </Link>
                </Menu.Item>
                <Menu.Item key={MenuKeys.MY_FAV} icon={<StarOutlined />}>
                    <Link to="http://www.alipay.com/">
                        我的收藏
                    </Link>
                </Menu.Item>
                <Menu.Item key={MenuKeys.MY_TAG} icon={<BookOutlined />}>
                    <Link to="http://www.alipay.com/">
                        我的标签
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key={MenuKeys.LOGOUT} icon={<PoweroffOutlined />}>
                    退出登陆
                </Menu.Item>
            </Menu>
        );
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
        <Dropdown overlay={userMenu} trigger={['click']}>
            <Avatar className="mx-4 cursor-pointer" src={''} icon={<UserOutlined />} />
        </Dropdown>
    )
}

function BlogHeader() {
    const [avatar, setAvatar] = useState('');
    const { isLogin } = useLoginContext();
    const history = useHistory();
    const handleClick = () => {
        history.push('/post/edit');
    }
    return (
        <div className="w-full h-16 bg-black text-white fixed top-0 left-0 z-10">
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
