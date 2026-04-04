import { Result } from "src/shared/patterns/result.pattern";
import { CreateMailDTO } from "../../application/dtos/create-mail.dto";
import { Mailer } from "../../domain/entities/mailer.entity";
import { HttpException } from "@nestjs/common";

export interface MailerRepository {
  send(dto: CreateMailDTO): Promise<Result<Mailer, HttpException>>;
}
