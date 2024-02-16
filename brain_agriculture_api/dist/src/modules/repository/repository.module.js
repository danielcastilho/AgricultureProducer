"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const ruralProducerRepository_1 = require("./ruralProducerRepository");
const AgriculturalCultureRepository_1 = require("./AgriculturalCultureRepository");
const cityRepository_1 = require("./cityRepository");
const model_module_1 = require("../model/model.module");
const repositorybase_service_1 = require("./repositorybase.service");
let RepositoryModule = class RepositoryModule {
};
exports.RepositoryModule = RepositoryModule;
exports.RepositoryModule = RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [model_module_1.ModelModule],
        controllers: [],
        providers: [
            ruralProducerRepository_1.RuralProducerRepository,
            AgriculturalCultureRepository_1.AgriculturalCultureRepository,
            cityRepository_1.CityRepository
        ],
        exports: [
            repositorybase_service_1.RepositoryBaseService,
            ruralProducerRepository_1.RuralProducerRepository,
            AgriculturalCultureRepository_1.AgriculturalCultureRepository,
            cityRepository_1.CityRepository
        ]
    })
], RepositoryModule);
//# sourceMappingURL=repository.module.js.map