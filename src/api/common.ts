import { sendGet, sendPost } from "../utils/http";
import { v4 as uuid } from 'uuid';

export function uploadPastedImg(blob: Blob) {
    const form = new FormData();
    const filename = uuid().slice(0, 12) + '.jpg';
    form.append('files', new File([blob], filename));
    return new Promise((resolve, reject) => {
        sendPost(`/common/upload`, {
            data: form,
            headers:{'Content-Type':'multipart/form-data'}
        }).promise.then((res: any) => {
            resolve(res);
        }, reject);
    });
}

