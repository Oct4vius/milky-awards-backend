import { UserEntity } from 'src/routes/auth/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'OptionalCategories' })
export class OptionalCategoriesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ length: 300, unique: true })
  title: string;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => UserEntity, (user) => user.optionalCategory, {nullable: true})
  votes: UserEntity[];
  

  public didUserVote(id: number): boolean {

    if (!this.votes || this.votes.length === 0) return false;

    return this.votes.some(user => user.id === id);
  }

  public getVotesCount(): number {
    return this.votes.length;
  }
}
