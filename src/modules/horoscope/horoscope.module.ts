import { Module } from '@nestjs/common';
import { HoroscopeFindOneFromNowRepository } from './repositories/horoscope-find-one-from-now.repository';
import { HoroscopeCreateRepository } from './repositories/horoscope-create.repository';
import { HoroscopeController } from './horoscope.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { HoroscopeFindOrCreateRepository } from './repositories/horoscope-find-or-create.repository';
import { HoroscopeDetailsFindAllRepository } from './repositories/horoscope-details-find-all.repository';
import { HoroscopeCreateFromChatGptRepository } from './repositories/horoscope-create-from-chat-gpt.repository';
import { HoroscopeDetailsCreateRepository } from './repositories/horoscope-details-create.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    HoroscopeFindOneFromNowRepository,
    HoroscopeDetailsFindAllRepository,
    HoroscopeCreateRepository,
    HoroscopeCreateFromChatGptRepository,
    HoroscopeDetailsCreateRepository,
    HoroscopeFindOrCreateRepository,
  ],
  controllers: [HoroscopeController],
  exports: [
    HoroscopeFindOneFromNowRepository,
    HoroscopeDetailsFindAllRepository,
    HoroscopeCreateRepository,
    HoroscopeCreateFromChatGptRepository,
    HoroscopeDetailsCreateRepository,
    HoroscopeFindOrCreateRepository,
  ],
})
export class HoroscopeModule {}
