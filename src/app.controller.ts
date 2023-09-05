import { Body, Controller, Get } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { readFileSync } from 'fs';
import { join } from 'path';

console.log(join(__dirname, '../fake-db.json'))

const db: Array<UserDto> = JSON.parse(
  readFileSync(join(__dirname, '../fake-db.json')).toString(),
);

@Controller()
export class AppController {
  @Get()
  getHello(@Body() { email, number }: UserDto) {
    return db.filter((user) => user.email == email);
  }
}
