import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UnsplahService {
  accessKey = this.configService.get<string>('UNSPLASH_KEY');
  baseUrl = this.configService.get<string>('UNSPLASH_URL');

  constructor(private readonly configService: ConfigService) {}

  async getRandomImage(): Promise<string> {
    const resp = await axios.get(
      `${this.baseUrl}/photos/random?client_id=${this.accessKey}`,
    );
    const { data } = resp;
    console.log(data.urls);
    return data.urls.regular;
  }
}
