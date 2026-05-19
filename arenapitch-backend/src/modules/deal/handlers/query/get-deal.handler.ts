import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDealQuery } from '../../queries/get-deal/get-deal.query';
import { DealRepository } from '../../repositories/deal.repository';

@QueryHandler(GetDealQuery)
export class GetDealHandler implements IQueryHandler<GetDealQuery> {
  constructor(private readonly dealRepository: DealRepository) {}

  execute(query: GetDealQuery) {
    return this.dealRepository.findOne(query.offerId);
  }
}
