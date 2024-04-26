import {
  Injectable,
  BadRequestException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { CustomerService } from './customer.service';
import { AuthService } from 'auth/services/auth.service';
import { EncryptUtil } from 'common/encrypt.util';

import { UserRepository } from 'user/repositories/user.repository';

import { User } from 'user/entities/user.entity';

import { CreateUserInDto } from 'user/dtos/req/create-user-in.dto';
import { CreateUserOutDto } from 'user/dtos/res/create-user-out.dto';
import { RoleEnum, SocialProvider } from 'user/user.enums';
import { CreateCustomerInDto } from 'user/dtos/req/create-customer-in.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
    private readonly userRepository: UserRepository,
    private readonly encryptUtil: EncryptUtil,
  ) {}

  async create(createUserInDto: CreateUserInDto): Promise<CreateUserOutDto> {
    const createUserOutDto = new CreateUserOutDto();

    const { email, socialProvider, role, password } = createUserInDto;

    if (SocialProvider.EMAIL === socialProvider) {
      if (!password) throw new BadRequestException();
    } else {
      if (password) throw new BadRequestException();
    }

    const count = await this.userRepository.selectCount({ email });
    if (count) throw new ConflictException('User already exists');

    const userEntity = new User();
    userEntity.email = email;
    userEntity.role = role;
    userEntity.socialProvider = socialProvider;

    if (SocialProvider.EMAIL === socialProvider) {
      userEntity.password = await this.encryptUtil.encrypt(password);
    }

    const user = await this.userRepository.insert(userEntity);

    if (RoleEnum.CUSTOMER == role) {
      const createCustomerInDto = new CreateCustomerInDto();
      createCustomerInDto.userId = user.id;
      const createCustomerOutDto =
        await this.customerService.create(createCustomerInDto);
      createUserOutDto.customerId = createCustomerOutDto.id;
    }

    const tokenPayload = { userId: user.id };
    const { refreshToken } = this.authService.issueRefreshToken(tokenPayload);
    await this.userRepository.updateRefreshToken(user.id, {
      refreshToken,
    });

    createUserOutDto.id = user.id;
    createUserOutDto.email = user.email;
    createUserOutDto.role = user.role;
    createUserOutDto.socialProvider = user.socialProvider;
    createUserOutDto.isDeleted = user.isDelete;
    createUserOutDto.updatedAt = user.updatedAt;
    createUserOutDto.createdAt = user.createdAt;

    return createUserOutDto;
  }
}
