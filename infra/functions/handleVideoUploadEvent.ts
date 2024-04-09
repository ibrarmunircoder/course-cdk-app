import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(null),
  };
};
