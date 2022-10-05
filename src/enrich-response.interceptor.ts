import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class EnrichResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const timeZoneOffset = `${now.getTimezoneOffset() /60} hours`; 
    const result = { headers: null, dateLogged: now.toISOString(), timeZoneOffset};
    result.headers = context.getArgs().values().next().value.headers;
    return next.handle().pipe(
      map(valueFromRouteHandler => {
        return {
          initialContent: valueFromRouteHandler,
          length: (valueFromRouteHandler as string).length,
          result
        };
      })
    );
  }
}
