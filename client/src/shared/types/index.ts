export type Videos = {
  filename: string;
  id: string;
  key: string;
  signedUrl: string;
  size: number;
  pk: string;
  sk: string;
  created: string;
  updated: string;
};

export type UserVideos = {
  completed: boolean;
  vidKey: string;
  vidId: string;
  pk: string;
  sk: string;
  createdAt: string;
  updatedAt: string;
};
