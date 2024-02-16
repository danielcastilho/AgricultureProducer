import { AgriculturalCultureModel } from "./../model/agriculturalCultureModel";
import { RepositoryBaseService } from "./repositorybase.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AgriculturalCultureRepository extends RepositoryBaseService<AgriculturalCultureModel> {
  async create(
    data: AgriculturalCultureModel
  ): Promise<AgriculturalCultureModel> {
    const savedData = await this.agriculturalCulture.create({
      data: {
        name: data.name
      }
    });
    return savedData;
  }

  async update(data: AgriculturalCultureModel): Promise<boolean> {
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
  async delete(id: string): Promise<boolean> {
    return !!(await this.ruralProducer.delete({
      where: {
        id
      }
    }));
  }
  async byId(id: string): Promise<AgriculturalCultureModel> {
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
  async byName(name: string): Promise<AgriculturalCultureModel> {
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
}
