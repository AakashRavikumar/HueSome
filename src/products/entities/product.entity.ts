/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Cart } from 'src/cart/entities/cart.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column('text', { array: true })
  sizes: string[];

  @Column({ nullable: true })
  aspectRatio: string;

  @Column()
  imageName: string;

  @Column()
  imageUrl: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ nullable: true })
  artistId: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: Cart;
}
