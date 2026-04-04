import { CreateMailDTO } from "src/modules/mailer/application/dtos/create-mail.dto";
import { Result } from "src/shared/patterns/result.pattern";
import { Mailer } from "../../entities/mailer.entity";
import { HttpException } from "@nestjs/common";

export interface SendUseCase {
  execute(dto: CreateMailDTO): Promise<Result<Mailer, HttpException>>;
}
