import { Controller, Get } from '@nestjs/common';
import { HoroscopeCreateRepository } from './repositories/horoscope-create.repository';
import { Public } from '@shared/decorators/public.decorator';

@Controller()
export class HoroscopeController {
  constructor(
    private readonly horoscopoCreateRepository: HoroscopeCreateRepository,
  ) {}

  @Public()
  @Get()
  async index() {
    const result = await this.horoscopoCreateRepository.executeTransaction();

    return result;
  }
}
