import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
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
  name: string;

  @Column({ default: 0, type: 'int' })
  votes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public incrementVotes() {
    this.votes += 1;
  }

  public decrementVotes() {
    this.votes -= 1;
  }

}
