import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo.svg';
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, BookOutlined, StarOutlined, PoweroffOutlined } from '@ant-design/icons';
import { isLogin } from "../../utils";

function UserMenu() {
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

function BlogHeader() {
    const [avatar, setAvatar] = useState('');
    return (
        <div className="w-full h-12 bg-black text-white fixed top-0 left-0">
            <div className="container mx-auto flex justify-between items-center px-8">
                <Link to="/" style={{ 'fontSize': 0 }}>
                    <img src={logo} className="w-12 h-12" alt=""/>
                </Link>
                <div className="login flex justify-around items-center">
                    <Button type="link" className="text-blue-300 hover:text-blue-400 active:text-blue-500 focus:text-blue-500">写文章</Button>
                    <Dropdown overlay={UserMenu} trigger={['click']}>
                        <Avatar className="mx-4 cursor-pointer" src={''} icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default BlogHeader;
