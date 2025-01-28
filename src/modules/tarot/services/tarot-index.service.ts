import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
// import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { PushNotificationTokenFindAllRepository } from '@modules/push-notification-tokens/repositories/push-notification-token-find-all.repository';
import { TarotFindRepository } from '../repositories/tarot-find-from-now.repository';
import { TarotDto } from '../tarot.dto';

@Injectable()
export class TarotIndexService {
  constructor(
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

      return JSON.parse(result.values.reading);
    } catch (e: unknown) {
      console.log(e);

      if (e instanceof BadRequestException) {
        throw e;
      }

      throw new InternalServerErrorException('An error happen in tarot');
    }
  }
}
