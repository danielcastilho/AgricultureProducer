"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryBaseService = void 0;
const client_1 = require("@prisma/client");
class RepositoryBaseService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
}
exports.RepositoryBaseService = RepositoryBaseService;
//# sourceMappingURL=repositorybase.service.js.map