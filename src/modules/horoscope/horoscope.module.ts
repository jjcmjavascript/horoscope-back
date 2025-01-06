import { Module } from '@nestjs/common';
import { HoroscopeFindOneFromNowRepository } from './repositories/horoscope-find-one-from-now.repository';
import { HoroscopeCreateRepository } from './repositories/horoscope-create.repository';
import { HoroscopeController } from './horoscope.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HoroscopeFindOneFromNowRepository, HoroscopeCreateRepository],
  controllers: [HoroscopeController],
  exports: [HoroscopeFindOneFromNowRepository, HoroscopeCreateRepository],
})
export class HoroscopeModule {}
