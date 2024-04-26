import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptUtil {
  private saltRounds = 10;

  async encrypt(value: string): Promise<string> {
    try {
      return await bcrypt.hash(value, this.saltRounds);
    } catch (error) {
      throw new Error();
    }
  }

  async compare(raw: string, encryped: string): Promise<boolean> {
    return await bcrypt.compare(raw, encryped);
  }
}
