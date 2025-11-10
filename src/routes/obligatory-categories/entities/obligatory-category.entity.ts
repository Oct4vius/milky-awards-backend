import { UserEntity } from 'src/routes/auth/entities/user.entity';
import { WhiteListEntryEntity } from 'src/routes/auth/entities/whitelist.entity';
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

  @ManyToMany(
    () => NomineeEntity,
    (nominee) => nominee.obligatoryCategories // points back to the property in NomineeEntity
  )
  nominees: NomineeEntity[];
  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
