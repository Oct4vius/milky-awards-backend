
import { NomineeEntity } from 'src/routes/nominees/entities/nominee.entity';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ObligatoryCategories' })
export class ObligatoryCategoriesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Generated('uuid')
  uuid: string;

  @Column({ length: 300, unique: true, nullable: false })
  title: string;

  @Column({ length: 300, default: 'individual', nullable: false })
  type: 'individual' | 'moment';

  @ManyToMany(() => NomineeEntity, (nominee) => nominee.categories)
  @JoinTable()
  nominees: NomineeEntity[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
