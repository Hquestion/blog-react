import React, {createContext, useContext, useMemo, useReducer, ReducerWithoutAction} from 'react';

export enum LoginActionTypes {
    SET_USER_INFO,
    SET_TOKEN
}

export interface IUserState {
    user: Object,
    token: string
}

export interface IUserAction extends ReducerWithoutAction<any> {
    type: LoginActionTypes,
    data: Partial<IUserState>
}

const defaultContext: IUserState = {
    user: {},
    token: ''
}

const loginReducer = (state: IUserState, action: IUserAction) => {
    switch (action.type) {
        case LoginActionTypes.SET_TOKEN:
            return { ...state, token: action.data.token }
        case LoginActionTypes.SET_USER_INFO:
            return { ...state, user: action.data.user }
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
    const isLogin = () => state && state.token;
    const setToken = (token: string) => dispatch({
        type: LoginActionTypes.SET_TOKEN,
        data: { token }
    });
    const setUser = (data: any) => dispatch({
        type: LoginActionTypes.SET_USER_INFO,
        data: { user: data}
    });

    return {
        state,
        dispatch,
        isLogin,
        setToken,
        setUser
    };
}

function LoginProvider(props: any) {
    const [state, dispatch]: [IUserState, any] = useReducer(loginReducer as ReducerWithoutAction<any>, defaultContext);
    const value = useMemo(() => [state, dispatch], [state])
    return (
        <LoginContext.Provider
            value={value}
            {...props}
        />
    );
}

export { LoginProvider, useLoginContext }
