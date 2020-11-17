import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo-2-h.png';
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, BookOutlined, StarOutlined, PoweroffOutlined, EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useLoginContext } from '../../context/login-context';
import { logout } from "../../api/auth";

enum MenuKeys {
    CENTER = 'CENTER',
    MY_SERIES = 'MY_SERIES',
    MY_DRAFT = 'MY_DRAFT',
    MY_ARTICLE = "MY_ARTICLE",
    MY_FAV = "MY_FAV",
    MY_TAG = "MY_TAG",
    LOGOUT = "LOGOUT"
}

function UserLoginToggle() {
    const { isLogin, setToken, setUser, toggleLogin, state } = useLoginContext();

    const handleMenuClick: ({key}: { key: React.Key }) => void = ( { key }) => {
        switch (key) {
            case MenuKeys.LOGOUT:
                logout().promise.then(() => {
                    setToken('');
                    setUser({});
                });
                break;
            default:
                break;
        }
    }

    const userMenu = () => {
        return (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key={MenuKeys.CENTER} icon={<PoweroffOutlined />}>
                    <Link to={`/user/${state.user.name}`}>
                        个人中心
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key={MenuKeys.MY_ARTICLE} icon={<PoweroffOutlined />}>
                    <Link to={`/user/${state.user.name}/posts`}>
                        我的文章
                    </Link>
                </Menu.Item>
                <Menu.Item key={MenuKeys.MY_DRAFT} icon={<PoweroffOutlined />}>
                    <Link to={`/user/${state.user.name}/draft`}>
                        我的草稿
                    </Link>
                </Menu.Item>
                <Menu.Item key={MenuKeys.MY_SERIES} icon={<StarOutlined />}>
                    <Link to={`/user/${state.user.name}/series`}>
                        我的系列
                    </Link>
                </Menu.Item>
                <Menu.Item key={MenuKeys.MY_TAG} icon={<BookOutlined />}>
                    <Link to={`/user/${state.user.name}/tag`}>
                        我的标签
                    </Link>
                </Menu.Item>
                <Menu.Item key={MenuKeys.MY_FAV} icon={<StarOutlined />}>
                    <Link to={`/user/${state.user.name}/fav`}>
                        我的收藏
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
            <Button
                type="link"
                icon={<UserOutlined />}
                size="middle"
                onClick={() => toggleLogin(true)}
            >
                登录
            </Button>
        )
    }
    return (
        <Dropdown overlay={userMenu} trigger={['click']}>
            <Avatar className="mx-4 cursor-pointer" src={state.user.avatar} icon={<UserOutlined />} />
        </Dropdown>
    )
}

function BlogHeader() {
    const [avatar, setAvatar] = useState('');
    const { isLogin, toggleLogin } = useLoginContext();
    const history = useHistory();
    const handleClick = () => {
        if (isLogin()) {
            history.push('/post/edit');
        } else {
            toggleLogin(true);
        }
    }
    return (
        <div className="w-full h-16 bg-black text-white fixed top-0 left-0 z-10">
            <div className="container mx-auto flex justify-between items-center px-8">
                <Link to="/" style={{ 'fontSize': 0 }}>
                    <img src={logo} className="h-16" alt=""/>
                </Link>
                <div className="login flex justify-around items-center">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleClick()}
                    >
                        写文章
                    </Button>
                    <UserLoginToggle />
                </div>
            </div>
        </div>
    );
}

export default BlogHeader;
