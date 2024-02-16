import { CityModel } from "../model/cityModel";
import { RepositoryBaseService } from "./repositorybase.service";
export declare class CityRepository extends RepositoryBaseService<CityModel> {
    create(data: CityModel): Promise<CityModel>;
    update(data: CityModel): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    byId(id: string): Promise<CityModel>;
    byNameAndStateAcronym(name: string, stateAcronym: string): Promise<CityModel>;
}
