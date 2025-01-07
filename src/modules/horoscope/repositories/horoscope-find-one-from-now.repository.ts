import { Injectable } from '@nestjs/common';
import {
  Horoscope,
  HoroscopePrimitive,
} from '@shared/entities/horoscope.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class HoroscopeFindOneFromNowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<Horoscope | null> {
    const result = await this.prismaService.$queryRaw<HoroscopePrimitive[]>`
      SELECT * FROM "Horoscope" where DATE("createdAt") = CURRENT_DATE limit 1;
    `;

    return result[0] ? Horoscope.create(result[0]) : null;
  }
}
