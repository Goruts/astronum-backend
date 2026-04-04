import { Processor, WorkerHost } from "@nestjs/bullmq";
import { QueueNames } from "src/shared/constants/queue-names.constant";
import { Job } from "bullmq";
import { Resend } from "resend";
import { ConfigService } from "@nestjs/config";
import { CreateMailDTO } from "../../application/dtos/create-mail.dto";
import { JobNames } from "src/shared/constants/job-names.const";

type JobData = {
  dto: CreateMailDTO
}

@Processor(QueueNames.EMAIL_SENDING, { concurrency: 3 })
export class MailerProcessor extends WorkerHost {
  private readonly resend: Resend;

  constructor(
    private readonly configService: ConfigService,
  ) {
    super()
    const RESEND_API_KEY = configService.get<string>("RESEND_API_KEY") ?? "";
    this.resend = new Resend(RESEND_API_KEY)
  }

  async process(job: Job<JobData, never, string>): Promise<void> {
    switch (job.name) {
      case JobNames.SEND_MAIL:
        const dto = job.data.dto;
        await this.resend.emails.send({
          to: [dto.to],
          from: `Goruts <goruts@mail.goruts.com>`,
          text: dto.content,
          subject: dto.subject,
          html: dto.html,
        })
        break;
    }
  }
}
