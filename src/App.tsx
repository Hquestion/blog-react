import React from 'react';
import './assets/style/App.scss';
import BlogHeader from "./components/layout/BlogHeader";
import Posts from "./views/article/Posts";
import { BackTop } from "antd";

function App() {

    return (
        <div className="App pt-16 min-h-screen">
            <BlogHeader />
            <Posts />
            <BackTop />
        </div>
    );
}

export default App;
