import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { RepositoryParams } from '@shared/types/commons.interface';

@Injectable()
export class TarotBulkDestroyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: RepositoryParams) {
    return this.prismaService.tarot.deleteMany({
      where: params.where,
    });
  }
}
