import React from 'react';
import './assets/style/App.scss';
import BlogHeader from "./components/layout/BlogHeader";
import { LoginProvider } from "./context/login-context";
import { BackTop } from "antd";
import { Switch, Route } from 'react-router-dom';
import Home from "./views/home/Home";
import Editor from "./views/editor/Editor";
import Publish from "./views/publish/Publish";
import PostDetail from "./views/article/PostDetail";

function App() {

    return (
        <div className="App pt-16 min-h-screen">
            <LoginProvider>
                <BlogHeader />
                <Switch>
                    <Route exact={true} path="/post/edit/:uuid?">
                        <Editor />
                    </Route>
                    <Route exact={true} path="/post/publish/:uuid?">
                        <Publish />
                    </Route>
                    <Route exact={true} path="/post/:uuid?">
                        <PostDetail />
                    </Route>
                    <Route exact={true} path="/">
                        <Home />
                    </Route>
                </Switch>
                <BackTop />
            </LoginProvider>
        </div>
    );
}

export default App;
