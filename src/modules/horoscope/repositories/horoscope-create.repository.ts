import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class HoroscopeCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // async executeTransaction(horoscope: any): Promise<Horoscope> {
  //   await this.checkDuplicateId();
  //   const data = {
  //     date: new Date().toISOString(),
  //     data: {
  //       virgo: {
  //         amor: 'prueba',
  //         dinero: 'equisde',
  //       },
  //     },
  //   };

  //   try {
  //     const newHoroscope = await this.prismaService.$transaction(
  //       async (ctx) => {
  //         const tempHoroscope = await ctx.horoscope.create({
  //           data: {
  //             createdAt: new Date(),
  //           },
  //         });

  //         // this.horoscopeDetailsCreateRepository.executeBulkFromTransaction(ctx, )

  //         return new Horoscope({
  //           id: tempHoroscope.id,
  //           createdAt: tempHoroscope.createdAt,
  //         });
  //       },
  //     );

  //     return newHoroscope;
  //   } catch (e) {
  //     console.error(e);
  //     throw new InternalServerErrorException(
  //       'An unexpected error occurred during horoscope creation',
  //     );
  //   }
  // }

  async checkDuplicateId(): Promise<void> {
    const horoscope = await this.prismaService.horoscope.findFirst({
      where: { createdAt: new Date() },
    });

    if (horoscope) {
      throw new ConflictException({ errors: ['Horoscope ID already exists'] });
    }
  }
}
