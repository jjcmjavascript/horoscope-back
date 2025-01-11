import { Controller, Get } from '@nestjs/common';
import { HoroscopeFindOrCreateRepository } from './repositories/horoscope-find-or-create.repository';
import { formatHoroscopeForMobile } from './helpers/format-horoscope-for-mobile.helper';
import { HasHoroscopeKey } from '@shared/decorators/public-with-key.decorator';
import { Public } from '@shared/decorators/public.decorator';

@Controller('horoscopes')
export class HoroscopeController {
  constructor(
    private readonly horoscopeFindOrCreateRepository: HoroscopeFindOrCreateRepository,
  ) {}

  @HasHoroscopeKey()
  @Get()
  async index() {
    const result = await this.horoscopeFindOrCreateRepository.execute();

    return formatHoroscopeForMobile(result);
  }

  @Public()
  @Get('/hour')
  async serverHour() {
    return {
      date: new Date().toUTCString(),
    };
  }
}
