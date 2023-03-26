import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { schemaValidation } from './config/validation.config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { LinkModule } from './link/link.module';
import { ApisModule } from './apis/apis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schemaValidation,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: Boolean(process.env.DB_SYNCRO),
      autoLoadEntities: Boolean(process.env.DB_AUTOLOAD),
    }),
    AuthModule,
    CommonModule,
    SeedModule,
    LinkModule,
    ApisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
