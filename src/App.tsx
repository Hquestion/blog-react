import React, {useState} from 'react';
import {BrowserRouter, NavLink, Link} from 'react-router-dom';
import logo from './assets/img/logo.svg';
import './assets/style/App.scss';
import BlogHeader from "./components/layout/BlogHeader";
import BlogLogin from "./components/BlogLogin";

function App() {
    const [visible, setVisible] = useState(true);

    return (
        <div className="App pt-12">
            <BlogHeader />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p className="text-red-900">
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
            <ul className="list-disc list-inside">
                <li className="text-red-500">One</li>
                <li>Two</li>
                <li>Three</li>
            </ul>
            <BlogLogin visible={visible} setVisible={setVisible} />
        </div>
    );
}

export default App;
