export class GetInvestorDealsQuery {
  constructor(
    public readonly investorId: string,
    public readonly status?: string,
  ) {}
}
