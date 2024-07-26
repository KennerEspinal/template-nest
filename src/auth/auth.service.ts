import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerDTO: RegisterDto) {
    const user = this.userRepository.create(registerDTO);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      this.handleDBErrors(error);
    }
    return user;
  }

  async login(loginDTO: LoginDto) {
    const { email, password } = loginDTO;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true, email: true, id: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== password) {
      return 'Password incorrect';
    }
    return user;
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Please check the server logs');
  }
}
