import { Controller, Get } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { HoroscopeFindOrCreateRepository } from './repositories/horoscope-find-or-create.repository';

@Controller('horoscope')
export class HoroscopeController {
  constructor(
    private readonly horoscopeFindOrCreateRepository: HoroscopeFindOrCreateRepository,
  ) {}

  @Public()
  @Get()
  async index() {
    const result = await this.horoscopeFindOrCreateRepository.execute();

    return result;
  }
}
