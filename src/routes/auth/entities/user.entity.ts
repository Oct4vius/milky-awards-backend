import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { OptionalCategoriesEntity } from 'src/routes/optional-categories/entities/optional-category.entity';

@Entity({name: 'Users'})
export class UserEntity extends BaseEntity {
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

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => OptionalCategoriesEntity, (optionalCategory) => optionalCategory.votes, { nullable: true })
  @JoinTable()
  optionalCategory: OptionalCategoriesEntity;

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }

  comparePassword(password: string) {
    return compareSync(password, this.password);
  }
}
