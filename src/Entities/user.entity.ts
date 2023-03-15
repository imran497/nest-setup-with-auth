import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'users'
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id'
  })
  userId: string;

  @Column({
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    name: 'full_name',
    default: ''
  })
  fullName: string;

  @Column({
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    nullable: false
  })
  pwd: string;

  @Column({
    default: false
  })
  verified: boolean;

  @Column({
    default: false,
    name: 'is_pro'
  })
  isPro: boolean;
}