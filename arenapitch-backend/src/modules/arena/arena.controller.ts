import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ArenaService } from './arena.service';

@Controller('arenas')
export class ArenaController {
  constructor(private readonly arenaService: ArenaService) {}

  @Get()
  findAll() {
    return this.arenaService.findAll();
  }

  @Get(':id/access')
  @UseGuards(JwtAuthGuard)
  canAccess(@Param('id') id: string) {
    return this.arenaService.describeAccess(id);
  }
}
