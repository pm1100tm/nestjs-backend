import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { Transactional } from 'typeorm-transactional';

import { CustomerService } from './customer.service';
import { AuthService } from 'auth/services/auth.service';
import { EncryptUtil } from 'common/encrypt.util';

import { UserRepository } from 'user/repositories/user.repository';

import { User } from 'user/entities/user.entity';

import { CreateUserInDto } from 'user/dto/req/create-user-in.dto';
import { CreateUserOutDto } from 'user/dto/res/create-user-out.dto';
import { CreateCustomerInDto } from 'user/dto/req/create-customer-in.dto';
import { UserOutDto } from 'user/dto/res/user.out';
import { RoleEnum, SignInProvider } from 'user/user.enums';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
    private readonly userRepository: UserRepository,
    private readonly encryptUtil: EncryptUtil,
  ) {}

  @Transactional()
  async create(createUserInDto: CreateUserInDto): Promise<CreateUserOutDto> {
    const createUserOutDto = new CreateUserOutDto();

    const { email, signInProvider, role, password } = createUserInDto;

    if (SignInProvider.EMAIL === signInProvider) {
      if (!password) throw new BadRequestException();
    } else {
      if (password) throw new BadRequestException();
    }

    const count = await this.userRepository.selectCount({ email });
    if (count) throw new ConflictException('User already exists');

    const userEntity = new User();
    userEntity.email = email;
    userEntity.role = role;
    userEntity.signInProvider = signInProvider;

    if (SignInProvider.EMAIL === signInProvider) {
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
    createUserOutDto.signInProvider = user.signInProvider;
    createUserOutDto.isRemoved = user.isRemoved;
    createUserOutDto.updatedAt = user.updatedAt;
    createUserOutDto.createdAt = user.createdAt;

    return createUserOutDto;
  }

  async findOne({
    id,
    email,
  }: {
    id?: number;
    email?: string;
  } = {}): Promise<UserOutDto> {
    if (!id && !email)
      throw new BadRequestException('Id or Email should be set');

    const user = await this.userRepository.selectUnique({ id, email });
    if (!user) throw new NotFoundException();

    const userOutDto = new UserOutDto();
    userOutDto.id = user.id;
    userOutDto.role = user.role;
    userOutDto.signInProvider = user.signInProvider;
    userOutDto.isRemoved = user.isRemoved;
    userOutDto.createdAt = user.createdAt;
    userOutDto.updatedAt = user.updatedAt;

    return userOutDto;
  }
}
