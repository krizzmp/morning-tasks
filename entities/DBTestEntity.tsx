import {Column, Entity, PrimaryGeneratedColumn} from "typeorm/index";

@Entity()
export class DBTestEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;
}
