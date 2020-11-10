import React from 'react';
import './assets/style/App.scss';
import BlogHeader from "./components/layout/BlogHeader";
import { LoginProvider } from "./context/login-context";
import { BackTop } from "antd";
import { Switch, Route } from 'react-router-dom';
import Home from "./views/home/Home";
import Editor from "./views/editor/Editor";

function App() {

    return (
        <div className="App pt-16 min-h-screen">
            <LoginProvider>
                <BlogHeader />
                <Switch>
                    <Route exact={true} path="/post/edit/:uuid?">
                        <Editor />
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
