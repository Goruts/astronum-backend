import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("mails")
export class Mailer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "from",
    type: "varchar",
    length: "100",
    nullable: false,
  })
  from!: string;

  @Column({
    name: "to",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  to!: string;

  @Column({
    name: "content",
    type: "text",
    nullable: false,
  })
  content!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    nullable: false
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    nullable: false,
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamptz",
    nullable: true
  })
  deletedAt!: Date;
}

