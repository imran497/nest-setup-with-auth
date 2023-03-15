import { Exclude } from "class-transformer";

export class UserDTO {
  userId: string;
  username: string;
  fullName: string;
  email: string;

  @Exclude()
  pwd: string;

  verified: boolean;
  isPro: boolean;
}