import { Injectable } from '@nestjs/common';
import { Horoscope } from '@shared/entities/horoscope.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { RepositoryParams } from '@shared/types/commons.interface';

@Injectable()
export class HoroscopeFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: RepositoryParams): Promise<Horoscope[]> {
    const result = await this.prismaService.horoscope.findMany({
      where: where.where,
    });

    return Horoscope.fromArray(result);
  }
}
