import { Injectable } from '@nestjs/common';
import {
  HoroscopeDetails,
  HoroscopeDetailsPrimitive,
} from '@shared/entities/horoscope-details.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class HoroscopeDetailsFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where?: Partial<HoroscopeDetailsPrimitive>) {
    let result: {
      id: number;
      horoscopeId: number;
      sign: string;
      data: string;
    }[];

    if (where) {
      result = await this.prismaService.horoscopeDetail.findMany({
        where,
      });
    } else {
      result = await this.prismaService.horoscopeDetail.findMany();
    }

    return HoroscopeDetails.masivefromQuery(result);
  }
}
