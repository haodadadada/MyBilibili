const Request = require('../../api/request');
const WebSocket = require('ws');
const crypto = require('crypto');
// const { brotliDecompressSync } = require('zlib');
// const { TextDecoder } = require('util');
// const fetch = require('node-fetch');
// const fetchCookie = require('fetch-cookie').default;

const { 
    URL_BUVID3,
    URL_HOME_RECOMMAND,
    URL_HOME_VIDEO_PLAYER,
    URL_HOME_HOT_POPULAR,
    URL_HOME_HOT_SERIES,
    URL_HOME_HOT_SERIES_ONE,
    URL_HOME_HOT_PRECIOUS,
    URL_HOME_HOT_RANKING,
    URL_HOME_HOT_PGC_RANKGING,
    URL_HOME_HOT_PGC_ANIME_RANKGING,
    URL_HOME_BANGUMI_SORT,
    URL_VIDEO_INFO,
    URL_VIDEO_SHOT,
    URL_DM_LIST,
    URL_VIDEO_RECOMMAND,
    URL_SEARCH_ALL,
    URL_SEARCH_TYPE,
    URL_LIVE_RECOMMAND,
    URL_LIVE_CATEGORY_RECOMMAND,
    URL_LIVE_AREA,
    URL_LIVE_PLAYER,
    URL_LIVE_DANMUKU,
    URL_ROOM_INFO,
    URL_ANCHOR_INFO,
    URL_WEBID
} = require('../../api/config');
const { 
    XINGHUO_HTTP_API_KEY,
    XINHUO_WS_APPID,
    XINGHUO_WS_APISECRET,
    XINGHUO_WS_APIKEY
} = require('../../api/api_key');

/**
 * 字幕缓存 key: sse id, value: subtitle
 */

class HomeController {
    static subtitleCache = new Map();

    static async fetchHomeRecommand(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_HOME_RECOMMAND,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomeVideoPlayurl(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_HOME_VIDEO_PLAYER,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomeVideoStream(req, res) {
        try {
            const { videoStreamUrl } = req.query;
            const { range } = req.headers;
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: decodeURIComponent(videoStreamUrl),
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                    'Range': range ? 'bytes=' + range : '',
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : ''
                },
                responseType: 'stream'
            });
            res.setHeader('Content-Type', response.headers['content-type']);
            res.setHeader('Content-Length', response.headers['content-length']);
            response.headers['content-range'] ? res.setHeader('Content-Range', response.headers['content-range']) : '';
            response.data.pipe(res);
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomePopular(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_HOME_HOT_POPULAR,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomeSeriesList(req, res) {
        try {
            const response = await Request.get({
                url: URL_HOME_HOT_SERIES,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                }
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomeSeriesOne(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_HOME_HOT_SERIES_ONE,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomePreciousList(req, res) {
        try {
            const response = await Request.get({
                url: URL_HOME_HOT_PRECIOUS,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                }
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomeRankList(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_HOME_HOT_RANKING,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    
    static async fetchHomePgcRankList(req, res) {
        try {
            const { season_type } = req.query;
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: season_type === 1 ?  URL_HOME_HOT_PGC_ANIME_RANKGING : URL_HOME_HOT_PGC_RANKGING,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: season_type === 1 ? result.result : result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchHomeBangumi(req, res) {
        try {
            const response = await Request.get({
                url: URL_HOME_BANGUMI_SORT,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchHomeVideoInfo(req, res) {
        try {
            const { sessdata } = req.headers;

            const response = await Request.get({
                url: URL_VIDEO_INFO,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchHomeVideoShot(req, res) {
        try {
            const response = await Request.get({
                url: URL_VIDEO_SHOT,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchHomeVideoRecommand(req, res) {
        try {
            const response = await Request.get({
                url: URL_VIDEO_RECOMMAND,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchHomeVideoSummaryByHttp(req, res) {
        const { content } = req.body;
        try {
            const url = 'https://spark-api-open.xf-yun.com/v1/chat/completions';
            const response = await Request.post({
                url,
                headers: {
                    'Authorization': `Bearer ${XINGHUO_HTTP_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "model": 'lite',
                    "messages": [
                        {
                            "role": "system",
                            "content": "你是一个视频内容总结专家，擅长将视频内容进行高度概括和总结，你需要通过提取关键信息和核心观点来生成总结。"
                        },
                        {
                            "role": "user",
                            "content": '以下是这个视频的文字内容，请生成一份总结\n' + content
                        }
                    ],
                }
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.choices,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async saveVideoSubtitle(req, res) {
        try {
            const { content } = req.body;
            const taskId = crypto.randomUUID();
            HomeController.subtitleCache.set(taskId, content);
            // 3分钟后删除缓存
            setTimeout(() => {
                HomeController.subtitleCache.delete(taskId);
            }, 3 * 60 * 1000);
            res.send({
                ActionType: 'OK',
                data: {
                    taskId
                },
                code: 0
            });
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchHomeVideoSummaryByWs(req, res) {
        const { taskId } = req.query;
        const content = HomeController.subtitleCache.get(taskId);
        if(!content) {
            res.send({
                code: -1,
                message: '字幕内容不存在或已过期, 请重新传入'
            });
            return;
        };
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        try {
            const host = 'spark-api.xf-yun.com';
            const path = '/v1.1/chat';
            const date = new Date().toUTCString();
            let tmp = 'host: ' + host + '\n';
            tmp += 'date: ' + date + '\n';
            tmp += 'GET ' + path + ' HTTP/1.1';
            const signature = crypto
                .createHmac('sha256', XINGHUO_WS_APISECRET)
                .update(tmp)
                .digest('base64');
            const authorization_origin = `api_key="${XINGHUO_WS_APIKEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
            const authorization = Buffer.from(authorization_origin).toString('base64');
            const v = {
                authorization: authorization, // 上面生成的 authorization
                date: date,                   // 步骤 1 生成的 date
                host: 'spark-api.xf-yun.com'  // 主机名
            };
            const query = new URLSearchParams(v).toString();
            const url = `wss://spark-api.xf-yun.com/v1.1/chat?${query}`;
            const ws = new WebSocket(url);
            
            ws.onopen = () => {
                const data = {
                    "header": {
                        "app_id": XINHUO_WS_APPID,
                    },
                    "parameter": {
                        "chat": {
                            "domain": "lite",
                            "temperature": 0.5,
                            "max_tokens": 1024, 
                        }
                    },
                    "payload": {
                        "message": {
                            "text": [
                                {
                                    "role": "system",
                                    "content": "你是一个视频内容总结专家，擅长将视频内容进行高度概括和总结，你需要通过提取关键信息和核心观点来生成总结。"
                                },
                                {
                                    "role": "user",
                                    "content": '以下是这个视频的文字内容，请生成一份视频内容的总结\n' + content
                                }
                            ]
                        }
                    }
                };
                ws.send(JSON.stringify(data)); // 转成字符串发送
            };

            // \n\n表示结束
            ws.onmessage = (event) => {
                console.log("收到消息：", event.data);
                const data = JSON.parse(event.data);
                if(data.header.status === 2) {
                    ws.close();
                    res.write(`data: ${event.data}\nevent: close\n\n`);
                    res.end();
                    HomeController.subtitleCache.delete(taskId);
                } else {
                    res.write(`data: ${event.data}\n\n`);
                };
            };
        } catch(error) {
            res.write(`data: ${error.message}\nevent: error\n\n`);
            res.end();
        };
    };
    static async fetchDmList(req, res) {
        try {
            let sessdata;
            if('sessdata' in req.headers) {
                sessdata = req.headers.sessdata;
            };
            const response = await Request.get({
                url: URL_DM_LIST,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com'
                },
                data: req.query,
                responseType: 'arraybuffer'
            });
            res.set('Content-Type', 'application/octet-stream');
            res.send(response.data); // 返回二进制内容
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };


    static async fetchAllSearchList(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_SEARCH_ALL,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : ''
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchTypeSearchList(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_SEARCH_TYPE,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : ''
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchLiveRecommand(req, res) {
        try {
            const { buvid3, sessdata } = req.headers;
            const response = await Request.get({
                url: URL_LIVE_RECOMMAND,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                    'Cookie': sessdata ? `buvid3=${buvid3};SESSDATA=${sessdata}` : ''
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchLiveCategoryRecommand(req, res) {
        try {
            const { buvid3, sessdata } = req.headers;
            const response = await Request.get({
                url: URL_LIVE_CATEGORY_RECOMMAND,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://live.bilibili.com',
                    'Origin': 'https://live.bilibili.com',
                    'Cookie': sessdata ? `buvid3=${buvid3};SESSDATA=${sessdata};buvid4=D1BE06D7-AEE8-ACC9-211A-F80065A1CF8087254-024081703-Suu8L9Mi5DRH4dB90P7D5w%3D%3D` : ''
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    
    static async fetchLivePlayerurl(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_LIVE_PLAYER,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchLiveAreaList(req, res) {
        try {
            const response = await Request.get({
                url: URL_LIVE_AREA,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    
    static async fetchLiveStream(req, res) {
        try {
            const { sessdata } = req.headers;
            const { liveStreamUrl } = req.query;
            const response = await Request.get({
                url: liveStreamUrl,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': 'https://live.bilibili.com/',
                    'Origin': 'https://live.bilibili.com'
                },
                responseType: 'stream'
            });
            response.data.pipe(res);
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };

    static async fetchLiveDanmakuUrl(req, res) {
        try {
            const { buvid3, sessdata } = req.headers;
            const { id } = req.query || '';
            const response = await Request.get({
                url: URL_LIVE_DANMUKU,
                headers: {
                    'Cookie': sessdata ? `buvid3=${buvid3};SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Referer': `https://live.bilibili.com/${id}`,
                    'Origin': 'https://live.bilibili.com',
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    
    // static async fetchLiveDanmakuPackage(req, res) {
    //     try {
    //         const { host, wssPort, roomid, key, uid } = req.query;
    //         const { sessdata } = req.headers;
    //         const fetchWithCookies = fetchCookie(fetch);
    //         const response = await fetchWithCookies(`https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${roomid}`, {
    //             headers: {
    //                 'Cookie': 'SESSDATA=b3d42ea3,1756704148,3b094*32CjDrjj7RfaWETP_bOZB5UlVe0QNV6n4KlS3adeJuXy6er2a2ayGaFlZZIr1YO2wV0WQSVkRqMHhyZVBhZE1tallwb01kc2hpQlRrOG9VZjlYOUQxSDBmWXVnLUdlZFl3SGliR1NzLUVRYkQ5WndqZ09CQnJQc2lCWHB2dUlwaWh1ZWdMOTdBcFRBIIEC'
    //             }
    //         });
    //         const data = await response.json();
    //         const token = data.data.token;
    //         // 封装为指定格式包
    //         function encodePacket(op, body) {
    //             const headerLength = 16;
    //             const protocol = 1;
    //             const type = op;
    //             const sequence = 2;
    //             const bodyBuffer = Buffer.from(JSON.stringify(body));
    //             const headerBuffer = Buffer.alloc(headerLength);
    //             headerBuffer.writeUInt32BE(headerLength + bodyBuffer.length, 0);
    //             headerBuffer.writeUInt16BE(headerLength, 4);
    //             headerBuffer.writeUInt16BE(protocol, 6);
    //             headerBuffer.writeUInt32BE(type, 8);
    //             headerBuffer.writeUInt32BE(sequence, 12);
            
    //             return Buffer.concat([headerBuffer, bodyBuffer]);
    //         };

    //         // 解析数据包头部
    //         async function parsePacketHeader(buffer) {
    //             const totalSize = buffer.readUInt32BE(0);
    //             const headerSize = buffer.readUInt16BE(4);
    //             const protocolVersion = buffer.readUInt16BE(6);
    //             const operationCode = buffer.readUInt32BE(8);
    //             const sequence = buffer.readUInt32BE(12);

    //             const bodyBuffer = buffer.slice(headerSize);

    //             if (protocolVersion === 3) {
    //                 await parseCompressedBody(bodyBuffer);
    //             };

    //             return { totalSize, headerSize, protocolVersion, operationCode, sequence };
    //         };

    //         // 解析 Brotli 压缩数据
    //         async function parseCompressedBody(buffer) {
    //             try {
    //                 // Brotli 解压缩
    //                 const decompressedData = brotliDecompressSync(buffer);

    //                 // 解析 JSON
    //                 const textDecoder = new TextDecoder('utf-8');
    //                 const decompressedString = textDecoder.decode(decompressedData);
    //                 const cleanJSONArrString = extractJSONFast(cleanJSONData(decompressedString));

    //                 processDanmakuData(cleanJSONArrString);
    //             } catch (error) {
    //                 console.log('解压缩数据错误:', error);
    //             }
    //         };

    //         // 处理弹幕数据
    //         function processDanmakuData(dataArr) {
    //             dataArr.forEach((data) => {
    //                 if (data.cmd === 'DANMU_MSG') {
    //                     const info = JSON.parse(data.info[0][15].extra);
    //                     console.log(info);
    //                 }
    //             });
    //         };

    //         // 去除无效字符
    //         function cleanJSONData(text) {
    //             return text.replace(/[^\x20-\x7E]/g, '');
    //         };

    //         // 提取 JSON
    //         function extractJSONFast(text) {
    //             const results = [];
    //             let start = -1;
    //             let depth = 0;
    //             for (let i = 0; i < text.length; i++) {
    //                 if (text[i] === '{') {
    //                     if (depth === 0) start = i;
    //                     depth++;
    //                 } else if (text[i] === '}') {
    //                     depth--;
    //                     if (depth === 0 && start !== -1) {
    //                         const jsonStr = text.slice(start, i + 1);
    //                         try {
    //                             results.push(JSON.parse(jsonStr));
    //                         } catch (error) {
    //                             console.error('JSON 解析失败:', jsonStr, error);
    //                         }
    //                         start = -1;
    //                     }
    //                 }
    //             }
    //             return results;
    //         };

    //         // 连接 WebSocket
    //         const connectDanmakuStream = async ({ roomid, host, wssPort, key, uid = 0 }) => {
    //             if (!roomid) {
    //                 console.error('房间号为空');
    //                 return;
    //             };
    //             const url = 'wss://' + host + ':' + wssPort + '/sub';
    //             const ws = new WebSocket(url, {
    //                 headers: {
    //                     // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    //                     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    //                     // 'Origin': 'https://live.bilibili.com',
    //                     // 'Upgrade': 'websocket',
    //                     // 'Connection': 'Upgrade',
    //                     // 'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
    //                     // 'Sec-WebSocket-Version': '13',
    //                     // 'Host': host,
    //                 }
    //             });
    //             ws.on('open', () => {
    //                 const authData = {
    //                     roomid,
    //                     uid,
    //                     key: token,
    //                     platform: 'web',
    //                     type: 2,
    //                     protover: 3,
    //                     buvid: '20D52E77-016F-394B-74F6-8D00A476EBAB69954infoc',
    //                 };
    //                 const authPacket = encodePacket(7, authData);
    //                 if(ws.readyState === WebSocket.OPEN) {
    //                     ws.send(authPacket);
    //                     console.log('发送认证包:', authData);
    //                 };
    //             });

    //             ws.on('message', async (data) => {
    //                 await parsePacketHeader(data);
    //             });

    //             ws.on('error', (error) => {
    //                 console.error('WebSocket 错误:', error);
    //             });

    //             ws.on('close', (code, reason) => {
    //                 console.log('WebSocket 连接关闭', code, reason);
    //                 timer && clearInterval(timer);
    //             });

    //             // 发送心跳包
    //             let timer = null;
    //             timer = setInterval(() => {
    //                 const heartbeatPacket = encodePacket(2, {});
    //                 ws.send(heartbeatPacket);
    //                 console.log('发送心跳包');
    //             }, 30000);
    //         };
    //         connectDanmakuStream({ roomid, host, wssPort, uid, key}, sessdata);
    //         res.status(200).send('OK');
    //     } catch(error) {
    //         console.log('websocket error:', error);
    //         res.status(500).send({
    //             message: error.message || '服务器错误'
    //         });
    //     };
    // };
    static async fetchRoomInfo(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_ROOM_INFO,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Origin': 'https://live.bilibili.com',
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchAnchorInfo(req, res) {
        try {
            const { sessdata } = req.headers;
            const response = await Request.get({
                url: URL_ANCHOR_INFO,
                headers: {
                    'Cookie': sessdata ? `SESSDATA=${sessdata}` : '',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Origin': 'https://live.bilibili.com',
                },
                data: req.query,
            });
            const result = response.data;
            if(result.code === 0) {
                res.send({
                    ActionType: 'OK',
                    data: result.data,
                    code: result.code
                });
            }
            else {
                res.send({
                    message: result.message,
                    code: result.code
                });
            };
        } catch(error) {
            res.status(500).send({
                message: error.message || '服务器错误'
            });
        };
    };
    static async fetchBuvid(req, res) {
        const { sessdata } = req.headers;
        const response = await Request.get({
            url: URL_BUVID3,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Cookie': sessdata ? `SESSDATA=${sessdata}` : ''
            }
        });
        const result = response.data;
        if(result.code === 0) {
            res.send({
                ActionType: 'OK',
                data: result.data,
                code: result.code
            });
        }
        else {
            res.send({
                message: result.message,
                code: result.code
            });
        };
    };
    static async fetchWebId(req, res) {
        const { sessdata } = req.headers;
        const response = await Request.get({
            url: URL_WEBID,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Cookie': sessdata ? `SESSDATA=${sessdata}` : ''
            }
        });
        res.send({
            ActionType: 'OK',
            data:  response.data,
        });
    };
};
module.exports = HomeController;