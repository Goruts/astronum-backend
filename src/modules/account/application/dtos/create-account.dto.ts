import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 150)
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  password!: string;
}
