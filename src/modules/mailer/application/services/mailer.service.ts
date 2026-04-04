import { HttpException, Injectable } from "@nestjs/common";
import { SendImplUseCase } from "../usecases/send-impl.usecase";
import { Result } from "src/shared/patterns/result.pattern";
import { Mailer } from "../../domain/entities/mailer.entity";
import { CreateMailDTO } from "../dtos/create-mail.dto";

@Injectable()
export class MailerService {
  constructor(
    private readonly sendImplUseCase: SendImplUseCase
  ) { }

  public send(dto: CreateMailDTO): Promise<Result<Mailer, HttpException>> {
    return this.sendImplUseCase.execute(dto);
  }
}
