import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
// import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { TarotFindRepository } from './repositories/tarot-find-from-now.repository';
import { TarotDto } from './tarot.dto';
import { PushNotificationTokenFindAllRepository } from '@modules/push-notification-tokens/repositories/push-notification-token-find-all.repository';
import { ChatGptService } from '@shared/services/chat-gpt.service';
import { tarotPromp } from './tarot-promp.helper';
import { TarotCreateRepository } from './repositories/tarot-create.repository';

@Injectable()
export class TarotReadService {
  constructor(
    private readonly chatGpt: ChatGptService,
    private readonly tarotCreateRepository: TarotCreateRepository,
    private readonly tarotFindRepository: TarotFindRepository,
    private readonly tokenFindRepository: PushNotificationTokenFindAllRepository,
  ) {}

  async execute(params: TarotDto) {
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

      const result = await this.tarotFindRepository.execute({
        pushNotificationTokenId: token.values.id,
        createdAt: {
          gt: date,
        },
      });

      if (!result) {
        // const chatResponse = await this.chatGpt.execute([
        //   {
        //     role: 'system',
        //     content: tarotPromp,
        //   },
        //   {
        //     role: 'user',
        //     content: JSON.stringify(params.cards),
        //   },
        // ]);
        // result = await this.tarotCreateRepository.execute({
        //   pushNotificationTokenId: token.values.id,
        //   name: params.name,
        //   bithDate: params.birthDate,
        //   reading: chatResponse,
        // });
      }

      return { reading: 'result.values.reading' };
    } catch (e: unknown) {
      if (e instanceof BadRequestException) {
        throw e;
      }

      throw new InternalServerErrorException('An error happen in tarot');
    }
  }
}
