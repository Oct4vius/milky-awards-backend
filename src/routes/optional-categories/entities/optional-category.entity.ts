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
  title: string;

  @Column({ type: 'text', array: true, default: [], nullable: false })
  votes: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public incrementVotes(uuid: string) {
    this.votes.push(uuid);
  }

  public decrementVotes(uuid: string) {
    this.votes = this.votes.filter((vote) => vote !== uuid);
  }


  public didUserVote(uuid: string): boolean {
    return this.votes.includes(uuid);
  }

  public getVotesCount(): number {
    return this.votes.length;
  }
}
