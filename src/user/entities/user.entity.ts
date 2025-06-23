/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Role } from 'src/common/constants/roles.constants';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: [Role.ADMIN, Role.USER],
    default: Role.USER,
  })
  role: string;

  @Column({ default: null })
  otp: string;

  // @Column({ default: false })
  // loggedIn: boolean; // need to work on this part .....

  @Column({ default: null })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
