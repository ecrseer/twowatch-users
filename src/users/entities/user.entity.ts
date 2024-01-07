import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idkey: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastActivity: Date;
}
