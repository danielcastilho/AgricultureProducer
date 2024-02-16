/*
https://docs.nestjs.com/providers#services
*/

import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { BaseModel } from "../model/baseModel";

export abstract class RepositoryBaseService<T extends BaseModel>
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }
  abstract create(data: T): T | Promise<T>;
  abstract update(data: T): boolean | Promise<boolean>;
  abstract delete(id: string): boolean | Promise<boolean>;
  abstract byId(id: string): T[] | Promise<T>;
}
