import { Body, Controller, Get } from '@nestjs/common';
import { TarotDto } from './tarot.dto';
import { TarotReadService } from './tator-read.service';
import { HasHoroscopeKey } from '@shared/decorators/public-with-key.decorator';

@Controller('tarots')
export class TarotController {
  constructor(private readonly tarotReadService: TarotReadService) {}

  @HasHoroscopeKey()
  @Get()
  async index(@Body() params: TarotDto) {
    return this.tarotReadService.execute(params);
  }
}
