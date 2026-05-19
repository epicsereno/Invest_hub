import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, RequestUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { PitchService } from './pitch.service';

@Controller('pitches')
export class PitchController {
  constructor(private readonly pitchService: PitchService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePitchDto, @CurrentUser() user: RequestUser) {
    return this.pitchService.create(dto, user.id);
  }

  @Get()
  findAll(@Query('arena') arena?: 'PUBLIC' | 'PRIVATE') {
    return this.pitchService.findAll({ arena });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pitchService.findOne(id);
  }
}
