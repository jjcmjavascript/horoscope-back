import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { YearListItem } from '@shared/entities/year-list.entity';
import { YearListItemCreateDto } from '../year-list-item.dto';

@Injectable()
export class YearListItemCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(createDto: YearListItemCreateDto): Promise<YearListItem> {
    return await this.prismaService.$transaction(async (prisma) => {
      const createdItem = await prisma.yearListItem.create({
        data: {
          locked: false,
          description: createDto.description,
          userId: 1,
        },
      });
      return new YearListItem(createdItem);
    });
  }
}
