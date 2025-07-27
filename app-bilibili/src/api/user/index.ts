import { AxiosResponse } from 'axios';
import { get } from '../http';
import { 
    GetResponse, 
    UserCardReq,
    UserNavReq,
    UserHistory,
} from './type';
const getLoginNav = (sessdata: string) => {
    return get({
        url: '/user/login/nav',
        headers: {
            sessdata
        }
    });
};
const getOwnInfo = (sessdata: string) => {
    return get({
        url: '/user/space/myinfo',
        headers: {
            sessdata
        }
    });
};
const getUserCard = (data: UserCardReq, sessdata: string): Promise<AxiosResponse<GetResponse>> => {
    return get({
        url: '/user/card',
        data,
        headers: {
            sessdata
        }
    });
};
const getUserNav = (data: UserNavReq, sessdata: string): Promise<AxiosResponse<GetResponse>> => {
    return get({
        url: '/user/navnum',
        data,
        headers: {
            sessdata
        }
    });
};
const getUserStat = (sessdata: string): Promise<AxiosResponse<GetResponse>> => {
    return get({
        url: '/user/stat',
        headers: {
            sessdata
        }
    });
};
const getUserHistoryVideo = (data: UserHistory, sessdata: string = ''): Promise<AxiosResponse<GetResponse>> => {
    return get({
        url: '/user/history/cursor',
        data,
        headers: {
            sessdata
        }
    });
};
export {
    getOwnInfo,
    getLoginNav,
    getUserCard,
    getUserNav,
    getUserStat,
    getUserHistoryVideo,
};