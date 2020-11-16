import {sendDel, sendGet, sendPost} from "../utils/http";
import {ISeries} from "../views/article/types";

export function getSeriesList(uuid: string) {
    return sendGet('/series', {
        params: {
            userId: uuid
        }
    }).promise;
}

export function createSeries(data: Partial<ISeries>) {
    return sendPost('/series', { data }).promise;
}

export function deleteSeries(uuid: string) {
    return sendDel(`/series/${uuid}`).promise;
}

export function getSeriesDetail(uuid: string) {
    return sendGet(`/series/${uuid}`).promise;
}
