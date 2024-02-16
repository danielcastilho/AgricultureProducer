"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuralProducerRepository = void 0;
const repositorybase_service_1 = require("./repositorybase.service");
const common_1 = require("@nestjs/common");
let RuralProducerRepository = class RuralProducerRepository extends repositorybase_service_1.RepositoryBaseService {
    async create(data) {
        const savedData = await this.ruralProducer.create({
            data: data,
            include: {
                City: true,
                AgriculturalCultures: true
            }
        });
        return savedData;
    }
    async update(data) {
        const result = await this.ruralProducer.update({
            where: {
                id: data.id
            },
            data: data,
            include: {
                City: true,
                AgriculturalCultures: true
            }
        });
        return !!result;
    }
    async delete(id) {
        return !!(await this.ruralProducer.delete({
            where: {
                id
            }
        }));
    }
    async byId(id) {
        const data = await this.ruralProducer.findUnique({
            where: {
                id
            },
            include: {
                City: true,
                AgriculturalCultures: true
            }
        });
        return data;
    }
};
exports.RuralProducerRepository = RuralProducerRepository;
exports.RuralProducerRepository = RuralProducerRepository = __decorate([
    (0, common_1.Injectable)()
], RuralProducerRepository);
//# sourceMappingURL=ruralProducerRepository.js.map