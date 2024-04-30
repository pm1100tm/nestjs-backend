import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

function getCurrent(): string {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Seoul');

  return dayjs().tz().format('YYYY-MM-DDTHH:mm:ssZ[Z]');
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.originalUrl;

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        let msg = '';
        if (statusCode <= 300) {
          msg = 'success';
        } else if (statusCode >= 400 && statusCode < 500) {
          msg = 'fail';
        } else if (statusCode >= 500) {
          // TODO: Add Sentry
          msg = 'server error';
        }

        console.log(`${getCurrent()} ${path} ${statusCode} ${msg}`);
      }),
    );
  }
}
