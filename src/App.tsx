import React from 'react';
import './assets/style/App.scss';
import BlogHeader from "./components/layout/BlogHeader";
import BlogLogin from "./components/BlogLogin";
import { LoginProvider } from "./context/login-context";
import Posts from "./views/article/Posts";
import { BackTop } from "antd";

function App() {

    return (
        <div className="App pt-16 min-h-screen">
            <LoginProvider>
                <BlogHeader />
                <Posts />
                <BackTop />
            </LoginProvider>
        </div>
    );
}

export default App;
