import { HttpException, Inject } from "@nestjs/common";
import { SendUseCase } from "../../domain/ports/in/send.usecase";
import type { MailerRepository } from "../../infrastructure/repositories/mailer.repository";
import { RepositoryNames } from "src/shared/constants/repository-names.constant";
import { Result } from "src/shared/patterns/result.pattern";
import { Mailer } from "../../domain/entities/mailer.entity";
import { CreateMailDTO } from "../dtos/create-mail.dto";

export class SendImplUseCase implements SendUseCase {
  constructor(
    @Inject(RepositoryNames.MAILER_REPOSITORY)
    private readonly repository: MailerRepository
  ) { }

  execute(dto: CreateMailDTO): Promise<Result<Mailer, HttpException>> {
    return this.repository.send(dto);
  }
}
