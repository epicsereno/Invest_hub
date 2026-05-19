import { Module } from '@nestjs/common';
import { ArenaModule } from '../arena/arena.module';
import { NotificationModule } from '../notification/notification.module';
import { PitchController } from './pitch.controller';
import { PitchRepository } from './pitch.repository';
import { PitchService } from './pitch.service';

@Module({
  imports: [ArenaModule, NotificationModule],
  controllers: [PitchController],
  providers: [PitchService, PitchRepository],
  exports: [PitchService],
})
export class PitchModule {}
