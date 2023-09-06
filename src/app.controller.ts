import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { readFileSync } from "fs";
import { join } from "path";

const db: Array<UserDto> = JSON.parse(
  readFileSync(join(__dirname, "../fake-db.json")).toString(),
);

@Controller()
export class AppController {
  @Post()
  async getHello(@Body() { email }: UserDto) {
    const delay = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
    await delay;
    return db.filter((user) => user.email == email);
  }
}
