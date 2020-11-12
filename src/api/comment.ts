import { sendPost } from "../utils/http";

export function addComment(postId: string, content: string, commentId?: string) {
    return sendPost(`/posts/${postId}/comment`, {
        data: {
            content,
            commentId,
        }
    });
}

