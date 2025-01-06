import { Controller, Get } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { HoroscopeFindOneFromNowRepository } from './repositories/horoscope-find-one-from-now.repository';

@Controller('horoscope')
export class HoroscopeController {
  constructor(
    private readonly horoscopeFindOneFromNowRepository: HoroscopeFindOneFromNowRepository,
  ) {}

  @Public()
  @Get()
  async index() {
    const result = await this.horoscopeFindOneFromNowRepository.execute();

    console.log(result);
    return result;
  }
}
