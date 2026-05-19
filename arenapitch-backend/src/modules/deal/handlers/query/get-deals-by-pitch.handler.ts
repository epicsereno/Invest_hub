import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDealsByPitchQuery } from '../../queries/get-deals-by-pitch/get-deals-by-pitch.query';
import { DealRepository } from '../../repositories/deal.repository';

@QueryHandler(GetDealsByPitchQuery)
export class GetDealsByPitchHandler implements IQueryHandler<GetDealsByPitchQuery> {
  constructor(private readonly dealRepository: DealRepository) {}

  execute(query: GetDealsByPitchQuery) {
    return this.dealRepository.findByPitch(query.pitchId, query.investorId, query.status);
  }
}
