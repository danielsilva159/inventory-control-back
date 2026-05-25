import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { MovementType } from '../../../shared/enums/movement-type.enum';

export class CreateMovementDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  userId: string;

  @IsEnum(MovementType)
  type: MovementType;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  reason?: string;
}
