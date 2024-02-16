import { Injectable } from "@nestjs/common";
import { CityModel } from "../model/cityModel";
import { RepositoryBaseService } from "./repositorybase.service";

@Injectable()
export class CityRepository extends RepositoryBaseService<CityModel> {
  async create(data: CityModel): Promise<CityModel> {
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
  async update(data: CityModel): Promise<boolean> {
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
  async delete(id: string): Promise<boolean> {
    return !!(await this.city.delete({
      where: {
        id
      }
    }));
  }
  async byId(id: string): Promise<CityModel> {
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
  async byNameAndStateAcronym(
    name: string,
    stateAcronym: string
  ): Promise<CityModel> {
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
}
