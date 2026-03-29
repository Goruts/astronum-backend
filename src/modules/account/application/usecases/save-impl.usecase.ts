import { HttpException, Inject } from '@nestjs/common';
import type { AccountRepository } from '../../infrastructure/repositories/account.repository';
import { RepositoryNames } from 'src/shared/constants/repository-names.constant';
import { Result } from 'src/shared/patterns/result.pattern';
import { Account } from '../../domain/entities/account.entity';
import { CreateAccountDTO } from '../dtos/create-account.dto';
import { SaveUseCase } from '../../domain/ports/in';

export class SaveImplUseCase implements SaveUseCase {
  constructor(
    @Inject(RepositoryNames.ACCOUNT_REPOSITORY)
    private readonly repository: AccountRepository,
  ) {}

  execute(dto: CreateAccountDTO): Promise<Result<Account, HttpException>> {
    return this.repository.save(dto);
  }
}
