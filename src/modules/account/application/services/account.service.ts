import { HttpException, Injectable } from '@nestjs/common';
import { FindByEmailImplUseCase, SaveImplUseCase } from '../usecases';
import { Result } from 'src/shared/patterns/result.pattern';
import { Account } from '../../domain/entities/account.entity';
import { CreateAccountDTO } from '../dtos/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly findByEmailImplUseCase: FindByEmailImplUseCase,
    private readonly saveImplUseCase: SaveImplUseCase,
  ) {}

  public async findByEmail(
    email: string,
  ): Promise<Result<Account, HttpException>> {
    return this.findByEmailImplUseCase.execute(email);
  }

  public async save(
    dto: CreateAccountDTO,
  ): Promise<Result<Account, HttpException>> {
    return this.saveImplUseCase.execute(dto);
  }
}
