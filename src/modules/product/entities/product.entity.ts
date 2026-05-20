import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Movement } from '../../movement/entities/movement.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  sku: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  priceCost: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  priceSale: number;

  @Column({
    default: 0,
  })
  quantity: number;

  @Column({
    default: 0,
  })
  minimumStock: number;

  @Column({
    default: true,
  })
  active: boolean;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Movement, (movement) => movement.product)
  movements: Movement[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
