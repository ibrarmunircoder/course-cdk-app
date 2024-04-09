import { DynatronClient, Dynatron } from 'dynatron';
import { createName } from '../utils/cdk.utils';
const dynatronClient = new DynatronClient({
  region: 'us-east-1',
  maxAttempts: 3,
  timeout: 5000,
});

export const dynatron = new Dynatron(dynatronClient);
export const db = dynatron.Items(createName('CourseAppTable'));
