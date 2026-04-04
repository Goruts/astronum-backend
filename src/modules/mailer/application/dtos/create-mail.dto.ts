import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMailDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  to!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  from!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsString()
  subject!: string

  @IsOptional()
  @IsString()
  html?: string;
}
