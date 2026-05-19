import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationModule } from '../notification/notification.module';
import { PitchModule } from '../pitch/pitch.module';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { AcceptDealHandler } from './handlers/command/accept-deal.handler';
import { CounterOfferHandler } from './handlers/command/counter-offer.handler';
import { MakeOfferHandler } from './handlers/command/make-offer.handler';
import { WithdrawOfferHandler } from './handlers/command/withdraw-offer.handler';
import { GetDealHistoryHandler } from './handlers/query/get-deal-history.handler';
import { GetDealHandler } from './handlers/query/get-deal.handler';
import { GetDealsByPitchHandler } from './handlers/query/get-deals-by-pitch.handler';
import { GetInvestorDealsHandler } from './handlers/query/get-investor-deals.handler';
import { DealRepository } from './repositories/deal.repository';

const CommandHandlers = [MakeOfferHandler, CounterOfferHandler, AcceptDealHandler, WithdrawOfferHandler];
const QueryHandlers = [GetDealHandler, GetDealsByPitchHandler, GetInvestorDealsHandler, GetDealHistoryHandler];

@Module({
  imports: [CqrsModule, PitchModule, NotificationModule],
  controllers: [DealController],
  providers: [DealService, DealRepository, ...CommandHandlers, ...QueryHandlers],
  exports: [DealService, CqrsModule],
})
export class DealModule {}
