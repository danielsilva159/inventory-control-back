import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateMovementDto } from './dto/create-movement.dto';
import { MovementsService } from './movement.service';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  create(
    @Body()
    dto: CreateMovementDto,
  ) {
    return this.movementsService.create(dto);
  }

  @Get()
  findAll() {
    return this.movementsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.movementsService.findOne(id);
  }

  @Get('product/:productId')
  findByProduct(
    @Param('productId')
    productId: string,
  ) {
    return this.movementsService.findByProduct(productId);
  }
}
