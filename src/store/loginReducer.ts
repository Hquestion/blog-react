import { useReducer } from 'react';

export interface IUserState {
    user: Object,
    token: string
}

export interface IUserAction {
    type: string,
    data: Partial<IUserState>
}

const initialState: IUserState = {
    user: {},
    token: ''
}

const reducer = (state: IUserState, action: IUserAction) => {
    switch(action.type) {
        case 'setUserInfo':
            return { ...state, user: action.data.user }
    }
}

const loginReducer = () =>  {
    return useReducer(reducer, initialState as never);
}

export { loginReducer };
