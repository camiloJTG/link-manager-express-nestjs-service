import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  handlerError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (typeof error === 'object') throw error;
    console.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }

  checkUrl(url: string): URL {
    try {
      return new URL(url);
    } catch (error) {
      throw new BadRequestException('The format URL is incorrect');
    }
  }
}
