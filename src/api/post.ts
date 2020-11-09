import http, { sendGet } from '../utils/http';

export const POSTS_PAGINATION_URL = '/posts';

export function getPostsByPage(page: number = 1, pageSize: number = -1) {
    return sendGet(POSTS_PAGINATION_URL, {
        params: {
            page,
            pageSize
        }
    })
}

