import { APIGatewayProxyHandler } from 'aws-lambda';
import { UserVideosRepository } from '../dynamodb/repositories/user-videos.repository';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const userId = event.requestContext.authorizer!.claims.sub;
  const userVideos = await UserVideosRepository.listUserVideos(userId);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(userVideos),
  };
};
