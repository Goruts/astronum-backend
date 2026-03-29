import { HttpException } from '@nestjs/common';
import { Account } from '../../entities/account.entity';
import { Result } from 'src/shared/patterns/result.pattern';
import { CreateAccountDTO } from 'src/modules/account/application/dtos/create-account.dto';

export interface SaveUseCase {
  execute(dto: CreateAccountDTO): Promise<Result<Account, HttpException>>;
}
