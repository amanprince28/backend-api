import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.validateUser(email, password);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      name:user.name,
      role:user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}
