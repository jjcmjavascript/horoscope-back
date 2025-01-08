import { Injectable } from '@nestjs/common';
import {
  Horoscope,
  HoroscopePrimitive,
} from '@shared/entities/horoscope.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class HoroscopeFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    where?: Partial<HoroscopePrimitive>,
  ): Promise<Horoscope | null> {
    const conditions = {};

    if (where) {
      conditions['where'] = where;
    }

    conditions['orderBy'] = { id: 'desc' };

    const result = await this.prismaService.horoscope.findFirst(conditions);

    return result ? Horoscope.create(result) : null;
  }
}
