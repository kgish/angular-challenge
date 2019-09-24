import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserRO, User, Role } from './interfaces';
import { OperatorEntity } from '../operator/operator.entity';
import { UserRegisterDto, UserLoginDto } from './dto';
import { JwtPayload } from '../shared/auth/interfaces/jwt-payload.interface';
import { AuthService } from '../shared/auth/auth.service';
import { UserLoginRO } from './interfaces/user-login-ro.interface';
import { UserRegisterRO } from './interfaces/user-register-ro.interface';

@Injectable()
export class UserService {

  constructor(
    @Inject(forwardRef(() => AuthService))
    readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OperatorEntity)
    private operatorRepository: Repository<OperatorEntity>) {
  }

  async findAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find({ relations: ['operator'] });
    return users.map(user => user.toResponseObject());
  }

  async findOne(id: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['operator'] });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponseObject();
  }

  async findOneUsername(username: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['operator'] });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponseObject();
  }

  async register(data: UserRegisterDto): Promise<UserRegisterRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const createData: User = {
      username: data.username,
      name: data.name,
      password: data.password,
      role: Role.user,
    };

    user = await this.userRepository.create(createData);
    await this.userRepository.save(user);

    const payload: JwtPayload = { username: user.username, name: user.name, role: user.role };
    const token = await this.authService.signPayload(payload);

    // const userRO: UserRO = await this.map<UserRO>(user.toJSON());
    //
    // return {
    //   user: userRO,
    //   token,
    // };

    return {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        created: user.created,
        updated: user.updated,
      },
      token
    };
  }

  async login(data: UserLoginDto): Promise<UserLoginRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || (!await user.comparePassword(password))) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = { username: user.username, name: user.name, role: user.role };
    const token = await this.authService.signPayload(payload);

    // const userRO: UserRO = await this.map<UserRO>(user.toJSON());
    //
    // return {
    //   user: userRO,
    //   token,
    // };

    return {
      user: {
        id: user.id,
        name: user.username,
        username: user.username,
        role: user.role,
        created: user.created,
        updated: user.updated,
      },
      token
    };
  }
}

