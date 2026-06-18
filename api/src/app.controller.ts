import { Controller, Get } from '@nestjs/common';

import pkg from '../package.json';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  index() {
    return {
      name: pkg.name,
      version: pkg.version,
    };
  }
}
