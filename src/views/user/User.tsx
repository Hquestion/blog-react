import React, {useEffect, useState} from "react";
import { Tabs } from 'antd';
import { ApartmentOutlined, FileExclamationOutlined, FileTextOutlined, StarOutlined, TagOutlined } from '@ant-design/icons';
import { Route, Switch, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import UserProfile from "./UserProfile";
import { getUserInfoByUsername } from "../../api/user";
import './User.scss';
import UserBase from "./UserBase";
import UserPost from "./UserPosts";
import {IUser} from "../article/types";
import UserDrafts from "./UserDrafts";
import UserSeries from "./UserSeries";
import UserFav from "./UserFav";
import useIsCurrentUser from "../../utils/useIsCurrentUser";
import UserTags from "./UserTags";

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
    const isCurrentUser = useIsCurrentUser(user.uuid);
    const { username, sub } = params;

    useEffect(() => {
        getUserInfoByUsername(username).then((res) => {
            setUser(res as any);
        });
    }, [username]);
    useEffect(() => {
        setActiveRout(sub || ROUTE_KEYS.POSTS);
    }, [sub])

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
                <div className="user-tabs mt-4 bg-white px-4">
                    <Tabs defaultActiveKey={ROUTE_KEYS.POSTS} activeKey={activeRoute} onTabClick={(key) => handleTabClick(key as ROUTE_KEYS)}>
                        <Tabs.TabPane tab={ <span> <FileTextOutlined />文章</span> } key={ROUTE_KEYS.POSTS} />
                        {
                            isCurrentUser && <Tabs.TabPane tab={ <span> <FileExclamationOutlined />草稿</span> } key={ROUTE_KEYS.DRAFT} />
                        }
                        <Tabs.TabPane tab={ <span> <ApartmentOutlined />系列</span> } key={ROUTE_KEYS.SERIES} />
                        <Tabs.TabPane tab={ <span> <TagOutlined />标签</span> } key={ROUTE_KEYS.TAG} />
                        <Tabs.TabPane tab={ <span> <StarOutlined />收藏</span> } key={ROUTE_KEYS.FAV} />
                    </Tabs>
                </div>
                <div className="user-assets bg-white px-4  py-2">
                    { !sub && <UserPost userId={user.uuid} /> }
                    <Switch>
                        <Route exact={true} path={`${path}/posts`}>
                            <UserPost userId={user.uuid} />
                        </Route>
                        <Route exact={true} path={`${path}/draft`}>
                            <UserDrafts userId={user.uuid} />
                        </Route>
                        <Route exact={true} path={`${path}/series`}>
                            <UserSeries userId={user.uuid} />
                        </Route>
                        <Route exact={true} path={`${path}/tag`}>
                            <UserTags userId={user.uuid} />
                        </Route>
                        <Route exact={true} path={`${path}/fav`}>
                            <UserFav userId={user.uuid} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default User;
