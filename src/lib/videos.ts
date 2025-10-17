import axios from 'axios'

export const CONFIG_API =
  'https://assets.msn.com/resolver/api/resolve/v3/config'

export const VIDEO_API =
  'https://prod-streaming-video-msn-com.akamaized.net'

export const IMG_API =
  'https://img-s-msn-com.akamaized.net/tenant/amp/entityid'

export const DEFAULT_CONFIG = {
  expType: 'AppConfig',
  apptype: 'edgeChromium',
  v: '20230626.283'
}

function filterVideos(data: any) {
  const videos =
    data.configs['BackgroundImageWC/default'].properties.video.data

  return videos.map((v: any) => {
    const { attribution, firstFrame, video } = v

    const firstFrames = Object.entries(firstFrame).map(([k, v]) => {
      const quality = k.replace('i', '')
      return [quality, `${IMG_API}/${v}.jpg`]
    })

    const videos = Object.entries(video).map(([k, v]) => {
      const quality = k.replace('v', '')
      return [quality, `${VIDEO_API}/${v}.mp4`]
    })

    return {
      attribution,
      firstFrames: Object.fromEntries(firstFrames),
      videos: Object.fromEntries(videos)
    }
  })
}

async function getVideos() {
  const res = await axios
    .get(CONFIG_API, {
      params: DEFAULT_CONFIG,
      validateStatus: () => true
    })
    .catch(() => null)
  if (!res || res.status !== 200) return null

  return filterVideos(res.data)
}

export async function getRandomVideo(quality = 1080) {
  const videos = await getVideos()
  if (!videos || videos.length === 0) return null

  const randomVideo = videos[Math.floor(Math.random() * videos.length)]

  return {
    attribution: randomVideo.attribution,
    image: randomVideo.firstFrames[quality],
    video: randomVideo.videos[quality]
  }
}
