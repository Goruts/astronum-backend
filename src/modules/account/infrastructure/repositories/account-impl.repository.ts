import {
  HttpException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from '../../domain/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { Err, Ok, Result } from 'src/shared/patterns/result.pattern';
import { CreateAccountDTO } from '../../application/dtos/create-account.dto';
import { AccountNotFoundException } from '../../domain/exceptions/account-not-found.exception';

@Injectable()
export class AccountImplRepository implements AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly provider: Repository<Account>,
  ) {}

  public async findByEmail(
    email: string,
  ): Promise<Result<Account, HttpException>> {
    const account = await this.provider.findOneBy({ email });
    if (!account) return Err(new AccountNotFoundException());
    return Ok(account);
  }

  public async save(
    dto: CreateAccountDTO,
  ): Promise<Result<Account, HttpException>> {
    const account = this.provider.create(dto);
    const savedUser = await this.provider.save(account);
    return Ok(savedUser);
  }
}
