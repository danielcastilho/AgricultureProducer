import { RuralProducerModel } from "../model/ruralProducerModel";
import { RepositoryBaseService } from "./repositorybase.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RuralProducerRepository extends RepositoryBaseService<RuralProducerModel> {
  async create(data: RuralProducerModel): Promise<RuralProducerModel> {
    const savedData = await this.ruralProducer.create({
      data: data,
      include: {
        City: true,
        AgriculturalCultures: true
      }
    });
    return savedData;
  }
  async update(data: RuralProducerModel): Promise<boolean> {
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
  async delete(id: string): Promise<boolean> {
    return !!(await this.ruralProducer.delete({
      where: {
        id
      }
    }));
  }
  async byId(id: string): Promise<RuralProducerModel> {
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
}
