import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { MiniDatabase } from './libs/mini-db';

@Injectable()
export class AppService {
  miniDbClient = new MiniDatabase();

  minifyUrl(url) {
    const minifiedUrl = createHash('md5')
      .update(Buffer.from(url ?? ''))
      .digest('hex')
      .slice(0, 6);

    this.miniDbClient.insert(minifiedUrl, url);

    return {
      url: minifiedUrl,
    };
  }

  deminifyUrl(url) {
    const deminifiedUrl = this.miniDbClient.find(url);
    return {
      url: deminifiedUrl ?? '/',
    };
  }
}
