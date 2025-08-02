import { BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SuggestionCategories' })
export class SuggestionCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ length: 300, unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
