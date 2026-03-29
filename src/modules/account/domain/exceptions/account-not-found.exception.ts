import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountNotFoundException extends HttpException {
  constructor() {
    super('La cuenta no fue encontrada', HttpStatus.NOT_FOUND);
  }
}
