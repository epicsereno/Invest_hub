import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AcceptDealCommand } from './commands/accept-deal/accept-deal.command';
import { CounterOfferCommand } from './commands/counter-offer/counter-offer.command';
import { MakeOfferCommand } from './commands/make-offer/make-offer.command';
import { WithdrawOfferCommand } from './commands/withdraw-offer/withdraw-offer.command';
import { AcceptDealDto } from './dto/accept-deal.dto';
import { CounterOfferDto } from './dto/counter-offer.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { WithdrawOfferDto } from './dto/withdraw-offer.dto';
import { GetDealHistoryQuery } from './queries/get-deal-history/get-deal-history.query';
import { GetDealQuery } from './queries/get-deal/get-deal.query';
import { GetDealsByPitchQuery } from './queries/get-deals-by-pitch/get-deals-by-pitch.query';
import { GetInvestorDealsQuery } from './queries/get-investor-deals/get-investor-deals.query';

@Injectable()
export class DealService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createOffer(dto: CreateOfferDto, investorId: string) {
    return this.commandBus.execute(
      new MakeOfferCommand(dto.pitchId, investorId, dto.amount, dto.equity, dto.terms, dto.message),
    );
  }

  counterOffer(offerId: string, dto: CounterOfferDto, userId: string) {
    return this.commandBus.execute(new CounterOfferCommand(offerId, userId, dto.amount, dto.equity, dto.terms));
  }

  acceptDeal(offerId: string, dto: AcceptDealDto, userId: string) {
    return this.commandBus.execute(new AcceptDealCommand(offerId, userId, dto.note));
  }

  withdrawOffer(offerId: string, dto: WithdrawOfferDto, userId: string) {
    return this.commandBus.execute(new WithdrawOfferCommand(offerId, userId, dto.reason));
  }

  getDeal(offerId: string) {
    return this.queryBus.execute(new GetDealQuery(offerId));
  }

  getDealsByPitch(pitchId: string, investorId?: string, status?: string) {
    return this.queryBus.execute(new GetDealsByPitchQuery(pitchId, investorId, status));
  }

  getInvestorDeals(investorId: string, status?: string) {
    return this.queryBus.execute(new GetInvestorDealsQuery(investorId, status));
  }

  getDealHistory(offerId: string) {
    return this.queryBus.execute(new GetDealHistoryQuery(offerId));
  }
}
