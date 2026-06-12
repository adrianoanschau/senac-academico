import { Controller, Get } from '@nestjs/common';
import pkg from '../package.json';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index() {
    return {
      name: pkg.name,
      version: pkg.version,
    };
  }
}
