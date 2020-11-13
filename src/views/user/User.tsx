import React, {useEffect, useState} from "react";
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { Route, Switch, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import UserProfile from "./UserProfile";
import { getUserInfoByUsername } from "../../api/user";
import './User.scss';
import UserBase from "./UserBase";
import UserPost from "./UserPosts";
import {IUser} from "../article/types";

enum ROUTE_KEYS {
    POSTS = 'posts',
    DRAFT = "draft",
    SERIES = "series",
    TAG = "tag",
    FAV = 'fav'
}

const User = () => {
    const [user, setUser]: [Partial<IUser>, Function] = useState({});
    const [activeRoute, setActiveRout] = useState(ROUTE_KEYS.POSTS);
    let { path } = useRouteMatch();
    const history = useHistory();
    const params: {username: string, sub?: ROUTE_KEYS} = useParams();
    const { username, sub } = params;

    useEffect(() => {
        getUserInfoByUsername(username).then((res) => {
            setUser(res as any);
        });
        setActiveRout(sub || ROUTE_KEYS.POSTS);
    }, [username, sub]);

    const handleTabClick = (key: ROUTE_KEYS) => {
        history.push(`/user/${username}/${key}`);
    }

    return (
        <div className="user-page-main container mx-auto my-4 clearfix">
            <div className="float-left">
                <UserBase user={user} />
            </div>
            <div className="float-right">
                <UserProfile user={user} />
                <Tabs defaultActiveKey={ROUTE_KEYS.POSTS} activeKey={activeRoute} onTabClick={(key) => handleTabClick(key as ROUTE_KEYS)}>
                    <Tabs.TabPane tab={ <span> <AppleOutlined /> 文章</span> } key={ROUTE_KEYS.POSTS} />
                    <Tabs.TabPane tab={ <span> <AppleOutlined /> 草稿</span> } key={ROUTE_KEYS.DRAFT} />
                    <Tabs.TabPane tab={ <span> <AppleOutlined /> 系列</span> } key={ROUTE_KEYS.SERIES} />
                    <Tabs.TabPane tab={ <span> <AppleOutlined /> 标签</span> } key={ROUTE_KEYS.TAG} />
                    <Tabs.TabPane tab={ <span> <AppleOutlined /> 收藏</span> } key={ROUTE_KEYS.FAV} />
                </Tabs>
                <div className="user-assets mt-4">
                    { !sub && <UserPost userId={user.uuid} /> }
                    <Switch>
                        <Route exact={true} path={`${path}/posts`}>
                            <UserPost userId={user.uuid} />
                        </Route>
                        <Route exact={true} path={`${path}/draft`}>
                            2
                        </Route>
                        <Route exact={true} path={`${path}/series`}>
                            3
                        </Route>
                        <Route exact={true} path={`${path}/tag`}>
                            4
                        </Route>
                        <Route exact={true} path={`${path}/fav`}>
                            5
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default User;
