export class MakeOfferCommand {
  constructor(
    public readonly pitchId: string,
    public readonly investorId: string,
    public readonly amount: number,
    public readonly equity: number,
    public readonly terms: string,
    public readonly message?: string,
  ) {}
}
