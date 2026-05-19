import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { PrismaModule } from './database/prisma.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ArenaModule } from './modules/arena/arena.module';
import { AuthModule } from './modules/auth/auth.module';
import { DealModule } from './modules/deal/deal.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PitchModule } from './modules/pitch/pitch.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ArenaModule,
    NotificationModule,
    PitchModule,
    DealModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
