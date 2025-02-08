import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Horoscope } from '@shared/entities/horoscope.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { HoroscopeDetailsCreateRepository } from './horoscope-details-create.repository';
import { HoroscopeDetails } from '@shared/entities/horoscope-details.entity';

@Injectable()
export class HoroscopeCreateRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly horoscopeDetailsCreateRepository: HoroscopeDetailsCreateRepository,
  ) {}

  async executeTransaction(horoscopeJson: Record<string, string>): Promise<{
    horoscope: Horoscope;
    horoscopeDetails: HoroscopeDetails[];
  }> {
    try {
      console.log('horoscopeJson', horoscopeJson);
      const [horoscope, horoscopeDetails] =
        await this.prismaService.$transaction(async (ctx) => {
          const tempHoroscope = await ctx.horoscope.create({
            data: {
              createdAt: new Date(),
            },
          });

          const details: HoroscopeDetails[] =
            await this.horoscopeDetailsCreateRepository.executeBulkFromTransaction(
              ctx,
              tempHoroscope.id,
              horoscopeJson,
            );

          const newHoroscope = Horoscope.create({
            id: tempHoroscope.id,
            createdAt: tempHoroscope.createdAt,
          });

          return [newHoroscope, details];
        });

      return {
        horoscope,
        horoscopeDetails,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        'An unexpected error occurred during horoscope creation',
      );
    }
  }
}
