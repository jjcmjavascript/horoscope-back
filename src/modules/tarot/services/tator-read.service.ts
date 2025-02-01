import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
// import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { PushNotificationTokenFindAllRepository } from '@modules/push-notification-tokens/repositories/push-notification-token-find-all.repository';
import { ChatGptService } from '@shared/services/chat-gpt.service';

import { extractJson } from '@shared/helpers/string.helper';
import { TarotCreateRepository } from '../repositories/tarot-create.repository';
import { tarotPromp } from '../tarot-promp.helper';
import { TarotFindRepository } from '../repositories/tarot-find.repository';
import { TarotCreateDto } from '../tarot.dto';

@Injectable()
export class TarotReadService {
  constructor(
    private readonly chatGpt: ChatGptService,
    private readonly tarotCreateRepository: TarotCreateRepository,
    private readonly tarotFindRepository: TarotFindRepository,
    private readonly tokenFindRepository: PushNotificationTokenFindAllRepository,
  ) {}

  async execute(params: TarotCreateDto) {
    try {
      // Get each 22 hours
      const date = new Date();
      date.setHours(date.getHours() - 22);

      const foundedTokens = await this.tokenFindRepository.execute({
        token: params.token,
      });
      const token = foundedTokens[0];

      if (!token) {
        throw new BadRequestException("Device doesn't exists");
      }

      let result = await this.tarotFindRepository.execute({
        where: {
          pushNotificationTokenId: token.values.id,
          createdAt: {
            gt: date,
          },
        },
      });

      if (!result) {
        const chatResponse = await this.chatGpt.execute([
          {
            role: 'system',
            content: tarotPromp,
          },
          {
            role: 'user',
            content: JSON.stringify({
              name: params.name,
              question: params.question,
              cards: params.cards,
            }),
          },
        ]);

        const cleanedChatResponse = extractJson(chatResponse) || chatResponse;

        result = await this.tarotCreateRepository.execute({
          pushNotificationTokenId: token.values.id,
          name: params.name,
          bithDate: params.birthDate,
          reading: JSON.stringify(JSON.parse(cleanedChatResponse)),
        });
      }

      return JSON.parse(result.values.reading);
    } catch (e: unknown) {
      if (e instanceof BadRequestException) {
        throw e;
      }

      throw new InternalServerErrorException('An error happen in tarot');
    }
  }
}
