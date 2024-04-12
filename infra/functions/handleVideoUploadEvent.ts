import { S3Handler } from 'aws-lambda';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { VideosRepositories } from '../dynamodb/repositories/videos.repository';
import { KSUID } from '../utils/autogenerate.utils';

const client = new S3Client({});

const getObjectContentType = async (bucketName: string, key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const response = await client.send(command);
  return response.ContentType;
};

export const handler: S3Handler = async (event, context) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const eventRecord = event.Records[0];
  if (
    eventRecord.eventName === 'ObjectCreated:Put' ||
    eventRecord.eventName === 'ObjectCreated:CompleteMultipartUpload'
  ) {
    try {
      const bucket = event.Records[0].s3.bucket.name;
      let key = event.Records[0].s3.object.key;
      key = decodeURIComponent(key.replace(/\+/g, ' '));
      const fileName = key.split('/').pop() as string;
      const size = event.Records[0].s3.object.size;
      const mimeType = (await getObjectContentType(bucket, key)) as string;
      await VideosRepositories.createVideoRecord({
        id: KSUID(),
        key,
        mimeType,
        filename: fileName,
        size,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
