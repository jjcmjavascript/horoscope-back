import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TarotCreateDto, TarotIndexDto } from './tarot.dto';
import { HasHoroscopeKey } from '@shared/decorators/public-with-key.decorator';
import { TarotReadService } from './services/tator-read.service';
import { TarotIndexService } from './services/tarot-index.service';

@Controller('tarots')
export class TarotController {
  constructor(
    private readonly tarotIndexService: TarotIndexService,
    private readonly tarotReadService: TarotReadService,
  ) {}

  @HasHoroscopeKey()
  @Get()
  async index(@Query() params: TarotIndexDto) {
    return this.tarotIndexService.execute(params);
  }

  @HasHoroscopeKey()
  @Post()
  async get(@Body() params: TarotCreateDto) {
    return this.tarotReadService.execute(params);
  }
}
