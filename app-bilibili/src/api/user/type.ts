type UserCardReq = {
    mid: number | string,
    photo?: boolean
};

type UserNavReq = {
    mid: number | string,
};

type UserHistory = {
    max?: number,
    business?: string,
    view_at?: number,
    type?: string,
    ps?: number,
}

interface GetResponse {
    code: number,
    message?: string,
    data: {}
};

export {
    GetResponse,
    UserCardReq,
    UserNavReq,
    UserHistory,
};