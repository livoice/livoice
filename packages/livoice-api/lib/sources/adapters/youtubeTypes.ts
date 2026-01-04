export type YtDlpChapter = {
  title?: string;
  start_time?: number;
  end_time?: number;
};

export type YtDlpThumbnail = {
  url?: string;
  width?: number;
  height?: number;
  id?: string;
};

export type YtDlpFormat = {
  format_id?: string;
  format_note?: string;
  ext?: string;
  protocol?: string;
  acodec?: string;
  vcodec?: string;
  url?: string;
  width?: number;
  height?: number;
  fps?: number;
  rows?: number;
  columns?: number;
  fragments?: Array<{ url?: string; duration?: number }>;
  audio_ext?: string;
  video_ext?: string;
  vbr?: number;
  abr?: number;
  tbr?: number | null;
  resolution?: string;
  aspect_ratio?: number;
  filesize?: number | null;
  filesize_approx?: number | null;
  http_headers?: Record<string, string>;
  format?: string;
};

export type YtDlpCaption = {
  url?: string;
  ext?: string;
  name?: string;
};

export type YtDlpVideoInfo = {
  id?: string;
  title?: string;
  description?: string;
  uploader?: string;
  uploader_id?: string;
  uploader_url?: string;
  channel?: string;
  channel_id?: string;
  channel_url?: string;
  duration?: number;
  view_count?: number;
  like_count?: number;
  categories?: string[];
  tags?: string[];
  timestamp?: number;
  upload_date?: string;
  live_status?: string;
  webpage_url?: string;
  original_url?: string;
  formats?: YtDlpFormat[];
  thumbnails?: YtDlpThumbnail[];
  chapters?: YtDlpChapter[];
  subtitles?: Record<string, YtDlpCaption[]>;
  automatic_captions?: Record<string, YtDlpCaption[]>;
};

// Example: (DO NOT DELETE THIS COMMENT
// =====================================
// {
//     "id": "FTZ-9C5KpOE",
//     "title": "להשיג לקוחות מהסרטון הראשון זה קל, פשוט תעשו את זה:",
//     "formats": [
//       {
//         "format_id": "sb3",
//         "format_note": "storyboard",
//         "ext": "mhtml",
//         "protocol": "mhtml",
//         "acodec": "none",
//         "vcodec": "none",
//         "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L0/default.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCPk3b0zbcE2zawgS7pLo7bnDOP3w",
//         "width": 48,
//         "height": 27,
//         "fps": 0.08285004142502071,
//         "rows": 10,
//         "columns": 10,
//         "fragments": [
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L0/default.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCPk3b0zbcE2zawgS7pLo7bnDOP3w",
//             "duration": 1207
//           }
//         ],
//         "audio_ext": "none",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 0,
//         "tbr": null,
//         "resolution": "48x27",
//         "aspect_ratio": 1.78,
//         "filesize_approx": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "sb3 - 48x27 (storyboard)"
//       },
//       {
//         "format_id": "sb2",
//         "format_note": "storyboard",
//         "ext": "mhtml",
//         "protocol": "mhtml",
//         "acodec": "none",
//         "vcodec": "none",
//         "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L1/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLA1Ao6eZQ_qDM7sUYwPe3RD7cFFZQ",
//         "width": 80,
//         "height": 45,
//         "fps": 0.10107705053852527,
//         "rows": 10,
//         "columns": 10,
//         "fragments": [
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L1/M0.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLA1Ao6eZQ_qDM7sUYwPe3RD7cFFZQ",
//             "duration": 989.344262295082
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L1/M1.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLA1Ao6eZQ_qDM7sUYwPe3RD7cFFZQ",
//             "duration": 217.655737704918
//           }
//         ],
//         "audio_ext": "none",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 0,
//         "tbr": null,
//         "resolution": "80x45",
//         "aspect_ratio": 1.78,
//         "filesize_approx": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "sb2 - 80x45 (storyboard)"
//       },
//       {
//         "format_id": "sb1",
//         "format_note": "storyboard",
//         "ext": "mhtml",
//         "protocol": "mhtml",
//         "acodec": "none",
//         "vcodec": "none",
//         "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L2/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCfucy2S3E2C8Ln6OTj_qBGwDKWMg",
//         "width": 160,
//         "height": 90,
//         "fps": 0.10107705053852527,
//         "rows": 5,
//         "columns": 5,
//         "fragments": [
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L2/M0.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCfucy2S3E2C8Ln6OTj_qBGwDKWMg",
//             "duration": 247.3360655737705
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L2/M1.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCfucy2S3E2C8Ln6OTj_qBGwDKWMg",
//             "duration": 247.3360655737705
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L2/M2.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCfucy2S3E2C8Ln6OTj_qBGwDKWMg",
//             "duration": 247.3360655737705
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L2/M3.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCfucy2S3E2C8Ln6OTj_qBGwDKWMg",
//             "duration": 247.3360655737705
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L2/M4.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLCfucy2S3E2C8Ln6OTj_qBGwDKWMg",
//             "duration": 217.655737704918
//           }
//         ],
//         "audio_ext": "none",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 0,
//         "tbr": null,
//         "resolution": "160x90",
//         "aspect_ratio": 1.78,
//         "filesize_approx": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "sb1 - 160x90 (storyboard)"
//       },
//       {
//         "format_id": "sb0",
//         "format_note": "storyboard",
//         "ext": "mhtml",
//         "protocol": "mhtml",
//         "acodec": "none",
//         "vcodec": "none",
//         "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//         "width": 320,
//         "height": 180,
//         "fps": 0.10107705053852527,
//         "rows": 3,
//         "columns": 3,
//         "fragments": [
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M0.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M1.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M2.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M3.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M4.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M5.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M6.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M7.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M8.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M9.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M10.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M11.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M12.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 89.04098360655738
//           },
//           {
//             "url": "https://i.ytimg.com/sb/FTZ-9C5KpOE/storyboard3_L3/M13.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgjuh-_GBg==&sigh=rs$AOn4CLBiuQBGjb24LV5trW7g_mxIU735EQ",
//             "duration": 49.46721311475403
//           }
//         ],
//         "audio_ext": "none",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 0,
//         "tbr": null,
//         "resolution": "320x180",
//         "aspect_ratio": 1.78,
//         "filesize_approx": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "sb0 - 320x180 (storyboard)"
//       },
//       {
//         "asr": 48000,
//         "filesize": 8321951,
//         "format_id": "249-drc",
//         "format_note": "low, DRC",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 1.5,
//         "has_drm": false,
//         "tbr": 55.164,
//         "filesize_approx": 8321910,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "none",
//         "acodec": "opus",
//         "dynamic_range": null,
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=8321951&dur=1206.861&lmt=1759241395430822&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgQmbnjxiezoU7Wo5TM6lGIz9Rq_UOHkF_gYjWVlnAITACIQCh3o0pfnHjisDTS_ILs2mI6lFFSLfEXFN_nQYX_RSXcg%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "webm",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 55.164,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "249-drc - audio only (low, DRC)"
//       },
//       {
//         "asr": 48000,
//         "filesize": 11061662,
//         "format_id": "250-drc",
//         "format_note": "low, DRC",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 1.5,
//         "has_drm": false,
//         "tbr": 73.325,
//         "filesize_approx": 11061635,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "none",
//         "acodec": "opus",
//         "dynamic_range": null,
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=11061662&dur=1206.861&lmt=1759241395472086&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAJqx_rAqryX7XeRwols15gY5kk2iG51qNguC2XTsRGjBAiBzw5VTCsMpM7XROUUv1YU2lwrj63mjk5j1NElNYg5YEw%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "webm",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 73.325,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "250-drc - audio only (low, DRC)"
//       },
//       {
//         "asr": 48000,
//         "filesize": 8293399,
//         "format_id": "249",
//         "format_note": "low",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 2,
//         "has_drm": false,
//         "tbr": 54.975,
//         "filesize_approx": 8293397,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "none",
//         "acodec": "opus",
//         "dynamic_range": null,
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=8293399&dur=1206.861&lmt=1759240959047877&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAI2Keavo22mV18t7a9uE2ZPjbQ2nqyBocDb-orlAjAC4AiAL7CVYK-DXAGn_O4ykl20VDH4dy8uDnsOj5v9f0qmtxg%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "webm",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 54.975,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "249 - audio only (low)"
//       },
//       {
//         "asr": 48000,
//         "filesize": 11051399,
//         "format_id": "250",
//         "format_note": "low",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 2,
//         "has_drm": false,
//         "tbr": 73.257,
//         "filesize_approx": 11051377,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "none",
//         "acodec": "opus",
//         "dynamic_range": null,
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=11051399&dur=1206.861&lmt=1759240959121540&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgINMdlfBK3XbzxwJbwTMxiPGj8wbxAOayoi8xuqZrhcACIQD8MKQLhK6jRk6q60O5gPS0DgF_ZW0fArSS0RZ5AzUReA%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "webm",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 73.257,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "250 - audio only (low)"
//       },
//       {
//         "asr": 44100,
//         "filesize": 19533797,
//         "format_id": "140-drc",
//         "format_note": "medium, DRC",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 2.5,
//         "has_drm": false,
//         "tbr": 129.48,
//         "filesize_approx": 19533725,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "m4a",
//         "vcodec": "none",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": null,
//         "container": "m4a_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=19533797&dur=1206.903&lmt=1759241099475574&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAIOlXrfvo35-rp6DF5ERylRjVM7tGjqEE_wLHOuATR7PAiEA3cuD3Ngiblf2tdhtifbJERjXthT6N2XmpQMpRvj3D-Y%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "m4a",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 129.48,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "140-drc - audio only (medium, DRC)"
//       },
//       {
//         "asr": 48000,
//         "filesize": 21307800,
//         "format_id": "251-drc",
//         "format_note": "medium, DRC",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 2.5,
//         "has_drm": false,
//         "tbr": 141.244,
//         "filesize_approx": 21307734,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "none",
//         "acodec": "opus",
//         "dynamic_range": null,
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=21307800&dur=1206.861&lmt=1759241395402677&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAL1r7XMYa2Oy5u_uQA0DE5xGCoY7BAnrfZM-lyZ6zwq8AiBHdkg18utVKhZfBVkYUpiVqSj1OP_lY4pqs3McP7TSxA%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "webm",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 141.244,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "251-drc - audio only (medium, DRC)"
//       },
//       {
//         "asr": 44100,
//         "filesize": 19533718,
//         "format_id": "140",
//         "format_note": "medium",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 3,
//         "has_drm": false,
//         "tbr": 129.479,
//         "filesize_approx": 19533574,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "m4a",
//         "vcodec": "none",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": null,
//         "container": "m4a_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=19533718&dur=1206.903&lmt=1759241111196919&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAIag7sKz2qS9kglu2Hvox2zKQygCGsRykzg_KvaRUowVAiEAhOJrLc1TeZzCWQlAgn01UdtFd-bV-8D7wPUT-_fVM4s%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "m4a",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 129.479,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "140 - audio only (medium)"
//       },
//       {
//         "asr": 48000,
//         "filesize": 21290253,
//         "format_id": "251",
//         "format_note": "medium",
//         "source_preference": -1,
//         "fps": null,
//         "audio_channels": 2,
//         "height": null,
//         "quality": 3,
//         "has_drm": false,
//         "tbr": 141.128,
//         "filesize_approx": 21290234,
//         "width": null,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "none",
//         "acodec": "opus",
//         "dynamic_range": null,
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=21290253&dur=1206.861&lmt=1759240959051826&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgO8Je8BSqRRwHmyuUgj50gWlsNamz8k8v-aXYqZ7c6BYCIQCwFXtC-EnaaaNiqosKgn8cFTcHj26YBnc_bX78z8nAzg%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "audio_ext": "webm",
//         "video_ext": "none",
//         "vbr": 0,
//         "abr": 141.128,
//         "resolution": "audio only",
//         "aspect_ratio": null,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "251 - audio only (medium)"
//       },
//       {
//         "format_id": "91",
//         "format_index": null,
//         "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/91/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D7361095%3Bdur%3D1206.973%3Bgir%3Dyes%3Bitag%3D139%3Blmt%3D1759241109586932/sgovp/clen%3D5711120%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D160%3Blmt%3D1759241618967667/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRQIhALYRdIGLPwu8DfWvFJpWWx06o0beTB6GGINf2MT2mizOAiBn0VBD8YNmuObt7rXjQp8gVdsxNdYwa7sHVkj7bfQicQ%3D%3D/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRQIhALN0WIQWd43wT5F2TL1Bq0Pg__tZCPWe9Zl0etiGdJQRAiBUwjlBqnz62ycm1PzNtDDi7v6Dbn11-cYYOhWX-x664g%3D%3D/playlist/index.m3u8",
//         "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//         "tbr": 170.089,
//         "ext": "mp4",
//         "fps": 25,
//         "protocol": "m3u8_native",
//         "preference": null,
//         "quality": 0,
//         "has_drm": false,
//         "width": 256,
//         "height": 144,
//         "vcodec": "avc1.4D400C",
//         "acodec": "mp4a.40.5",
//         "dynamic_range": "SDR",
//         "available_at": 1767532323,
//         "source_preference": -2,
//         "language": "iw",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "vbr": null,
//         "abr": null,
//         "resolution": "256x144",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "91 - 256x144"
//       },
//       {
//         "asr": null,
//         "filesize": 5711120,
//         "format_id": "160",
//         "format_note": "144p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 144,
//         "quality": 0,
//         "has_drm": false,
//         "tbr": 37.858,
//         "filesize_approx": 5711068,
//         "width": 256,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "avc1.4d400c",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=160&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=5711120&dur=1206.840&lmt=1759241618967667&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgc1BR9b2xKi9VC2n7oCdOhdeDNBbIR_9NUHyOp1WZlWkCIQC622B3losHbSsl7JcMwmYolWoQTiOKkL1GN_HDVyjzdw%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 37.858,
//         "resolution": "256x144",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "160 - 256x144 (144p)"
//       },
//       {
//         "asr": null,
//         "filesize": 8951921,
//         "format_id": "278",
//         "format_note": "144p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 144,
//         "quality": 0,
//         "has_drm": false,
//         "tbr": 59.341,
//         "filesize_approx": 8951886,
//         "width": 256,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "vp9",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=278&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=8951921&dur=1206.840&lmt=1759247728452765&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5437534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAOgRjH5R8ZL5XvByWTl5DvegyqnalJCs6X9CFo9tHTeOAiAjP3DGgdL9f1lAU4al35kbNvBnlrUsKYTTi6c9DRJp4w%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "webm",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 59.341,
//         "resolution": "256x144",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "278 - 256x144 (144p)"
//       },
//       {
//         "asr": null,
//         "filesize": 6953266,
//         "format_id": "394",
//         "format_note": "144p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 144,
//         "quality": 0,
//         "has_drm": false,
//         "tbr": 46.092,
//         "filesize_approx": 6953208,
//         "width": 256,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "av01.0.00M.08",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=394&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=6953266&dur=1206.840&lmt=1759241353976798&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=543G534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAO2jmggX5Gg5G-9D4PgN3EHz8TDYTNcusNeY-iPIAEqGAiA7Wauu4A89QjAWLY1Vl9tE1KjdNlDrqbPs5V0pSmoANw%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 46.092,
//         "resolution": "256x144",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "394 - 256x144 (144p)"
//       },
//       {
//         "format_id": "92",
//         "format_index": null,
//         "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/92/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D7361095%3Bdur%3D1206.973%3Bgir%3Dyes%3Bitag%3D139%3Blmt%3D1759241109586932/sgovp/clen%3D10989751%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D133%3Blmt%3D1759241580435650/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRQIhANFoqbKA6ioCGEsj0WzgrcxhiIyzwCxIDQMO7yi99KpgAiBukcoZmZTYdtzgP0e7K3AQ38w_f3BDVOPndlO3cfCXLw%3D%3D/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRQIgYfOmIy-rRcvq4mifulldNgXwnSiS30zdZfyayYUSAbkCIQDlrZmBoHAkyIryc5Gx5SMT_ybLNRKt6bH87ZdJjKLz-A%3D%3D/playlist/index.m3u8",
//         "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//         "tbr": 302.961,
//         "ext": "mp4",
//         "fps": 25,
//         "protocol": "m3u8_native",
//         "preference": null,
//         "quality": 5,
//         "has_drm": false,
//         "width": 426,
//         "height": 240,
//         "vcodec": "avc1.4D4015",
//         "acodec": "mp4a.40.5",
//         "dynamic_range": "SDR",
//         "available_at": 1767532323,
//         "source_preference": -2,
//         "language": "iw",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "vbr": null,
//         "abr": null,
//         "resolution": "426x240",
//         "aspect_ratio": 1.77,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "92 - 426x240"
//       },
//       {
//         "asr": null,
//         "filesize": 10989751,
//         "format_id": "133",
//         "format_note": "240p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 240,
//         "quality": 5,
//         "has_drm": false,
//         "tbr": 72.849,
//         "filesize_approx": 10989635,
//         "width": 426,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "avc1.4d4015",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=133&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=10989751&dur=1206.840&lmt=1759241580435650&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgQjqPl3AQ9QXYEhWzbKdwohlGWJfPFc8m4u8b84p2gwkCIEB510m-xQDl1u-Lc07DhxdczEkA_X3l29GPtFNUFtDM&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 72.849,
//         "resolution": "426x240",
//         "aspect_ratio": 1.77,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "133 - 426x240 (240p)"
//       },
//       {
//         "asr": null,
//         "filesize": 12179003,
//         "format_id": "242",
//         "format_note": "240p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 240,
//         "quality": 5,
//         "has_drm": false,
//         "tbr": 80.733,
//         "filesize_approx": 12178976,
//         "width": 426,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "vp9",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=242&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=12179003&dur=1206.840&lmt=1759247732685833&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5437534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgZ-JKjlxoz_JXBWfCgwD8g-MnGqtbBVtcgfqSNAQEHWwCIQDAnDKMTgfZMbZVrvLdN6hfyukz1aG7jjgQX5N6TteCvw%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "webm",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 80.733,
//         "resolution": "426x240",
//         "aspect_ratio": 1.77,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "242 - 426x240 (240p)"
//       },
//       {
//         "asr": null,
//         "filesize": 11951750,
//         "format_id": "395",
//         "format_note": "240p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 240,
//         "quality": 5,
//         "has_drm": false,
//         "tbr": 79.226,
//         "filesize_approx": 11951638,
//         "width": 426,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "av01.0.00M.08",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=395&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=11951750&dur=1206.840&lmt=1759241336403371&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=543G534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAOWUdXO4jwCEkqt1Tn4XUq0W3JJqLrgY84KdCANoqwxfAiEAp6Z7J_7e20Ja7MhhqjTS2hjidhUMOIAgKa0nu6yBJQw%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 79.226,
//         "resolution": "426x240",
//         "aspect_ratio": 1.77,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "395 - 426x240 (240p)"
//       },
//       {
//         "format_id": "93",
//         "format_index": null,
//         "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/93/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D19533718%3Bdur%3D1206.903%3Bgir%3Dyes%3Bitag%3D140%3Blmt%3D1759241111196919/sgovp/clen%3D19537889%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D134%3Blmt%3D1759241583082867/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRQIgDG69kocs1owmaH-r5j3eg4KLHh1XRZQXJ0TaXYh8hIMCIQDvhMV8SuWJMWs_BuBiM9mheaObmI7T0OPBuW3sSdvpuQ%3D%3D/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRAIgDh8TX94grvpUd_uF5D6UP8H45z1HepQK_L8lAmIC6L4CIFxoefFBvyLfdBcTMUBaJPwRrlktU_mbKi3iFhObmDu0/playlist/index.m3u8",
//         "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//         "tbr": 574.206,
//         "ext": "mp4",
//         "fps": 25,
//         "protocol": "m3u8_native",
//         "preference": null,
//         "quality": 6,
//         "has_drm": false,
//         "width": 640,
//         "height": 360,
//         "vcodec": "avc1.4D401E",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": "SDR",
//         "available_at": 1767532323,
//         "source_preference": -2,
//         "language": "iw",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "vbr": null,
//         "abr": null,
//         "resolution": "640x360",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "93 - 640x360"
//       },
//       {
//         "asr": null,
//         "filesize": 19537889,
//         "format_id": "134",
//         "format_note": "360p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 360,
//         "quality": 6,
//         "has_drm": false,
//         "tbr": 129.514,
//         "filesize_approx": 19537834,
//         "width": 640,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "avc1.4d401e",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=134&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=19537889&dur=1206.840&lmt=1759241583082867&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAOofqdhYtVsKrwMh0nhg6Di6KPrvHOVUquI2ERvQnhSfAiBMAJ_cllNH8ky8MKY4CIp_slLnyriabzHLJ8nK_u7_Ww%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 129.514,
//         "resolution": "640x360",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "134 - 640x360 (360p)"
//       },
//       {
//         "asr": 44100,
//         "filesize": 57683053,
//         "format_id": "18",
//         "format_note": "360p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": 2,
//         "height": 360,
//         "quality": 6,
//         "has_drm": false,
//         "tbr": 382.354,
//         "filesize_approx": 57683023,
//         "width": 640,
//         "language": "iw",
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "avc1.42001E",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": "SDR",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3BN543nmxVfXqmfF9WYwGnXQKyFFmZsUuryCADN4r5i8gLpCdRgnA3BZf1etOWJZXkQdA&vprv=1&svpuc=1&mime=video%2Fmp4&ns=MOtMJ5FS5Oez5ziEtJw2HKgR&rqh=1&gir=yes&clen=57683053&ratebypass=yes&dur=1206.903&lmt=1759241255886203&mt=1767531893&fvip=3&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5438534&n=0P0Awc_bE2u--g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhALK5i5N8a_BlPx_1bJ1Cyp9I6QKfRYOoYfhxoVD558EeAiBUUyWRU5ce1z390V5zy-cnzQPEHC-gwRArz9hi_afdZg%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "vbr": null,
//         "abr": null,
//         "resolution": "640x360",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "18 - 640x360 (360p)"
//       },
//       {
//         "asr": null,
//         "filesize": 26503997,
//         "format_id": "243",
//         "format_note": "360p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 360,
//         "quality": 6,
//         "has_drm": false,
//         "tbr": 175.691,
//         "filesize_approx": 26503865,
//         "width": 640,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "vp9",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=243&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=26503997&dur=1206.840&lmt=1759247723314500&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5437534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgaBX52olFOGA4eEzZ5nhah5NNH0dF0iqU49V36VXXtRwCIQCwqfBgvTEcoMwSQ_K4SuaScTOPstUqHG4o9SJf6y-Lyg%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "webm",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 175.691,
//         "resolution": "640x360",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "243 - 640x360 (360p)"
//       },
//       {
//         "asr": null,
//         "filesize": 21104892,
//         "format_id": "396",
//         "format_note": "360p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 360,
//         "quality": 6,
//         "has_drm": false,
//         "tbr": 139.901,
//         "filesize_approx": 21104765,
//         "width": 640,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "av01.0.01M.08",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=396&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=21104892&dur=1206.840&lmt=1759241356081948&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=543G534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgOVUQtS7HUUz1oPS0ufteCotUuNtfjRFMSHpxX9NtggMCIQDVXJhvqdND9Ty_IPMJ1ry4g2y0STAZfgjm1wkfui3Xzg%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 139.901,
//         "resolution": "640x360",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "396 - 640x360 (360p)"
//       },
//       {
//         "format_id": "94",
//         "format_index": null,
//         "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/94/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D19533718%3Bdur%3D1206.903%3Bgir%3Dyes%3Bitag%3D140%3Blmt%3D1759241111196919/sgovp/clen%3D32549476%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D135%3Blmt%3D1759241597047794/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRQIgETadct7Xv81CJGWaN0uDcUoODtYyP9teA_USGEVhWdMCIQDg3LFjkMFkwA_wZ3WkpN5rMMKPrrqfcFhmyu0z8Hb-tQ%3D%3D/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRgIhAKM6hxMwgr3RX6lH1dNJMS8sdK17jDV7itHUAgkzxjzuAiEAqjURd37INbGr3R3qIuOgIdRZnl3nunra9LwuOHnLVvI%3D/playlist/index.m3u8",
//         "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//         "tbr": 776.137,
//         "ext": "mp4",
//         "fps": 25,
//         "protocol": "m3u8_native",
//         "preference": null,
//         "quality": 7,
//         "has_drm": false,
//         "width": 854,
//         "height": 480,
//         "vcodec": "avc1.4D401E",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": "SDR",
//         "available_at": 1767532323,
//         "source_preference": -2,
//         "language": "iw",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "vbr": null,
//         "abr": null,
//         "resolution": "854x480",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "94 - 854x480"
//       },
//       {
//         "asr": null,
//         "filesize": 32549476,
//         "format_id": "135",
//         "format_note": "480p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 480,
//         "quality": 7,
//         "has_drm": false,
//         "tbr": 215.766,
//         "filesize_approx": 32549379,
//         "width": 854,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "avc1.4d401e",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=135&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=32549476&dur=1206.840&lmt=1759241597047794&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAK7YMxVodk4_4rye5Ak4qIlS_n0bvI3txc8DZSH94Z7UAiEA7ggwifuA12G2-tWrY6JbsNxAiZr6RQp-wAjVp0hYyug%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 215.766,
//         "resolution": "854x480",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "135 - 854x480 (480p)"
//       },
//       {
//         "asr": null,
//         "filesize": 40140585,
//         "format_id": "244",
//         "format_note": "480p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 480,
//         "quality": 7,
//         "has_drm": false,
//         "tbr": 266.087,
//         "filesize_approx": 40140554,
//         "width": 854,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "vp9",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=244&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=40140585&dur=1206.840&lmt=1759247701712375&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5437534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgAUe4rVoEiH_UV_7cY7ude8LLCgf1foRiDC-2xyIy8GECICw2Xh9TvDyVW9PsFWXQ1LpNDUtwy_UU8CpDDwC_x8UU&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "webm",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 266.087,
//         "resolution": "854x480",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "244 - 854x480 (480p)"
//       },
//       {
//         "asr": null,
//         "filesize": 32241668,
//         "format_id": "397",
//         "format_note": "480p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 480,
//         "quality": 7,
//         "has_drm": false,
//         "tbr": 213.726,
//         "filesize_approx": 32241635,
//         "width": 854,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "av01.0.04M.08",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=397&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=32241668&dur=1206.840&lmt=1759241347885546&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=543G534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAOjs50wQyLqoRh-e_N_6N6PHpZoftAMt5EmFrBtXF0kOAiBVal1GmVOoC0vf_r_PSAIBwnf_a2bh1-aE0TzKPjYurw%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 213.726,
//         "resolution": "854x480",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "397 - 854x480 (480p)"
//       },
//       {
//         "format_id": "95",
//         "format_index": null,
//         "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/95/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D19533718%3Bdur%3D1206.903%3Bgir%3Dyes%3Bitag%3D140%3Blmt%3D1759241111196919/sgovp/clen%3D51847379%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D136%3Blmt%3D1759241584057707/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRgIhAOD-aVaAJrSWrHt9Q5r89ZQ4y2xjdu05eNq4ysA97MyKAiEA-F4xvVwCDc8_U2QjfUCi6qO08nSBRv0_gk57YAqky0Y%3D/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRQIgXnYmXS-vuTVpKs9-Fyb-Zw-AbljAjULN6VLHv8ZVmTcCIQDFO2NdidJEDey2nWC9ObKMyNcEteuXt4VCksI3ykt2fQ%3D%3D/playlist/index.m3u8",
//         "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//         "tbr": 1231.179,
//         "ext": "mp4",
//         "fps": 25,
//         "protocol": "m3u8_native",
//         "preference": null,
//         "quality": 8,
//         "has_drm": false,
//         "width": 1280,
//         "height": 720,
//         "vcodec": "avc1.4D401F",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": "SDR",
//         "available_at": 1767532323,
//         "source_preference": -2,
//         "language": "iw",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "vbr": null,
//         "abr": null,
//         "resolution": "1280x720",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "95 - 1280x720"
//       },
//       {
//         "asr": null,
//         "filesize": 51847379,
//         "format_id": "136",
//         "format_note": "720p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 720,
//         "quality": 8,
//         "has_drm": false,
//         "tbr": 343.69,
//         "filesize_approx": 51847354,
//         "width": 1280,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "avc1.4d401f",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=51847379&dur=1206.840&lmt=1759241584057707&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgVkYBTiA0HquLqA4hpCUVa6t1MSm1aeJ6ZDLpwWuvm_YCIGvWF78P-DAoNEK_zFP7e1LrlIevOdSIEZmzy1qjiRY6&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 343.69,
//         "resolution": "1280x720",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "136 - 1280x720 (720p)"
//       },
//       {
//         "asr": null,
//         "filesize": 74304721,
//         "format_id": "247",
//         "format_note": "720p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 720,
//         "quality": 8,
//         "has_drm": false,
//         "tbr": 492.557,
//         "filesize_approx": 74304686,
//         "width": 1280,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "vp9",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=247&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=74304721&dur=1206.840&lmt=1759247715212775&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5437534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAOWzbN10N3Y7frY3Lua0XWGVYcwTZ2dqowe8YAVEXR8_AiEAumDJFJMhyAyus7dmeGB3RvFlHEvRidwAGhg85Xj_Y3U%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "webm",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 492.557,
//         "resolution": "1280x720",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "247 - 1280x720 (720p)"
//       },
//       {
//         "asr": null,
//         "filesize": 53817231,
//         "format_id": "398",
//         "format_note": "720p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 720,
//         "quality": 8,
//         "has_drm": false,
//         "tbr": 356.748,
//         "filesize_approx": 53817219,
//         "width": 1280,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "av01.0.05M.08",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=398&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=53817231&dur=1206.840&lmt=1759241356402900&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=543G534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhALSTB7snoBus4FBJ7ZUr4SH2qh-1U4sSx09Ho6rGXVP-AiEA-gRv9p4p_jH10V1ITDFenfgtK-dkG4TlOnXXkg_xis8%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 356.748,
//         "resolution": "1280x720",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "398 - 1280x720 (720p)"
//       },
//       {
//         "format_id": "96",
//         "format_index": null,
//         "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/96/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D19533718%3Bdur%3D1206.903%3Bgir%3Dyes%3Bitag%3D140%3Blmt%3D1759241111196919/sgovp/clen%3D149048116%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D137%3Blmt%3D1759241598020579/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRAIgQF9rsuvMTYXa3g69vohPsD6HkCFsOHam7vkCxSFJlVgCID7U_tZxEhtjIyS2vrijs3QUbfT2ULh4rnt2qRnM3OmO/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRQIgbzd9txsdFeU8H44lAwJVRM412itz_5TRPcg9Ft_Z9cQCIQD28xDDbTUfxh6hrOo1FNekJNSRvH3dcXOO4IiNUM5r0w%3D%3D/playlist/index.m3u8",
//         "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//         "tbr": 2954.62,
//         "ext": "mp4",
//         "fps": 25,
//         "protocol": "m3u8_native",
//         "preference": null,
//         "quality": 9,
//         "has_drm": false,
//         "width": 1920,
//         "height": 1080,
//         "vcodec": "avc1.640028",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": "SDR",
//         "available_at": 1767532323,
//         "source_preference": -2,
//         "language": "iw",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "vbr": null,
//         "abr": null,
//         "resolution": "1920x1080",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "96 - 1920x1080"
//       },
//       {
//         "asr": null,
//         "filesize": 149048116,
//         "format_id": "137",
//         "format_note": "1080p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 1080,
//         "quality": 9,
//         "has_drm": false,
//         "tbr": 988.022,
//         "filesize_approx": 149048058,
//         "width": 1920,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "avc1.640028",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=149048116&dur=1206.840&lmt=1759241598020579&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5432534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAOlTTLNIevLEYgPhJUcecFy8lkD6_MQWN9G9_QXtQZowAiEAlcwdCW9c-CrSQv7RILDOkDYL2b_gzrDmQRfEyec5g8M%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 988.022,
//         "resolution": "1920x1080",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "137 - 1920x1080 (1080p)"
//       },
//       {
//         "asr": null,
//         "filesize": 131970966,
//         "format_id": "248",
//         "format_note": "1080p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 1080,
//         "quality": 9,
//         "has_drm": false,
//         "tbr": 874.819,
//         "filesize_approx": 131970820,
//         "width": 1920,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "webm",
//         "vcodec": "vp9",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "webm_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fwebm&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=131970966&dur=1206.840&lmt=1759244898451332&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=5437534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgb-dUG3AzNIX_zWT9Z-uFnI2m-GY9XLlumoiqDNiJRlcCIQCAHtCDK2bbl-_SB3lU-R1h5gIULV4ycf_-bWJBEgQccw%3D%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "webm",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 874.819,
//         "resolution": "1920x1080",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "248 - 1920x1080 (1080p)"
//       },
//       {
//         "asr": null,
//         "filesize": 84058108,
//         "format_id": "399",
//         "format_note": "1080p",
//         "source_preference": -1,
//         "fps": 25,
//         "audio_channels": null,
//         "height": 1080,
//         "quality": 9,
//         "has_drm": false,
//         "tbr": 557.211,
//         "filesize_approx": 84058065,
//         "width": 1920,
//         "language": null,
//         "language_preference": -1,
//         "preference": null,
//         "ext": "mp4",
//         "vcodec": "av01.0.08M.08",
//         "acodec": "none",
//         "dynamic_range": "SDR",
//         "container": "mp4_dash",
//         "url": "https://rr6---sn-ivuoxu-ua8s.googlevideo.com/videoplayback?expire=1767553917&ei=HWdaabrTIMnw6dsP-5-2wAs&ip=77.137.26.138&id=o-AAXzcO6yGIjJrZdi_VBt1oVZ9NwRfSAQJ6m_SP_9XCJq&itag=399&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&met=1767532317%2C&mh=r0&mm=31%2C29&mn=sn-ivuoxu-ua8s%2Csn-ua87zn7l&ms=au%2Crdu&mv=m&mvi=6&pl=20&rms=au%2Cau&initcwndbps=3828750&siu=1&bui=AYUSA3CoH_DRqcFKMvRO1XsL1dJM7VBjt2IgHxEBXRTALpr1jlH2rrYXXVoNwrGi8vIBK8L-Jg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Nk1T03nTO9tJgCSeyogcdgER&rqh=1&gir=yes&clen=84058108&dur=1206.840&lmt=1759241334118175&mt=1767531893&fvip=3&keepalive=yes&lmw=1&fexp=51557447%2C51565116%2C51565682%2C51580970&c=TVHTML5&sefc=1&txp=543G534&n=9k5hS4v-L5FhCg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAMcPQKSrUGnfiUILInbSpFyat9f_u6PYUYJ127Q3OVqnAiEAjXlimUaL81_hmUUoW3ancFb7RRbWpcg9Bs-RZD12_EQ%3D&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgac2bfItLEuIUi3Pmsl1TEa0wes4pJKlC6F36BXwjo0YCIQDf5qpgEcpGlm9qL1nJIYD1yTNXRK_horodIFExDVQIdA%3D%3D",
//         "available_at": 1767532317,
//         "downloader_options": {
//           "http_chunk_size": 10485760
//         },
//         "protocol": "https",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "abr": 0,
//         "vbr": 557.211,
//         "resolution": "1920x1080",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "399 - 1920x1080 (1080p)"
//       }
//     ],
//     "thumbnails": [
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/3.jpg",
//         "preference": -37,
//         "id": "0"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/3.webp",
//         "preference": -36,
//         "id": "1"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/2.jpg",
//         "preference": -35,
//         "id": "2"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/2.webp",
//         "preference": -34,
//         "id": "3"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/1.jpg",
//         "preference": -33,
//         "id": "4"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/1.webp",
//         "preference": -32,
//         "id": "5"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/mq3.jpg",
//         "preference": -31,
//         "id": "6"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/mq3.webp",
//         "preference": -30,
//         "id": "7"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/mq2.jpg",
//         "preference": -29,
//         "id": "8"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/mq2.webp",
//         "preference": -28,
//         "id": "9"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/mq1.jpg",
//         "preference": -27,
//         "id": "10"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/mq1.webp",
//         "preference": -26,
//         "id": "11"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hq3.jpg",
//         "preference": -25,
//         "id": "12"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/hq3.webp",
//         "preference": -24,
//         "id": "13"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hq2.jpg",
//         "preference": -23,
//         "id": "14"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/hq2.webp",
//         "preference": -22,
//         "id": "15"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hq1.jpg",
//         "preference": -21,
//         "id": "16"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/hq1.webp",
//         "preference": -20,
//         "id": "17"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/sd3.jpg",
//         "preference": -19,
//         "id": "18"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/sd3.webp",
//         "preference": -18,
//         "id": "19"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/sd2.jpg",
//         "preference": -17,
//         "id": "20"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/sd2.webp",
//         "preference": -16,
//         "id": "21"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/sd1.jpg",
//         "preference": -15,
//         "id": "22"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/sd1.webp",
//         "preference": -14,
//         "id": "23"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/default.jpg",
//         "preference": -13,
//         "id": "24"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/default.webp",
//         "preference": -12,
//         "id": "25"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/mqdefault.jpg",
//         "preference": -11,
//         "id": "26"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/mqdefault.webp",
//         "preference": -10,
//         "id": "27"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/0.jpg",
//         "preference": -9,
//         "id": "28"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/0.webp",
//         "preference": -8,
//         "id": "29"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDDkv6gdN3_f32lCN8M_pS2O5nJcw",
//         "height": 94,
//         "width": 168,
//         "preference": -7,
//         "id": "30",
//         "resolution": "168x94"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDb8d7sRdCvSM4PFDaKJmgGeC_k-g",
//         "height": 94,
//         "width": 168,
//         "preference": -7,
//         "id": "31",
//         "resolution": "168x94"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBORBITi8ZLHD4Wji4YSE7fga6WLQ",
//         "height": 110,
//         "width": 196,
//         "preference": -7,
//         "id": "32",
//         "resolution": "196x110"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDOjIi47nd_6f3dYCFd-GaAKltiFg",
//         "height": 110,
//         "width": 196,
//         "preference": -7,
//         "id": "33",
//         "resolution": "196x110"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBDNB6xOpaA0kogLlc1ojwXHOjf5Q",
//         "height": 138,
//         "width": 246,
//         "preference": -7,
//         "id": "34",
//         "resolution": "246x138"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAOV65OgsMJF7_YHuY3FDdy2kffyA",
//         "height": 138,
//         "width": 246,
//         "preference": -7,
//         "id": "35",
//         "resolution": "246x138"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0s40eHZ0AGLQd1yhZMwkQBU8EXg",
//         "height": 188,
//         "width": 336,
//         "preference": -7,
//         "id": "36",
//         "resolution": "336x188"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAO0yvBQwJWyd_xPmP3K_FDmdHTbA",
//         "height": 188,
//         "width": 336,
//         "preference": -7,
//         "id": "37",
//         "resolution": "336x188"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hqdefault.jpg",
//         "height": 360,
//         "width": 480,
//         "preference": -7,
//         "id": "38",
//         "resolution": "480x360"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/hqdefault.webp",
//         "preference": -6,
//         "id": "39"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/sddefault.jpg",
//         "preference": -5,
//         "id": "40"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/sddefault.webp",
//         "preference": -4,
//         "id": "41"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/hq720.jpg",
//         "preference": -3,
//         "id": "42"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/hq720.webp",
//         "preference": -2,
//         "id": "43"
//       },
//       {
//         "url": "https://i.ytimg.com/vi/FTZ-9C5KpOE/maxresdefault.jpg",
//         "height": 1080,
//         "width": 1920,
//         "preference": -1,
//         "id": "44",
//         "resolution": "1920x1080"
//       },
//       {
//         "url": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/maxresdefault.webp",
//         "height": 1080,
//         "width": 1920,
//         "preference": 0,
//         "id": "45",
//         "resolution": "1920x1080"
//       }
//     ],
//     "thumbnail": "https://i.ytimg.com/vi_webp/FTZ-9C5KpOE/maxresdefault.webp",
//     "description": "◄לאינסטגרם של ליבנת - https://www.instagram.com/livnat_ur/\n◄לטיקטוק של ליבנת - https://www.tiktok.com/@livnat_ur0\n\nככל שיותר בעלי עסקים מתחילים לשווק ברשתות החברתיות והתחרות גוברת, להצליח להשיג לידים, במיוחד מהסרטונים הראשונים, הפך לאתגר ענק.\n\nאבל אחרי שליוויתי אלפי בעלי עסקים, בניתי נוסחה מדויקת, שהוכיחה את עצמה מאות פעמים כדרך האולטימטיבית להשיג לידים כבר מהסרטון הראשון!\n\nבסרטון הזה, ניתחתי בשבילכם בדיוק איך אתם  יכולים לחקות אותי ולהכין סרטון ויראלי, שיביא לכם לידים לא משנה באיזה תחום אתם!  \n\nמחכה להיות מתוייגת בסרטון שלכם❤️\n\nכיף שאתם בערוץ שלי! מוזמנים לבקר ברשתות החברתיות ולעקוב אחריי גם שם!",
//     "channel_id": "UCaOIOWI4dHM0ehfYZYtWeMA",
//     "channel_url": "https://www.youtube.com/channel/UCaOIOWI4dHM0ehfYZYtWeMA",
//     "duration": 1207,
//     "view_count": 5369,
//     "average_rating": null,
//     "age_limit": 0,
//     "webpage_url": "https://www.youtube.com/watch?v=FTZ-9C5KpOE",
//     "categories": [
//       "People & Blogs"
//     ],
//     "tags": [
//       "טיקטוק",
//       "אינסטגרם",
//       "ליבנת",
//       "אורינובסקי",
//       "סושיאלייט",
//       "מכירות",
//       "לידים",
//       "עסק",
//       "כסף",
//       "עסקים",
//       "סרטונים ויראלים",
//       "ויראלי",
//       "סרטון",
//       "סרטוני טיקטוק",
//       "קידום בטיקטוק",
//       "קידום באינסטגרם",
//       "ליבנת אורינובסקי",
//       "סטורי",
//       "משפיענית",
//       "השפעה",
//       "רשתות חברתיות"
//     ],
//     "playable_in_embed": true,
//     "live_status": "not_live",
//     "media_type": "video",
//     "release_timestamp": null,
//     "_format_sort_fields": [
//       "quality",
//       "res",
//       "fps",
//       "hdr:12",
//       "source",
//       "vcodec",
//       "channels",
//       "acodec",
//       "lang",
//       "proto"
//     ],
//     "automatic_captions": {
//       "ab": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ab&fmt=json3",
//           "name": "Abkhazian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ab&fmt=srv1",
//           "name": "Abkhazian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ab&fmt=srv2",
//           "name": "Abkhazian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ab&fmt=srv3",
//           "name": "Abkhazian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ab&fmt=ttml",
//           "name": "Abkhazian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ab&fmt=srt",
//           "name": "Abkhazian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ab&fmt=vtt",
//           "name": "Abkhazian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "aa": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=aa&fmt=json3",
//           "name": "Afar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=aa&fmt=srv1",
//           "name": "Afar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=aa&fmt=srv2",
//           "name": "Afar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=aa&fmt=srv3",
//           "name": "Afar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=aa&fmt=ttml",
//           "name": "Afar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=aa&fmt=srt",
//           "name": "Afar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=aa&fmt=vtt",
//           "name": "Afar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "af": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=af&fmt=json3",
//           "name": "Afrikaans",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=af&fmt=srv1",
//           "name": "Afrikaans",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=af&fmt=srv2",
//           "name": "Afrikaans",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=af&fmt=srv3",
//           "name": "Afrikaans",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=af&fmt=ttml",
//           "name": "Afrikaans",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=af&fmt=srt",
//           "name": "Afrikaans",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=af&fmt=vtt",
//           "name": "Afrikaans",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ak": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ak&fmt=json3",
//           "name": "Akan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ak&fmt=srv1",
//           "name": "Akan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ak&fmt=srv2",
//           "name": "Akan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ak&fmt=srv3",
//           "name": "Akan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ak&fmt=ttml",
//           "name": "Akan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ak&fmt=srt",
//           "name": "Akan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ak&fmt=vtt",
//           "name": "Akan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sq": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sq&fmt=json3",
//           "name": "Albanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sq&fmt=srv1",
//           "name": "Albanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sq&fmt=srv2",
//           "name": "Albanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sq&fmt=srv3",
//           "name": "Albanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sq&fmt=ttml",
//           "name": "Albanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sq&fmt=srt",
//           "name": "Albanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sq&fmt=vtt",
//           "name": "Albanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "am": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=am&fmt=json3",
//           "name": "Amharic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=am&fmt=srv1",
//           "name": "Amharic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=am&fmt=srv2",
//           "name": "Amharic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=am&fmt=srv3",
//           "name": "Amharic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=am&fmt=ttml",
//           "name": "Amharic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=am&fmt=srt",
//           "name": "Amharic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=am&fmt=vtt",
//           "name": "Amharic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ar": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ar&fmt=json3",
//           "name": "Arabic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ar&fmt=srv1",
//           "name": "Arabic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ar&fmt=srv2",
//           "name": "Arabic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ar&fmt=srv3",
//           "name": "Arabic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ar&fmt=ttml",
//           "name": "Arabic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ar&fmt=srt",
//           "name": "Arabic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ar&fmt=vtt",
//           "name": "Arabic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "hy": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hy&fmt=json3",
//           "name": "Armenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hy&fmt=srv1",
//           "name": "Armenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hy&fmt=srv2",
//           "name": "Armenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hy&fmt=srv3",
//           "name": "Armenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hy&fmt=ttml",
//           "name": "Armenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hy&fmt=srt",
//           "name": "Armenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hy&fmt=vtt",
//           "name": "Armenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "as": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=as&fmt=json3",
//           "name": "Assamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=as&fmt=srv1",
//           "name": "Assamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=as&fmt=srv2",
//           "name": "Assamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=as&fmt=srv3",
//           "name": "Assamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=as&fmt=ttml",
//           "name": "Assamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=as&fmt=srt",
//           "name": "Assamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=as&fmt=vtt",
//           "name": "Assamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ay": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ay&fmt=json3",
//           "name": "Aymara",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ay&fmt=srv1",
//           "name": "Aymara",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ay&fmt=srv2",
//           "name": "Aymara",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ay&fmt=srv3",
//           "name": "Aymara",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ay&fmt=ttml",
//           "name": "Aymara",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ay&fmt=srt",
//           "name": "Aymara",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ay&fmt=vtt",
//           "name": "Aymara",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "az": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=az&fmt=json3",
//           "name": "Azerbaijani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=az&fmt=srv1",
//           "name": "Azerbaijani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=az&fmt=srv2",
//           "name": "Azerbaijani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=az&fmt=srv3",
//           "name": "Azerbaijani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=az&fmt=ttml",
//           "name": "Azerbaijani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=az&fmt=srt",
//           "name": "Azerbaijani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=az&fmt=vtt",
//           "name": "Azerbaijani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "bn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bn&fmt=json3",
//           "name": "Bangla",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bn&fmt=srv1",
//           "name": "Bangla",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bn&fmt=srv2",
//           "name": "Bangla",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bn&fmt=srv3",
//           "name": "Bangla",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bn&fmt=ttml",
//           "name": "Bangla",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bn&fmt=srt",
//           "name": "Bangla",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bn&fmt=vtt",
//           "name": "Bangla",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ba": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ba&fmt=json3",
//           "name": "Bashkir",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ba&fmt=srv1",
//           "name": "Bashkir",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ba&fmt=srv2",
//           "name": "Bashkir",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ba&fmt=srv3",
//           "name": "Bashkir",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ba&fmt=ttml",
//           "name": "Bashkir",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ba&fmt=srt",
//           "name": "Bashkir",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ba&fmt=vtt",
//           "name": "Bashkir",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "eu": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eu&fmt=json3",
//           "name": "Basque",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eu&fmt=srv1",
//           "name": "Basque",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eu&fmt=srv2",
//           "name": "Basque",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eu&fmt=srv3",
//           "name": "Basque",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eu&fmt=ttml",
//           "name": "Basque",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eu&fmt=srt",
//           "name": "Basque",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eu&fmt=vtt",
//           "name": "Basque",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "be": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=be&fmt=json3",
//           "name": "Belarusian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=be&fmt=srv1",
//           "name": "Belarusian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=be&fmt=srv2",
//           "name": "Belarusian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=be&fmt=srv3",
//           "name": "Belarusian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=be&fmt=ttml",
//           "name": "Belarusian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=be&fmt=srt",
//           "name": "Belarusian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=be&fmt=vtt",
//           "name": "Belarusian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "bho": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bho&fmt=json3",
//           "name": "Bhojpuri",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bho&fmt=srv1",
//           "name": "Bhojpuri",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bho&fmt=srv2",
//           "name": "Bhojpuri",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bho&fmt=srv3",
//           "name": "Bhojpuri",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bho&fmt=ttml",
//           "name": "Bhojpuri",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bho&fmt=srt",
//           "name": "Bhojpuri",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bho&fmt=vtt",
//           "name": "Bhojpuri",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "bs": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bs&fmt=json3",
//           "name": "Bosnian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bs&fmt=srv1",
//           "name": "Bosnian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bs&fmt=srv2",
//           "name": "Bosnian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bs&fmt=srv3",
//           "name": "Bosnian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bs&fmt=ttml",
//           "name": "Bosnian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bs&fmt=srt",
//           "name": "Bosnian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bs&fmt=vtt",
//           "name": "Bosnian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "br": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=br&fmt=json3",
//           "name": "Breton",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=br&fmt=srv1",
//           "name": "Breton",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=br&fmt=srv2",
//           "name": "Breton",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=br&fmt=srv3",
//           "name": "Breton",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=br&fmt=ttml",
//           "name": "Breton",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=br&fmt=srt",
//           "name": "Breton",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=br&fmt=vtt",
//           "name": "Breton",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "bg": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bg&fmt=json3",
//           "name": "Bulgarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bg&fmt=srv1",
//           "name": "Bulgarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bg&fmt=srv2",
//           "name": "Bulgarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bg&fmt=srv3",
//           "name": "Bulgarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bg&fmt=ttml",
//           "name": "Bulgarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bg&fmt=srt",
//           "name": "Bulgarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bg&fmt=vtt",
//           "name": "Bulgarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "my": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=my&fmt=json3",
//           "name": "Burmese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=my&fmt=srv1",
//           "name": "Burmese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=my&fmt=srv2",
//           "name": "Burmese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=my&fmt=srv3",
//           "name": "Burmese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=my&fmt=ttml",
//           "name": "Burmese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=my&fmt=srt",
//           "name": "Burmese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=my&fmt=vtt",
//           "name": "Burmese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ca": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ca&fmt=json3",
//           "name": "Catalan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ca&fmt=srv1",
//           "name": "Catalan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ca&fmt=srv2",
//           "name": "Catalan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ca&fmt=srv3",
//           "name": "Catalan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ca&fmt=ttml",
//           "name": "Catalan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ca&fmt=srt",
//           "name": "Catalan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ca&fmt=vtt",
//           "name": "Catalan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ceb": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ceb&fmt=json3",
//           "name": "Cebuano",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ceb&fmt=srv1",
//           "name": "Cebuano",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ceb&fmt=srv2",
//           "name": "Cebuano",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ceb&fmt=srv3",
//           "name": "Cebuano",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ceb&fmt=ttml",
//           "name": "Cebuano",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ceb&fmt=srt",
//           "name": "Cebuano",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ceb&fmt=vtt",
//           "name": "Cebuano",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "zh-Hans": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hans&fmt=json3",
//           "name": "Chinese (Simplified)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hans&fmt=srv1",
//           "name": "Chinese (Simplified)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hans&fmt=srv2",
//           "name": "Chinese (Simplified)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hans&fmt=srv3",
//           "name": "Chinese (Simplified)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hans&fmt=ttml",
//           "name": "Chinese (Simplified)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hans&fmt=srt",
//           "name": "Chinese (Simplified)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hans&fmt=vtt",
//           "name": "Chinese (Simplified)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "zh-Hant": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hant&fmt=json3",
//           "name": "Chinese (Traditional)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hant&fmt=srv1",
//           "name": "Chinese (Traditional)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hant&fmt=srv2",
//           "name": "Chinese (Traditional)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hant&fmt=srv3",
//           "name": "Chinese (Traditional)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hant&fmt=ttml",
//           "name": "Chinese (Traditional)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hant&fmt=srt",
//           "name": "Chinese (Traditional)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zh-Hant&fmt=vtt",
//           "name": "Chinese (Traditional)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "co": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=co&fmt=json3",
//           "name": "Corsican",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=co&fmt=srv1",
//           "name": "Corsican",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=co&fmt=srv2",
//           "name": "Corsican",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=co&fmt=srv3",
//           "name": "Corsican",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=co&fmt=ttml",
//           "name": "Corsican",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=co&fmt=srt",
//           "name": "Corsican",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=co&fmt=vtt",
//           "name": "Corsican",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "hr": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hr&fmt=json3",
//           "name": "Croatian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hr&fmt=srv1",
//           "name": "Croatian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hr&fmt=srv2",
//           "name": "Croatian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hr&fmt=srv3",
//           "name": "Croatian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hr&fmt=ttml",
//           "name": "Croatian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hr&fmt=srt",
//           "name": "Croatian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hr&fmt=vtt",
//           "name": "Croatian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "cs": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cs&fmt=json3",
//           "name": "Czech",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cs&fmt=srv1",
//           "name": "Czech",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cs&fmt=srv2",
//           "name": "Czech",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cs&fmt=srv3",
//           "name": "Czech",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cs&fmt=ttml",
//           "name": "Czech",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cs&fmt=srt",
//           "name": "Czech",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cs&fmt=vtt",
//           "name": "Czech",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "da": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=da&fmt=json3",
//           "name": "Danish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=da&fmt=srv1",
//           "name": "Danish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=da&fmt=srv2",
//           "name": "Danish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=da&fmt=srv3",
//           "name": "Danish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=da&fmt=ttml",
//           "name": "Danish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=da&fmt=srt",
//           "name": "Danish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=da&fmt=vtt",
//           "name": "Danish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "dv": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dv&fmt=json3",
//           "name": "Divehi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dv&fmt=srv1",
//           "name": "Divehi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dv&fmt=srv2",
//           "name": "Divehi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dv&fmt=srv3",
//           "name": "Divehi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dv&fmt=ttml",
//           "name": "Divehi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dv&fmt=srt",
//           "name": "Divehi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dv&fmt=vtt",
//           "name": "Divehi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "nl": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nl&fmt=json3",
//           "name": "Dutch",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nl&fmt=srv1",
//           "name": "Dutch",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nl&fmt=srv2",
//           "name": "Dutch",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nl&fmt=srv3",
//           "name": "Dutch",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nl&fmt=ttml",
//           "name": "Dutch",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nl&fmt=srt",
//           "name": "Dutch",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nl&fmt=vtt",
//           "name": "Dutch",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "dz": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dz&fmt=json3",
//           "name": "Dzongkha",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dz&fmt=srv1",
//           "name": "Dzongkha",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dz&fmt=srv2",
//           "name": "Dzongkha",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dz&fmt=srv3",
//           "name": "Dzongkha",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dz&fmt=ttml",
//           "name": "Dzongkha",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dz&fmt=srt",
//           "name": "Dzongkha",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=dz&fmt=vtt",
//           "name": "Dzongkha",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "en": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=en&fmt=json3",
//           "name": "English",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=en&fmt=srv1",
//           "name": "English",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=en&fmt=srv2",
//           "name": "English",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=en&fmt=srv3",
//           "name": "English",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=en&fmt=ttml",
//           "name": "English",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=en&fmt=srt",
//           "name": "English",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=en&fmt=vtt",
//           "name": "English",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "eo": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eo&fmt=json3",
//           "name": "Esperanto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eo&fmt=srv1",
//           "name": "Esperanto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eo&fmt=srv2",
//           "name": "Esperanto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eo&fmt=srv3",
//           "name": "Esperanto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eo&fmt=ttml",
//           "name": "Esperanto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eo&fmt=srt",
//           "name": "Esperanto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=eo&fmt=vtt",
//           "name": "Esperanto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "et": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=et&fmt=json3",
//           "name": "Estonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=et&fmt=srv1",
//           "name": "Estonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=et&fmt=srv2",
//           "name": "Estonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=et&fmt=srv3",
//           "name": "Estonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=et&fmt=ttml",
//           "name": "Estonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=et&fmt=srt",
//           "name": "Estonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=et&fmt=vtt",
//           "name": "Estonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ee": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ee&fmt=json3",
//           "name": "Ewe",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ee&fmt=srv1",
//           "name": "Ewe",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ee&fmt=srv2",
//           "name": "Ewe",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ee&fmt=srv3",
//           "name": "Ewe",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ee&fmt=ttml",
//           "name": "Ewe",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ee&fmt=srt",
//           "name": "Ewe",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ee&fmt=vtt",
//           "name": "Ewe",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "fo": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fo&fmt=json3",
//           "name": "Faroese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fo&fmt=srv1",
//           "name": "Faroese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fo&fmt=srv2",
//           "name": "Faroese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fo&fmt=srv3",
//           "name": "Faroese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fo&fmt=ttml",
//           "name": "Faroese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fo&fmt=srt",
//           "name": "Faroese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fo&fmt=vtt",
//           "name": "Faroese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "fj": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fj&fmt=json3",
//           "name": "Fijian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fj&fmt=srv1",
//           "name": "Fijian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fj&fmt=srv2",
//           "name": "Fijian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fj&fmt=srv3",
//           "name": "Fijian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fj&fmt=ttml",
//           "name": "Fijian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fj&fmt=srt",
//           "name": "Fijian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fj&fmt=vtt",
//           "name": "Fijian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "fil": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fil&fmt=json3",
//           "name": "Filipino",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fil&fmt=srv1",
//           "name": "Filipino",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fil&fmt=srv2",
//           "name": "Filipino",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fil&fmt=srv3",
//           "name": "Filipino",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fil&fmt=ttml",
//           "name": "Filipino",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fil&fmt=srt",
//           "name": "Filipino",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fil&fmt=vtt",
//           "name": "Filipino",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "fi": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fi&fmt=json3",
//           "name": "Finnish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fi&fmt=srv1",
//           "name": "Finnish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fi&fmt=srv2",
//           "name": "Finnish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fi&fmt=srv3",
//           "name": "Finnish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fi&fmt=ttml",
//           "name": "Finnish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fi&fmt=srt",
//           "name": "Finnish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fi&fmt=vtt",
//           "name": "Finnish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "fr": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fr&fmt=json3",
//           "name": "French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fr&fmt=srv1",
//           "name": "French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fr&fmt=srv2",
//           "name": "French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fr&fmt=srv3",
//           "name": "French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fr&fmt=ttml",
//           "name": "French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fr&fmt=srt",
//           "name": "French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fr&fmt=vtt",
//           "name": "French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "gaa": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gaa&fmt=json3",
//           "name": "Ga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gaa&fmt=srv1",
//           "name": "Ga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gaa&fmt=srv2",
//           "name": "Ga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gaa&fmt=srv3",
//           "name": "Ga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gaa&fmt=ttml",
//           "name": "Ga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gaa&fmt=srt",
//           "name": "Ga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gaa&fmt=vtt",
//           "name": "Ga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "gl": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gl&fmt=json3",
//           "name": "Galician",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gl&fmt=srv1",
//           "name": "Galician",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gl&fmt=srv2",
//           "name": "Galician",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gl&fmt=srv3",
//           "name": "Galician",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gl&fmt=ttml",
//           "name": "Galician",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gl&fmt=srt",
//           "name": "Galician",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gl&fmt=vtt",
//           "name": "Galician",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "lg": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lg&fmt=json3",
//           "name": "Ganda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lg&fmt=srv1",
//           "name": "Ganda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lg&fmt=srv2",
//           "name": "Ganda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lg&fmt=srv3",
//           "name": "Ganda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lg&fmt=ttml",
//           "name": "Ganda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lg&fmt=srt",
//           "name": "Ganda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lg&fmt=vtt",
//           "name": "Ganda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ka": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ka&fmt=json3",
//           "name": "Georgian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ka&fmt=srv1",
//           "name": "Georgian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ka&fmt=srv2",
//           "name": "Georgian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ka&fmt=srv3",
//           "name": "Georgian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ka&fmt=ttml",
//           "name": "Georgian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ka&fmt=srt",
//           "name": "Georgian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ka&fmt=vtt",
//           "name": "Georgian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "de": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=de&fmt=json3",
//           "name": "German",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=de&fmt=srv1",
//           "name": "German",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=de&fmt=srv2",
//           "name": "German",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=de&fmt=srv3",
//           "name": "German",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=de&fmt=ttml",
//           "name": "German",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=de&fmt=srt",
//           "name": "German",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=de&fmt=vtt",
//           "name": "German",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "el": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=el&fmt=json3",
//           "name": "Greek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=el&fmt=srv1",
//           "name": "Greek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=el&fmt=srv2",
//           "name": "Greek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=el&fmt=srv3",
//           "name": "Greek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=el&fmt=ttml",
//           "name": "Greek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=el&fmt=srt",
//           "name": "Greek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=el&fmt=vtt",
//           "name": "Greek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "gn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gn&fmt=json3",
//           "name": "Guarani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gn&fmt=srv1",
//           "name": "Guarani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gn&fmt=srv2",
//           "name": "Guarani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gn&fmt=srv3",
//           "name": "Guarani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gn&fmt=ttml",
//           "name": "Guarani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gn&fmt=srt",
//           "name": "Guarani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gn&fmt=vtt",
//           "name": "Guarani",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "gu": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gu&fmt=json3",
//           "name": "Gujarati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gu&fmt=srv1",
//           "name": "Gujarati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gu&fmt=srv2",
//           "name": "Gujarati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gu&fmt=srv3",
//           "name": "Gujarati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gu&fmt=ttml",
//           "name": "Gujarati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gu&fmt=srt",
//           "name": "Gujarati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gu&fmt=vtt",
//           "name": "Gujarati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ht": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ht&fmt=json3",
//           "name": "Haitian Creole",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ht&fmt=srv1",
//           "name": "Haitian Creole",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ht&fmt=srv2",
//           "name": "Haitian Creole",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ht&fmt=srv3",
//           "name": "Haitian Creole",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ht&fmt=ttml",
//           "name": "Haitian Creole",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ht&fmt=srt",
//           "name": "Haitian Creole",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ht&fmt=vtt",
//           "name": "Haitian Creole",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ha": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ha&fmt=json3",
//           "name": "Hausa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ha&fmt=srv1",
//           "name": "Hausa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ha&fmt=srv2",
//           "name": "Hausa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ha&fmt=srv3",
//           "name": "Hausa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ha&fmt=ttml",
//           "name": "Hausa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ha&fmt=srt",
//           "name": "Hausa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ha&fmt=vtt",
//           "name": "Hausa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "haw": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=haw&fmt=json3",
//           "name": "Hawaiian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=haw&fmt=srv1",
//           "name": "Hawaiian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=haw&fmt=srv2",
//           "name": "Hawaiian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=haw&fmt=srv3",
//           "name": "Hawaiian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=haw&fmt=ttml",
//           "name": "Hawaiian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=haw&fmt=srt",
//           "name": "Hawaiian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=haw&fmt=vtt",
//           "name": "Hawaiian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "iw-orig": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=json3",
//           "name": "Hebrew (Original)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srv1",
//           "name": "Hebrew (Original)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srv2",
//           "name": "Hebrew (Original)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srv3",
//           "name": "Hebrew (Original)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=ttml",
//           "name": "Hebrew (Original)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srt",
//           "name": "Hebrew (Original)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=vtt",
//           "name": "Hebrew (Original)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "iw": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=json3",
//           "name": "Hebrew",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srv1",
//           "name": "Hebrew",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srv2",
//           "name": "Hebrew",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srv3",
//           "name": "Hebrew",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=ttml",
//           "name": "Hebrew",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=srt",
//           "name": "Hebrew",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&fmt=vtt",
//           "name": "Hebrew",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "hi": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hi&fmt=json3",
//           "name": "Hindi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hi&fmt=srv1",
//           "name": "Hindi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hi&fmt=srv2",
//           "name": "Hindi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hi&fmt=srv3",
//           "name": "Hindi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hi&fmt=ttml",
//           "name": "Hindi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hi&fmt=srt",
//           "name": "Hindi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hi&fmt=vtt",
//           "name": "Hindi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "hmn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hmn&fmt=json3",
//           "name": "Hmong",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hmn&fmt=srv1",
//           "name": "Hmong",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hmn&fmt=srv2",
//           "name": "Hmong",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hmn&fmt=srv3",
//           "name": "Hmong",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hmn&fmt=ttml",
//           "name": "Hmong",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hmn&fmt=srt",
//           "name": "Hmong",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hmn&fmt=vtt",
//           "name": "Hmong",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "hu": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hu&fmt=json3",
//           "name": "Hungarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hu&fmt=srv1",
//           "name": "Hungarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hu&fmt=srv2",
//           "name": "Hungarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hu&fmt=srv3",
//           "name": "Hungarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hu&fmt=ttml",
//           "name": "Hungarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hu&fmt=srt",
//           "name": "Hungarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=hu&fmt=vtt",
//           "name": "Hungarian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "is": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=is&fmt=json3",
//           "name": "Icelandic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=is&fmt=srv1",
//           "name": "Icelandic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=is&fmt=srv2",
//           "name": "Icelandic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=is&fmt=srv3",
//           "name": "Icelandic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=is&fmt=ttml",
//           "name": "Icelandic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=is&fmt=srt",
//           "name": "Icelandic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=is&fmt=vtt",
//           "name": "Icelandic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ig": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ig&fmt=json3",
//           "name": "Igbo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ig&fmt=srv1",
//           "name": "Igbo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ig&fmt=srv2",
//           "name": "Igbo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ig&fmt=srv3",
//           "name": "Igbo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ig&fmt=ttml",
//           "name": "Igbo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ig&fmt=srt",
//           "name": "Igbo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ig&fmt=vtt",
//           "name": "Igbo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "id": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=id&fmt=json3",
//           "name": "Indonesian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=id&fmt=srv1",
//           "name": "Indonesian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=id&fmt=srv2",
//           "name": "Indonesian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=id&fmt=srv3",
//           "name": "Indonesian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=id&fmt=ttml",
//           "name": "Indonesian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=id&fmt=srt",
//           "name": "Indonesian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=id&fmt=vtt",
//           "name": "Indonesian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "iu": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=iu&fmt=json3",
//           "name": "Inuktitut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=iu&fmt=srv1",
//           "name": "Inuktitut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=iu&fmt=srv2",
//           "name": "Inuktitut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=iu&fmt=srv3",
//           "name": "Inuktitut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=iu&fmt=ttml",
//           "name": "Inuktitut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=iu&fmt=srt",
//           "name": "Inuktitut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=iu&fmt=vtt",
//           "name": "Inuktitut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ga": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ga&fmt=json3",
//           "name": "Irish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ga&fmt=srv1",
//           "name": "Irish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ga&fmt=srv2",
//           "name": "Irish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ga&fmt=srv3",
//           "name": "Irish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ga&fmt=ttml",
//           "name": "Irish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ga&fmt=srt",
//           "name": "Irish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ga&fmt=vtt",
//           "name": "Irish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "it": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=it&fmt=json3",
//           "name": "Italian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=it&fmt=srv1",
//           "name": "Italian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=it&fmt=srv2",
//           "name": "Italian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=it&fmt=srv3",
//           "name": "Italian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=it&fmt=ttml",
//           "name": "Italian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=it&fmt=srt",
//           "name": "Italian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=it&fmt=vtt",
//           "name": "Italian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ja": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ja&fmt=json3",
//           "name": "Japanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ja&fmt=srv1",
//           "name": "Japanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ja&fmt=srv2",
//           "name": "Japanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ja&fmt=srv3",
//           "name": "Japanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ja&fmt=ttml",
//           "name": "Japanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ja&fmt=srt",
//           "name": "Japanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ja&fmt=vtt",
//           "name": "Japanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "jv": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=jv&fmt=json3",
//           "name": "Javanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=jv&fmt=srv1",
//           "name": "Javanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=jv&fmt=srv2",
//           "name": "Javanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=jv&fmt=srv3",
//           "name": "Javanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=jv&fmt=ttml",
//           "name": "Javanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=jv&fmt=srt",
//           "name": "Javanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=jv&fmt=vtt",
//           "name": "Javanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "kl": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kl&fmt=json3",
//           "name": "Kalaallisut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kl&fmt=srv1",
//           "name": "Kalaallisut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kl&fmt=srv2",
//           "name": "Kalaallisut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kl&fmt=srv3",
//           "name": "Kalaallisut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kl&fmt=ttml",
//           "name": "Kalaallisut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kl&fmt=srt",
//           "name": "Kalaallisut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kl&fmt=vtt",
//           "name": "Kalaallisut",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "kn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kn&fmt=json3",
//           "name": "Kannada",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kn&fmt=srv1",
//           "name": "Kannada",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kn&fmt=srv2",
//           "name": "Kannada",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kn&fmt=srv3",
//           "name": "Kannada",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kn&fmt=ttml",
//           "name": "Kannada",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kn&fmt=srt",
//           "name": "Kannada",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kn&fmt=vtt",
//           "name": "Kannada",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "kk": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kk&fmt=json3",
//           "name": "Kazakh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kk&fmt=srv1",
//           "name": "Kazakh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kk&fmt=srv2",
//           "name": "Kazakh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kk&fmt=srv3",
//           "name": "Kazakh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kk&fmt=ttml",
//           "name": "Kazakh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kk&fmt=srt",
//           "name": "Kazakh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kk&fmt=vtt",
//           "name": "Kazakh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "kha": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kha&fmt=json3",
//           "name": "Khasi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kha&fmt=srv1",
//           "name": "Khasi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kha&fmt=srv2",
//           "name": "Khasi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kha&fmt=srv3",
//           "name": "Khasi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kha&fmt=ttml",
//           "name": "Khasi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kha&fmt=srt",
//           "name": "Khasi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kha&fmt=vtt",
//           "name": "Khasi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "km": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=km&fmt=json3",
//           "name": "Khmer",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=km&fmt=srv1",
//           "name": "Khmer",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=km&fmt=srv2",
//           "name": "Khmer",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=km&fmt=srv3",
//           "name": "Khmer",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=km&fmt=ttml",
//           "name": "Khmer",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=km&fmt=srt",
//           "name": "Khmer",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=km&fmt=vtt",
//           "name": "Khmer",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "rw": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rw&fmt=json3",
//           "name": "Kinyarwanda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rw&fmt=srv1",
//           "name": "Kinyarwanda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rw&fmt=srv2",
//           "name": "Kinyarwanda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rw&fmt=srv3",
//           "name": "Kinyarwanda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rw&fmt=ttml",
//           "name": "Kinyarwanda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rw&fmt=srt",
//           "name": "Kinyarwanda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rw&fmt=vtt",
//           "name": "Kinyarwanda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ko": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ko&fmt=json3",
//           "name": "Korean",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ko&fmt=srv1",
//           "name": "Korean",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ko&fmt=srv2",
//           "name": "Korean",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ko&fmt=srv3",
//           "name": "Korean",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ko&fmt=ttml",
//           "name": "Korean",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ko&fmt=srt",
//           "name": "Korean",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ko&fmt=vtt",
//           "name": "Korean",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "kri": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kri&fmt=json3",
//           "name": "Krio",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kri&fmt=srv1",
//           "name": "Krio",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kri&fmt=srv2",
//           "name": "Krio",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kri&fmt=srv3",
//           "name": "Krio",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kri&fmt=ttml",
//           "name": "Krio",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kri&fmt=srt",
//           "name": "Krio",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=kri&fmt=vtt",
//           "name": "Krio",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ku": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ku&fmt=json3",
//           "name": "Kurdish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ku&fmt=srv1",
//           "name": "Kurdish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ku&fmt=srv2",
//           "name": "Kurdish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ku&fmt=srv3",
//           "name": "Kurdish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ku&fmt=ttml",
//           "name": "Kurdish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ku&fmt=srt",
//           "name": "Kurdish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ku&fmt=vtt",
//           "name": "Kurdish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ky": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ky&fmt=json3",
//           "name": "Kyrgyz",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ky&fmt=srv1",
//           "name": "Kyrgyz",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ky&fmt=srv2",
//           "name": "Kyrgyz",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ky&fmt=srv3",
//           "name": "Kyrgyz",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ky&fmt=ttml",
//           "name": "Kyrgyz",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ky&fmt=srt",
//           "name": "Kyrgyz",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ky&fmt=vtt",
//           "name": "Kyrgyz",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "lo": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lo&fmt=json3",
//           "name": "Lao",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lo&fmt=srv1",
//           "name": "Lao",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lo&fmt=srv2",
//           "name": "Lao",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lo&fmt=srv3",
//           "name": "Lao",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lo&fmt=ttml",
//           "name": "Lao",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lo&fmt=srt",
//           "name": "Lao",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lo&fmt=vtt",
//           "name": "Lao",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "la": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=la&fmt=json3",
//           "name": "Latin",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=la&fmt=srv1",
//           "name": "Latin",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=la&fmt=srv2",
//           "name": "Latin",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=la&fmt=srv3",
//           "name": "Latin",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=la&fmt=ttml",
//           "name": "Latin",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=la&fmt=srt",
//           "name": "Latin",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=la&fmt=vtt",
//           "name": "Latin",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "lv": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lv&fmt=json3",
//           "name": "Latvian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lv&fmt=srv1",
//           "name": "Latvian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lv&fmt=srv2",
//           "name": "Latvian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lv&fmt=srv3",
//           "name": "Latvian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lv&fmt=ttml",
//           "name": "Latvian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lv&fmt=srt",
//           "name": "Latvian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lv&fmt=vtt",
//           "name": "Latvian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ln": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ln&fmt=json3",
//           "name": "Lingala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ln&fmt=srv1",
//           "name": "Lingala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ln&fmt=srv2",
//           "name": "Lingala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ln&fmt=srv3",
//           "name": "Lingala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ln&fmt=ttml",
//           "name": "Lingala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ln&fmt=srt",
//           "name": "Lingala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ln&fmt=vtt",
//           "name": "Lingala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "lt": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lt&fmt=json3",
//           "name": "Lithuanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lt&fmt=srv1",
//           "name": "Lithuanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lt&fmt=srv2",
//           "name": "Lithuanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lt&fmt=srv3",
//           "name": "Lithuanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lt&fmt=ttml",
//           "name": "Lithuanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lt&fmt=srt",
//           "name": "Lithuanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lt&fmt=vtt",
//           "name": "Lithuanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "lua": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lua&fmt=json3",
//           "name": "Luba-Lulua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lua&fmt=srv1",
//           "name": "Luba-Lulua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lua&fmt=srv2",
//           "name": "Luba-Lulua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lua&fmt=srv3",
//           "name": "Luba-Lulua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lua&fmt=ttml",
//           "name": "Luba-Lulua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lua&fmt=srt",
//           "name": "Luba-Lulua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lua&fmt=vtt",
//           "name": "Luba-Lulua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "luo": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=luo&fmt=json3",
//           "name": "Luo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=luo&fmt=srv1",
//           "name": "Luo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=luo&fmt=srv2",
//           "name": "Luo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=luo&fmt=srv3",
//           "name": "Luo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=luo&fmt=ttml",
//           "name": "Luo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=luo&fmt=srt",
//           "name": "Luo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=luo&fmt=vtt",
//           "name": "Luo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "lb": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lb&fmt=json3",
//           "name": "Luxembourgish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lb&fmt=srv1",
//           "name": "Luxembourgish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lb&fmt=srv2",
//           "name": "Luxembourgish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lb&fmt=srv3",
//           "name": "Luxembourgish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lb&fmt=ttml",
//           "name": "Luxembourgish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lb&fmt=srt",
//           "name": "Luxembourgish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=lb&fmt=vtt",
//           "name": "Luxembourgish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "mk": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mk&fmt=json3",
//           "name": "Macedonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mk&fmt=srv1",
//           "name": "Macedonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mk&fmt=srv2",
//           "name": "Macedonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mk&fmt=srv3",
//           "name": "Macedonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mk&fmt=ttml",
//           "name": "Macedonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mk&fmt=srt",
//           "name": "Macedonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mk&fmt=vtt",
//           "name": "Macedonian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "mg": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mg&fmt=json3",
//           "name": "Malagasy",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mg&fmt=srv1",
//           "name": "Malagasy",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mg&fmt=srv2",
//           "name": "Malagasy",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mg&fmt=srv3",
//           "name": "Malagasy",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mg&fmt=ttml",
//           "name": "Malagasy",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mg&fmt=srt",
//           "name": "Malagasy",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mg&fmt=vtt",
//           "name": "Malagasy",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ms": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ms&fmt=json3",
//           "name": "Malay",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ms&fmt=srv1",
//           "name": "Malay",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ms&fmt=srv2",
//           "name": "Malay",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ms&fmt=srv3",
//           "name": "Malay",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ms&fmt=ttml",
//           "name": "Malay",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ms&fmt=srt",
//           "name": "Malay",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ms&fmt=vtt",
//           "name": "Malay",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ml": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ml&fmt=json3",
//           "name": "Malayalam",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ml&fmt=srv1",
//           "name": "Malayalam",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ml&fmt=srv2",
//           "name": "Malayalam",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ml&fmt=srv3",
//           "name": "Malayalam",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ml&fmt=ttml",
//           "name": "Malayalam",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ml&fmt=srt",
//           "name": "Malayalam",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ml&fmt=vtt",
//           "name": "Malayalam",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "mt": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mt&fmt=json3",
//           "name": "Maltese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mt&fmt=srv1",
//           "name": "Maltese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mt&fmt=srv2",
//           "name": "Maltese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mt&fmt=srv3",
//           "name": "Maltese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mt&fmt=ttml",
//           "name": "Maltese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mt&fmt=srt",
//           "name": "Maltese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mt&fmt=vtt",
//           "name": "Maltese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "gv": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gv&fmt=json3",
//           "name": "Manx",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gv&fmt=srv1",
//           "name": "Manx",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gv&fmt=srv2",
//           "name": "Manx",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gv&fmt=srv3",
//           "name": "Manx",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gv&fmt=ttml",
//           "name": "Manx",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gv&fmt=srt",
//           "name": "Manx",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gv&fmt=vtt",
//           "name": "Manx",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "mi": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mi&fmt=json3",
//           "name": "Māori",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mi&fmt=srv1",
//           "name": "Māori",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mi&fmt=srv2",
//           "name": "Māori",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mi&fmt=srv3",
//           "name": "Māori",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mi&fmt=ttml",
//           "name": "Māori",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mi&fmt=srt",
//           "name": "Māori",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mi&fmt=vtt",
//           "name": "Māori",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "mr": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mr&fmt=json3",
//           "name": "Marathi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mr&fmt=srv1",
//           "name": "Marathi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mr&fmt=srv2",
//           "name": "Marathi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mr&fmt=srv3",
//           "name": "Marathi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mr&fmt=ttml",
//           "name": "Marathi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mr&fmt=srt",
//           "name": "Marathi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mr&fmt=vtt",
//           "name": "Marathi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "mn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mn&fmt=json3",
//           "name": "Mongolian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mn&fmt=srv1",
//           "name": "Mongolian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mn&fmt=srv2",
//           "name": "Mongolian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mn&fmt=srv3",
//           "name": "Mongolian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mn&fmt=ttml",
//           "name": "Mongolian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mn&fmt=srt",
//           "name": "Mongolian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mn&fmt=vtt",
//           "name": "Mongolian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "mfe": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mfe&fmt=json3",
//           "name": "Morisyen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mfe&fmt=srv1",
//           "name": "Morisyen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mfe&fmt=srv2",
//           "name": "Morisyen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mfe&fmt=srv3",
//           "name": "Morisyen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mfe&fmt=ttml",
//           "name": "Morisyen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mfe&fmt=srt",
//           "name": "Morisyen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=mfe&fmt=vtt",
//           "name": "Morisyen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ne": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ne&fmt=json3",
//           "name": "Nepali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ne&fmt=srv1",
//           "name": "Nepali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ne&fmt=srv2",
//           "name": "Nepali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ne&fmt=srv3",
//           "name": "Nepali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ne&fmt=ttml",
//           "name": "Nepali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ne&fmt=srt",
//           "name": "Nepali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ne&fmt=vtt",
//           "name": "Nepali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "new": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=new&fmt=json3",
//           "name": "Newari",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=new&fmt=srv1",
//           "name": "Newari",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=new&fmt=srv2",
//           "name": "Newari",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=new&fmt=srv3",
//           "name": "Newari",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=new&fmt=ttml",
//           "name": "Newari",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=new&fmt=srt",
//           "name": "Newari",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=new&fmt=vtt",
//           "name": "Newari",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "nso": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nso&fmt=json3",
//           "name": "Northern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nso&fmt=srv1",
//           "name": "Northern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nso&fmt=srv2",
//           "name": "Northern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nso&fmt=srv3",
//           "name": "Northern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nso&fmt=ttml",
//           "name": "Northern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nso&fmt=srt",
//           "name": "Northern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=nso&fmt=vtt",
//           "name": "Northern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "no": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=no&fmt=json3",
//           "name": "Norwegian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=no&fmt=srv1",
//           "name": "Norwegian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=no&fmt=srv2",
//           "name": "Norwegian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=no&fmt=srv3",
//           "name": "Norwegian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=no&fmt=ttml",
//           "name": "Norwegian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=no&fmt=srt",
//           "name": "Norwegian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=no&fmt=vtt",
//           "name": "Norwegian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ny": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ny&fmt=json3",
//           "name": "Nyanja",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ny&fmt=srv1",
//           "name": "Nyanja",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ny&fmt=srv2",
//           "name": "Nyanja",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ny&fmt=srv3",
//           "name": "Nyanja",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ny&fmt=ttml",
//           "name": "Nyanja",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ny&fmt=srt",
//           "name": "Nyanja",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ny&fmt=vtt",
//           "name": "Nyanja",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "oc": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=oc&fmt=json3",
//           "name": "Occitan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=oc&fmt=srv1",
//           "name": "Occitan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=oc&fmt=srv2",
//           "name": "Occitan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=oc&fmt=srv3",
//           "name": "Occitan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=oc&fmt=ttml",
//           "name": "Occitan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=oc&fmt=srt",
//           "name": "Occitan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=oc&fmt=vtt",
//           "name": "Occitan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "or": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=or&fmt=json3",
//           "name": "Odia",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=or&fmt=srv1",
//           "name": "Odia",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=or&fmt=srv2",
//           "name": "Odia",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=or&fmt=srv3",
//           "name": "Odia",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=or&fmt=ttml",
//           "name": "Odia",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=or&fmt=srt",
//           "name": "Odia",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=or&fmt=vtt",
//           "name": "Odia",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "om": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=om&fmt=json3",
//           "name": "Oromo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=om&fmt=srv1",
//           "name": "Oromo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=om&fmt=srv2",
//           "name": "Oromo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=om&fmt=srv3",
//           "name": "Oromo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=om&fmt=ttml",
//           "name": "Oromo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=om&fmt=srt",
//           "name": "Oromo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=om&fmt=vtt",
//           "name": "Oromo",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "os": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=os&fmt=json3",
//           "name": "Ossetic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=os&fmt=srv1",
//           "name": "Ossetic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=os&fmt=srv2",
//           "name": "Ossetic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=os&fmt=srv3",
//           "name": "Ossetic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=os&fmt=ttml",
//           "name": "Ossetic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=os&fmt=srt",
//           "name": "Ossetic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=os&fmt=vtt",
//           "name": "Ossetic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "pam": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pam&fmt=json3",
//           "name": "Pampanga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pam&fmt=srv1",
//           "name": "Pampanga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pam&fmt=srv2",
//           "name": "Pampanga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pam&fmt=srv3",
//           "name": "Pampanga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pam&fmt=ttml",
//           "name": "Pampanga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pam&fmt=srt",
//           "name": "Pampanga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pam&fmt=vtt",
//           "name": "Pampanga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ps": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ps&fmt=json3",
//           "name": "Pashto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ps&fmt=srv1",
//           "name": "Pashto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ps&fmt=srv2",
//           "name": "Pashto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ps&fmt=srv3",
//           "name": "Pashto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ps&fmt=ttml",
//           "name": "Pashto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ps&fmt=srt",
//           "name": "Pashto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ps&fmt=vtt",
//           "name": "Pashto",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "fa": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fa&fmt=json3",
//           "name": "Persian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fa&fmt=srv1",
//           "name": "Persian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fa&fmt=srv2",
//           "name": "Persian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fa&fmt=srv3",
//           "name": "Persian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fa&fmt=ttml",
//           "name": "Persian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fa&fmt=srt",
//           "name": "Persian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fa&fmt=vtt",
//           "name": "Persian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "pl": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pl&fmt=json3",
//           "name": "Polish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pl&fmt=srv1",
//           "name": "Polish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pl&fmt=srv2",
//           "name": "Polish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pl&fmt=srv3",
//           "name": "Polish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pl&fmt=ttml",
//           "name": "Polish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pl&fmt=srt",
//           "name": "Polish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pl&fmt=vtt",
//           "name": "Polish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "pt": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt&fmt=json3",
//           "name": "Portuguese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt&fmt=srv1",
//           "name": "Portuguese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt&fmt=srv2",
//           "name": "Portuguese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt&fmt=srv3",
//           "name": "Portuguese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt&fmt=ttml",
//           "name": "Portuguese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt&fmt=srt",
//           "name": "Portuguese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt&fmt=vtt",
//           "name": "Portuguese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "pt-PT": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt-PT&fmt=json3",
//           "name": "Portuguese (Portugal)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt-PT&fmt=srv1",
//           "name": "Portuguese (Portugal)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt-PT&fmt=srv2",
//           "name": "Portuguese (Portugal)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt-PT&fmt=srv3",
//           "name": "Portuguese (Portugal)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt-PT&fmt=ttml",
//           "name": "Portuguese (Portugal)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt-PT&fmt=srt",
//           "name": "Portuguese (Portugal)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pt-PT&fmt=vtt",
//           "name": "Portuguese (Portugal)",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "pa": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pa&fmt=json3",
//           "name": "Punjabi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pa&fmt=srv1",
//           "name": "Punjabi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pa&fmt=srv2",
//           "name": "Punjabi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pa&fmt=srv3",
//           "name": "Punjabi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pa&fmt=ttml",
//           "name": "Punjabi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pa&fmt=srt",
//           "name": "Punjabi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=pa&fmt=vtt",
//           "name": "Punjabi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "qu": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=qu&fmt=json3",
//           "name": "Quechua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=qu&fmt=srv1",
//           "name": "Quechua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=qu&fmt=srv2",
//           "name": "Quechua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=qu&fmt=srv3",
//           "name": "Quechua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=qu&fmt=ttml",
//           "name": "Quechua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=qu&fmt=srt",
//           "name": "Quechua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=qu&fmt=vtt",
//           "name": "Quechua",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ro": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ro&fmt=json3",
//           "name": "Romanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ro&fmt=srv1",
//           "name": "Romanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ro&fmt=srv2",
//           "name": "Romanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ro&fmt=srv3",
//           "name": "Romanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ro&fmt=ttml",
//           "name": "Romanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ro&fmt=srt",
//           "name": "Romanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ro&fmt=vtt",
//           "name": "Romanian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "rn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rn&fmt=json3",
//           "name": "Rundi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rn&fmt=srv1",
//           "name": "Rundi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rn&fmt=srv2",
//           "name": "Rundi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rn&fmt=srv3",
//           "name": "Rundi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rn&fmt=ttml",
//           "name": "Rundi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rn&fmt=srt",
//           "name": "Rundi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=rn&fmt=vtt",
//           "name": "Rundi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ru": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ru&fmt=json3",
//           "name": "Russian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ru&fmt=srv1",
//           "name": "Russian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ru&fmt=srv2",
//           "name": "Russian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ru&fmt=srv3",
//           "name": "Russian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ru&fmt=ttml",
//           "name": "Russian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ru&fmt=srt",
//           "name": "Russian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ru&fmt=vtt",
//           "name": "Russian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sm": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sm&fmt=json3",
//           "name": "Samoan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sm&fmt=srv1",
//           "name": "Samoan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sm&fmt=srv2",
//           "name": "Samoan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sm&fmt=srv3",
//           "name": "Samoan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sm&fmt=ttml",
//           "name": "Samoan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sm&fmt=srt",
//           "name": "Samoan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sm&fmt=vtt",
//           "name": "Samoan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sg": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sg&fmt=json3",
//           "name": "Sango",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sg&fmt=srv1",
//           "name": "Sango",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sg&fmt=srv2",
//           "name": "Sango",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sg&fmt=srv3",
//           "name": "Sango",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sg&fmt=ttml",
//           "name": "Sango",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sg&fmt=srt",
//           "name": "Sango",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sg&fmt=vtt",
//           "name": "Sango",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sa": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sa&fmt=json3",
//           "name": "Sanskrit",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sa&fmt=srv1",
//           "name": "Sanskrit",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sa&fmt=srv2",
//           "name": "Sanskrit",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sa&fmt=srv3",
//           "name": "Sanskrit",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sa&fmt=ttml",
//           "name": "Sanskrit",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sa&fmt=srt",
//           "name": "Sanskrit",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sa&fmt=vtt",
//           "name": "Sanskrit",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "gd": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gd&fmt=json3",
//           "name": "Scottish Gaelic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gd&fmt=srv1",
//           "name": "Scottish Gaelic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gd&fmt=srv2",
//           "name": "Scottish Gaelic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gd&fmt=srv3",
//           "name": "Scottish Gaelic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gd&fmt=ttml",
//           "name": "Scottish Gaelic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gd&fmt=srt",
//           "name": "Scottish Gaelic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=gd&fmt=vtt",
//           "name": "Scottish Gaelic",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sr": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sr&fmt=json3",
//           "name": "Serbian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sr&fmt=srv1",
//           "name": "Serbian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sr&fmt=srv2",
//           "name": "Serbian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sr&fmt=srv3",
//           "name": "Serbian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sr&fmt=ttml",
//           "name": "Serbian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sr&fmt=srt",
//           "name": "Serbian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sr&fmt=vtt",
//           "name": "Serbian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "crs": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=crs&fmt=json3",
//           "name": "Seselwa Creole French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=crs&fmt=srv1",
//           "name": "Seselwa Creole French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=crs&fmt=srv2",
//           "name": "Seselwa Creole French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=crs&fmt=srv3",
//           "name": "Seselwa Creole French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=crs&fmt=ttml",
//           "name": "Seselwa Creole French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=crs&fmt=srt",
//           "name": "Seselwa Creole French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=crs&fmt=vtt",
//           "name": "Seselwa Creole French",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sn&fmt=json3",
//           "name": "Shona",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sn&fmt=srv1",
//           "name": "Shona",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sn&fmt=srv2",
//           "name": "Shona",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sn&fmt=srv3",
//           "name": "Shona",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sn&fmt=ttml",
//           "name": "Shona",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sn&fmt=srt",
//           "name": "Shona",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sn&fmt=vtt",
//           "name": "Shona",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sd": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sd&fmt=json3",
//           "name": "Sindhi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sd&fmt=srv1",
//           "name": "Sindhi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sd&fmt=srv2",
//           "name": "Sindhi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sd&fmt=srv3",
//           "name": "Sindhi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sd&fmt=ttml",
//           "name": "Sindhi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sd&fmt=srt",
//           "name": "Sindhi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sd&fmt=vtt",
//           "name": "Sindhi",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "si": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=si&fmt=json3",
//           "name": "Sinhala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=si&fmt=srv1",
//           "name": "Sinhala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=si&fmt=srv2",
//           "name": "Sinhala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=si&fmt=srv3",
//           "name": "Sinhala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=si&fmt=ttml",
//           "name": "Sinhala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=si&fmt=srt",
//           "name": "Sinhala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=si&fmt=vtt",
//           "name": "Sinhala",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sk": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sk&fmt=json3",
//           "name": "Slovak",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sk&fmt=srv1",
//           "name": "Slovak",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sk&fmt=srv2",
//           "name": "Slovak",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sk&fmt=srv3",
//           "name": "Slovak",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sk&fmt=ttml",
//           "name": "Slovak",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sk&fmt=srt",
//           "name": "Slovak",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sk&fmt=vtt",
//           "name": "Slovak",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sl": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sl&fmt=json3",
//           "name": "Slovenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sl&fmt=srv1",
//           "name": "Slovenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sl&fmt=srv2",
//           "name": "Slovenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sl&fmt=srv3",
//           "name": "Slovenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sl&fmt=ttml",
//           "name": "Slovenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sl&fmt=srt",
//           "name": "Slovenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sl&fmt=vtt",
//           "name": "Slovenian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "so": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=so&fmt=json3",
//           "name": "Somali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=so&fmt=srv1",
//           "name": "Somali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=so&fmt=srv2",
//           "name": "Somali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=so&fmt=srv3",
//           "name": "Somali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=so&fmt=ttml",
//           "name": "Somali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=so&fmt=srt",
//           "name": "Somali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=so&fmt=vtt",
//           "name": "Somali",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "st": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=st&fmt=json3",
//           "name": "Southern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=st&fmt=srv1",
//           "name": "Southern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=st&fmt=srv2",
//           "name": "Southern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=st&fmt=srv3",
//           "name": "Southern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=st&fmt=ttml",
//           "name": "Southern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=st&fmt=srt",
//           "name": "Southern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=st&fmt=vtt",
//           "name": "Southern Sotho",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "es": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=es&fmt=json3",
//           "name": "Spanish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=es&fmt=srv1",
//           "name": "Spanish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=es&fmt=srv2",
//           "name": "Spanish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=es&fmt=srv3",
//           "name": "Spanish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=es&fmt=ttml",
//           "name": "Spanish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=es&fmt=srt",
//           "name": "Spanish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=es&fmt=vtt",
//           "name": "Spanish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "su": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=su&fmt=json3",
//           "name": "Sundanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=su&fmt=srv1",
//           "name": "Sundanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=su&fmt=srv2",
//           "name": "Sundanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=su&fmt=srv3",
//           "name": "Sundanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=su&fmt=ttml",
//           "name": "Sundanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=su&fmt=srt",
//           "name": "Sundanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=su&fmt=vtt",
//           "name": "Sundanese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sw": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sw&fmt=json3",
//           "name": "Swahili",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sw&fmt=srv1",
//           "name": "Swahili",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sw&fmt=srv2",
//           "name": "Swahili",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sw&fmt=srv3",
//           "name": "Swahili",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sw&fmt=ttml",
//           "name": "Swahili",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sw&fmt=srt",
//           "name": "Swahili",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sw&fmt=vtt",
//           "name": "Swahili",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ss": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ss&fmt=json3",
//           "name": "Swati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ss&fmt=srv1",
//           "name": "Swati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ss&fmt=srv2",
//           "name": "Swati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ss&fmt=srv3",
//           "name": "Swati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ss&fmt=ttml",
//           "name": "Swati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ss&fmt=srt",
//           "name": "Swati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ss&fmt=vtt",
//           "name": "Swati",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "sv": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sv&fmt=json3",
//           "name": "Swedish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sv&fmt=srv1",
//           "name": "Swedish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sv&fmt=srv2",
//           "name": "Swedish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sv&fmt=srv3",
//           "name": "Swedish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sv&fmt=ttml",
//           "name": "Swedish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sv&fmt=srt",
//           "name": "Swedish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=sv&fmt=vtt",
//           "name": "Swedish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "tg": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tg&fmt=json3",
//           "name": "Tajik",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tg&fmt=srv1",
//           "name": "Tajik",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tg&fmt=srv2",
//           "name": "Tajik",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tg&fmt=srv3",
//           "name": "Tajik",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tg&fmt=ttml",
//           "name": "Tajik",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tg&fmt=srt",
//           "name": "Tajik",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tg&fmt=vtt",
//           "name": "Tajik",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ta": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ta&fmt=json3",
//           "name": "Tamil",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ta&fmt=srv1",
//           "name": "Tamil",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ta&fmt=srv2",
//           "name": "Tamil",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ta&fmt=srv3",
//           "name": "Tamil",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ta&fmt=ttml",
//           "name": "Tamil",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ta&fmt=srt",
//           "name": "Tamil",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ta&fmt=vtt",
//           "name": "Tamil",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "tt": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tt&fmt=json3",
//           "name": "Tatar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tt&fmt=srv1",
//           "name": "Tatar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tt&fmt=srv2",
//           "name": "Tatar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tt&fmt=srv3",
//           "name": "Tatar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tt&fmt=ttml",
//           "name": "Tatar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tt&fmt=srt",
//           "name": "Tatar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tt&fmt=vtt",
//           "name": "Tatar",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "te": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=te&fmt=json3",
//           "name": "Telugu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=te&fmt=srv1",
//           "name": "Telugu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=te&fmt=srv2",
//           "name": "Telugu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=te&fmt=srv3",
//           "name": "Telugu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=te&fmt=ttml",
//           "name": "Telugu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=te&fmt=srt",
//           "name": "Telugu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=te&fmt=vtt",
//           "name": "Telugu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "th": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=th&fmt=json3",
//           "name": "Thai",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=th&fmt=srv1",
//           "name": "Thai",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=th&fmt=srv2",
//           "name": "Thai",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=th&fmt=srv3",
//           "name": "Thai",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=th&fmt=ttml",
//           "name": "Thai",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=th&fmt=srt",
//           "name": "Thai",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=th&fmt=vtt",
//           "name": "Thai",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "bo": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bo&fmt=json3",
//           "name": "Tibetan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bo&fmt=srv1",
//           "name": "Tibetan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bo&fmt=srv2",
//           "name": "Tibetan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bo&fmt=srv3",
//           "name": "Tibetan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bo&fmt=ttml",
//           "name": "Tibetan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bo&fmt=srt",
//           "name": "Tibetan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=bo&fmt=vtt",
//           "name": "Tibetan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ti": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ti&fmt=json3",
//           "name": "Tigrinya",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ti&fmt=srv1",
//           "name": "Tigrinya",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ti&fmt=srv2",
//           "name": "Tigrinya",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ti&fmt=srv3",
//           "name": "Tigrinya",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ti&fmt=ttml",
//           "name": "Tigrinya",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ti&fmt=srt",
//           "name": "Tigrinya",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ti&fmt=vtt",
//           "name": "Tigrinya",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "to": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=to&fmt=json3",
//           "name": "Tongan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=to&fmt=srv1",
//           "name": "Tongan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=to&fmt=srv2",
//           "name": "Tongan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=to&fmt=srv3",
//           "name": "Tongan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=to&fmt=ttml",
//           "name": "Tongan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=to&fmt=srt",
//           "name": "Tongan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=to&fmt=vtt",
//           "name": "Tongan",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ts": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ts&fmt=json3",
//           "name": "Tsonga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ts&fmt=srv1",
//           "name": "Tsonga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ts&fmt=srv2",
//           "name": "Tsonga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ts&fmt=srv3",
//           "name": "Tsonga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ts&fmt=ttml",
//           "name": "Tsonga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ts&fmt=srt",
//           "name": "Tsonga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ts&fmt=vtt",
//           "name": "Tsonga",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "tn": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tn&fmt=json3",
//           "name": "Tswana",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tn&fmt=srv1",
//           "name": "Tswana",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tn&fmt=srv2",
//           "name": "Tswana",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tn&fmt=srv3",
//           "name": "Tswana",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tn&fmt=ttml",
//           "name": "Tswana",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tn&fmt=srt",
//           "name": "Tswana",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tn&fmt=vtt",
//           "name": "Tswana",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "tum": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tum&fmt=json3",
//           "name": "Tumbuka",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tum&fmt=srv1",
//           "name": "Tumbuka",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tum&fmt=srv2",
//           "name": "Tumbuka",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tum&fmt=srv3",
//           "name": "Tumbuka",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tum&fmt=ttml",
//           "name": "Tumbuka",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tum&fmt=srt",
//           "name": "Tumbuka",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tum&fmt=vtt",
//           "name": "Tumbuka",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "tr": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tr&fmt=json3",
//           "name": "Turkish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tr&fmt=srv1",
//           "name": "Turkish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tr&fmt=srv2",
//           "name": "Turkish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tr&fmt=srv3",
//           "name": "Turkish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tr&fmt=ttml",
//           "name": "Turkish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tr&fmt=srt",
//           "name": "Turkish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tr&fmt=vtt",
//           "name": "Turkish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "tk": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tk&fmt=json3",
//           "name": "Turkmen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tk&fmt=srv1",
//           "name": "Turkmen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tk&fmt=srv2",
//           "name": "Turkmen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tk&fmt=srv3",
//           "name": "Turkmen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tk&fmt=ttml",
//           "name": "Turkmen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tk&fmt=srt",
//           "name": "Turkmen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=tk&fmt=vtt",
//           "name": "Turkmen",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "uk": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uk&fmt=json3",
//           "name": "Ukrainian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uk&fmt=srv1",
//           "name": "Ukrainian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uk&fmt=srv2",
//           "name": "Ukrainian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uk&fmt=srv3",
//           "name": "Ukrainian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uk&fmt=ttml",
//           "name": "Ukrainian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uk&fmt=srt",
//           "name": "Ukrainian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uk&fmt=vtt",
//           "name": "Ukrainian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ur": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ur&fmt=json3",
//           "name": "Urdu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ur&fmt=srv1",
//           "name": "Urdu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ur&fmt=srv2",
//           "name": "Urdu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ur&fmt=srv3",
//           "name": "Urdu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ur&fmt=ttml",
//           "name": "Urdu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ur&fmt=srt",
//           "name": "Urdu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ur&fmt=vtt",
//           "name": "Urdu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ug": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ug&fmt=json3",
//           "name": "Uyghur",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ug&fmt=srv1",
//           "name": "Uyghur",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ug&fmt=srv2",
//           "name": "Uyghur",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ug&fmt=srv3",
//           "name": "Uyghur",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ug&fmt=ttml",
//           "name": "Uyghur",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ug&fmt=srt",
//           "name": "Uyghur",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ug&fmt=vtt",
//           "name": "Uyghur",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "uz": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uz&fmt=json3",
//           "name": "Uzbek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uz&fmt=srv1",
//           "name": "Uzbek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uz&fmt=srv2",
//           "name": "Uzbek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uz&fmt=srv3",
//           "name": "Uzbek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uz&fmt=ttml",
//           "name": "Uzbek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uz&fmt=srt",
//           "name": "Uzbek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=uz&fmt=vtt",
//           "name": "Uzbek",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "ve": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ve&fmt=json3",
//           "name": "Venda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ve&fmt=srv1",
//           "name": "Venda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ve&fmt=srv2",
//           "name": "Venda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ve&fmt=srv3",
//           "name": "Venda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ve&fmt=ttml",
//           "name": "Venda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ve&fmt=srt",
//           "name": "Venda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=ve&fmt=vtt",
//           "name": "Venda",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "vi": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=vi&fmt=json3",
//           "name": "Vietnamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=vi&fmt=srv1",
//           "name": "Vietnamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=vi&fmt=srv2",
//           "name": "Vietnamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=vi&fmt=srv3",
//           "name": "Vietnamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=vi&fmt=ttml",
//           "name": "Vietnamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=vi&fmt=srt",
//           "name": "Vietnamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=vi&fmt=vtt",
//           "name": "Vietnamese",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "war": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=war&fmt=json3",
//           "name": "Waray",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=war&fmt=srv1",
//           "name": "Waray",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=war&fmt=srv2",
//           "name": "Waray",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=war&fmt=srv3",
//           "name": "Waray",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=war&fmt=ttml",
//           "name": "Waray",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=war&fmt=srt",
//           "name": "Waray",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=war&fmt=vtt",
//           "name": "Waray",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "cy": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cy&fmt=json3",
//           "name": "Welsh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cy&fmt=srv1",
//           "name": "Welsh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cy&fmt=srv2",
//           "name": "Welsh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cy&fmt=srv3",
//           "name": "Welsh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cy&fmt=ttml",
//           "name": "Welsh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cy&fmt=srt",
//           "name": "Welsh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=cy&fmt=vtt",
//           "name": "Welsh",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "fy": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fy&fmt=json3",
//           "name": "Western Frisian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fy&fmt=srv1",
//           "name": "Western Frisian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fy&fmt=srv2",
//           "name": "Western Frisian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fy&fmt=srv3",
//           "name": "Western Frisian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fy&fmt=ttml",
//           "name": "Western Frisian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fy&fmt=srt",
//           "name": "Western Frisian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=fy&fmt=vtt",
//           "name": "Western Frisian",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "wo": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=wo&fmt=json3",
//           "name": "Wolof",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=wo&fmt=srv1",
//           "name": "Wolof",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=wo&fmt=srv2",
//           "name": "Wolof",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=wo&fmt=srv3",
//           "name": "Wolof",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=wo&fmt=ttml",
//           "name": "Wolof",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=wo&fmt=srt",
//           "name": "Wolof",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=wo&fmt=vtt",
//           "name": "Wolof",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "xh": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=xh&fmt=json3",
//           "name": "Xhosa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=xh&fmt=srv1",
//           "name": "Xhosa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=xh&fmt=srv2",
//           "name": "Xhosa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=xh&fmt=srv3",
//           "name": "Xhosa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=xh&fmt=ttml",
//           "name": "Xhosa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=xh&fmt=srt",
//           "name": "Xhosa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=xh&fmt=vtt",
//           "name": "Xhosa",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "yi": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yi&fmt=json3",
//           "name": "Yiddish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yi&fmt=srv1",
//           "name": "Yiddish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yi&fmt=srv2",
//           "name": "Yiddish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yi&fmt=srv3",
//           "name": "Yiddish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yi&fmt=ttml",
//           "name": "Yiddish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yi&fmt=srt",
//           "name": "Yiddish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yi&fmt=vtt",
//           "name": "Yiddish",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "yo": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yo&fmt=json3",
//           "name": "Yoruba",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yo&fmt=srv1",
//           "name": "Yoruba",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yo&fmt=srv2",
//           "name": "Yoruba",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yo&fmt=srv3",
//           "name": "Yoruba",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yo&fmt=ttml",
//           "name": "Yoruba",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yo&fmt=srt",
//           "name": "Yoruba",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=yo&fmt=vtt",
//           "name": "Yoruba",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ],
//       "zu": [
//         {
//           "ext": "json3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zu&fmt=json3",
//           "name": "Zulu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv1",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zu&fmt=srv1",
//           "name": "Zulu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv2",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zu&fmt=srv2",
//           "name": "Zulu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srv3",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zu&fmt=srv3",
//           "name": "Zulu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "ttml",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zu&fmt=ttml",
//           "name": "Zulu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "srt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zu&fmt=srt",
//           "name": "Zulu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         },
//         {
//           "ext": "vtt",
//           "url": "https://www.youtube.com/api/timedtext?v=FTZ-9C5KpOE&ei=HWdaabrTIMnw6dsP-5-2wAs&caps=asr&opi=112496729&xoaf=5&xowf=1&xospf=1&hl=en&ip=0.0.0.0&ipbits=0&expire=1767557517&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cxoaf&signature=902806B2E09F83BC867BA0C82648D8B70284EC00.92DB10CFFA4FA8721EAB5450BE415FFDD90F9FB0&key=yt8&kind=asr&lang=iw&tlang=zu&fmt=vtt",
//           "name": "Zulu",
//           "impersonate": true,
//           "__yt_dlp_client": "tv_downgraded"
//         }
//       ]
//     },
//     "subtitles": {},
//     "comment_count": 62,
//     "chapters": null,
//     "heatmap": null,
//     "like_count": 227,
//     "channel": "ליבנת אורינובסקי",
//     "channel_follower_count": 8920,
//     "creators": null,
//     "uploader": "ליבנת אורינובסקי",
//     "uploader_id": "@livnat_ur",
//     "uploader_url": "https://www.youtube.com/@livnat_ur",
//     "upload_date": "20250930",
//     "timestamp": 1759235546,
//     "availability": "public",
//     "original_url": "https://www.youtube.com/watch?v=FTZ-9C5KpOE",
//     "webpage_url_basename": "watch",
//     "webpage_url_domain": "youtube.com",
//     "extractor": "youtube",
//     "extractor_key": "Youtube",
//     "playlist": null,
//     "playlist_index": null,
//     "display_id": "FTZ-9C5KpOE",
//     "fulltitle": "להשיג לקוחות מהסרטון הראשון זה קל, פשוט תעשו את זה:",
//     "duration_string": "20:07",
//     "release_year": null,
//     "is_live": false,
//     "was_live": false,
//     "requested_subtitles": null,
//     "_has_drm": null,
//     "epoch": 1767532319,
//     "requested_downloads": [
//       {
//         "format_id": "96",
//         "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/96/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D19533718%3Bdur%3D1206.903%3Bgir%3Dyes%3Bitag%3D140%3Blmt%3D1759241111196919/sgovp/clen%3D149048116%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D137%3Blmt%3D1759241598020579/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRAIgQF9rsuvMTYXa3g69vohPsD6HkCFsOHam7vkCxSFJlVgCID7U_tZxEhtjIyS2vrijs3QUbfT2ULh4rnt2qRnM3OmO/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRQIgbzd9txsdFeU8H44lAwJVRM412itz_5TRPcg9Ft_Z9cQCIQD28xDDbTUfxh6hrOo1FNekJNSRvH3dcXOO4IiNUM5r0w%3D%3D/playlist/index.m3u8",
//         "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//         "tbr": 2954.62,
//         "ext": "mp4",
//         "fps": 25,
//         "protocol": "m3u8_native",
//         "quality": 9,
//         "has_drm": false,
//         "width": 1920,
//         "height": 1080,
//         "vcodec": "avc1.640028",
//         "acodec": "mp4a.40.2",
//         "dynamic_range": "SDR",
//         "available_at": 1767532323,
//         "source_preference": -2,
//         "language": "iw",
//         "video_ext": "mp4",
//         "audio_ext": "none",
//         "resolution": "1920x1080",
//         "aspect_ratio": 1.78,
//         "http_headers": {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//           "Accept-Language": "en-us,en;q=0.5",
//           "Sec-Fetch-Mode": "navigate"
//         },
//         "format": "96 - 1920x1080",
//         "_filename": "להשיג לקוחות מהסרטון הראשון זה קל, פשוט תעשו את זה： [FTZ-9C5KpOE].mp4",
//         "filename": "להשיג לקוחות מהסרטון הראשון זה קל, פשוט תעשו את זה： [FTZ-9C5KpOE].mp4",
//         "__write_download_archive": false
//       }
//     ],
//     "format_id": "96",
//     "format_index": null,
//     "url": "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/itag/96/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D19533718%3Bdur%3D1206.903%3Bgir%3Dyes%3Bitag%3D140%3Blmt%3D1759241111196919/sgovp/clen%3D149048116%3Bdur%3D1206.840%3Bgir%3Dyes%3Bitag%3D137%3Blmt%3D1759241598020579/rqh/1/hls_chunk_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1767532317,/mh/r0/mm/31,29/mn/sn-ivuoxu-ua8s,sn-ua87zn7l/ms/au,rdu/mv/m/mvi/6/pl/20/rms/au,au/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/playlist_type/CLEAN/dover/11/txp/5432534/mt/1767532150/fvip/3/keepalive/yes/fexp/51355912,51552689,51565116,51565682,51580968/n/z6wQ0yh5ubgNsH71aK/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,siu,bui,spc,vprv,ns,playlist_type/sig/AJfQdSswRAIgQF9rsuvMTYXa3g69vohPsD6HkCFsOHam7vkCxSFJlVgCID7U_tZxEhtjIyS2vrijs3QUbfT2ULh4rnt2qRnM3OmO/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRQIgbzd9txsdFeU8H44lAwJVRM412itz_5TRPcg9Ft_Z9cQCIQD28xDDbTUfxh6hrOo1FNekJNSRvH3dcXOO4IiNUM5r0w%3D%3D/playlist/index.m3u8",
//     "manifest_url": "https://manifest.googlevideo.com/api/manifest/hls_variant/expire/1767553918/ei/HWdaaYqvNLmcp-oP54_t6AI/ip/77.137.26.138/id/15367ef42e4aa4e1/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/playback_host/rr6---sn-ivuoxu-ua8s.googlevideo.com/cps/0/met/1767532317%2C/mh/r0/mm/31%2C29/mn/sn-ivuoxu-ua8s%2Csn-ua87zn7l/ms/au%2Crdu/mv/m/mvi/6/pl/20/rms/au%2Cau/tx/51539831/txs/51539830%2C51539831/hfr/1/maxh/4320/tts_caps/1/maudio/1/initcwndbps/3343750/siu/1/bui/AYUSA3DDdWf_Api1017QC5jvNH6Y7lK0DFI_UnD2Ax9o57nLc_KHDur1aZ_YBmrkwPrHJt_UGg/spc/wH4Qq0uVca_YdzsTaFRvqRc84dVrCU8HfbCgLdmY5TDonj3ZhXY-fZlUkKS7dSNku5BA4cKng-8k6PmvvL7jcHZl/vprv/1/go/1/ns/CWM8sO9R8P_hw_V-0g1cgMcR/rqh/5/mt/1767532150/fvip/3/nvgoi/1/ncsapi/1/keepalive/yes/fexp/51355912%2C51552689%2C51565116%2C51565682%2C51580968/dover/11/n/z6wQ0yh5ubgNsH71aK/itag/0/playlist_type/CLEAN/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Ctx%2Ctxs%2Chfr%2Cmaxh%2Ctts_caps%2Cmaudio%2Csiu%2Cbui%2Cspc%2Cvprv%2Cgo%2Cns%2Crqh%2Citag%2Cplaylist_type/sig/AJfQdSswRAIgNhPvRuwLNLppI6HKF3QfYZ28O2vonbT4fWCxQcGW31YCIFE-uq5j2mdIv1O35UxYqj1e7RIKKHWjqmTr3qHgI-gA/lsparams/playback_host%2Ccps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps/lsig/APaTxxMwRAIgHMoRZQcSQ9ePucQV9AyxKXay7ZloS_5V8VTZ4B9bfqcCIF2WhTR9J5hfZizChe4ciM_dtnoKo5_A0jC96e9GsiWJ/file/index.m3u8",
//     "tbr": 2954.62,
//     "ext": "mp4",
//     "fps": 25,
//     "protocol": "m3u8_native",
//     "preference": null,
//     "quality": 9,
//     "has_drm": false,
//     "width": 1920,
//     "height": 1080,
//     "vcodec": "avc1.640028",
//     "acodec": "mp4a.40.2",
//     "dynamic_range": "SDR",
//     "available_at": 1767532323,
//     "source_preference": -2,
//     "language": "iw",
//     "video_ext": "mp4",
//     "audio_ext": "none",
//     "vbr": null,
//     "abr": null,
//     "resolution": "1920x1080",
//     "aspect_ratio": 1.78,
//     "http_headers": {
//       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//       "Accept-Language": "en-us,en;q=0.5",
//       "Sec-Fetch-Mode": "navigate"
//     },
//     "format": "96 - 1920x1080",
//     "_type": "video",
//     "_version": {
//       "version": "2025.12.08",
//       "current_git_head": null,
//       "release_git_head": "7a52ff29d86efc8f3adeba977b2009ce40b8e52e",
//       "repository": "yt-dlp/yt-dlp"
//     }
//   }
