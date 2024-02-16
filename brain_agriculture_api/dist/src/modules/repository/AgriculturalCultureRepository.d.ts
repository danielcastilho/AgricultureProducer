import { AgriculturalCultureModel } from "./../model/agriculturalCultureModel";
import { RepositoryBaseService } from "./repositorybase.service";
export declare class AgriculturalCultureRepository extends RepositoryBaseService<AgriculturalCultureModel> {
    create(data: AgriculturalCultureModel): Promise<AgriculturalCultureModel>;
    update(data: AgriculturalCultureModel): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    byId(id: string): Promise<AgriculturalCultureModel>;
    byName(name: string): Promise<AgriculturalCultureModel>;
}
