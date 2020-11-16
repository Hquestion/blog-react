import {sendDel, sendGet, sendPost} from "../utils/http";
import { IFavFolders } from "../views/article/types";

export function getFavFolders(uuid: string) {
    return sendGet('/favFolders', {
        params: {
            userId: uuid
        }
    }).promise;
}

export function createFavFolder(data: Partial<IFavFolders>) {
    return sendPost('/favFolders', { data }).promise;
}

export function deleteFavFolder(uuid: string) {
    return sendDel(`/favFolders/${uuid}`).promise;
}
