import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignupDTO {
  @IsEmail({}, { message: 'Invalid Email' })
  @IsNotEmpty({ message: 'Email is missing'})
  email: string;

  @IsStrongPassword({}, { message: 'Strong password required' })
  @IsNotEmpty({ message: 'Password is missing'})
  pwd: string;
}