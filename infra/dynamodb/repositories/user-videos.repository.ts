import { attributeNotExists, or } from 'dynatron';
import { ISO_DATE } from '../../utils/autogenerate.utils';
import { db } from '../client';

type UserVideosAttributes = {
  id: string;
  userId: string;
  vidId: string;
  completed: boolean;
  vidKey: string;
};
type UserVideosDoc = {
  pk: string;
  sk: string;
  completed: boolean;
  userId: string;
  vidKey: string;
  vidId: string;
  createdAt: string;
  updatedAt: string;
};

export const UserVideosRepository = {
  async addUserCompletedVideoRecord(payload: UserVideosAttributes) {
    const { data } = await db
      .put({
        pk: `USER_VIDEOS#${payload.userId}`,
        sk: `VIDEO#${payload.vidId}`,
        id: payload.id,
        completed: payload.completed,
        userId: payload.userId,
        vidId: payload.vidId,
        vidKey: payload.vidKey,
        createdAt: ISO_DATE(),
        updatedAt: ISO_DATE(),
      })
      .if(attributeNotExists('id'))
      .$<UserVideosDoc>();
    return data;
  },

  async listUserVideos(userId: string) {
    const { data } = await db
      .query('pk', `USER_VIDEOS#${userId}`)
      .$<UserVideosDoc[]>();
    return data;
  },
};
