export class DealMadeEvent {
  constructor(
    public readonly dealId: string,
    public readonly pitchId: string,
    public readonly investorId: string,
  ) {}
}
