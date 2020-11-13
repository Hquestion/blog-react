import React, {useEffect, useState} from "react";
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import UserProfile from "./UserProfile";
import { getUserInfoByUsername } from "../../api/user";
import './User.scss';
import UserBase from "./UserBase";

const User = () => {
    const [user, setUser] = useState({});
    let { path, url } = useRouteMatch();
    const params: {username: string} = useParams();

    useEffect(() => {
        getUserInfoByUsername(params.username).then((res) => {
            setUser(res as any);
        });
    }, []);

    return (
        <div className="user-page-main container mx-auto my-4 clearfix">
            <div className="float-left">
                <UserBase user={user} />
            </div>
            <div className="float-right">
                <UserProfile user={user} />
                <Tabs defaultActiveKey="2">
                    <Tabs.TabPane tab={ <span> <AppleOutlined /> Tab 1 </span> } key="1" />
                    <Tabs.TabPane tab={ <span> <AppleOutlined /> Tab 1 </span> } key="2" />
                </Tabs>
                <Switch>
                    <Route exact={true} path={`${path}/posts`}>
                        1
                    </Route>
                    <Route exact={true} path={`${path}/draft`}>
                        2
                    </Route>
                    <Route exact={true} path={`${path}/series`}>
                        3
                    </Route>
                    <Route exact={true} path={`${path}/fav`}>
                        4
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default User;
