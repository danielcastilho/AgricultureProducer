"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessModule = void 0;
const common_1 = require("@nestjs/common");
const repository_module_1 = require("../repository/repository.module");
const rural_producer_service_1 = require("./rural-producer/rural-producer.service");
const AgriculturalCultureRepository_1 = require("../repository/AgriculturalCultureRepository");
let BusinessModule = class BusinessModule {
};
exports.BusinessModule = BusinessModule;
exports.BusinessModule = BusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [repository_module_1.RepositoryModule],
        controllers: [],
        providers: [rural_producer_service_1.RuralProducerService, AgriculturalCultureRepository_1.AgriculturalCultureRepository],
        exports: [rural_producer_service_1.RuralProducerService]
    })
], BusinessModule);
//# sourceMappingURL=business.module.js.map