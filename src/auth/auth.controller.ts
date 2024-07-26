import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerDTO: RegisterDto) {
    return this.authService.create(registerDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDto) {
    return this.authService.login(loginDTO);
  }

  @Get('check-status')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
}
