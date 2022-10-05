import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilterRequestInterceptor } from './filter-request.interceptor';
import { MesureDurationInterceptor } from './mesure-duration.interceptor';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:name')
  @UseInterceptors(MesureDurationInterceptor, FilterRequestInterceptor)
  getHello(@Param('name') name : string): string {
    return this.appService.getHello(name);
  }
}
