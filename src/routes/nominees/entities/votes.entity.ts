import { ObligatoryCategoriesEntity } from 'src/routes/obligatory-categories/entities/obligatory-category.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NomineeEntity } from './nominee.entity';
import { UserEntity } from 'src/routes/auth/entities/user.entity';

@Entity({ name: 'Votes' })
export class VotesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Generated('uuid')
  uuid: string;

  @ManyToOne(() => ObligatoryCategoriesEntity)
  category: ObligatoryCategoriesEntity;

  @ManyToOne(() => NomineeEntity, (nominee) => nominee.votes)
  nominee: NomineeEntity;

  @ManyToOne(() => UserEntity, (user) => user.votes)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
