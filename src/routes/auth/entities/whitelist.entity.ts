import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'WhiteListEntry'})
export class WhiteListEntryEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}