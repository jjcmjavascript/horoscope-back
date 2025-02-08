import { Injectable } from '@nestjs/common';
import { HoroscopeDetails } from '@entities/horoscope-details.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class HoroscopeDetailsCreateRepository {
  async executeFromTransaction(
    ctx: Prisma.TransactionClient,
    horoscopeId: number,
    sign: string,
    data: string,
  ): Promise<HoroscopeDetails> {
    const result = await ctx.horoscopeDetail.create({
      data: {
        horoscopeId,
        sign,
        data,
      },
    });

    return HoroscopeDetails.create({
      ...result,
      data: JSON.parse(result.data),
    });
  }

  async executeBulkFromTransaction(
    ctx: Prisma.TransactionClient,
    horoscopeId: number,
    masive: Record<string, string>,
  ): Promise<HoroscopeDetails[]> {
    const rawOroscopeDetails = [];

    for (const key in masive) {
      rawOroscopeDetails.push({
        horoscopeId,
        sign: key,
        data: JSON.stringify(masive[key]),
      });
    }

    const result = await ctx.horoscopeDetail.createManyAndReturn({
      data: rawOroscopeDetails,
    });

    return HoroscopeDetails.masivefromQuery(result);
  }
}
