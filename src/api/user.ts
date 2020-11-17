import { sendGet } from "../utils/http";

export function getUserInfoByUsername(username: string) {
    return sendGet('/getUserByName', {
        params: {
            username
        }
    }).promise;
}

export function getUserPosts(uuid: string, page: number, pageSize: number) {
    return sendGet(`/users/${uuid}/getPosts`, {
        params: {
            page,
            pageSize,
        }
    }).promise;
}

export function getUserDrafts(uuid: string, page: number, pageSize: number) {
    return sendGet(`/users/${uuid}/getDrafts`, {
        params: {
            page,
            pageSize,
        }
    }).promise;
}

export function getUserSkills(uuid: string) {
    return sendGet(`/users/${uuid}/getSkills`).promise;
}
