import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(email: string, pass: string): Promise<any> {
        return this.usersService.validateUser(email, pass);
      }
    
      async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
