import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInvestorDealsQuery } from '../../queries/get-investor-deals/get-investor-deals.query';
import { DealRepository } from '../../repositories/deal.repository';

@QueryHandler(GetInvestorDealsQuery)
export class GetInvestorDealsHandler implements IQueryHandler<GetInvestorDealsQuery> {
  constructor(private readonly dealRepository: DealRepository) {}

  execute(query: GetInvestorDealsQuery) {
    return this.dealRepository.findByInvestor(query.investorId, query.status);
  }
}
