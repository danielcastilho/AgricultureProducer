"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgriculturalCultureRepository = void 0;
const repositorybase_service_1 = require("./repositorybase.service");
const common_1 = require("@nestjs/common");
let AgriculturalCultureRepository = class AgriculturalCultureRepository extends repositorybase_service_1.RepositoryBaseService {
    async create(data) {
        const savedData = await this.agriculturalCulture.create({
            data: {
                name: data.name
            }
        });
        return savedData;
    }
    async update(data) {
        const result = await this.agriculturalCulture.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name
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
        const data = await this.agriculturalCulture.findUnique({
            where: {
                id
            },
            include: {
                RuralProducers: true
            }
        });
        return data;
    }
    async byName(name) {
        const data = await this.agriculturalCulture.findUnique({
            where: {
                name
            },
            include: {
                RuralProducers: true
            }
        });
        return data;
    }
};
exports.AgriculturalCultureRepository = AgriculturalCultureRepository;
exports.AgriculturalCultureRepository = AgriculturalCultureRepository = __decorate([
    (0, common_1.Injectable)()
], AgriculturalCultureRepository);
//# sourceMappingURL=AgriculturalCultureRepository.js.map