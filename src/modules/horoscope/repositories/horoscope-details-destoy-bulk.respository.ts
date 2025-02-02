import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { HoroscopeRepositoryParams } from '../horoscope.interface';

@Injectable()
export class HoroscopeDetailsDestoyBulkRespository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: HoroscopeRepositoryParams) {
    return await this.prismaService.horoscopeDetail.deleteMany({
      where: where.where,
    });
  }
}
