import http, {sendGet, sendPost} from '../utils/http';
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

export function getPostDetail(id: string) {
    return sendGet(`/posts/${id}`);
}

