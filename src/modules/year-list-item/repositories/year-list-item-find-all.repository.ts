import { Injectable } from '@nestjs/common';
import { PrimitiveYearListItem } from '@shared/entities/year-list.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class YearListItemFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where?: Partial<PrimitiveYearListItem>) {
    const query = {};

    if (where) {
      query['where'] = where;
    }

    return await this.prismaService.yearListItem.findMany(query);
  }
}
