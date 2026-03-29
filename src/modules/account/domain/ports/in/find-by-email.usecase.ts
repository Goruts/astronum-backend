import { HttpException } from '@nestjs/common';
import { Result } from 'src/shared/patterns/result.pattern';
import { Account } from '../../entities/account.entity';

export interface FindByEmailUseCase {
  execute(email: string): Promise<Result<Account, HttpException>>;
}
