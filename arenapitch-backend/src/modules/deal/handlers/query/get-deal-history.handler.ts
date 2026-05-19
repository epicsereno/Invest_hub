import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDealHistoryQuery } from '../../queries/get-deal-history/get-deal-history.query';
import { DealRepository } from '../../repositories/deal.repository';

@QueryHandler(GetDealHistoryQuery)
export class GetDealHistoryHandler implements IQueryHandler<GetDealHistoryQuery> {
  constructor(private readonly dealRepository: DealRepository) {}

  execute(query: GetDealHistoryQuery) {
    return this.dealRepository.findHistory(query.offerId);
  }
}
