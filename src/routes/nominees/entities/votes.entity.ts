import { ObligatoryCategoriesEntity } from 'src/routes/obligatory-categories/entities/obligatory-category.entity';
import {
  BaseEntity,
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
  
  
  @ManyToMany(() => UserEntity, (user) => user.votes)
  @JoinTable()
  votedUsers: UserEntity[];
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  get count(): number {
    return this.votedUsers?.length ?? 0;
  }
}
