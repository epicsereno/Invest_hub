export class GetDealsByPitchQuery {
  constructor(
    public readonly pitchId: string,
    public readonly investorId?: string,
    public readonly status?: string,
  ) {}
}
