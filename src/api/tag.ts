import {sendDel, sendGet, sendPost} from "../utils/http";
import { ITag } from "../views/article/types";

export function getTags(uuid: string) {
    return sendGet('/tags', {
        params: {
            userId: uuid
        }
    }).promise;
}

export function createTag(data: Partial<ITag>) {
    return sendPost('/tags', { data }).promise;
}

export function deleteTag(uuid: string) {
    return sendDel(`/tags/${uuid}`).promise;
}
