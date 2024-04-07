#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/amplify.stack';
import { amplifyAppStackConfig } from './config';

const app = new cdk.App();
new AmplifyStack(app, 'CourseCdkAmplifyStack', amplifyAppStackConfig);
