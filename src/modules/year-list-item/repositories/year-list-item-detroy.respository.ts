import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class YearListItemDestroyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: number, userId: number): Promise<void> {
    return await this.prismaService.$transaction(async (prisma) => {
      await prisma.yearListItem.delete({
        where: { id, userId },
      });
    });
  }
}
