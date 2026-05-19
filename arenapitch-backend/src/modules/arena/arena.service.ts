import { Injectable } from '@nestjs/common';
import { ArenaRepository } from './arena.repository';

@Injectable()
export class ArenaService {
  constructor(private readonly arenaRepository: ArenaRepository) {}

  findAll() {
    return this.arenaRepository.findAll();
  }

  describeAccess(id: string) {
    return this.arenaRepository.findAccessPolicy(id);
  }
}
