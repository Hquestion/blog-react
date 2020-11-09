import { sendPost } from "../utils/http";

export function login(username: string, password: string) {
    return sendPost('/login', {
        data: {
            username,
            password
        }
    })
}
