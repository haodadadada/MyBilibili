export interface VideoInfoItem {
    aid: number,
    bvid: string,
    cid: number,
    desc: string,
    owner: {
        face: string,
        mid: number,
        name: string
    },
    pubdate: number,
    stat: {
        aid: number,
        coin: number,
        danmaku: number,
        dislike: number,
        evaluation: string,
        favorite: number, 
        like: number,
        reply: number,
        share: number,
        view: number
    },
    title: string,
    videoSrc?: string,
    mediaSource?: MediaSource
}