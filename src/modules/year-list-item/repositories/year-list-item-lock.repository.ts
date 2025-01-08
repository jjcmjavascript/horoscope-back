import { Injectable } from '@nestjs/common';
import { YearListItem } from '@shared/entities/year-list.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class YearListItemLockRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: number): Promise<YearListItem> {
    return await this.prismaService.$transaction(async (prisma) => {
      const updatedItem = await prisma.yearListItem.update({
        where: { id },
        data: { locked: true },
      });
      return new YearListItem(updatedItem);
    });
  }
}
