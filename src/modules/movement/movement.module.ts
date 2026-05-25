import { Module } from '@nestjs/common';
import { MovementsController } from './movement.controller';
import { MovementsService } from './movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, Product])],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementModule {}
