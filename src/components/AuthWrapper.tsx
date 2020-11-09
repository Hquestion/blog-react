import React, { useState } from 'react';
import BlogLogin from "./BlogLogin";
import {useLoginContext} from "../context/login-context";

function AuthWrapper(ButtonComponent: React.ComponentType<any>) {
    return function WrappedAuth (props: { [x: string]: any; onClick?: any; }) {
        const [visible, setVisible] = useState(false);
        const { isLogin } = useLoginContext();
        const { onClick, children, ...otherProps } = props;
        const handleSubmit = () => {
            // 更新登陆后的状态
        };
        const setVisibleFn = (isVisible: boolean, isResolved?: boolean) => {
            setVisible(isVisible);
        }
        const handleClick = () => {
            if (isLogin()) {
                onClick && onClick();
            } else {
                setVisible(true);
                onClick && onClick();
            }
        }

        return (
            <>
                <BlogLogin
                    visible={visible}
                    setVisible={setVisibleFn}
                    onSubmit={handleSubmit}
                />
                <ButtonComponent onClick={handleClick} {...otherProps}>
                    {children}
                </ButtonComponent>
            </>
        );
    }
}

export default AuthWrapper;
