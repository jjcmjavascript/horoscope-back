import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { RepositoryParams } from '@shared/types/commons.interface';

@Injectable()
export class HoroscopeDestroyBulkRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: RepositoryParams) {
    return await this.prismaService.horoscope.deleteMany({
      where: where.where,
    });
  }
}
