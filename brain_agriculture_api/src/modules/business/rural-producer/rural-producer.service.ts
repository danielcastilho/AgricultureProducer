import { CityRepository } from "./../../repository/cityRepository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { RuralProducerModel } from "src/modules/model/ruralProducerModel";
import { RuralProducerInputVM } from "src/modules/model/viewModel/ruralProducerInputVM";
import { RuralProducerRepository } from "src/modules/repository/ruralProducerRepository";
import { AgriculturalCultureRepository } from "src/modules/repository/AgriculturalCultureRepository";

type ResultValidation = [ok: boolean, message: string | object];

export type operationType = "update" | "create" | "delete" | "get";

export type ValidationItemType =
  | "document"
  | "area_total"
  | "id"
  | "required"
  | "agriculturalCultures"
  | "city";

export type ValidationItemTypeStatus = {
  [key in ValidationItemType]: ResultValidation;
};

@Injectable()
/**
 * Service class for managing rural producers.
 */
export class RuralProducerService {
  constructor(
    private ruralProducer: RuralProducerRepository,
    private agriculturalCulturesRepository: AgriculturalCultureRepository,
    private cityRepository: CityRepository
  ) {}

  public getModelfromInputVM(
    ruralProducerInput: RuralProducerInputVM
  ): RuralProducerModel {
    const model: RuralProducerModel = {
      id: ruralProducerInput.id,
      document: ruralProducerInput.document,
      totalArea: ruralProducerInput.totalArea,
      agriculturalArea: ruralProducerInput.agriculturalArea,
      vegetationArea: ruralProducerInput.vegetationArea,
      cityId: ruralProducerInput.cityId,
      farmName: ruralProducerInput.farmName,
      name: ruralProducerInput.name,
      agriculturalCultures: ruralProducerInput.agriculturalCultures?.map(
        (c) => ({
          id: c.id,
          name: c.name
        })
      )
    };
    return model;
  }

  private assertValidate(validationStatus: ValidationItemTypeStatus): void {
    const allValid = Object.values(validationStatus).every(([valid]) => valid);
    if (!allValid) {
      // TODO: Create a custom exception for business validation
      throw new BadRequestException(validationStatus);
    }
  }

  /**
   * Validates the specified action for a rural producer.
   * @param action - The action to validate.
   * @param ruralProducer - The rural producer model to validate.
   */
  public async validateAction(
    action: operationType,
    ruralProducer: RuralProducerInputVM
  ): Promise<RuralProducerInputVM> {
    const validation: ValidationItemTypeStatus = {
      document: this.validateDocument(ruralProducer.document),
      area_total: this.validateAreaTotal(ruralProducer),
      id: this.validateId(action, ruralProducer),
      required: this.validateRequiredFields(ruralProducer),
      agriculturalCultures:
        await this.validateAgriculturalCultures(ruralProducer),
      city: await this.validateCity(ruralProducer)
    };
    this.assertValidate(validation);
    return ruralProducer;
  }

  public async validateAgriculturalCultures(
    ruralProducer: RuralProducerInputVM
  ): Promise<ResultValidation> {
    if (
      !!ruralProducer.agriculturalCultures ||
      ruralProducer.agriculturalCultures.length === 0
    ) {
      return [true, "Ok"];
    }
    ruralProducer.agriculturalCultures.forEach(async (c) => {
      if (!c.name) {
        return [false, "Nome da cultura é obrigatório"];
      }
      const agricCultureValid =
        await this.agriculturalCulturesRepository.byName(c.name);
      if (!agricCultureValid) {
        return [false, `Cultura ${c.name} não encontrada`];
      } else {
        c.id = agricCultureValid.id;
      }
    });
    return [true, "Ok"];
  }
  private validateId(
    action: operationType,
    ruralProducer: RuralProducerInputVM
  ): ResultValidation {
    const valid = action === "create" || !!ruralProducer.id;
    return [valid, valid ? "Ok" : "O id é obrigatório"];
  }

  private validateAreaTotal(
    ruralProducer: RuralProducerInputVM
  ): ResultValidation {
    const valid =
      ruralProducer.agriculturalArea + ruralProducer.vegetationArea <=
      ruralProducer.totalArea;
    return [
      valid,
      valid
        ? "Ok"
        : "A área total não pode ser menor que a soma da área agrícola e da área de vegetação"
    ];
  }

  public validateDocument(document: string): ResultValidation {
    if (document.length === 11) {
      return this.validateCpf(document);
    }
    if (document.length === 14) {
      return this.validateCnpj(document);
    }
    return [false, "O documento deve ser um CPF ou CNPJ"];
  }
  public validateCpf(cpf: string): ResultValidation {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf === "") return [false, "CPF inválido"];
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return [false, "CPF inválido"];
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return [false, "CPF inválido"];
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return [false, "CPF inválido"];
    return [true, "CPF válido"];
  }

  public validateCnpj(cnpj: string): ResultValidation {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj === "") return [false, "CNPJ inválido"];
    if (
      cnpj.length !== 14 ||
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    )
      return [false, "CNPJ inválido"];
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0)))
      return [false, "CNPJ inválido"];
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1)))
      return [false, "CNPJ inválido"];
    return [true, "CNPJ válido"];
  }
  private validateRequiredFields(
    ruralProducer: RuralProducerInputVM
  ): ResultValidation {
    const messages: string[] = [];
    if (!ruralProducer.document) {
      messages.push("Documento é obrigatório");
    }
    if (!ruralProducer.name) {
      messages.push("Nome é obrigatório");
    }
    if (!ruralProducer.farmName) {
      messages.push("Nome da fazenda é obrigatório");
    }
    if (!ruralProducer.agriculturalArea) {
      messages.push("Área agrícola é obrigatória");
    }
    if (!ruralProducer.vegetationArea) {
      messages.push("Área de vegetação é obrigatória");
    }
    if (!ruralProducer.totalArea) {
      messages.push("Área total é obrigatória");
    }
    if (!ruralProducer.cityId) {
      messages.push("Cidade é obrigatória");
    }
    const valid = messages.length === 0;
    return [valid, valid ? "Ok" : messages.join("\n")];
  }

  private async validateCity(
    ruralProducer: RuralProducerInputVM
  ): Promise<ResultValidation> {
    if (!ruralProducer.cityId && !ruralProducer.cityName) {
      return [false, "Cidade é obrigatória"];
    }
    if (!ruralProducer.cityId) {
      const city = await this.cityRepository.byNameAndStateAcronym(
        ruralProducer.cityName,
        ruralProducer.stateCityAccronym
      );
      if (!city) {
        return [false, "Cidade não encontrada"];
      }
      ruralProducer.cityId = city.id;
      return [true, ruralProducer];
    }
    if (ruralProducer.cityId) {
      const city = await this.cityRepository.byId(ruralProducer.cityId);
      if (!city) {
        return [false, "Cidade não encontrada"];
      }
      return [true, "Ok"];
    }
  }

  public async create(
    ruralProducer: RuralProducerInputVM
  ): Promise<RuralProducerModel> {
    const vm = await this.validateAction("create", ruralProducer);
    const model = this.getModelfromInputVM(vm);
    return this.ruralProducer.create(model);
  }

  public async update(ruralProducer: RuralProducerInputVM): Promise<boolean> {
    const vm = await this.validateAction("update", ruralProducer);
    const model = this.getModelfromInputVM(vm);
    return this.ruralProducer.update(model);
  }

  public async delete(id: string): Promise<boolean> {
    const model = this.ruralProducer.byId(id);
    if (!model) {
      throw new BadRequestException("Produtor rural não encontrado");
    }
    return this.ruralProducer.delete(id);
  }

  public async get(id: string): Promise<RuralProducerModel> {
    return await this.ruralProducer.byId(id);
  }
}
