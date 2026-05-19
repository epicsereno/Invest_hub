import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    return this.userRepository.create({
      ...dto,
      passwordHash: await hash(dto.password, 12),
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
