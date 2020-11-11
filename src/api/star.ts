import { sendGet, sendPost } from "../utils/http";

export function addStar(postId: string) {
    return sendPost(`/star/${postId}`);
}

export function isStar(postId: string) {
    return sendGet(`/star/isStar/${postId}`);
}
