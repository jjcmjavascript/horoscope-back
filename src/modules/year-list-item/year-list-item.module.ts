import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { YearListItemCreateRepository } from './repositories/year-list-item-create.repository';
import { YearListItemLockRepository } from './repositories/year-list-item-lock.repository';
import { YearListItemController } from './year-list-item.controller';
import { YearListItemFindAllRepository } from './repositories/year-list-item-find-all.repository';
import { YearListItemDestroyRepository } from './repositories/year-list-item-detroy.respository';

@Module({
  providers: [
    PrismaService,
    YearListItemCreateRepository,
    YearListItemLockRepository,
    YearListItemFindAllRepository,
    YearListItemDestroyRepository,
  ],
  controllers: [YearListItemController],
})
export class YearListItemModule {}
