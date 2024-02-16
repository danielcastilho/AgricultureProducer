"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRepository = void 0;
const common_1 = require("@nestjs/common");
const repositorybase_service_1 = require("./repositorybase.service");
let CityRepository = class CityRepository extends repositorybase_service_1.RepositoryBaseService {
    async create(data) {
        const savedData = await this.city.create({
            data: {
                name: data.name,
                stateId: data.stateId
            },
            include: {
                RuralProducers: true,
                state: true
            }
        });
        return savedData;
    }
    async update(data) {
        const result = await this.city.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                stateId: data.stateId
            },
            include: {
                RuralProducers: true,
                state: true
            }
        });
        return !!result;
    }
    async delete(id) {
        return !!(await this.city.delete({
            where: {
                id
            }
        }));
    }
    async byId(id) {
        const data = await this.city.findUnique({
            where: {
                id
            },
            include: {
                RuralProducers: true
            }
        });
        return data;
    }
    async byNameAndStateAcronym(name, stateAcronym) {
        const data = await this.city.findUnique({
            where: {
                name: name,
                state: {
                    acronym: stateAcronym
                }
            },
            include: {
                RuralProducers: true,
                state: true
            }
        });
        return data;
    }
};
exports.CityRepository = CityRepository;
exports.CityRepository = CityRepository = __decorate([
    (0, common_1.Injectable)()
], CityRepository);
//# sourceMappingURL=cityRepository.js.map