import http, {sendGet, sendPost, sendUpdate} from '../utils/http';
import { Post } from '../views/article/types'

export const POSTS_PAGINATION_URL = '/posts';

export function getPostsByPage(page: number = 1, pageSize: number = -1) {
    return sendGet(POSTS_PAGINATION_URL, {
        params: {
            page,
            pageSize
        }
    })
}

export function createPost(data: Partial<Post>) {
    return sendPost('/posts', {
        data: {
            ...data,
            isPublished: true
        }
    });
}

export function createDraft(data: Partial<Post>) {
    return sendPost('/posts', {
        data: {
            ...data,
            isPublished: false
        }
    });
}

export function updatePost(uuid: string, data: Partial<Post>) {
    return sendUpdate(`/posts/${uuid}`, {
        data: data
    });
}

export function getPostDetail(id: string) {
    return sendGet(`/posts/${id}`);
}

export function getPostCommentsByPage(uuid: string, page: number = 1, pageSize: number = 10) {
    return sendGet(`/posts/${uuid}/comments`, {
        params: {
            page,
            pageSize
        }
    });
}

