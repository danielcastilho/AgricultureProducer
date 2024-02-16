import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { BaseModel } from "../model/baseModel";
export declare abstract class RepositoryBaseService<T extends BaseModel> extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    abstract create(data: T): T | Promise<T>;
    abstract update(data: T): boolean | Promise<boolean>;
    abstract delete(id: string): boolean | Promise<boolean>;
    abstract byId(id: string): T[] | Promise<T>;
}
