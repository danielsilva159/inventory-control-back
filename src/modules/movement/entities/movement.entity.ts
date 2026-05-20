import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { MovementType } from '../../../shared/enums/movement-type.enum';

@Entity('movements')
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.movements)
  product: Product;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.movements)
  user: User;

  @Column({
    type: 'enum',
    enum: MovementType,
  })
  type: MovementType;

  @Column()
  quantity: number;

  @Column()
  previousQuantity: number;

  @Column()
  currentQuantity: number;

  @Column({
    nullable: true,
  })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;
}
