import { ISO_DATE } from '../../utils/autogenerate.utils';
import { db } from '../client';

export type VideoAttributes = {
  id: string;
  mimeType: string;
  filename: string;
  size: number;
  key: string;
};

export type VideoDoc = {
  id: string;
  pk: string;
  sk: string;
  signedUrl?: string;
  mimeType?: string;
  size?: number;
  key?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const VideosRepositories = {
  async createVideoRecord(video: VideoAttributes) {
    const { data } = await db
      .put({
        pk: `VIDEOS#`,
        sk: `VIDEOS#${video.id}`,
        id: video.id,
        mimeType: video.mimeType,
        filename: video.filename,
        key: video.key,
        size: video.size,
        createdAt: ISO_DATE(),
        updatedAt: ISO_DATE(),
      })
      .$<VideoDoc>();
    return data;
  },

  async listVideos() {
    const { data } = await db.query('pk', 'VIDEOS#').$<VideoDoc[]>();
    return data;
  },
};
