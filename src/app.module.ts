import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import { ScheduleModule } from '@nestjs/schedule';

// import { AuthGuard } from './modules/auth/auth.guard';
import { PushNotificationTokenModule } from '@modules/push-notification-tokens/push-notification-token.module';
import { config } from '@config/config';
import { HoroscopeModule } from './modules/horoscope/horoscope.module';

// import { UserModule } from './modules/users/user.module';
// import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from '@modules/auth/auth.guard';
import { TarotModule } from '@modules/tarot/tarot.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RequestLoggerMiddleware } from '@shared/middlewares/request-logget.middleware';
import { HomeModule } from '@modules/home/home.module';
// import { YearListItemModule } from '@modules/year-list-item/year-list-item.module';

const providers = [];

if (config.app.isProduction) {
  providers.push({
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  });
}

providers.push({
  provide: 'APP_GUARD',
  useClass: AuthGuard,
});

providers.push({
  provide: 'APP_GUARD',
  useClass: ThrottlerGuard,
});

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
    ScheduleModule.forRoot(),
    SentryModule.forRoot(),
    HoroscopeModule,
    PushNotificationTokenModule,
    TarotModule,
    HomeModule,
  ],
  controllers: [],
  providers,
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
