import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, RequestUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AcceptDealDto } from './dto/accept-deal.dto';
import { CounterOfferDto } from './dto/counter-offer.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { WithdrawOfferDto } from './dto/withdraw-offer.dto';
import { DealService } from './deal.service';

@Controller('deals')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post('offers')
  @Roles('INVESTOR', 'ADMIN')
  createOffer(@Body() dto: CreateOfferDto, @CurrentUser() user: RequestUser) {
    return this.dealService.createOffer(dto, user.id);
  }

  @Post('offers/:offerId/counter')
  counter(@Param('offerId') offerId: string, @Body() dto: CounterOfferDto, @CurrentUser() user: RequestUser) {
    return this.dealService.counterOffer(offerId, dto, user.id);
  }

  @Post('offers/:offerId/accept')
  @Roles('INVENTOR', 'ADMIN')
  accept(@Param('offerId') offerId: string, @Body() dto: AcceptDealDto, @CurrentUser() user: RequestUser) {
    return this.dealService.acceptDeal(offerId, dto, user.id);
  }

  @Post('offers/:offerId/withdraw')
  @Roles('INVESTOR', 'ADMIN')
  withdraw(@Param('offerId') offerId: string, @Body() dto: WithdrawOfferDto, @CurrentUser() user: RequestUser) {
    return this.dealService.withdrawOffer(offerId, dto, user.id);
  }

  @Get('pitch/:pitchId')
  getDealsByPitch(
    @Param('pitchId') pitchId: string,
    @Query('investorId') investorId?: string,
    @Query('status') status?: string,
  ) {
    return this.dealService.getDealsByPitch(pitchId, investorId, status);
  }

  @Get('investor/:investorId')
  @Roles('INVESTOR', 'ADMIN')
  getInvestorDeals(@Param('investorId') investorId: string, @Query('status') status?: string) {
    return this.dealService.getInvestorDeals(investorId, status);
  }

  @Get(':offerId/history')
  getDealHistory(@Param('offerId') offerId: string) {
    return this.dealService.getDealHistory(offerId);
  }

  @Get(':offerId')
  getDeal(@Param('offerId') offerId: string) {
    return this.dealService.getDeal(offerId);
  }
}
