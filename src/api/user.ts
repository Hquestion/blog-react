import { sendGet } from "../utils/http";

export function getUserInfoByUsername(username: string) {
    return sendGet('/getUserByName', {
        params: {
            username
        }
    }).promise;
}
