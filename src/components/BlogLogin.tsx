import React, {PropsWithRef, useEffect, useState} from 'react';
import {Form, Input, Modal, Button} from "antd";
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import loginNormal from '../assets/img/login-normal.png';
import loginGreeting from '../assets/img/login-greeting.png';
import loginPwd from '../assets/img/login-pwd.png';
import '../assets/style/BlogLogin.scss'
import {login} from "../api/auth";
import { useLoginContext } from "../context/login-context";

const githubLoginUrl = `https://github.com/login/oauth/authorize?
client_id=${process.env.REACT_APP_GITHUB_CLIENTID}&
redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}&state=987654321`

interface ILoginProps {
    visible: boolean,
    setVisible: (isVisible: boolean, isResolved?: boolean) => void,
    onSubmit?: Function,
    getContainer?: () => HTMLElement
}

enum loginImgType {
    NORMAL = '0',
    GREETING = '1',
    PWD = '2'
}

interface ILoginTitleProps extends PropsWithRef<any>{
    status: loginImgType
}

function ModalTitle(props: ILoginTitleProps) {
    const map = {
        [loginImgType.NORMAL]: loginNormal,
        [loginImgType.GREETING]: loginGreeting,
        [loginImgType.PWD]: loginPwd
    }
    const image = map[props.status] ;
    const titleClass: React.DetailedHTMLProps<any, any> = classNames({
        'login-modal-title': true,
        'relative': true,
        'is-greeting': props.status === loginImgType.GREETING
    });
    return (
        <div className={titleClass}>
            <img src={image} className="absolute -bottom-5 left-5 w-32"/>
        </div>
    )

}

function BlogLogin(props: ILoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [oauthWindow, setOauthWindow]: [any, any] = useState();
    const [status, setStatus]= useState<loginImgType>(loginImgType.NORMAL);
    const { setToken, setUser } = useLoginContext();

    useEffect(() => {
        window.removeEventListener('message', handleOauthMessage)
        if (oauthWindow) {
            window.addEventListener('message', handleOauthMessage);
        }
        return () => window.removeEventListener('message', handleOauthMessage);
    }, [oauthWindow]);

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
    };

    function handleUsernameInput(e: any) {
        setUsername(e.target.value);
    }

    function handlePasswordInput(e: any) {
        setPassword(e.target.value);
    }

    function handleCancel() {
        props.setVisible(false, false);
    }

    function handleSubmit() {
        // await login 提交
        setConfirmLoading(true);
        login(username, password).promise.then((res) => {
            console.log(res);
            setConfirmLoading(false);
            props.setVisible(false, true);
            localStorage.setItem('authToken', res.data.token);
            setToken(res.data.token);
            props.onSubmit && props.onSubmit(username, password);
        })
    }

    const handleOauthMessage = ({data}: any) => {
        if (data.type === 'LOGIN_SUCCESS') {
            props.setVisible(false, true);
            localStorage.setItem('authToken', data.data.token);
            setToken(data.data.token);
            props.onSubmit && props.onSubmit(data.data.token);
            oauthWindow.close();
            setOauthWindow(null);
        }
    }

    const handleGithubLogin = () => {
        const oauthWindow = window.open(githubLoginUrl, '_blank', 'width=700, height=500');
        setOauthWindow(oauthWindow);
    }

    return (
        <Modal
            title={null}
            visible={props.visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={null}
            width={360}
            style={{top: '200px'}}
            getContainer={props.getContainer || document.body}
        >
            <ModalTitle status={status} />
            <h2 className="font-bold text-xl text-gray-800 my-2">Github登陆</h2>
            <Form
                { ...layout }
                layout='vertical'
                onSubmitCapture={handleSubmit}
                style={{display: "none"}}
            >
                <Form.Item name="username">
                    <div className="flex justify-start items-center">
                        <UserOutlined className="mr-2 text-xl text-gray-500" />
                        <Input
                            value={username}
                            onInput={handleUsernameInput}
                            placeholder="请输入用户名"
                            onFocus={() => setStatus(loginImgType.GREETING)}
                            onBlur={() => setStatus(loginImgType.NORMAL)}
                        />
                    </div>
                </Form.Item>
                <Form.Item name="password">
                    <div className="flex justify-start items-center">
                        <LockOutlined className="mr-2 text-xl text-gray-500" />
                        <Input
                            type="password"
                            value={password}
                            onInput={handlePasswordInput}
                            placeholder="请输入密码"
                            onFocus={() => setStatus(loginImgType.PWD)}
                            onBlur={() => setStatus(loginImgType.NORMAL)}
                        />
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block={true} className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <p className="text-gray-600 pb-4 pt-2 text-sm">如果您不是github用户，那您也不是本站的用户</p>
            <div className="text-center pt-8 pb-2 mt-4 border-t relative">
                <div className="text-gray-400 absolute icon-indicator">点击图标进行登录</div>
                <GithubOutlined className="text-4xl cursor-pointer hover:text-blue-500" onClick={handleGithubLogin} />
            </div>
        </Modal>
    )
}

export default BlogLogin;
