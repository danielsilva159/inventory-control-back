import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Movement } from './entities/movement.entity';

import { CreateMovementDto } from './dto/create-movement.dto';
import { MovementType } from '../../shared/enums/movement-type.enum';
import { AppError } from '../../shared/erros/app-erros';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementsRepository: Repository<Movement>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(dto: CreateMovementDto) {
    const product = await this.productsRepository.findOne({
      where: {
        id: dto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const previousQuantity = product.quantity;

    let currentQuantity = previousQuantity;

    if (dto.type === MovementType.ENTRY) {
      currentQuantity += dto.quantity;
    }

    if (dto.type === MovementType.EXIT) {
      if (dto.quantity > previousQuantity) {
        throw new BadRequestException('Estoque insuficiente');
      }

      currentQuantity -= dto.quantity;
    }

    product.quantity = currentQuantity;

    await this.productsRepository.save(product);

    const movement = this.movementsRepository.create({
      ...dto,
      previousQuantity,
      currentQuantity,
    });

    return this.movementsRepository.save(movement);
  }

  async findAll() {
    return this.movementsRepository.find({
      relations: {
        product: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const movement = await this.movementsRepository.findOne({
      where: { id },
      relations: {
        product: true,
        user: true,
      },
    });

    if (!movement) {
      throw new AppError('Movimentação não encontrada', 404);
    }

    return movement;
  }

  async findByProduct(productId: string) {
    return this.movementsRepository.find({
      where: {
        productId,
      },
      relations: {
        product: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
