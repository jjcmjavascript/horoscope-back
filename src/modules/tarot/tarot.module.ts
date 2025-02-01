import { Module } from '@nestjs/common';
import { ChatGptService } from '@shared/services/chat-gpt.service';
import { TarotCreateRepository } from './repositories/tarot-create.repository';
import { PushNotificationTokenFindAllRepository } from '@modules/push-notification-tokens/repositories/push-notification-token-find-all.repository';
import { TarotController } from './tator.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { TarotReadService } from './services/tator-read.service';
import { TarotIndexService } from './services/tarot-index.service';
import { TarotFindRepository } from './repositories/tarot-find.repository';
import { HoroscopeModule } from '@modules/horoscope/horoscope.module';

@Module({
  imports: [PrismaModule, HoroscopeModule],
  providers: [
    ChatGptService,
    TarotCreateRepository,
    TarotFindRepository,
    PushNotificationTokenFindAllRepository,
    TarotReadService,
    TarotIndexService,
  ],
  exports: [
    ChatGptService,
    TarotCreateRepository,
    TarotFindRepository,
    PushNotificationTokenFindAllRepository,
    TarotReadService,
    TarotIndexService,
  ],
  controllers: [TarotController],
})
export class TarotModule {}
