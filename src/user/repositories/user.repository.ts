import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from 'user/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async insert(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async selectUnique({
    id,
    email,
  }: {
    id?: number;
    email?: string;
  }): Promise<User | null> {
    const result = await this.repository.findOne({
      where: {
        id,
        email,
      },
    });

    return result;
  }

  async selectCount({
    id,
    email,
  }: {
    id?: number;
    email?: string;
  }): Promise<number> {
    const count = await this.repository.count({
      where: {
        id,
        email,
      },
    });

    return count;
  }

  async updateRefreshToken(
    id: number,
    { refreshToken }: { refreshToken: string },
  ): Promise<UpdateResult> {
    return await this.repository.update(id, {
      refreshToken,
    });
  }
}
