import { config } from '@config/config';
import { Injectable } from '@nestjs/common';
import { createSignedFetcher } from 'aws-sigv4-fetch';

@Injectable()
export class HoroscopeService {
  async execute() {
    const signedFetch = createSignedFetcher({
      service: 'lambda',
      region: config.aws.lambda.region,
      credentials: {
        accessKeyId: config.aws.lambda.key,
        secretAccessKey: config.aws.lambda.secret,
      },
    });

    const result = await signedFetch(config.aws.lambda.url);

    return result.json();
  }
}
