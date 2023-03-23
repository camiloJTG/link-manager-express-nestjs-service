import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createApi } from 'unsplash-js';

@Injectable()
export class UnsplahService {
  accessKey = this.configService.get<string>('UNSPLASH_KEY');

  constructor(private readonly configService: ConfigService) {}

  private configuration() {
    const unsplash = createApi({
      accessKey: this.accessKey,
    });
    return unsplash;
  }

  async getRandomImage(): Promise<string> {
    const { photos } = this.configuration();
    const { response } = await photos.getRandom({ count: 1 });
    return response[0].urls.regular;
  }
}
