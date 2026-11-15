import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller('health')
export class AppController {
  @Public()
  @Get()
  checkHealth() {
    return {
      status: 'ok',
      service: 'EIRENE Backend API',
      system: 'Elderly Care & Medication Management Platform',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
