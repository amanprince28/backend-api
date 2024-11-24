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
    
      async login(body: any) {
        const validateUser = await this.validateUser(body.email, body.password);
        const payload = { email: body.email, sub: body.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
