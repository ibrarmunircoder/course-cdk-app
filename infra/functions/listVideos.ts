import { APIGatewayProxyHandler } from 'aws-lambda';
import { VideosRepositories } from '../dynamodb/repositories/videos.repository';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({});

const generatePreSignedUrl = async (
  bucket: string,
  key: string,
  expiresIn?: number
) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn });
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  let videos = await VideosRepositories.listVideos();
  if (videos?.length) {
    const promises = videos.map(async (video) => {
      const url = await generatePreSignedUrl(
        process.env.BUCKET_NAME!,
        video.key!
      );
      video.signedUrl = url;
      return video;
    });
    videos = await Promise.all(promises);
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(videos),
  };
};
