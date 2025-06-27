/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { CartStatus } from 'src/common/constants/roles.constants';

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Product, (product) => product.cart)
  @JoinTable({
    name: 'cart_products',
    // joinColumn: { name: 'cart_id', referencedColumnName: 'id' },
    // inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];

  @Column({
    type: 'enum',
    enum: [CartStatus.PENDING, CartStatus.ORDER_PLACED],
    default: CartStatus.PENDING,
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
