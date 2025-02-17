import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  async getHello() {
    return {
      message: 'Hello World!',
    };
  }
}
