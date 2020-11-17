import React, {createContext, useContext, useMemo, useReducer, ReducerWithoutAction, useEffect, useState} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import {sendGet} from "../utils/http";
import BlogLogin from "../components/BlogLogin";
import BlogLoading from "../components/BlogLoading";
import {IUser} from "../views/article/types";

export enum LoginActionTypes {
    SET_USER_INFO,
    SET_TOKEN,
    SHOW_LOGIN,
    HIDE_LOGIN
}

export interface IUserState {
    user: Partial<IUser>,
    token: string,
    isLoginVisible: boolean,
}

export interface IUserAction extends ReducerWithoutAction<any> {
    type: LoginActionTypes,
    data: Partial<IUserState>
}

const defaultContext: IUserState = {
    user: {},
    token: '',
    isLoginVisible: false,
}

const loginReducer = (state: IUserState, action: IUserAction) => {
    switch (action.type) {
        case LoginActionTypes.SET_TOKEN:
            if (!action.data.token) {
                localStorage.removeItem('authToken');
            }
            return { ...state, token: action.data.token }
        case LoginActionTypes.SET_USER_INFO:
            return { ...state, user: action.data.user }
        case LoginActionTypes.SHOW_LOGIN:
            return { ...state, isLoginVisible: true }
        case LoginActionTypes.HIDE_LOGIN:
            return { ...state, isLoginVisible: false }
        default:
            break;
    }
}

const LoginContext = createContext(null);

function useLoginContext() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error(`useCount must be used within a LoginProvider`)
    }
    const [state, dispatch]: [IUserState, any] = context;
    const isLogin = () => !!state && !!state.token && !!state.user && !!state.user.uuid;
    const setToken = (token: string) => dispatch({
        type: LoginActionTypes.SET_TOKEN,
        data: { token }
    });
    const setUser = (data: any) => dispatch({
        type: LoginActionTypes.SET_USER_INFO,
        data: { user: data}
    });

    const toggleLogin = (visible: boolean) => dispatch({
        type: visible ? LoginActionTypes.SHOW_LOGIN: LoginActionTypes.HIDE_LOGIN,
        data: {}
    });

    return {
        state,
        dispatch,
        isLogin,
        setToken,
        setUser,
        toggleLogin,
    };
}

function LoginProvider(props: any) {
    const [state, dispatch]: [IUserState, any] = useReducer(loginReducer as ReducerWithoutAction<any>, defaultContext);
    const value = useMemo(() => [state, dispatch], [state]);
    const [isLoading, setIsLoading] = useState(true);
    const { children, ...otherProps } = props;
    const getAndCacheUserInfo = () => {
        setIsLoading(true);
        let promise;
        if (!state.token) {
            promise = Promise.reject();
        } else {
            promise = sendGet('/userInfo').promise;
        }
        promise.then((res) => {
            dispatch({
                type: LoginActionTypes.SET_USER_INFO,
                data: {user: res}
            });
        }, () => {
            dispatch({
                type: LoginActionTypes.SET_TOKEN,
                data: { token: '' }
            });
            dispatch({
                type: LoginActionTypes.SET_USER_INFO,
                data: { user: null }
            });
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        });
    }
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        dispatch({
            type: LoginActionTypes.SET_TOKEN,
            data: { token }
        });
        getAndCacheUserInfo();
    }, []);

    const setVisibleFn = (isVisible: boolean) => dispatch({
        type: isVisible ? LoginActionTypes.SHOW_LOGIN : LoginActionTypes.HIDE_LOGIN
    });

    const handleSubmit = () => {
        getAndCacheUserInfo();
    };

    return (
        <LoginContext.Provider
            value={value}
            {...otherProps}
        >
            { isLoading ? <BlogLoading /> : children }
            <BlogLogin
                visible={state.isLoginVisible}
                setVisible={setVisibleFn}
                onSubmit={handleSubmit}
            />
        </LoginContext.Provider>
    );
}

export { LoginProvider, useLoginContext }
