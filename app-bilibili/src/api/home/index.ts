import { AxiosResponse } from 'axios';
import { get, post } from '../http';
import type { 
    HomePlayUrlReq, 
    HomeVideoStreamReq, 
    VideoInfoReqOptional, 
    VideoShotReq, 
    VideoRelatedReqOptional, 
    DmListReq, 
    GetResponse
} from './type';
const getHomePlayUrl = async (data: HomePlayUrlReq, sessdata: string): Promise<AxiosResponse<GetResponse>> => {
    return await get({
        url: '/home/playurl',
        data,
        headers: {
            sessdata,
        }
    });
};
const getHomeVideoStream = async (data: HomeVideoStreamReq, range: string, sessdata?: string): Promise<AxiosResponse<GetResponse>> => {
    return await get({
        url: '/home/video/stream',
        data,
        headers: {
            range,
            sessdata: sessdata || ''
        },
        responseType: 'arraybuffer'
    });
};

const getHomeVideoInfo = async (data: VideoInfoReqOptional, sessdata: string): Promise<AxiosResponse<GetResponse>> => {
    return await get({
        url: '/home/video/info',
        data,
        headers: {
            sessdata
        }
    });
};

const getHomeVideoShot = async (data: VideoShotReq): Promise<AxiosResponse<GetResponse>> => {
    return await get({
        url: '/home/video/shot',
        data
    });
};

const getHomeVideoRelated = async (data: VideoRelatedReqOptional): Promise<AxiosResponse<GetResponse>> => {
    return await get({
        url: '/home/video/recommand',
        data
    });
};

const saveHomeVideoSubtitle = async (content: string): Promise<AxiosResponse<GetResponse>> => {
    return await post({
        url: '/home/video/subtitle/save',
        data: {
            content
        }
    });
};

const getHomeVideoSummary = async (content: string): Promise<AxiosResponse<GetResponse>> => {
    return await post({
        url: '/home/video/summary',
        data: {
            content
        }
    });
};

// axios不支持直接响应Uint8Array，需要手动转换
const getDmList = async (data: DmListReq, sessdata?: string) => {
    return await get({
        url: '/home/dm/list',
        data,
        headers: {
            sessdata: sessdata || ''
        },
        responseType: 'arraybuffer'
    });
};

const getBuvid = async (sessdata: string = ''): Promise<AxiosResponse<GetResponse>> => {
    return await get({
        url: '/getbuvid',
        headers: {
            sessdata: sessdata || ''
        }
    });
};

const getWebId = async (sessdata: string = ''): Promise<AxiosResponse<GetResponse>> => {
    return await get({
        url: '/getwebid',
        headers: {
            sessdata: sessdata
        }
    });
};



export {
    getHomePlayUrl,
    getHomeVideoStream,
    getHomeVideoInfo,
    getHomeVideoShot,
    getHomeVideoRelated,
    saveHomeVideoSubtitle,
    getHomeVideoSummary,
    getDmList,
    getBuvid,
    getWebId
};