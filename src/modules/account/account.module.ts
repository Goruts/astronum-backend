import { Module } from '@nestjs/common';
import { AccountService } from './application/services/account.service';
import { AccountImplRepository } from './infrastructure/repositories/account-impl.repository';
import { RepositoryNames } from 'src/shared/constants/repository-names.constant';
import {
  FindByEmailImplUseCase,
  SaveImplUseCase,
} from './application/usecases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './domain/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [
    AccountImplRepository,
    {
      provide: RepositoryNames.ACCOUNT_REPOSITORY,
      useExisting: AccountImplRepository,
    },
    AccountService,

    FindByEmailImplUseCase,
    SaveImplUseCase,
  ],
  controllers: [],
  exports: [AccountService],
})
export class AccountModule {}
