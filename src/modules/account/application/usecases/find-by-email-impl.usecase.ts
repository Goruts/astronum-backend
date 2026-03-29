import { HttpException, Inject } from '@nestjs/common';
import { RepositoryNames } from 'src/shared/constants/repository-names.constant';
import type { AccountRepository } from '../../infrastructure/repositories/account.repository';
import { Result } from 'src/shared/patterns/result.pattern';
import { Account } from '../../domain/entities/account.entity';
import { FindByEmailUseCase } from '../../domain/ports/in';

export class FindByEmailImplUseCase implements FindByEmailUseCase {
  constructor(
    @Inject(RepositoryNames.ACCOUNT_REPOSITORY)
    private readonly repository: AccountRepository,
  ) {}

  execute(email: string): Promise<Result<Account, HttpException>> {
    return this.repository.findByEmail(email);
  }
}
