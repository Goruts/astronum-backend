import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ErrorType } from '../types/app-error.types';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (data && typeof data.isOk === 'boolean') {
          if (data.isErr) {
            const status = this.mapErrorToStatus(data.err.type);
            throw new HttpException(
              {
                statusCode: status,
                error: data.err.type,
                message: data.err.message,
              },
              status,
            );
          }
          return data.value;
        }
        return data;
      }),
    );
  }

  private mapErrorToStatus(type: ErrorType): HttpStatus {
    const statusMap: Record<ErrorType, HttpStatus> = {
      CONFLICT: HttpStatus.CONFLICT,
      NOT_FOUND: HttpStatus.NOT_FOUND,
      BAD_REQUEST: HttpStatus.BAD_GATEWAY,
      UNAUTHORIZED: HttpStatus.UNAUTHORIZED,
      FORBIDDEN: HttpStatus.FORBIDDEN,
      INTERNAL: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    return statusMap[type] || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
