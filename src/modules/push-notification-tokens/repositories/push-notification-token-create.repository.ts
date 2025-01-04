import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  PushNotificationToken,
  PushNotificationTokenPrimitive,
} from '@shared/entities/push-notification-token.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { PushNotificationTokenFindAllRepository } from './push-notification-token-find-all.repository';

@Injectable()
export class PushNotificationTokenCreateRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly pushNotificationTokenFindAllRepository: PushNotificationTokenFindAllRepository,
  ) {}
  async execute(
    pushNotificationTokenParams: Partial<PushNotificationTokenPrimitive>,
  ) {
    try {
      const result = await this.checkAndGetIfTokenExists(
        pushNotificationTokenParams.token,
      );

      if (!result) {
        await this.prismaService.pushNotificationToken.create({
          data: {
            userId: pushNotificationTokenParams.userId ?? null,
            token: pushNotificationTokenParams.token,
          },
        });
      }
    } catch {
      throw new InternalServerErrorException(
        'An unexpected error occurred during user creation',
      );
    }
  }

  private async checkAndGetIfTokenExists(
    token: string,
  ): Promise<PushNotificationToken> {
    const existingToken =
      await this.pushNotificationTokenFindAllRepository.execute({
        token: token,
      });

    return existingToken.length > 0 ? existingToken[0] : null;
  }
}
