import { APIGatewayProxyHandler } from 'aws-lambda';
import { UserVideosRepository } from '../dynamodb/repositories/user-videos.repository';
import { KSUID } from '../utils/autogenerate.utils';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const body = JSON.parse(event.body!);
    const userId = event.requestContext.authorizer!.claims.sub;
    const data = await UserVideosRepository.addUserCompletedVideoRecord({
      id: KSUID(),
      userId,
      vidKey: body.vidKey,
      vidId: body.vidId,
      completed: body.completed,
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify('Something went wrong'),
    };
  }
};
