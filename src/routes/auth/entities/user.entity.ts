import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

@Entity({name: 'Users'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  @Generated('uuid')
  uuid: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }

  comparePassword(password: string) {
    return compareSync(password, this.password);
  }
}
