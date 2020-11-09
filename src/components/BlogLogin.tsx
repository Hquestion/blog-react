import React, {PropsWithRef, useState} from 'react';
import {Form, Input, Modal, Button} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import loginNormal from '../assets/img/login-normal.png';
import loginGreeting from '../assets/img/login-greeting.png';
import loginPwd from '../assets/img/login-pwd.png';
import '../assets/style/BlogLogin.scss'

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
    const [status, setStatus]= useState<loginImgType>(loginImgType.NORMAL);

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
        setTimeout(() => {
            setConfirmLoading(false);
            props.setVisible(false, true);
            props.onSubmit && props.onSubmit(username, password);
        }, 2000);

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
            <ModalTitle status={status}/>
            <h2 className="font-bold text-xl text-gray-800 my-2">密码登陆</h2>
            <Form
                { ...layout }
                layout='vertical'
                onSubmitCapture={handleSubmit}
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
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default BlogLogin;
