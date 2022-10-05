import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { EnrichResponseInterceptor } from './enrich-response.interceptor';
import { MesureDurationInterceptor } from './mesure-duration.interceptor';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:name')
  @UseInterceptors(MesureDurationInterceptor, EnrichResponseInterceptor)
  getHello(@Param('name') name : string): string {
    return this.appService.getHello(name);
  }
}
