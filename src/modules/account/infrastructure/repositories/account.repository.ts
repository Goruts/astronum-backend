import { Result } from 'src/shared/patterns/result.pattern';
import { Account } from '../../domain/entities/account.entity';
import { HttpException } from '@nestjs/common';
import { CreateAccountDTO } from '../../application/dtos/create-account.dto';

export interface AccountRepository {
  findByEmail(email: string): Promise<Result<Account, HttpException>>;
  save(dto: CreateAccountDTO): Promise<Result<Account, HttpException>>;
}
