import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MovementModule } from './modules/movement/movement.module';
import { Product } from './modules/product/entities/product.entity';
import { User } from './modules/user/entities/user.entity';
import { Category } from './modules/category/entities/category.entity';
import { Movement } from './modules/movement/entities/movement.entity';

@Module({
  imports: [
    UserModule,
    ProductModule,
    CategoryModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_POSTGRES,
      port: parseInt(process.env.PORT_POSTGRES ?? '5433'),
      username: process.env.USERNAME_POSTGRES,
      password: process.env.PASSWORD_POSTGRES,
      database: process.env.DATABASE_POSTGRES,
      entities: [Product, User, Category, Movement],
      synchronize: true,
    }),
    MovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
