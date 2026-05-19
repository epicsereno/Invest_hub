import { Module } from '@nestjs/common';
import { ArenaController } from './arena.controller';
import { ArenaRepository } from './arena.repository';
import { ArenaService } from './arena.service';

@Module({
  controllers: [ArenaController],
  providers: [ArenaService, ArenaRepository],
  exports: [ArenaService],
})
export class ArenaModule {}
