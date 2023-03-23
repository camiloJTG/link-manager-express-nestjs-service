import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtResponseInterface } from 'src/auth/interfaces';
import { UserService } from 'src/auth/user.service';
import { LinkService } from 'src/link/link.service';
import { users, links } from './data';

@Injectable()
export class SeedService {
  devEnvironment = this.configService.get<string>('NODE_DEV');

  constructor(
    private readonly userService: UserService,
    private readonly linkService: LinkService,
    private readonly configService: ConfigService,
  ) {}

  async runSeed(): Promise<string> {
    if (this.devEnvironment !== 'dev')
      throw new UnauthorizedException('The endpoint is blocked');

    await this.cleanTables();
    await this.executeUserSeed();
    await this.executeLinkSeed();
    return 'seed executed';
  }

  async executeUserSeed(): Promise<void> {
    const allPromises: Promise<jwtResponseInterface>[] = [];
    users.map((user) => allPromises.push(this.userService.create(user)));
    await Promise.all(allPromises);
  }

  async executeLinkSeed() {
    const allPromises = [];
    const users = await this.userService.findAll();
    users.map(({ id }) => {
      links.map((link) =>
        allPromises.push(this.linkService.create({ userId: id, ...link })),
      );
    });

    await Promise.all(allPromises);
  }

  async cleanTables(): Promise<void> {
    await this.linkService.deleteAll();
    await this.userService.deleteAll();
  }
}
