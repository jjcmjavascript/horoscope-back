import { Body, Controller, Get, Post } from '@nestjs/common';
import { TarotDto } from './tarot.dto';
import { HasHoroscopeKey } from '@shared/decorators/public-with-key.decorator';
import { TarotReadService } from './services/tator-read.service';

@Controller('tarots')
export class TarotController {
  constructor(private readonly tarotReadService: TarotReadService) {}

  @HasHoroscopeKey()
  @Get()
  async index(@Body() params: TarotDto) {
    return this.tarotReadService.execute(params);
  }

  @HasHoroscopeKey()
  @Post()
  async get(@Body() params: TarotDto) {
    return this.tarotReadService.execute(params);
  }
}
