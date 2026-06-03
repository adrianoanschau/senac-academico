import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import pkg from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index() {
    return {
      name: pkg.name,
      version: pkg.version,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(
    @Request()
    req: {
      user: { userId: string; username: string; roles?: string[] };
    },
  ) {
    return {
      data: req.user,
    };
  }
}
