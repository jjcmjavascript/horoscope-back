import { Request } from 'express';
import {
  Body,
  Controller,
  Post,
  Param,
  Patch,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { YearListItemCreateRepository } from './repositories/year-list-item-create.repository';
import { YearListItemLockRepository } from './repositories/year-list-item-lock.repository';
import { YearListItemCreateDto } from './year-list-item.dto';
import { YearListItemFindAllRepository } from './repositories/year-list-item-find-all.repository';
import { YearListItemDestroyRepository } from './repositories/year-list-item-detroy.respository';

@Controller('year-list-items')
export class YearListItemController {
  constructor(
    private readonly createRepository: YearListItemCreateRepository,
    private readonly lockRepository: YearListItemLockRepository,
    private readonly destroyRepository: YearListItemDestroyRepository,
    private readonly yearListItemFindAllRepository: YearListItemFindAllRepository,
  ) {}

  @Get()
  async index(@Req() req: Request) {
    console.log(req.header);
    return await this.yearListItemFindAllRepository.execute({
      userId: 2,
    });
  }

  @Post()
  async create(
    @Body() createDto: YearListItemCreateDto,
    @Req() request: Request,
  ) {
    console.log(request['user']);

    await this.createRepository.execute({
      description: createDto.description,
    });
  }

  @Patch(':id')
  async lock(@Param('id') id: number) {
    return await this.lockRepository.execute(id);
  }

  @Delete(':id')
  async detroy(@Param('id') id: number) {
    const userId = 2;
    return await this.destroyRepository.execute(id, userId);
  }
}
