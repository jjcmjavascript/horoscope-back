import { Request } from 'express';
import { Body, Controller, Post, Param, Patch, Req, Get } from '@nestjs/common';
import { YearListItemCreateRepository } from './repositories/year-list-item-create.repository';
import { YearListItemLockRepository } from './repositories/year-list-item-lock.repository';
import { YearListItemCreateDto } from './year-list-item.dto';
import { YearListItemFindAllRepository } from './repositories/year-list-item-find-all.repository';

@Controller('year-list-items')
export class YearListItemController {
  constructor(
    private readonly createRepository: YearListItemCreateRepository,
    private readonly lockRepository: YearListItemLockRepository,
    private readonly yearListItemFindAllRepository: YearListItemFindAllRepository,
  ) {}

  @Get()
  async index(@Req() req: Request) {
    const user = req['user'];
    const userId = user['id'];

    return await this.yearListItemFindAllRepository.execute({
      userId,
    });
  }

  @Post()
  async create(
    @Body() createDto: YearListItemCreateDto,
    @Req() request: Request,
  ) {
    console.log(request['user']);
    return await this.createRepository.execute(createDto);
  }

  @Patch(':id')
  async lock(@Param('id') id: number) {
    return await this.lockRepository.execute(id);
  }
}
