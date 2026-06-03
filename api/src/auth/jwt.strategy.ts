import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // Em produção, use variável de ambiente
    });
  }

  async validate(payload: any) {
    // O retorno deste método será injetado no Request (req.user)
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
