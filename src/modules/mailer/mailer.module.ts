import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { QueueNames } from "src/shared/constants/queue-names.constant";
import { MailerProcessor } from "./infrastructure/processor/mailer.processor";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mailer } from "./domain/entities/mailer.entity";
import { MailerImplRepositry } from "./infrastructure/repositories/mailer-impl.repository";
import { RepositoryNames } from "src/shared/constants/repository-names.constant";
import { SendImplUseCase } from "./application/usecases/send-impl.usecase";
import { MailerController } from "./infrastructure/controller/mailer.controller";
import { MailerService } from "./application/services/mailer.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Mailer]),
    BullModule.registerQueue({ name: QueueNames.EMAIL_SENDING, })
  ],
  providers: [
    MailerProcessor,
    MailerImplRepositry,
    { provide: RepositoryNames.MAILER_REPOSITORY, useExisting: MailerImplRepositry },
    MailerService,
    SendImplUseCase,
  ],
  controllers: [
    MailerController,
  ]
})
export class MailerModule { }
