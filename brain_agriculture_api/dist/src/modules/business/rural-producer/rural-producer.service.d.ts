import { CityRepository } from "./../../repository/cityRepository";
import { RuralProducerModel } from "src/modules/model/ruralProducerModel";
import { RuralProducerInputVM } from "src/modules/model/viewModel/ruralProducerInputVM";
import { RuralProducerRepository } from "src/modules/repository/ruralProducerRepository";
import { AgriculturalCultureRepository } from "src/modules/repository/AgriculturalCultureRepository";
type ResultValidation = [ok: boolean, message: string | object];
export type operationType = "update" | "create" | "delete" | "get";
export type ValidationItemType = "document" | "area_total" | "id" | "required" | "agriculturalCultures" | "city";
export type ValidationItemTypeStatus = {
    [key in ValidationItemType]: ResultValidation;
};
export declare class RuralProducerService {
    private ruralProducer;
    private agriculturalCulturesRepository;
    private cityRepository;
    constructor(ruralProducer: RuralProducerRepository, agriculturalCulturesRepository: AgriculturalCultureRepository, cityRepository: CityRepository);
    getModelfromInputVM(ruralProducerInput: RuralProducerInputVM): RuralProducerModel;
    private assertValidate;
    validateAction(action: operationType, ruralProducer: RuralProducerInputVM): Promise<RuralProducerInputVM>;
    validateAgriculturalCultures(ruralProducer: RuralProducerInputVM): Promise<ResultValidation>;
    private validateId;
    private validateAreaTotal;
    validateDocument(document: string): ResultValidation;
    validateCpf(cpf: string): ResultValidation;
    validateCnpj(cnpj: string): ResultValidation;
    private validateRequiredFields;
    private validateCity;
    create(ruralProducer: RuralProducerInputVM): Promise<RuralProducerModel>;
    update(ruralProducer: RuralProducerInputVM): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    get(id: string): Promise<RuralProducerModel>;
}
export {};
