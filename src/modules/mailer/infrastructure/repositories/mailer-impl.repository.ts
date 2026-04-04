import { HttpException, Inject, Injectable } from "@nestjs/common";
import { MailerRepository } from "./mailer.repository";
import { Ok, Result } from "src/shared/patterns/result.pattern";
import { CreateMailDTO } from "../../application/dtos/create-mail.dto";
import { Mailer } from "../../domain/entities/mailer.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Resend } from 'resend';
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { InjectQueue } from "@nestjs/bullmq";
import { QueueNames } from "src/shared/constants/queue-names.constant";
import { Queue } from "bullmq";
import { JobNames } from "src/shared/constants/job-names.const";

@Injectable()
export class MailerImplRepositry implements MailerRepository {

  constructor(
    @InjectRepository(Mailer) private readonly provider: Repository<Mailer>,
    @InjectQueue(QueueNames.EMAIL_SENDING) private readonly emailQueue: Queue,
    private readonly configService: ConfigService,
  ) { }

  public async send(dto: CreateMailDTO): Promise<Result<Mailer, HttpException>> {
    const mail = this.provider.create(dto);
    const savedMail = await this.provider.save(mail);
    this.emailQueue.add(JobNames.SEND_MAIL, { dto }, {
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
      removeOnFail: true,
    })
    return Ok(savedMail)
  }
}
