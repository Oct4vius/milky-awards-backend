import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SuggestionCategories' })
export class SuggestionCategory {
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
