import { Module } from '@nestjs/common';
import { ChatGptService } from '@shared/services/chat-gpt.service';
import { TarotCreateRepository } from './repositories/tarot-create.repository';
import { TarotFindRepository } from './repositories/tarot-find-from-now.repository';
import { PushNotificationTokenFindAllRepository } from '@modules/push-notification-tokens/repositories/push-notification-token-find-all.repository';
import { TarotController } from './tator.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { TarotReadService } from './tator-read.service';

@Module({
  imports: [PrismaModule],
  providers: [
    ChatGptService,
    TarotCreateRepository,
    TarotFindRepository,
    PushNotificationTokenFindAllRepository,
    TarotReadService,
  ],
  exports: [
    ChatGptService,
    TarotCreateRepository,
    TarotFindRepository,
    PushNotificationTokenFindAllRepository,
    TarotReadService,
  ],
  controllers: [TarotController],
})
export class TarotModule {}
