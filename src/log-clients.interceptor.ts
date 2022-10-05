import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LogClientsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = { date: new Date().toString(), urlRequest: '', ipAdress: '', navigator: '' };
    const request = context.switchToHttp().getRequest();
    client.ipAdress = request.headers['x-forwarded-for'] || request.connection.remoteAdress;
    client.navigator = request.headers['user-agent'];
    client.urlRequest = `${request.method} ${request.url}`;
    console.log('client *****', client);
    return next.handle();
  }
}
