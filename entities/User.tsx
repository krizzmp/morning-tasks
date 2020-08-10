import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/index";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, length: 512 })
  email: string;

  @Column({ length: 1025 })
  passwordHash: string;

  @Column()
  salt: string;
}
