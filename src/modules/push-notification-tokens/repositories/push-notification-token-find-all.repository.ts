import { Injectable } from '@nestjs/common';
import {
  PushNotificationToken,
  PushNotificationTokenPrimitive,
} from '@shared/entities/push-notification-token.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class PushNotificationTokenFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async execute(where?: Partial<PushNotificationTokenPrimitive>) {
    let result = [];

    if (where) {
      result = await this.prismaService.pushNotificationToken.findMany({
        where,
      });
    } else {
      result = await this.prismaService.pushNotificationToken.findMany();
    }

    return PushNotificationToken.fromArray(result);
  }
}
