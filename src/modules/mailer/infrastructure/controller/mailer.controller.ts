import { Body, Controller, Post } from "@nestjs/common";
import { MailerService } from "../../application/services/mailer.service";
import { CreateMailDTO } from "../../application/dtos/create-mail.dto";

@Controller("mails")
export class MailerController {
  constructor(
    private readonly service: MailerService
  ) { }

  @Post("/send")
  public async send(@Body() dto: CreateMailDTO) {
    const result = await this.service.send(dto);
    if (result.isErr) throw result.err;
    return result.value
  }
}
