import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";


@Entity({name: 'WhiteListEntry'})
export class WhiteListEntryEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    @Generated('uuid')
    uuid: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}