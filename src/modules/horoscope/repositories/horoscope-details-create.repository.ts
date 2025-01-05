import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import {
  HoroscopeDetails,
  HoroscopeDetailsPrimitive,
  HoroscopeDetailsPrimitiveData,
} from '@entities/horoscope-details.entity';

@Injectable()
export class HoroscopeDetailsCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async executeTransaction(
    detailsDto: Partial<HoroscopeDetailsPrimitive>,
  ): Promise<HoroscopeDetails> {
    await this.checkDuplicateId(detailsDto.id);

    try {
      const newDetails = await this.prismaService.$transaction(async (ctx) => {
        const tempDetails = await ctx.horoscopeDetail.create({
          data: {
            id: detailsDto.id,
            horoscopeId: detailsDto.horoscopeId,
            sign: detailsDto.sign,
            data: JSON.stringify(detailsDto.data),
          },
        });

        return new HoroscopeDetails({
          id: tempDetails.id,
          horoscopeId: tempDetails.horoscopeId,
          sign: tempDetails.sign,
          data: JSON.parse(tempDetails.data) as HoroscopeDetailsPrimitiveData,
        });
      });

      return newDetails;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        'An unexpected error occurred during horoscope details creation',
      );
    }
  }

  async checkDuplicateId(id?: number): Promise<void> {
    const details = id
      ? await this.prismaService.horoscopeDetail.findUnique({
          where: { id },
        })
      : null;

    if (details) {
      throw new ConflictException({
        errors: ['Horoscope details ID already exists'],
      });
    }
  }
}
