import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class MesureDurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startDate = Date.now();

    return next.handle().pipe(
      tap(valueFromRouteHandler => console.log(`duration in ms : ${Date.now() - startDate}`))
    );
  }
}
