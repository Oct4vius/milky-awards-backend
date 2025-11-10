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

@Entity({ name: 'Nominees' })
export class NomineeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ length: 300, nullable: false })
  name: string;

  @Column({ length: 300, nullable: true })
  username?: string;

  @Column({ length: 500, nullable: true })
  photoUrl?: string;

  @Column({ length: 300, default: 'individual', nullable: false })
  type: 'individual' | 'moment';

  @ManyToMany(
    () => ObligatoryCategoriesEntity,
    (obligatoryCategory) => obligatoryCategory.nominees,
  )
  @JoinTable()
  obligatoryCategories: ObligatoryCategoriesEntity[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
