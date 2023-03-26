import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Link } from './entities/link.entity';
import { UnsplahService } from 'src/apis/unsplash.service';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/auth/user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LinkService {
  unsplashUrl = this.configService.get<string>('UNSPLASH_URL');

  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly unslpashService: UnsplahService,
    private readonly commonService: CommonService,
  ) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    try {
      const { userId } = createLinkDto;
      const user = await this.userService.findOne(userId);
      const { hostname } = this.commonService.checkUrl(createLinkDto.url);
      const imageUrl = await this.unslpashService.getRandomImage();
      const newLink = this.linkRepository.create({
        domain: hostname,
        imageUrl: imageUrl,
        user,
        ...createLinkDto,
      });
      const result = await this.linkRepository.save(newLink);
      delete result.user;
      return result;
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }

  async findAllByUser(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<Link[]> {
    const { limit = 10, offset = 1 } = paginationDto;
    const links = await this.linkRepository
      .createQueryBuilder('link')
      .where('link.userId =:userId', { userId })
      .take(limit)
      .skip(offset)
      .getMany();
    if (links.length === 0) throw new NotFoundException('Links not found');
    return links;
  }

  async findOne(id: string): Promise<Link> {
    const user = await this.linkRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Link not found');
    return user;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto): Promise<Link> {
    delete updateLinkDto.userId;
    const { url, ...rest } = updateLinkDto;
    const { domain } = await this.findOne(id);
    let currentHostname: string = domain;

    if (url) {
      const { hostname } = this.commonService.checkUrl(updateLinkDto.url);
      currentHostname = hostname;
    }
    const result = await this.linkRepository.save({
      id,
      url,
      domain: currentHostname,
      ...rest,
    });
    return result;
  }

  async remove(id: string): Promise<object> {
    const { affected } = await this.linkRepository.delete(id);
    return { affected };
  }

  async deleteAll(): Promise<void> {
    await this.linkRepository.delete({});
  }
}
