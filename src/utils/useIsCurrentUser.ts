import {useEffect, useState} from "react";
import {useLoginContext} from "../context/login-context";

export default function useIsCurrentUser(uuid?: string) {
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const { isLogin, state } = useLoginContext();

    useEffect(() => {
        if (!uuid) {
            setIsCurrentUser(false);
            return;
        }
        if (isLogin() && state.user.uuid === uuid) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, [uuid]);

    return isCurrentUser;
}
