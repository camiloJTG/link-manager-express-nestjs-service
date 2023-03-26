import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  private readonly logger = new Logger(CommonService.name);

  handlerError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (typeof error === 'object') throw error;
    this.logger.error(error);
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
