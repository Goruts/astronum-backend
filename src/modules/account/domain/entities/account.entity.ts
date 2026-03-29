import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: false,
    unique: true,
    length: 150,
  })
  email!: string;

  @Column({
    type: 'varchar',
    name: 'password',
    nullable: false,
    length: 50,
  })
  password!: string;

  @Column({
    name: "otp",
    length: 8,
    nullable: true,
  })
  otp?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;
}
